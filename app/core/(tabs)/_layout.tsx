import { Tabs } from 'expo-router';
import brand from '../../../brand/brandConfig';
import Feather from '@expo/vector-icons/Feather';
import Appbar from '../../../components/AppBar';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: brand.colors.primary,
        tabBarStyle: { backgroundColor: brand.colors.background },
        header: () => <Appbar title={brand.name} />,
      }}
    >
      <Tabs.Screen
        name='home'
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => (
            <Feather size={20} name='home' color={focused ? brand.colors.primary : '#656469'} />
          ),
        }}
      />
      <Tabs.Screen
        name='settings'
        options={{
          title: 'Settings',
          tabBarIcon: ({ focused }) => (
            <Feather size={20} name='settings' color={focused ? brand.colors.primary : '#656469'} />
          ),
        }}
      />
    </Tabs>
  );
}
