import React from 'react';
import { Platform } from 'react-native';
import { ZeroToApp, AppTabs, defaultBrand, AppTabsExternalLink } from 'zero-to-app';
export default function TabLayout() {
  const externalLinks: AppTabsExternalLink[] | undefined = Platform.OS === 'web' ? [
    {
      label: 'Docs',
      href: 'https://docs.expo.dev',
      icon: { library: 'Feather', name: 'book-open' },
    },
  ] : undefined;

  return (
      <ZeroToApp brand={defaultBrand}>
      <AppTabs
        brandName="Zero To App"
        logoImage={require('../../assets/images/rocket_logo.png')}
        tabs={[
          {
            name: 'index',
            href: '/',
            label: 'Home',
            sfSymbol: { default: 'house', selected: 'house.fill' },
            materialIcon: 'home',
          },
          {
            name: 'explore',
            href: '/explore',
            label: 'Explore',
            sfSymbol: { default: 'safari', selected: 'safari.fill' },
            materialIcon: 'explore',
          },
        ]}
        {...(Platform.OS === 'web' && { externalLinks })}
      />

      </ZeroToApp>
  );
}
