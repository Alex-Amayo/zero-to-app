import React from 'react';
import { ZeroToApp, AppTabs, AppTabsExternalLink, defaultBrand } from 'zero-to-app';

import { AnimatedSplashOverlay } from '@/components/animated-icon';

export default function TabLayout() {
  const externalLinks: AppTabsExternalLink[] = [
    {
      label: 'Docs',
      href: 'https://docs.expo.dev',
    },
  ];

  return (
      <ZeroToApp brand={defaultBrand}>
      <AppTabs
        brandName="Zero To App"
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
        externalLinks={externalLinks}
      />

      </ZeroToApp>
  );
}
