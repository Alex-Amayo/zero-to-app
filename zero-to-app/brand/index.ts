// Export brand from local files
export { createBrand, type Brand, type BrandConfig } from './brandConfig';
export * from './brandTypes';
export { useBrand, BrandProvider } from './brandContext';
export { defaultBrand } from './defaultBrand';

// Material Color Utilities
export {
  generateLightColors,
  generateDarkColors,
  hasContrastRatio,
  generateHighContrastColors,
  type PaletteOptions,
} from './paletteGenerator';

