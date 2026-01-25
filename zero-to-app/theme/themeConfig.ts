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
}

export const createLightTheme = (brand: Brand): ThemeValuesType => {
  const c = brand.colors;
  return { primary: c.primary, onPrimary: c.onPrimary, primaryContainer: c.primaryContainer, onPrimaryContainer: c.onPrimaryContainer, secondary: c.secondary, onSecondary: c.onSecondary, secondaryContainer: c.secondaryContainer, onSecondaryContainer: c.onSecondaryContainer, tertiary: c.tertiary, onTertiary: c.onTertiary, tertiaryContainer: c.tertiaryContainer, onTertiaryContainer: c.onTertiaryContainer, error: c.error, onError: c.onError, errorContainer: c.errorContainer, onErrorContainer: c.onErrorContainer, surface: c.surface, onSurface: c.onSurface, onSurfaceVariant: c.onSurfaceVariant, surfaceContainerLowest: c.surfaceContainerLowest, surfaceContainerLow: c.surfaceContainerLow, surfaceContainer: c.surfaceContainer, surfaceContainerHigh: c.surfaceContainerHigh, surfaceContainerHighest: c.surfaceContainerHighest, outline: c.outline, outlineVariant: c.outlineVariant, inverseSurface: c.inverseSurface, inverseOnSurface: c.inverseOnSurface, inversePrimary: c.inversePrimary, scrim: c.scrim, shadow: c.shadow, isDark: false };
};

export const createDarkTheme = (brand: Brand): ThemeValuesType => {
  const c = brand.colors;
  return { primary: c.primary, onPrimary: c.onPrimary, primaryContainer: c.primaryContainer, onPrimaryContainer: c.onPrimaryContainer, secondary: c.secondary, onSecondary: c.onSecondary, secondaryContainer: c.secondaryContainer, onSecondaryContainer: c.onSecondaryContainer, tertiary: c.tertiary, onTertiary: c.onTertiary, tertiaryContainer: c.tertiaryContainer, onTertiaryContainer: c.onTertiaryContainer, error: c.error, onError: c.onError, errorContainer: c.errorContainer, onErrorContainer: c.onErrorContainer, surface: c.surface, onSurface: c.onSurface, onSurfaceVariant: c.onSurfaceVariant, surfaceContainerLowest: c.surfaceContainerLowest, surfaceContainerLow: c.surfaceContainerLow, surfaceContainer: c.surfaceContainer, surfaceContainerHigh: c.surfaceContainerHigh, surfaceContainerHighest: c.surfaceContainerHighest, outline: c.outline, outlineVariant: c.outlineVariant, inverseSurface: c.inverseSurface, inverseOnSurface: c.inverseOnSurface, inversePrimary: c.inversePrimary, scrim: c.scrim, shadow: c.shadow, isDark: true };
};