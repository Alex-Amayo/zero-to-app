import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import React from 'react';
import { useColorScheme, Pressable } from 'react-native';
import { SymbolView } from 'expo-symbols';
import { ZeroToApp, AppTabs, AppTabsExternalLink, defaultBrand } from 'zero-to-app';

import { AnimatedSplashOverlay } from '@/components/animated-icon';
import { ExternalLink } from '@/components/external-link';
import { ThemedText } from '@/components/themed-text';
import { Colors } from '@/constants/theme';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme === 'dark' ? 'dark' : 'light'];

  const externalLinks: AppTabsExternalLink[] = [
    {
      label: 'Doc',
      component: (
        <ExternalLink href="https://docs.expo.dev" asChild>
          <Pressable style={{ flexDirection: 'row', gap: 4, alignItems: 'center' }}>
            <ThemedText type="link">Doc</ThemedText>
            <SymbolView
              tintColor={colors.text}
              name={{ ios: 'arrow.up.right.square', web: 'link' }}
              size={12}
            />
          </Pressable>
        </ExternalLink>
      ),
    },
  ];

  return (
      <ZeroToApp brand={defaultBrand}>
      <AppTabs
        brandName="Expo Starter"
        tabs={[
          { name: 'home', href: '/', label: 'Home' },
          { name: 'explore', href: '/explore', label: 'Explore' },
        ]}
        externalLinks={externalLinks}
      />

      </ZeroToApp>
  );
}
