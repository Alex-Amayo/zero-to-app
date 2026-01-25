import { createBrand } from './brandConfig';

/**
 * Default brand configuration for zero-to-app.
 * This can be used as-is for demos, storybook, or as a starting point for custom brands.
 */
export const defaultBrand = createBrand({
  name: 'Zero to App',
  colors: {
    primary: '#2563EB',
    secondary: '#6B7280',
    backgroundColor: '#fff',
    buttonText: '#FFFFFF',
  },
  logo: {
    light: '../assets/images/logo.png',
    dark: '../assets/images/logo.png',
  },
  fontSizes: {
    small: 14,
    medium: 16,
    large: 20,
    xlarge: 25,
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 24,
    xxxl: 40,
  },
  borderRadius: 8,
});
