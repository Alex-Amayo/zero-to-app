import { Tabs, useRouter, usePathname } from 'expo-router';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Typography, useTheme } from 'zero-to-app';

import { HapticTab } from '../../components/haptic-tab';
import { IconSymbol } from '../../components/icon-symbol';

export default function TabLayout() {
  const router = useRouter();
  const pathname = usePathname();

  const tabs = (
    <View style={styles.tabsContainer}>
      <Button
        title="Home"
        onPress={() => router.push('/(tabs)')}
        variant='text'
      />
      <Button
        title="Components"
        onPress={() => router.push('/(tabs)/components')}
        variant='text'
      />
    </View>
  );

  const { values: theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.surfaceContainerHighest }]}> 
      <View style={[styles.appbar, { borderBottomColor: theme.outlineVariant ?? theme.outline, backgroundColor: theme.surfaceContainerHighest }]}>
        <Typography variant="titleLarge" weight="medium">Zero to App</Typography>
        <View style={styles.appbarTabs}>{tabs}</View>
      </View>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: theme.primary,
          tabBarInactiveTintColor: theme.onSurfaceVariant,
          tabBarStyle: {
            backgroundColor: theme.surfaceContainerHighest,
            borderTopColor: theme.outlineVariant ?? theme.outline,
            borderTopWidth: theme.isDark ? 0 : 1,
          },
          headerShown: false,
          tabBarButton: HapticTab,
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
          }}
        />
        <Tabs.Screen
          name="components"
          options={{
            title: 'Components',
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="square.grid.2x2" color={color} />,
          }}
        />
      </Tabs>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabsContainer: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  appbar: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  appbarTabs: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
});
