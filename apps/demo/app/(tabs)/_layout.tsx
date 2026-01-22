import { Tabs } from 'expo-router';
import React, { useContext } from 'react';

import { HapticTab } from '../../components/haptic-tab';
import { IconSymbol } from '../../components/ui/icon-symbol';
import { ThemeContext } from 'zero-to-app';

export default function TabLayout() {
  const theme = useContext(ThemeContext);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.values.highlightColor,
        tabBarInactiveTintColor: theme.values.inactiveIconColor,
        tabBarStyle: {
          backgroundColor: theme.values.appbarBackgroundColor,
          borderTopColor: theme.values.borderColor,
          borderTopWidth: theme.values.isDark ? 0 : 1,
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
