import * as fs from 'fs';
import * as path from 'path';
import { getGitHubRawUrl, GITHUB_CONFIG } from './config';

// Declare __dirname for TypeScript (available in CommonJS)
declare const __dirname: string;

export interface ComponentRegistry {
  components: {
    [key: string]: {
      files: string[];
      dependencies: string[];
    };
  };
}

export interface PackageJson {
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
  peerDependencies?: Record<string, string>;
}

/**
 * Fetch content from GitHub raw URL
 */
async function fetchFromGitHub(filePath: string): Promise<string> {
  const url = getGitHubRawUrl(filePath);
  
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`File not found: ${filePath} (404)`);
      }
      throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`);
    }
    
    return await response.text();
  } catch (error: any) {
    if (error.message) {
      throw error;
    }
    throw new Error(`Network error fetching ${url}: ${error.message || 'Unknown error'}`);
  }
}

/**
 * Load the component registry from GitHub
 */
export async function loadRegistry(): Promise<ComponentRegistry> {
  try {
    // Path relative to repository root on GitHub (components at root level)
    const registryPath = 'cli/registry.json';
    const content = await fetchFromGitHub(registryPath);
    return JSON.parse(content);
  } catch (error: any) {
    throw new Error(
      `Could not load registry from GitHub: ${error.message}\nMake sure you have an internet connection and the repository is accessible.`
    );
  }
}

/**
 * Fetch a component file from GitHub
 */
export async function fetchComponentFile(filePath: string): Promise<string> {
  // File path in registry is already relative to repo root (e.g., "ui/button/Button.tsx")
  // No prefix needed since components are at root level
  return await fetchFromGitHub(filePath);
}

/**
 * Resolve all dependencies for a component recursively
 */
export function resolveDependencies(
  componentName: string,
  registry: ComponentRegistry,
  resolved: Set<string> = new Set()
): string[] {
  if (resolved.has(componentName)) {
    return [];
  }

  const component = registry.components[componentName];
  if (!component) {
    throw new Error(`Component "${componentName}" not found in registry.`);
  }

  resolved.add(componentName);
  const allDeps: string[] = [];

  // Resolve dependencies first
  for (const dep of component.dependencies) {
    const depList = resolveDependencies(dep, registry, resolved);
    allDeps.push(...depList, dep);
  }

  return [...new Set(allDeps), componentName];
}

/**
 * Prompt user for input (simple implementation)
 */
export function prompt(question: string): Promise<string> {
  return new Promise((resolve) => {
    // Use dynamic import for readline to work in both ESM and CJS
    const readline = require('readline');
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question(question, (answer: string) => {
      rl.close();
      resolve(answer.trim().toLowerCase());
    });
  });
}

/**
 * Update relative imports in a file based on new location
 * Since all components are copied to components/zero-to-app/ maintaining structure,
 * most imports should remain the same. This function handles edge cases.
 */
export function updateImports(
  content: string,
  sourceDepth: number,
  targetDepth: number
): string {
  // If depths are the same, no change needed (most common case)
  if (sourceDepth === targetDepth) {
    return content;
  }

  // Calculate the difference in directory depth
  const depthDiff = targetDepth - sourceDepth;

  // Update relative imports (../../something -> ../something or ../../../something)
  const importRegex = /from\s+['"](\.\.\/)+([^'"]+)['"]/g;

  return content.replace(importRegex, (match, dots, importPath) => {
    const currentDepth = dots.match(/\.\.\//g)?.length || 0;
    const newDepth = Math.max(0, currentDepth + depthDiff);
    const newDots = '../'.repeat(newDepth);
    return `from '${newDots}${importPath}'`;
  });
}

/**
 * Write a file to destination, updating imports if needed
 */
export function writeComponentFile(
  content: string,
  destPath: string,
  sourceFile: string,
  targetComponentDir: string
): void {
  // Calculate directory depth differences
  // Source files are in zero-to-app/ui/button/Button.tsx (depth 2 from zero-to-app/)
  // Target files are in components/zero-to-app/ui/button/Button.tsx (depth 2 from components/)
  const sourceDepth = sourceFile.split(path.sep).filter(Boolean).length - 1; // -1 because we're relative to zero-to-app/
  const targetDepth = path.relative(targetComponentDir, path.dirname(destPath))
    .split(path.sep)
    .filter(Boolean).length;

  // Update imports
  const updatedContent = updateImports(content, sourceDepth, targetDepth);

  // Ensure destination directory exists
  fs.mkdirSync(path.dirname(destPath), { recursive: true });

  // Write file
  fs.writeFileSync(destPath, updatedContent, 'utf-8');
}

/**
 * Install a component and its dependencies
 */
export async function installComponent(
  componentName: string,
  registry: ComponentRegistry,
  targetDir: string,
  overwrite: boolean = false
): Promise<void> {
  const componentsToInstall = resolveDependencies(componentName, registry);

  for (const compName of componentsToInstall) {
    const component = registry.components[compName];
    if (!component) {
      console.warn(`Warning: Component "${compName}" not found in registry.`);
      continue;
    }

    for (const file of component.files) {
      const destPath = path.join(targetDir, file);

      // Check if file exists
      if (fs.existsSync(destPath) && !overwrite) {
        const answer = await prompt(
          `File ${destPath} already exists. Overwrite? (y/n/cancel): `
        );

        if (answer === 'cancel' || answer === 'c') {
          console.log('Installation cancelled.');
          process.exit(0);
        }

        if (answer !== 'y' && answer !== 'yes') {
          console.log(`Skipping ${file}`);
          continue;
        }
      }

      try {
        // Fetch file content from GitHub
        const content = await fetchComponentFile(file);
        writeComponentFile(content, destPath, file, targetDir);
        console.log(`✓ Installed ${file}`);
      } catch (error: any) {
        console.error(`Error fetching ${file}: ${error.message}`);
        throw error;
      }
    }
  }
}

/**
 * Check for missing peer dependencies
 */
export function checkPeerDependencies(
  packageJsonPath: string,
  peerDependencies: Record<string, string>
): string[] {
  if (!fs.existsSync(packageJsonPath)) {
    // Return formatted as "package@version" when file doesn't exist
    return Object.entries(peerDependencies).map(([dep, version]) => `${dep}@${version}`);
  }

  const userPackageJson: PackageJson = JSON.parse(
    fs.readFileSync(packageJsonPath, 'utf-8')
  );

  const allDeps = {
    ...userPackageJson.dependencies,
    ...userPackageJson.devDependencies,
  };

  const missing: string[] = [];

  for (const [dep, version] of Object.entries(peerDependencies)) {
    if (!allDeps[dep]) {
      missing.push(`${dep}@${version}`);
    }
  }

  return missing;
}

/**
 * Detect package manager from lockfiles
 */
export function detectPackageManager(): 'npm' | 'yarn' | 'pnpm' {
  if (fs.existsSync(path.join(process.cwd(), 'pnpm-lock.yaml'))) {
    return 'pnpm';
  }
  if (fs.existsSync(path.join(process.cwd(), 'yarn.lock'))) {
    return 'yarn';
  }
  return 'npm';
}

/**
 * Get list of available components
 */
export function getAvailableComponents(registry: ComponentRegistry): string[] {
  return Object.keys(registry.components).sort();
}

/**
 * Extract external dependencies from a file's import statements
 * Returns a Set of package names (e.g., 'react', 'react-native', '@expo/vector-icons')
 */
function extractDependenciesFromContent(content: string): Set<string> {
  const dependencies = new Set<string>();
  
  // Match import statements: import ... from 'package' or import ... from "package"
  // Also match: import 'package' or import "package"
  const importRegex = /import\s+.*?\s+from\s+['"]([^'"]+)['"]|import\s+['"]([^'"]+)['"]/g;
  
  let match;
  while ((match = importRegex.exec(content)) !== null) {
    const packageName = match[1] || match[2];
    
    // Skip relative imports (starting with . or ..)
    if (packageName.startsWith('.')) {
      continue;
    }
    
    // Extract the root package name (e.g., '@expo/vector-icons/Feather' -> '@expo/vector-icons')
    // or 'react-native' -> 'react-native'
    const rootPackage = packageName.split('/')[0];
    
    // Skip if it's a scoped package without the scope part
    if (packageName.startsWith('@') && packageName.split('/').length > 1) {
      const scopedPackage = packageName.split('/').slice(0, 2).join('/');
      dependencies.add(scopedPackage);
    } else {
      dependencies.add(rootPackage);
    }
  }
  
  return dependencies;
}

/**
 * Known external dependencies that should be tracked as peer dependencies
 * These are the packages that components might use
 */
const KNOWN_PEER_DEPENDENCIES = [
  'react',
  'react-native',
  '@expo/vector-icons',
  'react-hook-form',
  'expo-blur',
  'expo-router',
  'react-native-reanimated',
  'react-native-reanimated-carousel',
  'expo-glass-effect',
  'zod',
  '@hookform/resolvers',
];

/**
 * Default versions for peer dependencies
 * These should match the versions in package.json peerDependencies
 */
const DEFAULT_VERSIONS: Record<string, string> = {
  react: '>=18.0.0',
  'react-native': '>=0.70.0',
  '@expo/vector-icons': '^14.0.0',
  'react-hook-form': '^7.0.0',
  'expo-blur': '~13.0.0',
  'expo-router': '*',
  'react-native-reanimated': '*',
  'react-native-reanimated-carousel': '*',
  'expo-glass-effect': '*',
  zod: '*',
  '@hookform/resolvers': '*',
};

/**
 * Update dependencies by scanning all component files in the registry
 * This function can work with local files or fetch from GitHub
 * 
 * @param registry - The component registry
 * @param baseDir - Optional base directory for local files. If not provided, will fetch from GitHub
 * @returns Updated dependencies object with all found dependencies
 */
export async function updateDependencies(
  registry: ComponentRegistry,
  baseDir?: string
): Promise<Record<string, string>> {
  const foundDependencies = new Set<string>();
  
  // Collect all unique files from all components
  const allFiles = new Set<string>();
  for (const component of Object.values(registry.components)) {
    for (const file of component.files) {
      allFiles.add(file);
    }
  }
  
  // Scan each file for dependencies
  for (const file of allFiles) {
    let content: string;
    
    if (baseDir) {
      // Read from local filesystem
      const filePath = path.join(baseDir, file);
      if (fs.existsSync(filePath)) {
        content = fs.readFileSync(filePath, 'utf-8');
      } else {
        // Skip if file doesn't exist locally
        continue;
      }
    } else {
      // Fetch from GitHub
      try {
        content = await fetchComponentFile(file);
      } catch (error) {
        // Skip files that can't be fetched
        console.warn(`Warning: Could not fetch ${file}, skipping...`);
        continue;
      }
    }
    
    // Extract dependencies from file content
    const deps = extractDependenciesFromContent(content);
    deps.forEach((dep) => foundDependencies.add(dep));
  }
  
  // Build the dependencies object with versions
  const updatedDependencies: Record<string, string> = {};
  
  for (const dep of foundDependencies) {
    // Only include known peer dependencies
    if (KNOWN_PEER_DEPENDENCIES.includes(dep)) {
      updatedDependencies[dep] = DEFAULT_VERSIONS[dep] || '*';
    }
  }
  
  // Always include core dependencies even if not found in files
  // (they might be used indirectly)
  if (!updatedDependencies.react) {
    updatedDependencies.react = DEFAULT_VERSIONS.react;
  }
  if (!updatedDependencies['react-native']) {
    updatedDependencies['react-native'] = DEFAULT_VERSIONS['react-native'];
  }
  
  return updatedDependencies;
}

