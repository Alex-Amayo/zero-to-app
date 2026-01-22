#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');
const { execSync } = require('child_process');
const chalk = require('chalk');
const { program } = require('commander');
const readline = require('readline');

const GITHUB_REPO = 'Alex-Amayo/zero-to-app';
const GITHUB_BRANCH = 'master';
const GITHUB_URL = `https://github.com/${GITHUB_REPO}.git`;

// Download package files from GitHub
const downloadFromGitHub = async () => {
  const tempDir = path.join(require('os').tmpdir(), 'zero-to-app-cli');
  const repoDir = path.join(tempDir, 'zero-to-app');
  const packageDir = path.join(repoDir, 'package');
  
  // Update if already cloned
  if (fs.existsSync(path.join(repoDir, '.git'))) {
    try {
      console.log(chalk.gray('Updating from GitHub...'));
      execSync('git pull', { cwd: repoDir, stdio: 'ignore' });
      return packageDir;
    } catch (e) {
      // Continue to fresh clone if update fails
    }
  }
  
  console.log(chalk.blue('Downloading from GitHub...'));
  console.log(chalk.gray(`${GITHUB_REPO} (${GITHUB_BRANCH})`));
  
  await fs.ensureDir(tempDir);
  if (fs.existsSync(repoDir)) {
    await fs.remove(repoDir);
  }
  
  try {
    execSync(`git clone --depth 1 --branch ${GITHUB_BRANCH} ${GITHUB_URL} "${repoDir}"`, {
      stdio: 'inherit',
    });
    console.log(chalk.green('✓ Downloaded successfully'));
    return packageDir;
  } catch (error) {
    throw new Error(`Failed to download from GitHub. Ensure git is installed: ${error.message}`);
  }
};

// Copy directory, excluding specified files/folders
const copyDirectory = async (src, dest, excludes = []) => {
  await fs.ensureDir(dest);
  const items = await fs.readdir(src);
  
  for (const item of items) {
    if (excludes.includes(item)) continue;
    
    const srcPath = path.join(src, item);
    const destPath = path.join(dest, item);
    const stat = await fs.stat(srcPath);
    
    if (stat.isDirectory()) {
      await copyDirectory(srcPath, destPath, excludes);
    } else {
      await fs.copy(srcPath, destPath);
    }
  }
};

// Required dependencies
const REQUIRED_DEPS = {
  regular: [
    'react-hook-form',
    '@hookform/resolvers',
    'zod',
    'react-native-reanimated-carousel',
    '@shopify/flash-list',
    'lottie-react-native',
  ],
  expo: ['expo-blur', 'expo-glass-effect'],
};

// Check for missing dependencies
const checkDependencies = (packageJsonPath) => {
  if (!fs.existsSync(packageJsonPath)) {
    return { missing: REQUIRED_DEPS, allPresent: false };
  }
  
  try {
    const pkg = fs.readJsonSync(packageJsonPath);
    const allDeps = { ...(pkg.dependencies || {}), ...(pkg.devDependencies || {}) };
    
    const missing = {
      regular: REQUIRED_DEPS.regular.filter(dep => !allDeps[dep]),
      expo: REQUIRED_DEPS.expo.filter(dep => !allDeps[dep]),
    };
    
    return { missing, allPresent: missing.regular.length === 0 && missing.expo.length === 0 };
  } catch (error) {
    console.warn(chalk.yellow(`Warning: Could not read package.json: ${error.message}`));
    return { missing: REQUIRED_DEPS, allPresent: false };
  }
};

// Install missing dependencies
const installDependencies = async (missing, packageManager, projectRoot) => {
  if (missing.regular.length === 0 && missing.expo.length === 0) return;
  
  try {
    if (missing.expo.length > 0) {
      console.log(chalk.blue(`Installing Expo packages: ${missing.expo.join(', ')}...`));
      execSync(`npx expo install ${missing.expo.join(' ')}`, { cwd: projectRoot, stdio: 'inherit' });
      console.log(chalk.green('✓ Expo packages installed'));
    }
    
    if (missing.regular.length > 0) {
      console.log(chalk.blue(`Installing packages: ${missing.regular.join(', ')}...`));
      const commands = {
        yarn: `yarn add ${missing.regular.join(' ')}`,
        pnpm: `pnpm add ${missing.regular.join(' ')}`,
        npm: `npm install ${missing.regular.join(' ')}`,
      };
      execSync(commands[packageManager] || commands.npm, { cwd: projectRoot, stdio: 'inherit' });
      console.log(chalk.green('✓ Packages installed'));
    }
  } catch (error) {
    console.error(chalk.red('✗ Failed to install dependencies'));
    throw error;
  }
};

// Prompt for overwrite confirmation
const promptOverwrite = (targetDir) => {
  return new Promise((resolve) => {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    rl.question(chalk.yellow(`Directory ${targetDir} already exists. Overwrite? (y/N): `), (answer) => {
      rl.close();
      resolve(['y', 'yes'].includes(answer.toLowerCase().trim()));
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
    // Download package from GitHub
    const sourcePath = await downloadFromGitHub();
    
    if (!fs.existsSync(sourcePath)) {
      throw new Error(`Package directory not found: ${sourcePath}`);
    }
    
    // Remove existing if overwriting
    if (shouldOverwrite && fs.existsSync(targetDir)) {
      console.log(chalk.yellow('Removing existing directory...'));
      await fs.remove(targetDir);
    }
    
    // Copy files
    console.log(chalk.blue('Copying files...'));
    const excludes = ['node_modules', '.git', 'package-lock.json', 'pnpm-lock.yaml', 'yarn.lock', 'package.json'];
    await copyDirectory(sourcePath, targetDir, excludes);
    console.log(chalk.green('✓ Files copied'));
    
    // Install dependencies
    if (!options.skipInstall) {
      const projectRoot = process.cwd();
      const { missing, allPresent } = checkDependencies(path.join(projectRoot, 'package.json'));
      
      if (allPresent) {
        console.log(chalk.green('✓ All dependencies installed'));
      } else {
        const pm = options.packageManager || detectPackageManager();
        await installDependencies(missing, pm, projectRoot);
      }
    }
    
    console.log(chalk.green('\n✓ zero-to-app installed successfully!'));
    console.log(chalk.blue('\nNext steps:'));
    console.log(chalk.gray('  import { Button, Card } from "./zero-to-app"'));
    
  } catch (error) {
    console.error(chalk.red(`\n✗ Installation failed: ${error.message}`));
    process.exit(1);
  }
};

// Detect package manager
const detectPackageManager = () => {
  const cwd = process.cwd();
  if (fs.existsSync(path.join(cwd, 'yarn.lock'))) return 'yarn';
  if (fs.existsSync(path.join(cwd, 'pnpm-lock.yaml'))) return 'pnpm';
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

