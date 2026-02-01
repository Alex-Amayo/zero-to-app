import React, { useState, useMemo, useEffect } from 'react';
import { View } from 'react-native';
import { ThemeContext, BrandProvider, createLightTheme, createDarkTheme } from 'zero-to-app';
import { storybookBrand } from './brand-config';
import type { StoryContext } from '@storybook/react-native';

// Wrapper component that manages theme based on Storybook globals
const ThemeWrapper = ({ 
  Story, 
  theme 
}: { 
  Story: React.ComponentType;
  theme: 'light' | 'dark';
}) => {
  const lightTheme = useMemo(() => createLightTheme(storybookBrand), []);
  const darkTheme = useMemo(() => createDarkTheme(storybookBrand), []);
  const [themeValues, setThemeValues] = useState(lightTheme);

  // Update theme when global value changes
  useEffect(() => {
    setThemeValues(theme === 'dark' ? darkTheme : lightTheme);
  }, [theme, darkTheme, lightTheme]);

  // Create theme context value with toggle function
  const themeContextValue = useMemo(() => ({
    values: themeValues,
    toggleTheme: () => {
      // Toggle between light and dark
      setThemeValues((current) => 
        current === lightTheme ? darkTheme : lightTheme
      );
    },
  }), [themeValues, darkTheme, lightTheme]);

  return (
    <BrandProvider brand={storybookBrand}>
      <ThemeContext.Provider value={themeContextValue}>
        <View style={{ 
          flex: 1, 
          backgroundColor: themeValues.surface,
          minHeight: '100vh',
        }}>
          <Story />
        </View>
      </ThemeContext.Provider>
    </BrandProvider>
  );
};

export const withZeroToApp = (Story: React.ComponentType, context: StoryContext) => {
  // Get theme from Storybook globals, default to 'light'
  const theme = (context.globals?.theme as 'light' | 'dark') || 'light';
  
  return (
    <ThemeWrapper Story={Story} theme={theme} />
  );
};
