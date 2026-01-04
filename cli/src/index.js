#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');
const { execSync } = require('child_process');
const chalk = require('chalk');
const { program } = require('commander');
const readline = require('readline');

// Get the directory where the CLI package is installed
const getCliPackagePath = () => {
  // When installed via npm/npx, __dirname will be in node_modules/zero-to-app/src
  // We need to find the root of this CLI package
  let currentDir = __dirname;
  const rootDir = path.parse(currentDir).root;
  
  // Go up from src/ to find the package root
  while (currentDir !== rootDir) {
    const packageJsonPath = path.join(currentDir, 'package.json');
    if (fs.existsSync(packageJsonPath)) {
      try {
        const pkg = require(packageJsonPath);
        if (pkg.name === 'zero-to-app' && pkg.bin && pkg.bin['zero-to-app']) {
          return currentDir;
        }
      } catch (e) {
        // Continue searching if package.json is invalid
      }
    }
    const parentDir = path.dirname(currentDir);
    if (parentDir === currentDir) break;
    currentDir = parentDir;
  }
  
  // Fallback: assume we're in development
  return path.resolve(__dirname, '..');
};

// Get the source package directory
const getSourcePackagePath = async () => {
  // Always download from GitHub
  return await downloadFromGitHub();
};

// Download package files from GitHub
const downloadFromGitHub = async () => {
  const { execSync } = require('child_process');
  const GITHUB_REPO = 'Alex-Amayo/zero-to-app';
  const GITHUB_BRANCH = 'master'; // Default branch per GitHub repo
  const GITHUB_URL = `https://github.com/${GITHUB_REPO}.git`;
  
  const tempDir = path.join(require('os').tmpdir(), 'zero-to-app-cli');
  const repoDir = path.join(tempDir, 'zero-to-app');
  const packageDir = path.join(repoDir, 'package');
  
  // Check if already cloned and up to date
  if (fs.existsSync(packageDir)) {
    try {
      // Try to update if it's a git repo
      if (fs.existsSync(path.join(repoDir, '.git'))) {
        console.log(chalk.gray('Updating package files from GitHub...'));
        execSync('git pull', { cwd: repoDir, stdio: 'ignore' });
        console.log(chalk.gray('Using cached package files from GitHub...'));
        return packageDir;
      }
    } catch (e) {
      // If update fails, continue with existing files
      console.log(chalk.gray('Using cached package files from GitHub...'));
      return packageDir;
    }
  }
  
  console.log(chalk.blue('Downloading package files from GitHub...'));
  console.log(chalk.gray(`Repository: ${GITHUB_REPO}`));
  console.log(chalk.gray(`Branch: ${GITHUB_BRANCH}`));
  
  try {
    await fs.ensureDir(tempDir);
    
    // Try git clone first (fastest and most reliable)
    try {
      if (fs.existsSync(repoDir)) {
        await fs.remove(repoDir);
      }
      execSync(`git clone --depth 1 --branch ${GITHUB_BRANCH} ${GITHUB_URL} "${repoDir}"`, {
        stdio: 'inherit',
      });
      console.log(chalk.green('✓ Package files downloaded successfully'));
      return packageDir;
    } catch (gitError) {
      // If git is not available, try downloading zip
      console.log(chalk.yellow('Git not available, trying alternative download method...'));
      throw gitError;
    }
  } catch (error) {
    console.error(chalk.red(`Failed to download from GitHub: ${error.message}`));
    throw new Error(`Could not download package files from GitHub. Please ensure git is installed or check your internet connection. Error: ${error.message}`);
  }
};

// Copy directory recursively, excluding node_modules and other ignored files
const copyDirectory = async (src, dest, excludes = []) => {
  await fs.ensureDir(dest);
  
  const items = await fs.readdir(src);
  
  for (const item of items) {
    const srcPath = path.join(src, item);
    const destPath = path.join(dest, item);
    
    // Skip excluded items
    if (excludes.includes(item)) {
      continue;
    }
    
    const stat = await fs.stat(srcPath);
    
    if (stat.isDirectory()) {
      await copyDirectory(srcPath, destPath, excludes);
    } else {
      await fs.copy(srcPath, destPath);
    }
  }
};

// Get required dependencies that are not included with Expo by default
const getRequiredDependencies = () => {
  return {
    // Regular npm packages
    regular: [
      'react-hook-form',
      '@hookform/resolvers',
      'zod',
      'react-native-reanimated-carousel',
    ],
    // Expo packages (should use expo install)
    expo: [
      'expo-blur',
      'expo-glass-effect',
    ],
  };
};

// Check user's package.json for missing dependencies
const checkDependencies = (packageJsonPath) => {
  if (!fs.existsSync(packageJsonPath)) {
    return { missing: getRequiredDependencies(), allPresent: false };
  }
  
  try {
    const packageJson = fs.readJsonSync(packageJsonPath);
    const allDeps = {
      ...(packageJson.dependencies || {}),
      ...(packageJson.devDependencies || {}),
    };
    
    const required = getRequiredDependencies();
    const missing = {
      regular: [],
      expo: [],
    };
    
    // Check regular dependencies
    for (const dep of required.regular) {
      if (!allDeps[dep]) {
        missing.regular.push(dep);
      }
    }
    
    // Check Expo dependencies
    for (const dep of required.expo) {
      if (!allDeps[dep]) {
        missing.expo.push(dep);
      }
    }
    
    const allPresent = missing.regular.length === 0 && missing.expo.length === 0;
    
    return { missing, allPresent };
  } catch (error) {
    console.warn(chalk.yellow(`Warning: Could not read package.json: ${error.message}`));
    return { missing: getRequiredDependencies(), allPresent: false };
  }
};

// Install missing dependencies
const installMissingDependencies = async (missing, packageManager = 'npm', projectRoot) => {
  if (missing.regular.length === 0 && missing.expo.length === 0) {
    return;
  }
  
  try {
    // Install Expo packages first using expo install
    if (missing.expo.length > 0) {
      console.log(chalk.blue(`Installing Expo packages: ${missing.expo.join(', ')}...`));
      const expoPackages = missing.expo.join(' ');
      execSync(`npx expo install ${expoPackages}`, {
        cwd: projectRoot,
        stdio: 'inherit',
      });
      console.log(chalk.green('✓ Expo packages installed successfully'));
    }
    
    // Install regular packages using detected package manager
    if (missing.regular.length > 0) {
      console.log(chalk.blue(`Installing packages: ${missing.regular.join(', ')}...`));
      
      let command;
      if (packageManager === 'yarn') {
        command = `yarn add ${missing.regular.join(' ')}`;
      } else if (packageManager === 'pnpm') {
        command = `pnpm add ${missing.regular.join(' ')}`;
      } else {
        command = `npm install ${missing.regular.join(' ')}`;
      }
      
      execSync(command, {
        cwd: projectRoot,
        stdio: 'inherit',
      });
      
      console.log(chalk.green('✓ Packages installed successfully'));
    }
  } catch (error) {
    console.error(chalk.red('✗ Failed to install dependencies'));
    throw error;
  }
};

// Prompt user for confirmation
const promptOverwrite = (targetDir) => {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    
    rl.question(chalk.yellow(`Directory ${targetDir} already exists. Overwrite? (y/N): `), (answer) => {
      rl.close();
      const shouldOverwrite = answer.toLowerCase().trim() === 'y' || answer.toLowerCase().trim() === 'yes';
      resolve(shouldOverwrite);
    });
  });
};

// Main install function
const install = async (options) => {
  const targetDir = path.resolve(process.cwd(), 'zero-to-app');
  
  console.log(chalk.blue('Installing zero-to-app design system...'));
  console.log(chalk.gray(`Target directory: ${targetDir}`));
  
  // Check if target directory already exists
  let shouldOverwrite = options.force;
  if (fs.existsSync(targetDir) && !options.force) {
    shouldOverwrite = await promptOverwrite(targetDir);
    if (!shouldOverwrite) {
      console.log(chalk.gray('Installation cancelled.'));
      process.exit(0);
    }
  }
  
  try {
    // Get source package path (may download from GitHub if not found locally)
    const sourcePath = await getSourcePackagePath();
    console.log(chalk.gray(`Source directory: ${sourcePath}`));
    
    if (!fs.existsSync(sourcePath)) {
      throw new Error(`Source package directory not found: ${sourcePath}`);
    }
    
    // Remove existing directory if force is used or user confirmed
    if (shouldOverwrite && fs.existsSync(targetDir)) {
      console.log(chalk.yellow('Removing existing directory...'));
      await fs.remove(targetDir);
    }
    
    // Copy package files
    console.log(chalk.blue('Copying package files...'));
    const excludes = ['node_modules', '.git', 'package-lock.json', 'pnpm-lock.yaml', 'yarn.lock'];
    await copyDirectory(sourcePath, targetDir, excludes);
    console.log(chalk.green('✓ Files copied successfully'));
    
    // Check and install dependencies in user's project root
    if (!options.skipInstall) {
      const projectRoot = process.cwd();
      const packageJsonPath = path.join(projectRoot, 'package.json');
      
      console.log(chalk.blue('Checking dependencies...'));
      const { missing, allPresent } = checkDependencies(packageJsonPath);
      
      if (allPresent) {
        console.log(chalk.green('✓ All required dependencies are already installed'));
      } else {
        const packageManager = options.packageManager || detectPackageManager();
        await installMissingDependencies(missing, packageManager, projectRoot);
      }
    } else {
      console.log(chalk.yellow('Skipping dependency installation (--skip-install)'));
    }
    
    console.log(chalk.green('\n✓ zero-to-app installed successfully!'));
    console.log(chalk.blue(`\nNext steps:`));
    console.log(chalk.gray(`  Import components: import { Button, Card } from './zero-to-app'`));
    
  } catch (error) {
    console.error(chalk.red(`\n✗ Installation failed: ${error.message}`));
    if (error.stack) {
      console.error(chalk.gray(error.stack));
    }
    process.exit(1);
  }
};

// Detect package manager from current directory
const detectPackageManager = () => {
  if (fs.existsSync(path.join(process.cwd(), 'yarn.lock'))) {
    return 'yarn';
  }
  if (fs.existsSync(path.join(process.cwd(), 'pnpm-lock.yaml'))) {
    return 'pnpm';
  }
  return 'npm';
};

// CLI setup
program
  .name('zero-to-app')
  .description('Install the zero-to-app design system package')
  .version('1.0.0')
  .option('-f, --force', 'Overwrite existing directory', false)
  .option('--skip-install', 'Skip dependency installation', false)
  .option('-p, --package-manager <manager>', 'Package manager to use (npm, yarn, pnpm)', 'npm')
  .action(install);

program.parse();

