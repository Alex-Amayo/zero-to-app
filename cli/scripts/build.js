#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');

/**
 * Build script to bundle package files into the CLI package
 * This allows the CLI to work when published to npm without requiring
 * GitHub access or a monorepo structure.
 * 
 * The bundled files are used as the primary source, with GitHub download
 * as a fallback if bundled files are not available.
 */

const cliRoot = path.resolve(__dirname, '..');
const packageSource = path.resolve(cliRoot, '../../package');
const packageDest = path.join(cliRoot, 'package-files');

async function build() {
  console.log('Building CLI package...');
  console.log(`Source: ${packageSource}`);
  console.log(`Destination: ${packageDest}`);
  
  if (!fs.existsSync(packageSource)) {
    throw new Error(`Package source not found: ${packageSource}`);
  }
  
  // Remove existing bundled files
  if (fs.existsSync(packageDest)) {
    await fs.remove(packageDest);
  }
  
  // Copy package files, excluding node_modules and build artifacts
  const excludes = [
    'node_modules',
    '.git',
    'package-lock.json',
    'pnpm-lock.yaml',
    'yarn.lock',
    '*.test.tsx',
    '*.test.ts',
  ];
  
  console.log('Copying package files...');
  await copyDirectory(packageSource, packageDest, excludes);
  
  console.log('✓ Build complete!');
}

async function copyDirectory(src, dest, excludes = []) {
  await fs.ensureDir(dest);
  
  const items = await fs.readdir(src);
  
  for (const item of items) {
    // Skip excluded items
    if (excludes.some(exclude => {
      if (exclude.includes('*')) {
        const pattern = exclude.replace('*', '');
        return item.endsWith(pattern);
      }
      return item === exclude;
    })) {
      continue;
    }
    
    const srcPath = path.join(src, item);
    const destPath = path.join(dest, item);
    
    const stat = await fs.stat(srcPath);
    
    if (stat.isDirectory()) {
      await copyDirectory(srcPath, destPath, excludes);
    } else {
      await fs.copy(srcPath, destPath);
    }
  }
}

build().catch(error => {
  console.error('Build failed:', error);
  process.exit(1);
});

