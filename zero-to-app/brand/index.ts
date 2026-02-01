// Export brand from local files
export { createBrand, type Brand, type BrandConfig } from './brand-config';
export * from './brand-types';
export { useBrand, BrandProvider } from './brand-context';
export { defaultBrand } from './default-brand';

// Material Color Utilities
export {
  generateLightColors,
  generateDarkColors,
  hasContrastRatio,
  generateHighContrastColors,
  type PaletteOptions,
} from './palette-generator';

