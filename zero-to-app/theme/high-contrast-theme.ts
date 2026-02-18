/**
 * High Contrast Theme Support
 * Provides enhanced contrast for accessibility
 */

import { generateHighContrastColors } from '../brand/palette-generator';
import { ThemeValuesType } from './theme-config';
import type { Brand } from '../brand';

/**
 * Creates a high-contrast light theme
 * @param brand Brand configuration
 * @returns High-contrast theme values
 */
export function createHighContrastLightTheme(brand: Brand): ThemeValuesType {
  const baseColors = brand.colors;
  const highContrastColors = generateHighContrastColors(baseColors);

  // Return theme with high-contrast adjustments
  return {
    ...highContrastColors,
    surfaceVariant: highContrastColors.surface,
    surfaceTint: highContrastColors.primary,
    spacing: brand.spacing,
    borderRadius: brand.borderRadius,
    shape: brand.shape,
    isDark: false,
    tokens: {
      button: {
        filledBg: highContrastColors.primary,
        filledText: '#FFFFFF',
        filledHoverBg: highContrastColors.primaryContainer,
        filledPressedBg: highContrastColors.primaryContainer,
        elevatedBg: highContrastColors.surfaceContainerHigh,
        elevatedText: '#000000',
        elevatedHoverBg: highContrastColors.surfaceContainerHighest,
        tonalBg: highContrastColors.secondaryContainer,
        tonalText: '#000000',
        tonalHoverBg: highContrastColors.secondaryContainer,
        outlinedBorder: '#000000',
        outlinedText: '#000000',
        outlinedHoverBorder: '#000000',
        textColor: '#000000',
        textHoverColor: '#000000',
        disabledBg: highContrastColors.surfaceContainerLow,
        disabledText: '#666666',
      },
      card: {
        background: highContrastColors.surfaceContainer,
        text: '#000000',
      },
      input: {
        background: '#FFFFFF',
        text: '#000000',
        border: '#000000',
        placeholder: '#666666',
      },
      appbar: {
        background: highContrastColors.surfaceContainerHighest,
        text: '#000000',
        border: highContrastColors.outline,
      },
      link: {
        text: '#0000EE',
        hover: '#0000EE',
      },
      badge: {
        background: highContrastColors.primary,
        text: '#FFFFFF',
      },
      sidebar: {
        background: highContrastColors.surfaceContainer,
        itemText: '#000000',
        itemActiveText: highContrastColors.primary,
        itemActiveBg: highContrastColors.primaryContainer,
        itemHoverBg: highContrastColors.surfaceContainerHigh,
        divider: '#000000',
        width: 280,
      },
      elevation: {
        level0: 0,
        level1: 1,
        level2: 3,
        level3: 6,
        level4: 8,
        level5: 12,
      },
      focusRing: {
        color: '#000000',
        width: 3, // Thicker focus ring for high contrast
        offset: 2,
      },
      typography: {
        displayLarge: 57,
        displayMedium: 45,
        displaySmall: 36,
        headlineLarge: 32,
        headlineMedium: 28,
        headlineSmall: 24,
        titleLarge: 22,
        titleMedium: 16,
        titleSmall: 14,
        bodyLarge: 16,
        bodyMedium: 14,
        bodySmall: 12,
        labelLarge: 14,
        labelMedium: 12,
        labelSmall: 11,
        weightLight: 300,
        weightRegular: 400,
        weightMedium: 600, // Slightly heavier for high contrast
        weightBold: 700,
        lineHeightTight: 1.2,
        lineHeightNormal: 1.5,
        lineHeightRelaxed: 1.75,
      },
    },
  };
}

/**
 * Creates a high-contrast dark theme
 * @param brand Brand configuration
 * @returns High-contrast dark theme values
 */
export function createHighContrastDarkTheme(brand: Brand): ThemeValuesType {
  const baseColors = brand.darkColors ?? brand.colors;
  const highContrastColors = generateHighContrastColors(baseColors);

  return {
    ...highContrastColors,
    surfaceVariant: '#000000',
    surfaceTint: highContrastColors.primary,
    surface: '#000000',
    onSurface: '#FFFFFF',
    spacing: brand.spacing,
    borderRadius: brand.borderRadius,
    shape: brand.shape,
    isDark: true,
    tokens: {
      button: {
        filledBg: highContrastColors.primary,
        filledText: '#000000',
        filledHoverBg: highContrastColors.primaryContainer,
        filledPressedBg: highContrastColors.primaryContainer,
        elevatedBg: '#1A1A1A',
        elevatedText: '#FFFFFF',
        elevatedHoverBg: '#2A2A2A',
        tonalBg: highContrastColors.secondaryContainer,
        tonalText: '#FFFFFF',
        tonalHoverBg: highContrastColors.secondaryContainer,
        outlinedBorder: '#FFFFFF',
        outlinedText: '#FFFFFF',
        outlinedHoverBorder: '#FFFFFF',
        textColor: '#FFFFFF',
        textHoverColor: '#FFFFFF',
        disabledBg: '#1A1A1A',
        disabledText: '#999999',
      },
      card: {
        background: '#000000',
        text: '#FFFFFF',
      },
      input: {
        background: '#000000',
        text: '#FFFFFF',
        border: '#FFFFFF',
        placeholder: '#999999',
      },
      appbar: {
        background: '#000000',
        text: '#FFFFFF',
        border: '#FFFFFF',
      },
      link: {
        text: '#8AB4F8', // High-contrast blue
        hover: '#8AB4F8',
      },
      badge: {
        background: highContrastColors.primary,
        text: '#000000',
      },
      sidebar: {
        background: highContrastColors.surfaceContainer,
        itemText: '#FFFFFF',
        itemActiveText: highContrastColors.primary,
        itemActiveBg: highContrastColors.primaryContainer,
        itemHoverBg: highContrastColors.surfaceContainerHigh,
        divider: '#FFFFFF',
        width: 280,
      },
      elevation: {
        level0: 0,
        level1: 1,
        level2: 3,
        level3: 6,
        level4: 8,
        level5: 12,
      },
      focusRing: {
        color: '#FFFFFF',
        width: 3,
        offset: 2,
      },
      typography: {
        displayLarge: 57,
        displayMedium: 45,
        displaySmall: 36,
        headlineLarge: 32,
        headlineMedium: 28,
        headlineSmall: 24,
        titleLarge: 22,
        titleMedium: 16,
        titleSmall: 14,
        bodyLarge: 16,
        bodyMedium: 14,
        bodySmall: 12,
        labelLarge: 14,
        labelMedium: 12,
        labelSmall: 11,
        weightLight: 300,
        weightRegular: 400,
        weightMedium: 600,
        weightBold: 700,
        lineHeightTight: 1.2,
        lineHeightNormal: 1.5,
        lineHeightRelaxed: 1.75,
      },
    },
  };
}
