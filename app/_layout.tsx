import React from 'react';
import { Slot } from 'expo-router';
import { ThemeProvider } from '../theme/theme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const Layout = () => {
  // Creating a  query client
  const queryClient = new QueryClient();
  return (
    // Query Client provider is used to provide the query client to the components
    <QueryClientProvider client={queryClient}>
      {/* Theme provider is used to provide the theme to the components */}
      <ThemeProvider>
        {/* Slot is used to render the child routes */}
        <Slot />
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default Layout;
