import * as fs from 'fs';
import * as path from 'path';
import {
  loadRegistry,
  resolveDependencies,
  getAvailableComponents,
  type ComponentRegistry,
} from '../utils';

/**
 * Registry Validation Tests
 * 
 * These tests ensure the registry.json structure is valid.
 * This prevents regressions when components are added or modified.
 */
describe('Registry Validation', () => {
  let registry: ComponentRegistry;

  beforeAll(async () => {
    // Load actual registry (will be mocked in most tests, but can test real one)
    try {
      registry = await loadRegistry();
    } catch (error) {
      // If GitHub fetch fails, use local registry
      const registryPath = path.join(__dirname, '../registry.json');
      const registryContent = fs.readFileSync(registryPath, 'utf-8');
      registry = JSON.parse(registryContent);
    }
  });

  describe('Registry Structure', () => {
    it('should have valid JSON structure', () => {
      expect(registry).toBeDefined();
      expect(registry.components).toBeDefined();
      expect(typeof registry.components).toBe('object');
    });

    it('should have at least one component', () => {
      const components = Object.keys(registry.components);
      expect(components.length).toBeGreaterThan(0);
    });

    it('should have valid component structure', () => {
      for (const [name, component] of Object.entries(registry.components)) {
        expect(component).toBeDefined();
        expect(Array.isArray(component.files)).toBe(true);
        expect(Array.isArray(component.dependencies)).toBe(true);
        expect(component.files.length).toBeGreaterThan(0);
      }
    });

    it('should have unique component names', () => {
      const names = Object.keys(registry.components);
      const uniqueNames = new Set(names);
      expect(names.length).toBe(uniqueNames.size);
    });
  });

  describe('File References', () => {
    it('should have valid file paths (no duplicates)', () => {
      const allFiles = new Set<string>();
      const duplicates: string[] = [];

      for (const [name, component] of Object.entries(registry.components)) {
        for (const file of component.files) {
          if (allFiles.has(file)) {
            duplicates.push(`${name}: ${file}`);
          }
          allFiles.add(file);
        }
      }

      expect(duplicates).toEqual([]);
    });

    it('should have consistent file structure patterns', () => {
      const invalidFiles: string[] = [];

      for (const [name, component] of Object.entries(registry.components)) {
        for (const file of component.files) {
          // Files should not have leading slashes
          if (file.startsWith('/')) {
            invalidFiles.push(`${name}: ${file} (leading slash)`);
          }
          // Files should use forward slashes (Unix-style)
          if (file.includes('\\')) {
            invalidFiles.push(`${name}: ${file} (backslash)`);
          }
          // Files should have valid extensions
          if (!/\.(ts|tsx|js|jsx|json)$/.test(file)) {
            invalidFiles.push(`${name}: ${file} (invalid extension)`);
          }
        }
      }

      expect(invalidFiles).toEqual([]);
    });
  });

  describe('Dependency Validation', () => {
    it('should only reference existing components in dependencies', () => {
      const allComponentNames = new Set(Object.keys(registry.components));
      const invalidDeps: string[] = [];

      for (const [name, component] of Object.entries(registry.components)) {
        for (const dep of component.dependencies) {
          if (!allComponentNames.has(dep)) {
            invalidDeps.push(`${name} depends on non-existent component: ${dep}`);
          }
        }
      }

      expect(invalidDeps).toEqual([]);
    });

    it('should not have self-references in dependencies', () => {
      const selfRefs: string[] = [];

      for (const [name, component] of Object.entries(registry.components)) {
        if (component.dependencies.includes(name)) {
          selfRefs.push(name);
        }
      }

      expect(selfRefs).toEqual([]);
    });

    it('should be able to resolve all dependency chains', () => {
      const errors: string[] = [];

      for (const componentName of Object.keys(registry.components)) {
        try {
          const deps = resolveDependencies(componentName, registry);
          expect(deps.length).toBeGreaterThan(0);
          expect(deps).toContain(componentName);
        } catch (error: any) {
          errors.push(`${componentName}: ${error.message}`);
        }
      }

      expect(errors).toEqual([]);
    });

    it('should have consistent dependency ordering', () => {
      // Test that dependencies are resolved in a consistent order
      // (dependencies before dependents)
      for (const componentName of Object.keys(registry.components)) {
        const deps = resolveDependencies(componentName, registry);
        const component = registry.components[componentName];

        // Check that all dependencies appear before the component itself
        for (const dep of component.dependencies) {
          const depIndex = deps.indexOf(dep);
          const componentIndex = deps.indexOf(componentName);
          expect(depIndex).toBeLessThan(componentIndex);
        }
      }
    });
  });

  describe('Component Completeness', () => {
    it('should have all core components (theme, brand) as base dependencies', () => {
      // Most components should depend on theme and/or brand
      const components = Object.keys(registry.components);
      const hasTheme = components.includes('theme');
      const hasBrand = components.includes('brand');

      expect(hasTheme).toBe(true);
      expect(hasBrand).toBe(true);
    });

    it('should have theme and brand as root components (no dependencies)', () => {
      const theme = registry.components['theme'];
      const brand = registry.components['brand'];

      expect(theme).toBeDefined();
      expect(brand).toBeDefined();
      expect(theme.dependencies).toEqual([]);
      expect(brand.dependencies).toEqual([]);
    });
  });

  describe('Regression Tests', () => {
    it('should maintain backward compatibility - core components still available', () => {
      const components = getAvailableComponents(registry);
      
      // Core components that should always exist
      const coreComponents = ['theme', 'brand', 'button', 'text'];
      for (const core of coreComponents) {
        expect(components).toContain(core);
      }
    });
  });
});

