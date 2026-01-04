#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');
const { execSync } = require('child_process');
const chalk = require('chalk');
const { program } = require('commander');

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
const getSourcePackagePath = () => {
  const cliPath = getCliPackagePath();
  
  // First, try to find bundled package files (when published)
  const bundledPath = path.join(cliPath, 'package-files');
  if (fs.existsSync(bundledPath)) {
    return bundledPath;
  }
  
  // In development, package is at ../../package relative to cli/src
  const devPath = path.resolve(cliPath, '../package');
  if (fs.existsSync(devPath)) {
    return devPath;
  }
  
  // Try relative to workspace root (for development)
  const workspacePath = path.resolve(cliPath, '../../package');
  if (fs.existsSync(workspacePath)) {
    return workspacePath;
  }
  
  throw new Error('Could not find package directory. Make sure the package/ directory exists or the CLI is properly installed.');
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

// Main install function
const install = async (options) => {
  const targetDir = path.resolve(process.cwd(), 'zero-to-app');
  
  console.log(chalk.blue('Installing zero-to-app design system...'));
  console.log(chalk.gray(`Target directory: ${targetDir}`));
  
  // Check if target directory already exists
  if (fs.existsSync(targetDir) && !options.force) {
    console.error(chalk.red(`Directory ${targetDir} already exists. Use --force to overwrite.`));
    process.exit(1);
  }
  
  try {
    // Get source package path
    const sourcePath = getSourcePackagePath();
    console.log(chalk.gray(`Source directory: ${sourcePath}`));
    
    if (!fs.existsSync(sourcePath)) {
      throw new Error(`Source package directory not found: ${sourcePath}`);
    }
    
    // Remove existing directory if force is used
    if (options.force && fs.existsSync(targetDir)) {
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

