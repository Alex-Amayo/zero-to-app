import React from 'react';
import {Stack, usePathname, useRouter} from 'expo-router';
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
                        title="Docs"
                        subtitle="Zero to App UI"
                        onPress={() => navigateTo('/explore')}
                    />
                }
            >
                <SidebarSection title="Getting Started" icon={{library: 'Feather', name: 'code'}}>
                    <SidebarItem
                        label="Installation"
                        active={isActive('/explore')}
                        onPress={() => navigateTo('/explore')}
                    />
                    <SidebarItem
                        label="Theming"
                        active={isActive('/explore/theming')}
                        onPress={() => navigateTo('/explore/theming')}
                    />
                </SidebarSection>
                <SidebarSection title="Foundation" icon={{library: 'Feather', name: 'book-open'}}>
                    <SidebarItem
                        label="Tokens"
                        active={isActive('/explore/tokens')}
                        onPress={() => navigateTo('/explore/tokens')}
                    />
                    <SidebarItem
                        label="Icons"
                        active={isActive('/explore/icons')}
                        onPress={() => navigateTo('/explore/icons')}
                    />
                </SidebarSection>
                <SidebarSection title="Components" icon={{library: 'Feather', name: 'box'}}>
                    <SidebarItem
                        label="Screen"
                        active={isActive('/explore/screen')}
                        onPress={() => navigateTo('/explore/screen')}
                    />
                    <SidebarItem
                        label="Container"
                        active={isActive('/explore/container')}
                        onPress={() => navigateTo('/explore/container')}
                    />
                    <SidebarItem
                        label="ThemedView"
                        active={isActive('/explore/themed-view')}
                        onPress={() => navigateTo('/explore/themed-view')}
                    />
                    <SidebarItem
                        label="Typography"
                        active={isActive('/explore/typography')}
                        onPress={() => navigateTo('/explore/typography')}
                    />
                    <SidebarItem
                        label="ThemedImage"
                        active={isActive('/explore/themed-image')}
                        onPress={() => navigateTo('/explore/themed-image')}
                    />
                    <SidebarItem
                        label="Button"
                        active={isActive('/explore/button')}
                        onPress={() => navigateTo('/explore/button')}
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
                <Stack.Screen name="index" options={{title: 'Installation'}} />
                <Stack.Screen name="theming" options={{title: 'Theming'}} />
                <Stack.Screen name="tokens" options={{title: 'Tokens'}} />
                <Stack.Screen name="icons" options={{title: 'Icons'}} />
                <Stack.Screen name="screen" options={{title: 'Screen'}} />
                <Stack.Screen name="container" options={{title: 'Container'}} />
                <Stack.Screen name="themed-view" options={{title: 'ThemedView'}} />
                <Stack.Screen name="typography" options={{title: 'Typography'}} />
                <Stack.Screen name="themed-image" options={{title: 'ThemedImage'}} />
                <Stack.Screen name="button" options={{title: 'Button'}} />
            </Stack>
            </>
    );
}
