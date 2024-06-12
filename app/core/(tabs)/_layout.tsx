import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import brand from '../../../brand/brandConfig';
import { TouchableOpacity } from 'react-native';
import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: brand.colors.primary,
        headerShown: false,
        tabBarLabelStyle: { display: 'none'},
        tabBarStyle: { justifyContent: 'center', backgroundColor: brand.colors.background, height: 100}, 

      }}>  
      <Tabs.Screen
        name='home'
        options={{
          tabBarButton: CustomTabButton,
          title: 'Home',
          tabBarIcon: ({ focused }) => (
            <FontAwesome size={30} name='home' color={focused ? brand.colors.primary : '#656469'} />
          ),
        }}
      />
      <Tabs.Screen
        name='settings'
        options={{
          tabBarButton: CustomTabButton,
          title: 'Settings',
          tabBarIcon: ({ focused }) => (
            <FontAwesome size={30} name='cog' color={focused ? brand.colors.primary : '#656469'} />
          ),
        }}
      />
    </Tabs>
  );
}

interface CustomTabButtonProps {
  style: any;
  accessibilityState: any;
}

const CustomTabButton = (props: BottomTabBarButtonProps) => {
  const { style, accessibilityState, ...otherProps } = props;

  return (
    <TouchableOpacity
      {...otherProps}
      style={
        accessibilityState && accessibilityState.selected
          ? [style, { borderTopColor: brand.colors.primary, borderTopWidth: 2 }]
          : style
      }
    />
  );
};
