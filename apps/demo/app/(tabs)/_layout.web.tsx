import { Tabs, useRouter, usePathname } from 'expo-router';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AppbarWeb, Button } from 'zero-to-app';

import { HapticTab } from '../../components/haptic-tab';
import { IconSymbol } from '../../components/ui/icon-symbol';
import { Colors } from '../../constants/theme';
import { useColorScheme } from '../../hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const pathname = usePathname();

  const tabs = (
    <View style={styles.tabsContainer}>
      <Button
        title="Home"
        onPress={() => router.push('/(tabs)')}
        secondary={pathname !== '/(tabs)'}
        style={styles.tabButton}
      />
      <Button
        title="Components"
        onPress={() => router.push('/(tabs)/components')}
        secondary={pathname !== '/(tabs)/components'}
        style={styles.tabButton}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <AppbarWeb title="Zero to App" tabs={tabs} />
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
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
  tabButton: {
    minWidth: 100,
    maxHeight: 40,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
});
