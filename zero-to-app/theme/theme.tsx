import React, { createContext, useState, useMemo, useContext } from 'react';
import { createDarkTheme, createLightTheme, ThemeValuesType } from './themeConfig';
import { defaultBrand } from '../brand/defaultBrand';
import { Brand } from '../brand';
import { BrandProvider } from '../brand/brandContext';

//Defining types fror the ThemeContext
export type ThemeMode = 'light' | 'dark';

export type ThemeContextType = {
  values: ThemeValuesType;
  mode: ThemeMode;
  setMode: (m: ThemeMode) => void;
  toggleTheme: () => void;
};

// Initialize ThemeContext with a placeholder that throws if used outside provider
// This should never be used in practice since ZeroToApp always provides a real brand
const ThemeContext = createContext<ThemeContextType>({
  values: createLightTheme(defaultBrand as any),
  mode: 'light',
  setMode: () => {
    throw new Error('ThemeContext used outside ZeroToApp provider');
  },
  toggleTheme: () => {
    throw new Error('ThemeContext used outside ZeroToApp provider');
  },
});

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

// Hook for consumers
export const useTheme = () => useContext(ThemeContext);

export { ThemeContext, ZeroToApp };
