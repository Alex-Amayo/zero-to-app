import { Brand } from '../brand';

export interface ThemeValuesType {
  primary: string;
  onPrimary: string;
  primaryContainer: string;
  onPrimaryContainer: string;
  secondary: string;
  onSecondary: string;
  secondaryContainer: string;
  onSecondaryContainer: string;
  tertiary: string;
  onTertiary: string;
  tertiaryContainer: string;
  onTertiaryContainer: string;
  error: string;
  onError: string;
  errorContainer: string;
  onErrorContainer: string;
  surface: string;
  surfaceVariant: string;
  surfaceTint: string;
  onSurface: string;
  onSurfaceVariant: string;
  surfaceContainerLowest: string;
  surfaceContainerLow: string;
  surfaceContainer: string;
  surfaceContainerHigh: string;
  surfaceContainerHighest: string;
  outline: string;
  outlineVariant: string;
  inverseSurface: string;
  inverseOnSurface: string;
  inversePrimary: string;
  scrim: string;
  shadow: string;
  isDark: boolean;
  // Semantic tokens for common component use
  tokens: {
    button: {
      // Filled (high emphasis)
      filledBg: string;
      filledText: string;
      filledHoverBg: string;
      filledPressedBg: string;
      // Elevated
      elevatedBg: string;
      elevatedText: string;
      elevatedHoverBg: string;
      // Tonal
      tonalBg: string;
      tonalText: string;
      tonalHoverBg: string;
      // Outlined
      outlinedBorder: string;
      outlinedText: string;
      outlinedHoverBorder: string;
      // Text
      textColor: string;
      textHoverColor: string;
      // Disabled
      disabledBg: string;
      disabledText: string;
    };
    card: {
      background: string;
      text: string;
    };
    input: {
      background: string;
      text: string;
      border: string;
      placeholder: string;
    };
    appbar: {
      background: string;
      text: string;
    };
    link: {
      text: string;
      hover: string;
    };
    badge: {
      background: string;
      text: string;
    };
    sidebar: {
      background: string;
      itemText: string;
      itemActiveText: string;
      itemActiveBg: string;
      itemHoverBg: string;
      divider: string;
      width: number;
    };
    elevation: {
      level0: number;
      level1: number;
      level2: number;
      level3: number;
      level4: number;
      level5: number;
    };
    focusRing: {
      color: string;
      width: number;
      offset: number;
    };
    typography: {
      // Font sizes
      displayLarge: number;
      displayMedium: number;
      displaySmall: number;
      headlineLarge: number;
      headlineMedium: number;
      headlineSmall: number;
      titleLarge: number;
      titleMedium: number;
      titleSmall: number;
      bodyLarge: number;
      bodyMedium: number;
      bodySmall: number;
      labelLarge: number;
      labelMedium: number;
      labelSmall: number;
      // Font weights
      weightLight: number;
      weightRegular: number;
      weightMedium: number;
      weightBold: number;
      // Line heights
      lineHeightTight: number;
      lineHeightNormal: number;
      lineHeightRelaxed: number;
      // Legacy aliases for backwards compatibility
      headline: number;
      title: number;
      body: number;
      label: number;
      caption: number;
    };
  };
}

// Export token types for consumers
export type ThemeTokens = ThemeValuesType['tokens'];

export const createLightTheme = (brand: Brand): ThemeValuesType => {
  const c = brand.colors;
  return {
    primary: c.primary,
    onPrimary: c.onPrimary,
    primaryContainer: c.primaryContainer,
    onPrimaryContainer: c.onPrimaryContainer,
    secondary: c.secondary,
    onSecondary: c.onSecondary,
    secondaryContainer: c.secondaryContainer,
    onSecondaryContainer: c.onSecondaryContainer,
    tertiary: c.tertiary,
    onTertiary: c.onTertiary,
    tertiaryContainer: c.tertiaryContainer,
    onTertiaryContainer: c.onTertiaryContainer,
    error: c.error,
    onError: c.onError,
    errorContainer: c.errorContainer,
    onErrorContainer: c.onErrorContainer,
    surface: c.surface,
    surfaceVariant: c.surfaceContainer,
    surfaceTint: c.primary,
    onSurface: c.onSurface,
    onSurfaceVariant: c.onSurfaceVariant,
    surfaceContainerLowest: c.surfaceContainerLowest,
    surfaceContainerLow: c.surfaceContainerLow,
    surfaceContainer: c.surfaceContainer,
    surfaceContainerHigh: c.surfaceContainerHigh,
    surfaceContainerHighest: c.surfaceContainerHighest,
    outline: c.outline,
    outlineVariant: c.outlineVariant,
    inverseSurface: c.inverseSurface,
    inverseOnSurface: c.inverseOnSurface,
    inversePrimary: c.inversePrimary,
    scrim: c.scrim,
    shadow: c.shadow,
    isDark: false,
    tokens: {
      button: {
        // Filled / high-emphasis (Material `filled`)
        filledBg: c.primary,
        filledText: c.onPrimary,
        filledHoverBg: c.primaryContainer ?? c.primary,
        filledPressedBg: c.primaryContainer ?? c.primary,
        // Elevated (surface with elevation)
        elevatedBg: c.surfaceContainerHigh,
        elevatedText: c.onSurface,
        elevatedHoverBg: c.surfaceContainerHighest,
        // Tonal (Material `tonal`)
        tonalBg: c.secondaryContainer,
        tonalText: c.onSecondary,
        tonalHoverBg: c.secondaryContainer ?? c.secondary,
        // Outlined
        outlinedBorder: c.outlineVariant ?? c.outline,
        outlinedText: c.primary,
        outlinedHoverBorder: c.outlineVariant ?? c.outline,
        // Text (low emphasis)
        textColor: c.primary,
        textHoverColor: c.primary,
        // Disabled
        disabledBg: c.surfaceContainerLow,
        disabledText: c.onSurfaceVariant,
      },
      card: {
        background: c.surfaceContainer,
        text: c.onSurface,
      },
      input: {
        background: c.surfaceContainerLow,
        text: c.onSurface,
        border: c.outlineVariant ?? c.outline,
        placeholder: c.onSurfaceVariant,
      },
      appbar: {
        background: c.surfaceContainerHighest,
        text: c.onSurface,
      },
      link: {
        text: c.primary,
        hover: c.primary,
      },
      badge: {
        background: c.primary,
        text: c.onPrimary,
      },
      sidebar: {
        background: c.surfaceContainer,
        itemText: c.onSurface,
        itemActiveText: c.primary,
        itemActiveBg: c.primaryContainer,
        itemHoverBg: c.surfaceContainerHigh,
        divider: c.outlineVariant ?? c.outline,
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
        color: c.primary,
        width: 2,
        offset: 2,
      },
      typography: {
        // M3 Display styles (largest)
        displayLarge: 57,
        displayMedium: 45,
        displaySmall: 36,
        // M3 Headline styles
        headlineLarge: 32,
        headlineMedium: 28,
        headlineSmall: 24,
        // M3 Title styles
        titleLarge: 22,
        titleMedium: 16,
        titleSmall: 14,
        // M3 Body styles
        bodyLarge: 16,
        bodyMedium: 14,
        bodySmall: 12,
        // M3 Label styles
        labelLarge: 14,
        labelMedium: 12,
        labelSmall: 11,
        // Font weights
        weightLight: 300,
        weightRegular: 400,
        weightMedium: 500,
        weightBold: 700,
        // Line heights (multipliers)
        lineHeightTight: 1.2,
        lineHeightNormal: 1.5,
        lineHeightRelaxed: 1.75,
        // Legacy aliases for backwards compatibility
        headline: brand.fontSizes.xlarge,
        title: brand.fontSizes.large,
        body: brand.fontSizes.medium,
        label: brand.fontSizes.small,
        caption: brand.fontSizes.small,
      },
    },
  };
};

export const createDarkTheme = (brand: Brand): ThemeValuesType => {
  // Use brand.darkColors if available, otherwise use brand.colors (assumes colors work for both themes)
  const c = brand.darkColors ?? brand.colors;
  return {
    primary: c.primary,
    onPrimary: c.onPrimary,
    primaryContainer: c.primaryContainer,
    onPrimaryContainer: c.onPrimaryContainer,
    secondary: c.secondary,
    onSecondary: c.onSecondary,
    secondaryContainer: c.secondaryContainer,
    onSecondaryContainer: c.onSecondaryContainer,
    tertiary: c.tertiary,
    onTertiary: c.onTertiary,
    tertiaryContainer: c.tertiaryContainer,
    onTertiaryContainer: c.onTertiaryContainer,
    error: c.error,
    onError: c.onError,
    errorContainer: c.errorContainer,
    onErrorContainer: c.onErrorContainer,
    surface: c.surface,
    surfaceVariant: c.surfaceContainer,
    surfaceTint: c.primary,
    onSurface: c.onSurface,
    onSurfaceVariant: c.onSurfaceVariant,
    surfaceContainerLowest: c.surfaceContainerLowest,
    surfaceContainerLow: c.surfaceContainerLow,
    surfaceContainer: c.surfaceContainer,
    surfaceContainerHigh: c.surfaceContainerHigh,
    surfaceContainerHighest: c.surfaceContainerHighest,
    outline: c.outline,
    outlineVariant: c.outlineVariant,
    inverseSurface: c.inverseSurface,
    inverseOnSurface: c.inverseOnSurface,
    inversePrimary: c.inversePrimary,
    scrim: c.scrim,
    shadow: c.shadow,
    isDark: true,
    tokens: {
      button: {
        filledBg: c.primary,
        filledText: c.onPrimary,
        filledHoverBg: c.primaryContainer ?? c.primary,
        filledPressedBg: c.primaryContainer ?? c.primary,
        elevatedBg: c.surfaceContainerHigh,
        elevatedText: c.onSurface,
        elevatedHoverBg: c.surfaceContainerHighest,
        tonalBg: c.secondaryContainer,
        tonalText: c.onSecondary,
        tonalHoverBg: c.secondaryContainer ?? c.secondary,
        outlinedBorder: c.outlineVariant ?? c.outline,
        outlinedText: c.primary,
        outlinedHoverBorder: c.outlineVariant ?? c.outline,
        textColor: c.primary,
        textHoverColor: c.primary,
        disabledBg: c.surfaceContainerLow,
        disabledText: c.onSurfaceVariant,
      },
      card: {
        background: c.surfaceContainer,
        text: c.onSurface,
      },
      input: {
        background: c.surfaceContainerLow,
        text: c.onSurface,
        border: c.outlineVariant ?? c.outline,
        placeholder: c.onSurfaceVariant,
      },
      appbar: {
        background: c.surfaceContainerHighest,
        text: c.onSurface,
      },
      link: {
        text: c.primary,
        hover: c.primary,
      },
      badge: {
        background: c.primary,
        text: c.onPrimary,
      },
      sidebar: {
        background: c.surfaceContainer,
        itemText: c.onSurface,
        itemActiveText: c.primary,
        itemActiveBg: c.primaryContainer,
        itemHoverBg: c.surfaceContainerHigh,
        divider: c.outlineVariant ?? c.outline,
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
        color: c.primary,
        width: 2,
        offset: 2,
      },
      typography: {
        // M3 Display styles (largest)
        displayLarge: 57,
        displayMedium: 45,
        displaySmall: 36,
        // M3 Headline styles
        headlineLarge: 32,
        headlineMedium: 28,
        headlineSmall: 24,
        // M3 Title styles
        titleLarge: 22,
        titleMedium: 16,
        titleSmall: 14,
        // M3 Body styles
        bodyLarge: 16,
        bodyMedium: 14,
        bodySmall: 12,
        // M3 Label styles
        labelLarge: 14,
        labelMedium: 12,
        labelSmall: 11,
        // Font weights
        weightLight: 300,
        weightRegular: 400,
        weightMedium: 500,
        weightBold: 700,
        // Line heights (multipliers)
        lineHeightTight: 1.2,
        lineHeightNormal: 1.5,
        lineHeightRelaxed: 1.75,
        // Legacy aliases for backwards compatibility
        headline: brand.fontSizes.xlarge,
        title: brand.fontSizes.large,
        body: brand.fontSizes.medium,
        label: brand.fontSizes.small,
        caption: brand.fontSizes.small,
      },
    },
  };
};