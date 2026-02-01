import React, { createContext, useState, useMemo, useContext } from 'react';
import { createDarkTheme, createLightTheme, ThemeValuesType, type ThemeTokens } from './theme-config';
import { Brand } from '../brand';
import { BrandProvider } from '../brand/brand-context';

// Defining types for the ThemeContext
export type ThemeMode = 'light' | 'dark';

export type ThemeContextType = {
  values: ThemeValuesType;
  mode: ThemeMode;
  setMode: (m: ThemeMode) => void;
  toggleTheme: () => void;
};

// Sentinel value to detect missing provider
const MISSING_PROVIDER = Symbol('MISSING_PROVIDER');

// Initialize ThemeContext with undefined to detect missing provider
const ThemeContext = createContext<ThemeContextType | typeof MISSING_PROVIDER>(MISSING_PROVIDER);

type ZeroToAppProps = {
  brand: Brand;
  children: React.ReactNode;
};
//Initialize ZeroToApp with a toggle function
const ZeroToApp = ({ brand, children }: ZeroToAppProps) => {
  const lightTheme = useMemo(() => createLightTheme(brand), [brand]);
  // Use brand.darkColors if available, otherwise generate from brand.colors
  const darkTheme = useMemo(() => createDarkTheme(brand), [brand]);
  const [mode, setModeState] = useState<ThemeMode>('light');
  const values = mode === 'light' ? lightTheme : darkTheme;

  const setMode = (m: ThemeMode) => {
    setModeState(m);
  };

  const toggleTheme = () => {
    setModeState((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <BrandProvider brand={brand}>
      <ThemeContext.Provider value={{ values, mode, setMode, toggleTheme }}>{children}</ThemeContext.Provider>
    </BrandProvider>
  );
};

/**
 * Hook to access the current theme values and mode.
 * Must be used within a `<ZeroToApp>` provider.
 *
 * @returns The theme context containing values, mode, setMode, and toggleTheme
 * @throws Error if used outside of a ZeroToApp provider
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { values: theme, mode, toggleTheme } = useTheme();
 *
 *   return (
 *     <View style={{ backgroundColor: theme.surface }}>
 *       <Text style={{ color: theme.onSurface }}>
 *         Current mode: {mode}
 *       </Text>
 *       <Button title="Toggle Theme" onPress={toggleTheme} />
 *     </View>
 *   );
 * }
 * ```
 */
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);

  if (context === MISSING_PROVIDER) {
    throw new Error(
      'useTheme must be used within a <ZeroToApp> provider.\n\n' +
        'Make sure your component is wrapped with ZeroToApp:\n\n' +
        '  import { ZeroToApp, createBrand } from "zero-to-app";\n\n' +
        '  const brand = createBrand({ ... });\n\n' +
        '  function App() {\n' +
        '    return (\n' +
        '      <ZeroToApp brand={brand}>\n' +
        '        <YourComponent />\n' +
        '      </ZeroToApp>\n' +
        '    );\n' +
        '  }'
    );
  }

  return context;
};

/**
 * Convenience hook to access theme tokens directly without drilling through `values.tokens`.
 * Must be used within a `<ZeroToApp>` provider.
 *
 * @returns The theme tokens object containing button, card, input, typography, elevation, etc.
 * @throws Error if used outside of a ZeroToApp provider
 *
 * @example
 * ```tsx
 * function MyCard() {
 *   const tokens = useTokens();
 *
 *   return (
 *     <View style={{
 *       backgroundColor: tokens.card.background,
 *       shadowOffset: { width: 0, height: tokens.elevation.level2 },
 *     }}>
 *       <Text style={{ fontSize: tokens.typography.bodyMedium }}>
 *         Card content
 *       </Text>
 *     </View>
 *   );
 * }
 * ```
 *
 * @example
 * ```tsx
 * // Access specific token groups
 * function MyButton() {
 *   const { button, focusRing } = useTokens();
 *
 *   return (
 *     <Pressable style={{
 *       backgroundColor: button.filledBg,
 *       borderColor: focusRing.color,
 *     }}>
 *       <Text style={{ color: button.filledText }}>Click me</Text>
 *     </Pressable>
 *   );
 * }
 * ```
 */
export const useTokens = (): ThemeTokens => {
  const { values } = useTheme();
  return values.tokens;
};

export { ThemeContext, ZeroToApp };
