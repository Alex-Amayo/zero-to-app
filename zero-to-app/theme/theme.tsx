import React, { createContext, useState, useMemo } from 'react';
import { createDarkTheme, createLightTheme, ThemeValuesType } from './themeConfig';
import { Brand } from '../brand';
import { BrandProvider } from '../brand/brandContext';

//Defining types fror the ThemeContext
export type ThemeContextType = {
  values: ThemeValuesType;
  toggleTheme: () => void;
};

// Initialize ThemeContext with a placeholder that throws if used outside provider
// This should never be used in practice since ZeroToApp always provides a real brand
const ThemeContext = createContext<ThemeContextType>({
  values: {
    color: '#000000',
    backgroundColor: '#FFFFFF',
    highlightColor: '#000000',
    borderColor: '#dddfe2',
    inactiveIconColor: '#606770',
    dividerColor: '#dddfe2',
    cardBackgroundColor: '#FFFFFF',
    appbarBackgroundColor: '#FFFFFF',
    iconButtonBackgroundColor: '#999999',
    iconButtonIconColor: '#ffffff',
    inputBackgroundColor: '#ffffff',
    linkColor: '#666666',
    isDark: false,
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
  const darkTheme = useMemo(() => createDarkTheme(brand), [brand]);
  const [values, setTheme] = useState<ThemeValuesType>(darkTheme);
  const toggleTheme = () => {
    setTheme(values === lightTheme ? darkTheme : lightTheme);
  };

  return (
    <BrandProvider brand={brand}>
      <ThemeContext.Provider value={{ values, toggleTheme }}>{children}</ThemeContext.Provider>
    </BrandProvider>
  );
};

export { ThemeContext, ZeroToApp };
