import React, { useContext } from 'react';
import { Tabs } from 'expo-router';
import brand from '../../../brand/brandConfig';
import Feather from '@expo/vector-icons/Feather';
import AppbarMobile from '../../../components/Appbar/AppbarMobile';
import { ThemeContext } from '../../../theme/theme';

export default function TabLayout() {
  // Initialize theme
  const theme = useContext(ThemeContext);
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: brand.colors.primary,
        tabBarStyle: { backgroundColor: theme.values.appbarColor, borderTopWidth: 0 },
        tabBarShowLabel: false,
        header: () => <AppbarMobile title={brand.name} />,
      }}>
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => (
            <Feather
              size={20}
              name="home"
              color={focused ? theme.values.highlightColor : '#656469'}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ focused }) => (
            <Feather
              size={20}
              name="compass"
              color={focused ? theme.values.highlightColor : '#656469'}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ focused }) => (
            <Feather
              size={20}
              name="settings"
              color={focused ? theme.values.highlightColor : '#656469'}
            />
          ),
        }}
      />
    </Tabs>
  );
}
