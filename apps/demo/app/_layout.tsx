import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import 'react-native-reanimated';

import { ZeroToApp, createBrand } from 'zero-to-app';

export const unstable_settings = {
  anchor: '(tabs)',
};

const brand = createBrand({
  name: 'Demo App',
  colors: {
    primary: '#0a7ea4',
    secondary: '#0a7ea4',
    backgroundColor: '#fff',
  },
  fontSizes: {
    small: 14,
    medium: 16,
    large: 20,
    xlarge: 25,
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 24,
    xxxl: 40,
  },
  borderRadius: 8,
});

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <ZeroToApp brand={brand}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
        </Stack>
        <StatusBar style="auto" />
      </ZeroToApp>
    </SafeAreaProvider>
  );
}
