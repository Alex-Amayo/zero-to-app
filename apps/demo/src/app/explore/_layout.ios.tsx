import React from 'react';
import {Stack} from 'expo-router';
import {
    useTheme,
    Sidebar,
    SidebarHeader,
    SidebarSection,
    SidebarItem,
    useRouteNavigation,
} from 'zero-to-app';
import { NAV_SECTIONS } from '../../config/nav';

export default function ExploreLayout() {
    const theme = useTheme();
    const { isActive, navigateTo } = useRouteNavigation();

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
                {NAV_SECTIONS.map((section) => (
                    <SidebarSection
                        key={section.title}
                        title={section.title}
                        icon={section.icon as any}
                    >
                        {section.items.map((item) => (
                            <SidebarItem
                                key={item.route}
                                label={item.label}
                                active={isActive(item.route, { exact: item.exact })}
                                onPress={() => navigateTo(item.route)}
                            />
                        ))}
                    </SidebarSection>
                ))}
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
                <Stack.Screen name="collapsible" options={{title: 'Collapsible'}} />
            </Stack>
        </>
    );
}
