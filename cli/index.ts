#!/usr/bin/env node

import * as path from 'path';
import {
  loadRegistry,
  installComponent,
  checkPeerDependencies,
  detectPackageManager,
  getAvailableComponents,
} from './utils';

const PEER_DEPENDENCIES = {
  react: '>=18.0.0',
  'react-native': '>=0.70.0',
  '@expo/vector-icons': '^14.0.0',
  'react-hook-form': '^7.0.0',
  'expo-blur': '~13.0.0',
};

async function main() {
  const args = process.argv.slice(2);
  const command = args[0];

  if (command !== 'install') {
    console.log(`
Usage: zero-to-app install [component]

Commands:
  install [component]  Install a component and its dependencies

Examples:
  zero-to-app install button
  zero-to-app install theme
  zero-to-app install
`);
    process.exit(0);
  }

  const componentName = args[1];
  const targetDir = path.join(process.cwd(), 'components', 'zero-to-app');

  try {
    // Load registry from GitHub
    console.log('Fetching component registry...\n');
    const registry = await loadRegistry();

    // If no component specified, show available components
    if (!componentName) {
      const components = getAvailableComponents(registry);
      console.log('\nAvailable components:\n');
      components.forEach((comp) => {
        const deps = registry.components[comp].dependencies;
        const depsStr = deps.length > 0 ? ` (depends on: ${deps.join(', ')})` : '';
        console.log(`  - ${comp}${depsStr}`);
      });
      console.log('\nUsage: zero-to-app install <component>\n');
      process.exit(0);
    }

    // Check if component exists
    if (!registry.components[componentName]) {
      console.error(`\nError: Component "${componentName}" not found.`);
      const components = getAvailableComponents(registry);
      console.log('\nAvailable components:');
      components.forEach((comp) => console.log(`  - ${comp}`));
      process.exit(1);
    }

    // Check peer dependencies
    const packageJsonPath = path.join(process.cwd(), 'package.json');
    const missingDeps = checkPeerDependencies(packageJsonPath, PEER_DEPENDENCIES);

    if (missingDeps.length > 0) {
      const pkgManager = detectPackageManager();
      console.warn(`\n⚠ Warning: Missing peer dependencies:`);
      missingDeps.forEach((dep) => console.warn(`  - ${dep}`));
      console.warn(
        `\nInstall them with: ${pkgManager} install ${missingDeps.join(' ')}\n`
      );
    }

    // Install component
    console.log(`\nInstalling ${componentName}...\n`);
    await installComponent(componentName, registry, targetDir);

    console.log(`\n✓ Successfully installed ${componentName}!`);
    console.log(`\nComponents are available at: ${targetDir}\n`);
  } catch (error: any) {
    console.error(`\nError: ${error.message}\n`);
    if (error.message.includes('Network error') || error.message.includes('fetch')) {
      console.error('Make sure you have an internet connection and can access GitHub.\n');
    }
    process.exit(1);
  }
}

main();

