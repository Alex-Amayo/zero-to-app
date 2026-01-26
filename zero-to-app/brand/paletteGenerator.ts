/**
 * Material Design 3 Color Palette Generator
 * Uses @material/material-color-utilities to generate tonal palettes from seed colors
 * Reference: https://m3.material.io/styles/color/the-color-system/color-roles
 */

import {
  argbFromHex,
  hexFromArgb,
  TonalPalette,
  Hct,
} from '@material/material-color-utilities';
import type { Colors } from './brandTypes';

export interface PaletteOptions {
  /** Seed color for primary palette (hex format) */
  primary: string;
  /** Optional seed color for secondary palette (generated from primary if not provided) */
  secondary?: string;
  /** Optional seed color for tertiary palette (generated from primary if not provided) */
  tertiary?: string;
  /** Optional seed color for error palette (uses M3 default if not provided) */
  error?: string;
  /** Optional seed color for neutral palette (generated from primary if not provided) */
  neutral?: string;
  /** Optional seed color for neutral variant palette (generated from primary if not provided) */
  neutralVariant?: string;
}

/**
 * Generates a tonal palette from a seed color
 * @param seedColor Hex color string (e.g., '#6750A4')
 * @returns TonalPalette with tones 0-100
 */
function generateTonalPalette(seedColor: string): TonalPalette {
  const argb = argbFromHex(seedColor);
  const hct = Hct.fromInt(argb);
  return TonalPalette.fromHueAndChroma(hct.hue, hct.chroma);
}

/**
 * Generates secondary palette from primary
 * Uses same hue with reduced chroma for harmony
 */
function generateSecondaryPalette(primaryColor: string): TonalPalette {
  const argb = argbFromHex(primaryColor);
  const hct = Hct.fromInt(argb);
  // Secondary uses same hue but lower chroma (16 is M3 standard)
  return TonalPalette.fromHueAndChroma(hct.hue, Math.min(16, hct.chroma));
}

/**
 * Generates tertiary palette from primary
 * Uses complementary hue for contrast
 */
function generateTertiaryPalette(primaryColor: string): TonalPalette {
  const argb = argbFromHex(primaryColor);
  const hct = Hct.fromInt(argb);
  // Tertiary uses complementary hue (+60 degrees)
  const tertiaryHue = (hct.hue + 60) % 360;
  return TonalPalette.fromHueAndChroma(tertiaryHue, Math.max(24, hct.chroma));
}

/**
 * Generates neutral palette from primary
 * Uses very low chroma for subtle tinting
 */
function generateNeutralPalette(primaryColor: string): TonalPalette {
  const argb = argbFromHex(primaryColor);
  const hct = Hct.fromInt(argb);
  // Neutral uses same hue with very low chroma (4 is M3 standard)
  return TonalPalette.fromHueAndChroma(hct.hue, 4);
}

/**
 * Generates neutral variant palette from primary
 * Uses low chroma for subtle variation
 */
function generateNeutralVariantPalette(primaryColor: string): TonalPalette {
  const argb = argbFromHex(primaryColor);
  const hct = Hct.fromInt(argb);
  // Neutral variant uses same hue with low chroma (8 is M3 standard)
  return TonalPalette.fromHueAndChroma(hct.hue, 8);
}

/**
 * Generates M3 error palette
 * Uses standard red hue with appropriate chroma
 */
function generateErrorPalette(): TonalPalette {
  // M3 standard error color: red with hue ~25, chroma ~84
  return TonalPalette.fromHueAndChroma(25, 84);
}

/**
 * Generates a complete Material Design 3 light theme color scheme from seed colors
 * @param options Seed colors for generating palettes
 * @returns Complete Colors object for light theme
 */
export function generateLightColors(options: PaletteOptions): Colors {
  // Generate tonal palettes
  const primaryPalette = generateTonalPalette(options.primary);
  const secondaryPalette = options.secondary
    ? generateTonalPalette(options.secondary)
    : generateSecondaryPalette(options.primary);
  const tertiaryPalette = options.tertiary
    ? generateTonalPalette(options.tertiary)
    : generateTertiaryPalette(options.primary);
  const errorPalette = options.error
    ? generateTonalPalette(options.error)
    : generateErrorPalette();
  const neutralPalette = options.neutral
    ? generateTonalPalette(options.neutral)
    : generateNeutralPalette(options.primary);
  const neutralVariantPalette = options.neutralVariant
    ? generateTonalPalette(options.neutralVariant)
    : generateNeutralVariantPalette(options.primary);

  // Build light theme using M3 tone mappings
  // Reference: https://m3.material.io/styles/color/the-color-system/tokens
  return {
    // Primary
    primary: hexFromArgb(primaryPalette.tone(40)),
    onPrimary: hexFromArgb(primaryPalette.tone(100)),
    primaryContainer: hexFromArgb(primaryPalette.tone(90)),
    onPrimaryContainer: hexFromArgb(primaryPalette.tone(10)),

    // Secondary
    secondary: hexFromArgb(secondaryPalette.tone(40)),
    onSecondary: hexFromArgb(secondaryPalette.tone(100)),
    secondaryContainer: hexFromArgb(secondaryPalette.tone(90)),
    onSecondaryContainer: hexFromArgb(secondaryPalette.tone(10)),

    // Tertiary
    tertiary: hexFromArgb(tertiaryPalette.tone(40)),
    onTertiary: hexFromArgb(tertiaryPalette.tone(100)),
    tertiaryContainer: hexFromArgb(tertiaryPalette.tone(90)),
    onTertiaryContainer: hexFromArgb(tertiaryPalette.tone(10)),

    // Error
    error: hexFromArgb(errorPalette.tone(40)),
    onError: hexFromArgb(errorPalette.tone(100)),
    errorContainer: hexFromArgb(errorPalette.tone(90)),
    onErrorContainer: hexFromArgb(errorPalette.tone(10)),

    // Surface
    surface: hexFromArgb(neutralPalette.tone(98)),
    onSurface: hexFromArgb(neutralPalette.tone(10)),
    onSurfaceVariant: hexFromArgb(neutralVariantPalette.tone(30)),

    // Surface containers
    surfaceContainerLowest: hexFromArgb(neutralPalette.tone(100)),
    surfaceContainerLow: hexFromArgb(neutralPalette.tone(96)),
    surfaceContainer: hexFromArgb(neutralPalette.tone(94)),
    surfaceContainerHigh: hexFromArgb(neutralPalette.tone(92)),
    surfaceContainerHighest: hexFromArgb(neutralPalette.tone(90)),

    // Outline
    outline: hexFromArgb(neutralVariantPalette.tone(50)),
    outlineVariant: hexFromArgb(neutralVariantPalette.tone(80)),

    // Inverse
    inverseSurface: hexFromArgb(neutralPalette.tone(20)),
    inverseOnSurface: hexFromArgb(neutralPalette.tone(95)),
    inversePrimary: hexFromArgb(primaryPalette.tone(80)),

    // Semantic
    scrim: hexFromArgb(neutralPalette.tone(0)),
    shadow: hexFromArgb(neutralPalette.tone(0)),
  };
}

/**
 * Generates a complete Material Design 3 dark theme color scheme from seed colors
 * @param options Seed colors for generating palettes
 * @returns Complete Colors object for dark theme
 */
export function generateDarkColors(options: PaletteOptions): Colors {
  // Generate tonal palettes (same as light)
  const primaryPalette = generateTonalPalette(options.primary);
  const secondaryPalette = options.secondary
    ? generateTonalPalette(options.secondary)
    : generateSecondaryPalette(options.primary);
  const tertiaryPalette = options.tertiary
    ? generateTonalPalette(options.tertiary)
    : generateTertiaryPalette(options.primary);
  const errorPalette = options.error
    ? generateTonalPalette(options.error)
    : generateErrorPalette();
  const neutralPalette = options.neutral
    ? generateTonalPalette(options.neutral)
    : generateNeutralPalette(options.primary);
  const neutralVariantPalette = options.neutralVariant
    ? generateTonalPalette(options.neutralVariant)
    : generateNeutralVariantPalette(options.primary);

  // Build dark theme using M3 tone mappings
  // Dark theme uses inverted tone values
  return {
    // Primary
    primary: hexFromArgb(primaryPalette.tone(80)),
    onPrimary: hexFromArgb(primaryPalette.tone(20)),
    primaryContainer: hexFromArgb(primaryPalette.tone(30)),
    onPrimaryContainer: hexFromArgb(primaryPalette.tone(90)),

    // Secondary
    secondary: hexFromArgb(secondaryPalette.tone(80)),
    onSecondary: hexFromArgb(secondaryPalette.tone(20)),
    secondaryContainer: hexFromArgb(secondaryPalette.tone(30)),
    onSecondaryContainer: hexFromArgb(secondaryPalette.tone(90)),

    // Tertiary
    tertiary: hexFromArgb(tertiaryPalette.tone(80)),
    onTertiary: hexFromArgb(tertiaryPalette.tone(20)),
    tertiaryContainer: hexFromArgb(tertiaryPalette.tone(30)),
    onTertiaryContainer: hexFromArgb(tertiaryPalette.tone(90)),

    // Error
    error: hexFromArgb(errorPalette.tone(80)),
    onError: hexFromArgb(errorPalette.tone(20)),
    errorContainer: hexFromArgb(errorPalette.tone(30)),
    onErrorContainer: hexFromArgb(errorPalette.tone(90)),

    // Surface
    surface: hexFromArgb(neutralPalette.tone(6)),
    onSurface: hexFromArgb(neutralPalette.tone(90)),
    onSurfaceVariant: hexFromArgb(neutralVariantPalette.tone(80)),

    // Surface containers
    surfaceContainerLowest: hexFromArgb(neutralPalette.tone(4)),
    surfaceContainerLow: hexFromArgb(neutralPalette.tone(10)),
    surfaceContainer: hexFromArgb(neutralPalette.tone(12)),
    surfaceContainerHigh: hexFromArgb(neutralPalette.tone(17)),
    surfaceContainerHighest: hexFromArgb(neutralPalette.tone(22)),

    // Outline
    outline: hexFromArgb(neutralVariantPalette.tone(60)),
    outlineVariant: hexFromArgb(neutralVariantPalette.tone(30)),

    // Inverse
    inverseSurface: hexFromArgb(neutralPalette.tone(90)),
    inverseOnSurface: hexFromArgb(neutralPalette.tone(20)),
    inversePrimary: hexFromArgb(primaryPalette.tone(40)),

    // Semantic
    scrim: hexFromArgb(neutralPalette.tone(0)),
    shadow: hexFromArgb(neutralPalette.tone(0)),
  };
}

/**
 * Utility to check if a color has sufficient contrast ratio
 * @param foreground Foreground color (hex)
 * @param background Background color (hex)
 * @param minRatio Minimum contrast ratio (default: 4.5 for AA compliance)
 * @returns true if contrast meets minimum ratio
 */
export function hasContrastRatio(
  foreground: string,
  background: string,
  minRatio: number = 4.5
): boolean {
  const fgArgb = argbFromHex(foreground);
  const bgArgb = argbFromHex(background);

  const fgHct = Hct.fromInt(fgArgb);
  const bgHct = Hct.fromInt(bgArgb);

  // Calculate contrast ratio using tone (0-100 lightness scale)
  const fgTone = fgHct.tone;
  const bgTone = bgHct.tone;

  const lighter = Math.max(fgTone, bgTone);
  const darker = Math.min(fgTone, bgTone);

  // Simplified contrast calculation based on tone difference
  // Full WCAG calculation would need actual luminance values
  const contrast = (lighter + 5) / (darker + 5);

  return contrast >= minRatio;
}

/**
 * Generate high-contrast color adjustments
 * Increases contrast for accessibility compliance
 */
export function generateHighContrastColors(baseColors: Colors): Colors {
  // In high-contrast mode, increase tone differences
  // This is a simplified version - production would use full WCAG calculations
  return {
    ...baseColors,
    // Increase contrast for all on-color pairs
    onPrimary: '#FFFFFF',
    onSecondary: '#FFFFFF',
    onTertiary: '#FFFFFF',
    onError: '#FFFFFF',
    onSurface: '#000000',
    onSurfaceVariant: '#000000',
    onPrimaryContainer: '#000000',
    onSecondaryContainer: '#000000',
    onTertiaryContainer: '#000000',
    onErrorContainer: '#000000',
  };
}

/**
 * Adapter: Convert a TonalPalette into a simple map of tones -> hex strings.
 * This provides a stable, serializable shape consumers in the codebase expect
 * (e.g. lookups by tone value) and isolates callers from potential upstream
 * API changes in the material-color-utilities package.
 */
export function tonalPaletteToHexMap(palette: TonalPalette): Record<number, string> {
  const map: Record<number, string> = {};
  for (let t = 0; t <= 100; t += 10) {
    try {
      map[t] = hexFromArgb(palette.tone(t));
    } catch (e) {
      // if palette.tone is unavailable for some reason, fallback to white/black
      map[t] = t >= 50 ? '#FFFFFF' : '#000000';
    }
  }
  return map;
}

/**
 * Helper: generate a hex-map directly from a seed color
 */
export function generateTonalHexMapFromSeed(seedColor: string): Record<number, string> {
  const palette = generateTonalPalette(seedColor);
  return tonalPaletteToHexMap(palette);
}
