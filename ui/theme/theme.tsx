import React, { createContext, useState } from 'react';
import { darkTheme, lightTheme, ThemeValuesType } from './themeConfig';

//Defining theme type
export type ThemeType = 'light' | 'dark';

//Defining types fror the ThemeContext
export type ThemeContextType = {
  values: ThemeValuesType;
  toggleTheme: () => void;
};

//Initialize ThemeContext with a toggle function placeholder
const ThemeContext = createContext<ThemeContextType>({
  values: lightTheme,
  toggleTheme: () => {},
});

type ThemeProviderProps = {
  children: React.ReactNode;
};
//Initialize ThemeProvider with a toggle function
const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [values, setTheme] = useState<ThemeValuesType>(lightTheme);
  const toggleTheme = () => {
    setTheme(values === lightTheme ? darkTheme : lightTheme);
  };

  return <ThemeContext.Provider value={{ values, toggleTheme }}>{children}</ThemeContext.Provider>;
};

export { ThemeContext, ThemeProvider };
