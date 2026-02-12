import React from 'react';
import { Platform } from 'react-native';
import { ZeroToApp, AppTabs, defaultBrand, AppTabsExternalLink, Sidebar, SidebarHeader, SidebarSection, SidebarItem, useSidebar } from 'zero-to-app';
import { usePathname, useRouter } from 'expo-router';
import { View, StyleSheet } from 'react-native';

function TabLayoutInner() {
  const pathname = usePathname();
  const router = useRouter();
  const { toggle } = useSidebar();

  const navigateTo = (route: string) => {
    router.push(route as any);
  };

  const isActive = (route: string) => {
    const currentPath = typeof pathname === 'string' ? pathname : '';
    return currentPath === route || currentPath.startsWith(route + '/');
  };

  const externalLinks: AppTabsExternalLink[] = [
    {
      label: 'Expo Docs',
      href: 'https://docs.expo.dev',
      icon: { library: 'Feather', name: 'book-open' },
    },
  ];

  return (
    <View style={styles.container}>
      {Platform.OS !== 'web' && (
        <Sidebar
          header={
            <SidebarHeader
              title="Zero To App"
              subtitle="Demo"
              onPress={() => navigateTo('/')}
            />
          }
          anchor="right"
        >
          <SidebarSection title="Navigation" icon={{ library: 'Feather', name: 'grid' }}>
            <SidebarItem label="Home" active={isActive('/')} onPress={() => navigateTo('/')} />
            <SidebarItem label="Explore" active={isActive('/explore')} onPress={() => navigateTo('/explore')} />
          </SidebarSection>
        </Sidebar>
      )}

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
        externalLinks={externalLinks}
        {...(Platform.OS !== 'web' ? { onPrimaryMenuPress: toggle } : {})}
      />
    </View>
  );
}

export default function TabLayout() {
  return (
    <ZeroToApp brand={defaultBrand}>
      <TabLayoutInner />
    </ZeroToApp>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
