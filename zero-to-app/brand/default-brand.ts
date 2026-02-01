import { createBrand } from './brand-config';

/**
 * Default brand configuration using Material Design 3 reference colors.
 * Uses seed-based palette generation for automatic light/dark theme creation.
 *
 * Seed color: #6750A4 (Material Design 3 reference purple)
 * This generates a complete, accessible color palette following M3 guidelines.
 *
 * Reference: https://m3.material.io/styles/color/the-color-system/color-roles
 */
export const defaultBrand = createBrand({
  name: 'Zero to App',
  // Use seed-based palette generation (recommended)
  // This automatically generates all 26 M3 color tokens and matching dark theme
  colors: {
    colorSeed: {
      primary: '#6750A4', // Material purple reference
    },
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

/**
 * Example: Manual color specification (legacy approach)
 * Use this if you need full control over every color token
 */
export const manualBrandExample = createBrand({
  name: 'Manual Colors Example',
  colors: {
    // Primary colors - Material Design 3 purple reference
    primary: '#6750A4',
    onPrimary: '#FFFFFF',
    primaryContainer: '#EADDFF',
    onPrimaryContainer: '#21005E',

    // Secondary colors - Material Design 3 purple
    secondary: '#FF66C4',
    onSecondary: '#FFFFFF',
    secondaryContainer: '#E8DEF8',
    onSecondaryContainer: '#1D192B',

    // Tertiary colors - Material Design 3 teal
    tertiary: '#7D5260',
    onTertiary: '#FFFFFF',
    tertiaryContainer: '#FFD8E4',
    onTertiaryContainer: '#31111D',

    // Error colors
    error: '#B3261E',
    onError: '#FFFFFF',
    errorContainer: '#F9DEDC',
    onErrorContainer: '#410E0B',

    // Surface colors
    surface: '#FFFBFE',
    onSurface: '#1C1B1F',
    onSurfaceVariant: '#49454E',
    surfaceContainerLowest: '#FFFFFF',
    surfaceContainerLow: '#F7F2FA',
    surfaceContainer: '#F3EEF5',
    surfaceContainerHigh: '#ECE6F0',
    surfaceContainerHighest: '#E6E1E5',

    // Outline colors
    outline: '#79747E',
    outlineVariant: '#CAC7D0',

    // Inverse colors
    inverseSurface: '#313033',
    inverseOnSurface: '#F5EFF7',
    inversePrimary: '#D0BCFF',

    // Semantic tokens
    scrim: '#000000',
    shadow: '#000000',
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
