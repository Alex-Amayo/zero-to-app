import { Tabs } from 'expo-router';
import React from 'react';
import { View } from 'react-native';
import { HapticTab } from '../../components/haptic-tab';
import { IconSymbol } from '../../components/icon-symbol';
import { useTheme } from 'zero-to-app';

export default function TabLayout() {
  const { values: theme } = useTheme();

  return (
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
  );
}
