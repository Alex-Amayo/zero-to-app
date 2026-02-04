import React from 'react';
import {StyleSheet, View} from 'react-native';
import {usePathname, useRouter, Stack} from 'expo-router';
import {
    Button,
    ThemedView,
    Sidebar,
    SidebarHeader,
    SidebarSection,
    SidebarItem,
    useSidebar,
    useDimensions,
    breakpoints,
    useTheme,
    SidebarContextType,
    Screen,
} from 'zero-to-app';

export default function ExploreLayout() {
    const pathname = usePathname();
    const router = useRouter();
    const {open} = useSidebar() as SidebarContextType;
    const {width} = useDimensions();
    const theme = useTheme();
    const isDesktop = width >= breakpoints.large;

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

    const getTitle = (path: any): string => {
        if (typeof path !== 'string') {
            return 'Explore';
        }
        const segments = path.split('/').filter(Boolean);
        const last = segments[segments.length - 1];
        if (!last || last === 'explore') return 'Explore';
        const title = last.charAt(0).toUpperCase() + last.slice(1);
        return typeof title === 'string' ? title : 'Explore';
    };

    return (
        <View style={styles.container}>
            <Sidebar
                header={
                    <SidebarHeader
                        title="Components"
                        subtitle="Zero to App UI"
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
                </SidebarSection>
            </Sidebar>

            <ThemedView
                variant="background"
                style={[
                    styles.content,
                    isDesktop && styles.contentWithSidebar,
                ]}
            >
                <Stack
                    screenOptions={{
                        headerShown: false,
                    }}
                />
            </ThemedView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    content: {
        flex: 1,
    },
    contentWithSidebar: {
        marginLeft: 280,
    },
    screen: {
        flex: 1,
    },
});
