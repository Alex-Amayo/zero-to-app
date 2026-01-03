import * as path from 'path';
import {
  resolveDependencies,
  getAvailableComponents,
  type ComponentRegistry,
} from '../utils';

describe('CLI Utils - Core Functions', () => {
  describe('resolveDependencies', () => {
    const mockRegistry: ComponentRegistry = {
      components: {
        button: {
          files: ['ui/button/Button.tsx'],
          dependencies: ['text', 'brand', 'theme'],
        },
        text: {
          files: ['ui/text/StyledText.tsx'],
          dependencies: ['brand', 'theme'],
        },
        card: {
          files: ['ui/container/Card.tsx'],
          dependencies: ['theme'],
        },
        theme: {
          files: ['theme/theme.tsx'],
          dependencies: [],
        },
        brand: {
          files: ['brand/brandConfig.ts'],
          dependencies: [],
        },
      },
    };

    it('should resolve dependencies in correct order', () => {
      const deps = resolveDependencies('button', mockRegistry);
      // Should install dependencies first, then the component
      // Order: theme, brand (no deps), then text (needs theme, brand), then button
      expect(deps).toContain('theme');
      expect(deps).toContain('brand');
      expect(deps).toContain('text');
      expect(deps).toContain('button');
      expect(deps[deps.length - 1]).toBe('button'); // Button should be last
    });

    it('should handle components with no dependencies', () => {
      const deps = resolveDependencies('theme', mockRegistry);
      expect(deps).toEqual(['theme']);
    });

    it('should handle nested dependencies', () => {
      const deps = resolveDependencies('card', mockRegistry);
      expect(deps).toContain('theme');
      expect(deps).toContain('card');
      expect(deps[deps.length - 1]).toBe('card');
    });

    it('should not duplicate dependencies', () => {
      const deps = resolveDependencies('text', mockRegistry);
      // text depends on brand and theme, should only appear once each
      const themeCount = deps.filter((d) => d === 'theme').length;
      const brandCount = deps.filter((d) => d === 'brand').length;
      expect(themeCount).toBe(1);
      expect(brandCount).toBe(1);
    });

    it('should throw error for non-existent component', () => {
      expect(() => {
        resolveDependencies('nonexistent', mockRegistry);
      }).toThrow('Component "nonexistent" not found in registry.');
    });

    it('should handle circular dependencies gracefully', () => {
      const circularRegistry: ComponentRegistry = {
        components: {
          a: {
            files: ['a.tsx'],
            dependencies: ['b'],
          },
          b: {
            files: ['b.tsx'],
            dependencies: ['a'],
          },
        },
      };

      // Should not infinite loop - resolved set prevents this
      const deps = resolveDependencies('a', circularRegistry);
      expect(deps).toContain('a');
      expect(deps).toContain('b');
      // Should have both, but order may vary
      expect(deps.length).toBeGreaterThanOrEqual(2);
    });
  });

  describe('getAvailableComponents', () => {
    it('should return sorted list of component names', () => {
      const mockRegistry: ComponentRegistry = {
        components: {
          zeta: { files: [], dependencies: [] },
          alpha: { files: [], dependencies: [] },
          beta: { files: [], dependencies: [] },
        },
      };

      const components = getAvailableComponents(mockRegistry);
      expect(components).toEqual(['alpha', 'beta', 'zeta']);
    });

    it('should return empty array for empty registry', () => {
      const mockRegistry: ComponentRegistry = {
        components: {},
      };

      const components = getAvailableComponents(mockRegistry);
      expect(components).toEqual([]);
    });
  });
});
