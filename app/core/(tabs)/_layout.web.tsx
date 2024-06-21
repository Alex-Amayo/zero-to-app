import { Tabs } from 'expo-router';
import brand from '../../../brand/brandConfig';
import Feather from '@expo/vector-icons/Feather';
import Appbar from '../../../components/AppBar';
import {  View } from 'react-native';
import { useWindowWidth, breakpoints } from '../../../components/hooks/useWindowWidth';

export default function TabLayout() {
    return (
        <Appbar title={brand.name} tabs=
            {<Tabs
                screenOptions={{
                    tabBarStyle: {
                        backgroundColor: brand.colors.background,
                        flex: 1,
                        height: '100%',
                        width:  (useWindowWidth() >= breakpoints.medium ? '50%' : '100%'),
                        alignSelf: 'center',
                        borderTopWidth: 0
                    },
                    tabBarLabelStyle: { display: 'none' },
                }}
            >
                <Tabs.Screen
                    name='home'
                    options={{
                        title: 'Home',
                        tabBarIcon: ({ focused }) => (
                            <View style={{ height: 60, width: 100, alignItems: 'center', justifyContent: 'center', borderColor: brand.colors.primary, borderBottomWidth: focused ? 2 : 0, }}>
                                <Feather size={20} name='home' color={focused ? brand.colors.primary : '#656469'} />
                            </View>
                        ),
                    }}
                />
                <Tabs.Screen
                    name='explore'
                    options={{
                        title: 'Explore',
                        tabBarIcon: ({ focused }) => (
                            <View style={{ height: 60, width: 100, alignItems: 'center', justifyContent: 'center', borderColor: brand.colors.primary, borderBottomWidth: focused ? 2 : 0, }}>
                                <Feather size={20} name='compass' color={focused ? brand.colors.primary : '#656469'} />
                            </View>
                        ),
                    }}
                />
                <Tabs.Screen
                    name='settings'
                    options={{
                        title: 'Settings',
                        tabBarIcon: ({ focused }) => (
                            <View style={{ height: 60, width: 100, alignItems: 'center', justifyContent: 'center', borderColor: brand.colors.primary, borderBottomWidth: focused ? 2 : 0, }}>
                                <Feather size={20} name='settings' color={focused ? brand.colors.primary : '#656469'} />
                            </View>
                        ),
                    }}
                />
            </Tabs>
            } />
    );
}
