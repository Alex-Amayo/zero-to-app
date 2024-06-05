import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: 'blue', headerShown: false }}>
      <Tabs.Screen
        name='home'
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name='home' color={color} />,
        }}
      />
      <Tabs.Screen
        name='settings'
        options={{
          title: 'settings',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name='cog' color={color} />,
        }}
      />
    </Tabs>
  );
}
