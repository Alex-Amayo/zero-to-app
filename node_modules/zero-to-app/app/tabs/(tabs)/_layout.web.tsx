import React, { useContext } from 'react';
import brand from '../../../brand/brandConfig';
import Feather from '@expo/vector-icons/Feather';
import AppbarWeb from '../../../components/Appbar/AppbarWeb';
import { Animated, TouchableOpacity, View } from 'react-native';
import { breakpoints, useWindowWidth } from '../../../hooks/useWindowWidth';
import {
  createMaterialTopTabNavigator,
  MaterialTopTabNavigationEventMap,
  MaterialTopTabNavigationOptions,
} from '@react-navigation/material-top-tabs';
import { NavigationHelpers, ParamListBase, TabNavigationState } from '@react-navigation/native';
import { withLayoutContext } from 'expo-router';
import { ThemeContext } from '../../../theme/theme';

//Initialize Material Top Navigator
const { Navigator } = createMaterialTopTabNavigator();

export const MaterialTopTabs = withLayoutContext<
  MaterialTopTabNavigationOptions,
  typeof Navigator,
  TabNavigationState<ParamListBase>,
  MaterialTopTabNavigationEventMap
>(Navigator);

export default function TabLayout() {
  // Initialize theme
  const theme = useContext(ThemeContext);
  return (
    <View style={{ flex: 1 }}>
      <MaterialTopTabs
        tabBar={(props) => <MyTabBar {...props} />}
        tabBarPosition="top"
        screenOptions={{
          // Tab tint color with theme
          tabBarActiveTintColor: theme.values.highlightColor,
        }}>
        <MaterialTopTabs.Screen name="home" options={{ title: 'home' }} />
        <MaterialTopTabs.Screen name="explore" options={{ title: 'explore' }} />
        <MaterialTopTabs.Screen name="settings" options={{ title: 'settings' }} />
      </MaterialTopTabs>
    </View>
  );
}

// Defining the icon mapping object
const iconMapping: { [key: string]: string } = {
  home: 'home',
  explore: 'compass',
  settings: 'settings',
  // Add more mappings as needed
};

type MyTabBarProps = {
  state: TabNavigationState<ParamListBase>;
  descriptors: { [key: string]: object };
  navigation: NavigationHelpers<ParamListBase, MaterialTopTabNavigationEventMap>;
  position: Animated.AnimatedInterpolation<number> | number;
};

function MyTabBar({ state, descriptors, navigation }: MyTabBarProps) {
  // Initialize theme
  const theme = useContext(ThemeContext);
  return (
    <AppbarWeb
      title={brand.name}
      tabs={
        <View
          style={{
            flexDirection: 'row',
            height: '100%',
            width: useWindowWidth() >= breakpoints.medium ? '50%' : '100%',
          }}>
          {state.routes.map((route, index) => {
            // Determine if the current route is focused
            const isFocused = state.index === index;
            const iconName = iconMapping[route.name] as keyof typeof Feather.glyphMap;

            return (
              <TouchableOpacity
                key={route.key} // Ensure each button has a unique key
                onPress={() => {
                  const event = navigation.emit({
                    type: 'tabPress',
                    target: route.key,
                    canPreventDefault: true,
                  });
                  if (!event.defaultPrevented) {
                    // Navigate to the route
                    navigation.navigate(route.name);
                  }
                }}
                style={{
                  flex: 1,
                  height: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderColor: theme.values.highlightColor,
                  borderBottomWidth: isFocused ? 5 : 0,
                }}>
                <Feather
                  size={25}
                  name={iconName}
                  color={isFocused ? theme.values.highlightColor : theme.values.inactiveIconColor}
                />
              </TouchableOpacity>
            );
          })}
        </View>
      }
    />
  );
}
