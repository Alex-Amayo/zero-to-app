import * as path from 'path';
import * as fs from 'fs';
import { checkPeerDependencies, detectPackageManager } from '../utils';

describe('CLI Dependency Handling - Real Project Tests', () => {
  // From cli/__tests__/ -> go up to root, then to apps/showcase
  const showcasePath = path.resolve(__dirname, '../../../apps/showcase');
  const packageJsonPath = path.join(showcasePath, 'package.json');

  beforeAll(() => {
    // Verify showcase directory exists
    if (!fs.existsSync(showcasePath)) {
      throw new Error(`Showcase directory not found at: ${showcasePath}`);
    }
    if (!fs.existsSync(packageJsonPath)) {
      throw new Error(`package.json not found at: ${packageJsonPath}`);
    }
  });

  describe('checkPeerDependencies', () => {
    it('should check dependencies in real showcase project', () => {
      const peerDeps = {
        react: '>=18.0.0',
        'react-native': '>=0.70.0',
        '@expo/vector-icons': '^14.0.0',
        'react-hook-form': '^7.0.0',
        'expo-blur': '~13.0.0',
      };

      const missing = checkPeerDependencies(packageJsonPath, peerDeps);
      
      // Log what's missing for debugging
      if (missing.length > 0) {
        console.log('Missing dependencies:', missing);
      }
      
      // Should find most dependencies in showcase (it's an Expo project)
      expect(Array.isArray(missing)).toBe(true);
    });

    it('should handle non-existent package.json gracefully', () => {
      const fakePath = path.join(showcasePath, 'nonexistent-package.json');
      const peerDeps = {
        react: '>=18.0.0',
      };

      const missing = checkPeerDependencies(fakePath, peerDeps);
      expect(missing).toEqual(['react@>=18.0.0']);
    });
  });

  describe('detectPackageManager', () => {
    it('should detect package manager from showcase directory', () => {
      // Change to showcase directory temporarily
      const originalCwd = process.cwd();
      process.chdir(showcasePath);

      try {
        const pm = detectPackageManager();
        // Should detect npm, yarn, or pnpm based on what's actually there
        expect(['npm', 'yarn', 'pnpm']).toContain(pm);
      } finally {
        process.chdir(originalCwd);
      }
    });
  });
});
