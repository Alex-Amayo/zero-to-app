import * as fs from 'fs';
import * as path from 'path';
import {
  updateDependencies,
  type ComponentRegistry,
} from '../utils';

// Mock fs module
jest.mock('fs');
jest.mock('../config', () => ({
  getGitHubRawUrl: jest.fn((filePath: string) => 
    `https://raw.githubusercontent.com/test/test/main/${filePath}`
  ),
}));

// Mock fetch for GitHub requests
global.fetch = jest.fn();

describe('updateDependencies', () => {
  const mockRegistry: ComponentRegistry = {
    components: {
      button: {
        files: [
          'ui/button/Button.tsx',
          'ui/button/IconButton.tsx',
        ],
        dependencies: ['text', 'brand', 'theme'],
      },
      text: {
        files: [
          'ui/text/StyledText.tsx',
        ],
        dependencies: ['brand', 'theme'],
      },
      form: {
        files: [
          'ui/form/FormInput.tsx',
          'components/form/EmailSubscriptionForm.tsx',
        ],
        dependencies: ['input', 'brand', 'theme'],
      },
      theme: {
        files: [
          'theme/theme.tsx',
        ],
        dependencies: [],
      },
      brand: {
        files: [
          'brand/brandConfig.ts',
        ],
        dependencies: [],
      },
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('with local files', () => {
    it('should extract dependencies from local component files', () => {
      const baseDir = '/test/components';
      const mockFiles: Record<string, string> = {
        'ui/button/Button.tsx': `
          import React from 'react';
          import { View } from 'react-native';
          import * as Icons from '@expo/vector-icons';
          import { useBrand } from '../../brand';
        `,
        'ui/button/IconButton.tsx': `
          import React from 'react';
          import { Pressable } from 'react-native';
          import Feather from '@expo/vector-icons/Feather';
        `,
        'ui/text/StyledText.tsx': `
          import React from 'react';
          import { Text } from 'react-native';
        `,
        'ui/form/FormInput.tsx': `
          import React from 'react';
          import { Controller } from 'react-hook-form';
        `,
        'components/form/EmailSubscriptionForm.tsx': `
          import React from 'react';
          import { useForm } from 'react-hook-form';
          import { z } from 'zod';
          import { zodResolver } from '@hookform/resolvers/zod';
        `,
        'theme/theme.tsx': `
          import React from 'react';
        `,
        'brand/brandConfig.ts': `
          // No external imports
        `,
      };

      // Mock fs.existsSync and fs.readFileSync
      (fs.existsSync as jest.Mock).mockImplementation((filePath: string) => {
        const relativePath = path.relative(baseDir, filePath);
        return relativePath in mockFiles;
      });

      (fs.readFileSync as jest.Mock).mockImplementation((filePath: string) => {
        const relativePath = path.relative(baseDir, filePath);
        return mockFiles[relativePath] || '';
      });

      return updateDependencies(mockRegistry, baseDir).then((deps) => {
        expect(deps).toHaveProperty('react');
        expect(deps).toHaveProperty('react-native');
        expect(deps).toHaveProperty('@expo/vector-icons');
        expect(deps).toHaveProperty('react-hook-form');
        expect(deps).toHaveProperty('zod');
        expect(deps).toHaveProperty('@hookform/resolvers');
        
        expect(deps.react).toBe('>=18.0.0');
        expect(deps['react-native']).toBe('>=0.70.0');
        expect(deps['@expo/vector-icons']).toBe('^14.0.0');
        expect(deps['react-hook-form']).toBe('^7.0.0');
      });
    });

    it('should handle expo-router and expo-blur dependencies', () => {
      const baseDir = '/test/components';
      const mockFiles: Record<string, string> = {
        'ui/button/BlurButton.tsx': `
          import React from 'react';
          import { BlurView } from 'expo-blur';
        `,
        'components/navigation/Appbar/Logo.tsx': `
          import React from 'react';
          import { Link } from 'expo-router';
        `,
      };

      (fs.existsSync as jest.Mock).mockImplementation((filePath: string) => {
        const relativePath = path.relative(baseDir, filePath);
        return relativePath in mockFiles;
      });

      (fs.readFileSync as jest.Mock).mockImplementation((filePath: string) => {
        const relativePath = path.relative(baseDir, filePath);
        return mockFiles[relativePath] || '';
      });

      const registry: ComponentRegistry = {
        components: {
          blurButton: {
            files: ['ui/button/BlurButton.tsx'],
            dependencies: [],
          },
          logo: {
            files: ['components/navigation/Appbar/Logo.tsx'],
            dependencies: [],
          },
        },
      };

      return updateDependencies(registry, baseDir).then((deps) => {
        expect(deps).toHaveProperty('expo-blur');
        expect(deps).toHaveProperty('expo-router');
        expect(deps['expo-blur']).toBe('~13.0.0');
        expect(deps['expo-router']).toBe('*');
      });
    });

    it('should handle react-native-reanimated dependencies', () => {
      const baseDir = '/test/components';
      const mockFiles: Record<string, string> = {
        'context/scroll-context.tsx': `
          import React from 'react';
          import { useSharedValue } from 'react-native-reanimated';
        `,
        'components/media/Carousel.tsx': `
          import React from 'react';
          import ReanimatedCarousel from 'react-native-reanimated-carousel';
        `,
      };

      (fs.existsSync as jest.Mock).mockImplementation((filePath: string) => {
        const relativePath = path.relative(baseDir, filePath);
        return relativePath in mockFiles;
      });

      (fs.readFileSync as jest.Mock).mockImplementation((filePath: string) => {
        const relativePath = path.relative(baseDir, filePath);
        return mockFiles[relativePath] || '';
      });

      const registry: ComponentRegistry = {
        components: {
          carousel: {
            files: ['components/media/Carousel.tsx'],
            dependencies: [],
          },
          scrollContext: {
            files: ['context/scroll-context.tsx'],
            dependencies: [],
          },
        },
      };

      return updateDependencies(registry, baseDir).then((deps) => {
        expect(deps).toHaveProperty('react-native-reanimated');
        expect(deps).toHaveProperty('react-native-reanimated-carousel');
        expect(deps['react-native-reanimated']).toBe('*');
        expect(deps['react-native-reanimated-carousel']).toBe('*');
      });
    });

    it('should skip relative imports', () => {
      const baseDir = '/test/components';
      const mockFiles: Record<string, string> = {
        'ui/button/Button.tsx': `
          import React from 'react';
          import { useBrand } from '../../brand';
          import { StyledText } from '../text/StyledText';
        `,
      };

      (fs.existsSync as jest.Mock).mockImplementation((filePath: string) => {
        const relativePath = path.relative(baseDir, filePath);
        return relativePath in mockFiles;
      });

      (fs.readFileSync as jest.Mock).mockImplementation((filePath: string) => {
        const relativePath = path.relative(baseDir, filePath);
        return mockFiles[relativePath] || '';
      });

      const registry: ComponentRegistry = {
        components: {
          button: {
            files: ['ui/button/Button.tsx'],
            dependencies: [],
          },
        },
      };

      return updateDependencies(registry, baseDir).then((deps) => {
        // Should only have react, not the relative imports
        expect(deps).toHaveProperty('react');
        expect(Object.keys(deps).length).toBeGreaterThanOrEqual(1);
      });
    });

    it('should always include react and react-native even if not found', () => {
      const baseDir = '/test/components';
      const mockFiles: Record<string, string> = {
        'theme/theme.tsx': `
          // No imports
        `,
      };

      (fs.existsSync as jest.Mock).mockImplementation((filePath: string) => {
        const relativePath = path.relative(baseDir, filePath);
        return relativePath in mockFiles;
      });

      (fs.readFileSync as jest.Mock).mockImplementation((filePath: string) => {
        const relativePath = path.relative(baseDir, filePath);
        return mockFiles[relativePath] || '';
      });

      const registry: ComponentRegistry = {
        components: {
          theme: {
            files: ['theme/theme.tsx'],
            dependencies: [],
          },
        },
      };

      return updateDependencies(registry, baseDir).then((deps) => {
        expect(deps).toHaveProperty('react');
        expect(deps).toHaveProperty('react-native');
        expect(deps.react).toBe('>=18.0.0');
        expect(deps['react-native']).toBe('>=0.70.0');
      });
    });
  });

  describe('with GitHub fetching', () => {
    it('should fetch files from GitHub and extract dependencies', async () => {
      const mockFileContent = `
        import React from 'react';
        import { View } from 'react-native';
        import * as Icons from '@expo/vector-icons';
        import { BlurView } from 'expo-blur';
      `;

      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        status: 200,
        statusText: 'OK',
        text: async () => mockFileContent,
      });

      const registry: ComponentRegistry = {
        components: {
          button: {
            files: ['ui/button/Button.tsx'],
            dependencies: [],
          },
        },
      };

      const deps = await updateDependencies(registry);
      expect(global.fetch).toHaveBeenCalled();
      expect(deps).toHaveProperty('react');
      expect(deps).toHaveProperty('react-native');
      expect(deps).toHaveProperty('@expo/vector-icons');
      expect(deps).toHaveProperty('expo-blur');
    });

    it('should handle fetch errors gracefully', async () => {
      (global.fetch as jest.Mock).mockRejectedValue(
        new Error('Network error')
      );

      const registry: ComponentRegistry = {
        components: {
          button: {
            files: ['ui/button/Button.tsx'],
            dependencies: [],
          },
        },
      };

      const deps = await updateDependencies(registry);
      // Should still return core dependencies
      expect(deps).toHaveProperty('react');
      expect(deps).toHaveProperty('react-native');
    });

    it('should handle 404 errors gracefully', async () => {
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: false,
        status: 404,
        statusText: 'Not Found',
      });

      const registry: ComponentRegistry = {
        components: {
          button: {
            files: ['ui/button/Button.tsx'],
            dependencies: [],
          },
        },
      };

      const deps = await updateDependencies(registry);
      // Should still return core dependencies
      expect(deps).toHaveProperty('react');
      expect(deps).toHaveProperty('react-native');
    });
  });

  describe('scoped packages', () => {
    it('should correctly extract scoped package names', () => {
      const baseDir = '/test/components';
      const mockFiles: Record<string, string> = {
        'ui/button/Button.tsx': `
          import Feather from '@expo/vector-icons/Feather';
          import MaterialIcons from '@expo/vector-icons/MaterialIcons';
          import { zodResolver } from '@hookform/resolvers/zod';
        `,
      };

      (fs.existsSync as jest.Mock).mockImplementation((filePath: string) => {
        const relativePath = path.relative(baseDir, filePath);
        return relativePath in mockFiles;
      });

      (fs.readFileSync as jest.Mock).mockImplementation((filePath: string) => {
        const relativePath = path.relative(baseDir, filePath);
        return mockFiles[relativePath] || '';
      });

      const registry: ComponentRegistry = {
        components: {
          button: {
            files: ['ui/button/Button.tsx'],
            dependencies: [],
          },
        },
      };

      return updateDependencies(registry, baseDir).then((deps) => {
        expect(deps).toHaveProperty('@expo/vector-icons');
        expect(deps).toHaveProperty('@hookform/resolvers');
        // Should not have '@expo' or '@hookform' as separate packages
        expect(deps).not.toHaveProperty('@expo');
        expect(deps).not.toHaveProperty('@hookform');
      });
    });
  });
});

