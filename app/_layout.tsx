import React, { useContext } from 'react';
import { Slot } from 'expo-router';
import { ThemeProvider } from '../theme/theme';


const Layout = () => {
  return (
    <ThemeProvider>
      <Slot />
    </ThemeProvider>
  );
};

export default Layout;
