import React from 'react';
import {Stack} from 'expo-router';
import {usePathname, useRouter} from 'expo-router';
import {
    useTheme,
    Sidebar,
    SidebarHeader,
    SidebarSection,
    SidebarItem,
} from 'zero-to-app';

export default function ExploreLayout() {
    const theme = useTheme();
    const pathname = usePathname();
    const router = useRouter();

    const navigateTo = (route: string) => {
        router.push(route as any);
    };

    const isActive = (route: string) => {
        const currentPath = typeof pathname === 'string' ? pathname : '';
        if (route === '/explore' || route === '/explore/') {
            return currentPath === '/explore' || currentPath === '/explore/';
        }
        return currentPath === route || currentPath.startsWith(route + '/');
    };

    return (
        <>
            <Sidebar
                header={
                    <SidebarHeader
                        title="Components"
                        subtitle="Zero to App UI"
                        onPress={() => navigateTo('/explore')}
                    />
                }
            >
                <SidebarSection title="Components" icon={{library: 'Feather', name: 'box'}}>
                    <SidebarItem
                        label="Button"
                        active={isActive('/explore/button')}
                        onPress={() => navigateTo('/explore/button')}
                    />
                    <SidebarItem
                        label="Typography"
                        active={isActive('/explore/typography')}
                        onPress={() => navigateTo('/explore/typography')}
                    />
                    <SidebarItem
                        label="ThemedView"
                        active={isActive('/explore/themed-view')}
                        onPress={() => navigateTo('/explore/themed-view')}
                    />
                    <SidebarItem
                        label="Screen"
                        active={isActive('/explore/screen')}
                        onPress={() => navigateTo('/explore/screen')}
                    />
                    <SidebarItem
                        label="Collapsible"
                        active={isActive('/explore/collapsible')}
                        onPress={() => navigateTo('/explore/collapsible')}
                    />
                </SidebarSection>
            </Sidebar>

            <Stack
                screenOptions={{
                    headerStyle: {
                        backgroundColor: theme.tokens.appbar.background,
                    },
                    headerTintColor: theme.onSurface,
                    headerBackVisible: true,
                    headerBackButtonDisplayMode: 'minimal',
                }}
            >
                <Stack.Screen name="index" options={{title: 'Explore'}} />
                <Stack.Screen name="button" options={{title: 'Button'}} />
                <Stack.Screen name="typography" options={{title: 'Typography'}} />
                <Stack.Screen name="themed-view" options={{title: 'Themed View'}} />
                <Stack.Screen name="screen" options={{title: 'Screen'}} />
                <Stack.Screen name="collapsible" options={{title: 'Collapsible'}} />
            </Stack>
            </>
    );
}
