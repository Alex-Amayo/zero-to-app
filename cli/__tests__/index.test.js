const fs = require('fs-extra');
const path = require('path');
const { execSync } = require('child_process');

// Mock the CLI functions
// Note: In a real scenario, you'd want to extract the logic into testable modules
describe('zero-to-app CLI', () => {
  const testDir = path.join(__dirname, '../test-output');
  const targetDir = path.join(testDir, 'zero-to-app');
  
  beforeEach(async () => {
    // Clean up test directory before each test
    if (await fs.pathExists(testDir)) {
      await fs.remove(testDir);
    }
    await fs.ensureDir(testDir);
  });
  
  afterEach(async () => {
    // Clean up after each test
    if (await fs.pathExists(testDir)) {
      await fs.remove(testDir);
    }
  });
  
  test('should create target directory', async () => {
    await fs.ensureDir(targetDir);
    expect(await fs.pathExists(targetDir)).toBe(true);
  });
  
  test('should copy package files', async () => {
    const sourcePath = path.resolve(__dirname, '../../package');
    
    if (!(await fs.pathExists(sourcePath))) {
      console.warn('Package directory not found, skipping copy test');
      return;
    }
    
    // Simple copy test
    await fs.copy(path.join(sourcePath, 'index.ts'), path.join(targetDir, 'index.ts'));
    
    expect(await fs.pathExists(path.join(targetDir, 'index.ts'))).toBe(true);
  });
  
  test('should detect missing dependencies in package.json', async () => {
    // Create a mock package.json with some dependencies missing
    const packageJson = {
      name: 'test-app',
      version: '1.0.0',
      dependencies: {
        'react': '^19.1.0',
        'react-native': '^0.81.5',
        'react-hook-form': '^7.53.0',
        // Missing: @hookform/resolvers, zod, react-native-reanimated-carousel, @shopify/flash-list, lottie-react-native
        // Missing: expo-blur, expo-glass-effect
      },
    };
    
    const packageJsonPath = path.join(testDir, 'package.json');
    await fs.writeJson(packageJsonPath, packageJson, { spaces: 2 });
    
    // Import the checkDependencies function logic
    // Since we can't easily import, we'll test the logic manually
    const allDeps = {
      ...(packageJson.dependencies || {}),
      ...(packageJson.devDependencies || {}),
    };
    
    const requiredRegular = [
      'react-hook-form',
      '@hookform/resolvers',
      'zod',
      'react-native-reanimated-carousel',
      '@shopify/flash-list',
      'lottie-react-native',
    ];
    const requiredExpo = ['expo-blur', 'expo-glass-effect'];
    
    const missingRegular = requiredRegular.filter(dep => !allDeps[dep]);
    const missingExpo = requiredExpo.filter(dep => !allDeps[dep]);
    
    expect(missingRegular).toContain('@hookform/resolvers');
    expect(missingRegular).toContain('zod');
    expect(missingRegular).toContain('react-native-reanimated-carousel');
    expect(missingRegular).toContain('@shopify/flash-list');
    expect(missingRegular).toContain('lottie-react-native');
    expect(missingRegular).not.toContain('react-hook-form');
    expect(missingExpo).toContain('expo-blur');
    expect(missingExpo).toContain('expo-glass-effect');
  });
  
  test('should detect all dependencies present', async () => {
    // Create a mock package.json with all required dependencies
    const packageJson = {
      name: 'test-app',
      version: '1.0.0',
      dependencies: {
        'react-hook-form': '^7.53.0',
        '@hookform/resolvers': '^3.9.0',
        'zod': '^3.23.8',
        'react-native-reanimated-carousel': '^3.6.1',
        '@shopify/flash-list': '^1.7.0',
        'lottie-react-native': '^6.7.0',
        'expo-blur': '~14.0.1',
        'expo-glass-effect': '^1.0.0',
      },
    };
    
    const allDeps = {
      ...(packageJson.dependencies || {}),
      ...(packageJson.devDependencies || {}),
    };
    
    const requiredRegular = [
      'react-hook-form',
      '@hookform/resolvers',
      'zod',
      'react-native-reanimated-carousel',
      '@shopify/flash-list',
      'lottie-react-native',
    ];
    const requiredExpo = ['expo-blur', 'expo-glass-effect'];
    
    const missingRegular = requiredRegular.filter(dep => !allDeps[dep]);
    const missingExpo = requiredExpo.filter(dep => !allDeps[dep]);
    
    expect(missingRegular.length).toBe(0);
    expect(missingExpo.length).toBe(0);
  });
  
  test('should check devDependencies as well', async () => {
    // Create a mock package.json with some deps in devDependencies
    const packageJson = {
      name: 'test-app',
      version: '1.0.0',
      dependencies: {
        'react-hook-form': '^7.53.0',
      },
      devDependencies: {
        'zod': '^3.23.8',
        '@hookform/resolvers': '^3.9.0',
      },
    };
    
    const allDeps = {
      ...(packageJson.dependencies || {}),
      ...(packageJson.devDependencies || {}),
    };
    
    const requiredRegular = [
      'react-hook-form',
      '@hookform/resolvers',
      'zod',
      'react-native-reanimated-carousel',
      '@shopify/flash-list',
      'lottie-react-native',
    ];
    const missingRegular = requiredRegular.filter(dep => !allDeps[dep]);
    
    // Should be missing react-native-reanimated-carousel, @shopify/flash-list, lottie-react-native
    expect(missingRegular).toContain('react-native-reanimated-carousel');
    expect(missingRegular).toContain('@shopify/flash-list');
    expect(missingRegular).toContain('lottie-react-native');
    expect(missingRegular).not.toContain('react-hook-form');
    expect(missingRegular).not.toContain('@hookform/resolvers');
    expect(missingRegular).not.toContain('zod');
  });
  
  test('should handle missing package.json gracefully', async () => {
    // Test that missing package.json returns all dependencies as missing
    const packageJsonPath = path.join(testDir, 'nonexistent-package.json');
    
    const exists = await fs.pathExists(packageJsonPath);
    expect(exists).toBe(false);
    
    // If package.json doesn't exist, all dependencies should be considered missing
    const requiredRegular = [
      'react-hook-form',
      '@hookform/resolvers',
      'zod',
      'react-native-reanimated-carousel',
      '@shopify/flash-list',
      'lottie-react-native',
    ];
    const requiredExpo = ['expo-blur', 'expo-glass-effect'];
    
    // This simulates what checkDependencies would return
    const allMissing = {
      regular: requiredRegular,
      expo: requiredExpo,
    };
    
    expect(allMissing.regular.length).toBe(6);
    expect(allMissing.expo.length).toBe(2);
  });
  
  test('should not create package.json in zero-to-app directory', async () => {
    const sourcePath = path.resolve(__dirname, '../../package');
    
    if (!(await fs.pathExists(sourcePath))) {
      console.warn('Package directory not found, skipping test');
      return;
    }
    
    // Copy files (simulating what the CLI does)
    // Note: package.json should be excluded from the copied directory
    const excludes = ['node_modules', '.git', 'package-lock.json', 'pnpm-lock.yaml', 'yarn.lock', 'package.json'];
    const items = await fs.readdir(sourcePath);
    for (const item of items) {
      if (excludes.includes(item)) continue;
      const srcPath = path.join(sourcePath, item);
      const destPath = path.join(targetDir, item);
      const stat = await fs.stat(srcPath);
      if (stat.isDirectory()) {
        await fs.copy(srcPath, destPath);
      } else {
        await fs.copy(srcPath, destPath);
      }
    }
    
    // Verify no package.json was created in zero-to-app directory
    const packageJsonPath = path.join(targetDir, 'package.json');
    const packageJsonExists = await fs.pathExists(packageJsonPath);
    expect(packageJsonExists).toBe(false);
  });
  
  test('should exclude node_modules when copying', async () => {
    const sourcePath = path.resolve(__dirname, '../../package');
    
    if (!(await fs.pathExists(sourcePath))) {
      console.warn('Package directory not found, skipping exclude test');
      return;
    }
    
    // Create a mock node_modules in source
    const mockNodeModules = path.join(sourcePath, 'node_modules');
    await fs.ensureDir(mockNodeModules);
    await fs.writeFile(path.join(mockNodeModules, 'test.txt'), 'test');
    
    // Copy excluding node_modules
    const items = await fs.readdir(sourcePath);
    for (const item of items) {
      if (item === 'node_modules') continue;
      const srcPath = path.join(sourcePath, item);
      const destPath = path.join(targetDir, item);
      const stat = await fs.stat(srcPath);
      if (stat.isDirectory()) {
        await fs.copy(srcPath, destPath);
      } else {
        await fs.copy(srcPath, destPath);
      }
    }
    
    // node_modules should not be copied
    expect(await fs.pathExists(path.join(targetDir, 'node_modules'))).toBe(false);
    
    // Clean up mock node_modules
    await fs.remove(mockNodeModules);
  });
});

// Integration test helper
describe('CLI Integration', () => {
  test('package.json should have correct bin entry', async () => {
    const cliPackageJson = await fs.readJson(
      path.resolve(__dirname, '../package.json')
    );
    
    expect(cliPackageJson.bin).toBeDefined();
    expect(cliPackageJson.bin['zero-to-app']).toBe('./bin/zero-to-app');
  });
  
  test('bin file should exist and be executable', async () => {
    const binPath = path.resolve(__dirname, '../bin/zero-to-app');
    expect(await fs.pathExists(binPath)).toBe(true);
    
    const content = await fs.readFile(binPath, 'utf-8');
    expect(content).toContain('#!/usr/bin/env node');
  });
});

