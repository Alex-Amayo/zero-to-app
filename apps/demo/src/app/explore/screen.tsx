import React from 'react';
import {View} from 'react-native';
import {Typography, ThemedView, Screen, useTheme, NativeHeader, useSidebar} from 'zero-to-app';
import {DemoSection} from '../../components/demo-section';
import {PropsTable, type PropDefinition} from '../../components/props-table';

const screenProps: PropDefinition[] = [
    {
        name: 'children',
        type: 'React.ReactNode',
        description: 'Screen content',
    },
    {
        name: 'scrollable',
        type: 'boolean',
        default: 'false',
        description: 'Whether to wrap content in ScrollView',
    },
    {
        name: 'variant',
        type: "'surface' | 'surfaceContainer' | 'card' | 'appbar' | 'primary' | 'background'",
        default: "'background'",
        description: 'Themed background variant',
    },
    {
        name: 'edges',
        type: "Edge[] ('top' | 'bottom' | 'left' | 'right')[]",
        default: "['bottom']",
        description: 'Which safe area edges to respect',
    },
    {
        name: 'contentContainerStyle',
        type: 'StyleProp<ViewStyle>',
        description: 'Styles for the ScrollView content container (only applies if scrollable=true)',
    },
    {
        name: 'style',
        type: 'StyleProp<ViewStyle>',
        description: 'Styles for the outer container',
    },
    {
        name: 'showsVerticalScrollIndicator',
        type: 'boolean',
        default: 'true',
        description: 'Whether to show vertical scroll indicator',
    },
    {
        name: 'testID',
        type: 'string',
        description: 'Test ID for testing',
    },
];

export default function ScreenPage() {
    const {spacing} = useTheme();

    const {open} = useSidebar();
    const rowStyle = {flexDirection: 'row' as const, flexWrap: 'wrap' as const, gap: spacing.md};

    return (
        <>
            <NativeHeader rightIcon="sidebar.right" onRightPress={open} />
            <Screen scrollable variant="background" edges={['bottom']}>
                <View style={{paddingHorizontal: spacing.xxl, gap: spacing.xxl}}>
                    <View style={{gap: spacing.xs}}>
                        <Typography variant="headlineMedium" weight="bold">
                            Screen
                    </Typography>
                    <Typography variant="bodyMedium" muted>
                        Screen wrapper component providing consistent layout with safe areas, themed backgrounds, and
                        optional scrolling.
                    </Typography>
                </View>

                <DemoSection
                    title="Features"
                    description="Key features of the Screen component"
                >
                    <View style={{gap: spacing.md}}>
                        <ThemedView variant="surfaceContainer"
                                    style={{padding: spacing.lg, borderRadius: spacing.sm, gap: spacing.xs}}>
                            <Typography variant="labelLarge" weight="medium">Safe Area Support</Typography>
                            <Typography variant="bodySmall" muted>
                                Automatically handles notches, status bars, and home indicators via SafeAreaView
                            </Typography>
                        </ThemedView>

                        <ThemedView variant="surfaceContainer"
                                    style={{padding: spacing.lg, borderRadius: spacing.sm, gap: spacing.xs}}>
                            <Typography variant="labelLarge" weight="medium">Themed Backgrounds</Typography>
                            <Typography variant="bodySmall" muted>
                                Consistent background colors via ThemedView with variant support
                            </Typography>
                        </ThemedView>

                        <ThemedView variant="surfaceContainer"
                                    style={{padding: spacing.lg, borderRadius: spacing.sm, gap: spacing.xs}}>
                            <Typography variant="labelLarge" weight="medium">Optional Scrolling</Typography>
                            <Typography variant="bodySmall" muted>
                                Enable scrollable content with the scrollable prop
                            </Typography>
                        </ThemedView>
                    </View>
                </DemoSection>

                <DemoSection
                    title="Basic Usage"
                    description="Non-scrollable screen with default settings"
                >
                    <ThemedView variant="surfaceContainer" style={{padding: spacing.lg, borderRadius: spacing.sm}}>
                        <Typography variant="bodySmall" style={{fontFamily: 'monospace'}}>
                            {`<Screen variant="background">
  <Typography variant="headlineLarge">
    Welcome
  </Typography>
  <Button title="Get Started" />
</Screen>`}
                        </Typography>
                    </ThemedView>
                </DemoSection>

                <DemoSection
                    title="Scrollable Screen"
                    description="Enable scrolling for long content"
                >
                    <ThemedView variant="surfaceContainer" style={{padding: spacing.lg, borderRadius: spacing.sm}}>
                        <Typography variant="bodySmall" style={{fontFamily: 'monospace'}}>
                            {`<Screen
  scrollable
  variant="surface"
  contentContainerStyle={{
    padding: spacing.xxl,
    gap: spacing.lg
  }}
>
  <Typography>Content 1</Typography>
  <Typography>Content 2</Typography>
</Screen>`}
                        </Typography>
                    </ThemedView>
                </DemoSection>

                <DemoSection
                    title="Custom Safe Area Edges"
                    description="Control which edges respect safe areas"
                >
                    <View style={rowStyle}>
                        <ThemedView variant="surfaceContainer" style={{
                            padding: spacing.md,
                            borderRadius: spacing.sm,
                            minWidth: 120,
                            gap: spacing.xs
                        }}>
                            <Typography variant="labelSmall" weight="medium">Top only</Typography>
                            <Typography variant="labelSmall" muted style={{fontFamily: 'monospace'}}>
                                edges={`{['top']}`}
                            </Typography>
                        </ThemedView>

                        <ThemedView variant="surfaceContainer" style={{
                            padding: spacing.md,
                            borderRadius: spacing.sm,
                            minWidth: 120,
                            gap: spacing.xs
                        }}>
                            <Typography variant="labelSmall" weight="medium">Bottom only</Typography>
                            <Typography variant="labelSmall" muted style={{fontFamily: 'monospace'}}>
                                edges={`{['bottom']}`}
                            </Typography>
                        </ThemedView>

                        <ThemedView variant="surfaceContainer" style={{
                            padding: spacing.md,
                            borderRadius: spacing.sm,
                            minWidth: 120,
                            gap: spacing.xs
                        }}>
                            <Typography variant="labelSmall" weight="medium">All edges</Typography>
                            <Typography variant="labelSmall" muted style={{fontFamily: 'monospace'}}>
                                edges={`{['top', 'bottom', 'left', 'right']}`}
                            </Typography>
                        </ThemedView>

                        <ThemedView variant="surfaceContainer" style={{
                            padding: spacing.md,
                            borderRadius: spacing.sm,
                            minWidth: 120,
                            gap: spacing.xs
                        }}>
                            <Typography variant="labelSmall" weight="medium">No edges</Typography>
                            <Typography variant="labelSmall" muted style={{fontFamily: 'monospace'}}>
                                edges={`{[]}`}
                            </Typography>
                        </ThemedView>
                    </View>
                </DemoSection>

                <DemoSection
                    title="Background Variants"
                    description="Use different themed backgrounds"
                >
                    <View style={rowStyle}>
                        <ThemedView variant="background" style={{
                            padding: spacing.lg,
                            borderRadius: spacing.sm,
                            minWidth: 100,
                            alignItems: 'center'
                        }}>
                            <Typography variant="labelSmall">background</Typography>
                        </ThemedView>
                        <ThemedView variant="surface" style={{
                            padding: spacing.lg,
                            borderRadius: spacing.sm,
                            minWidth: 100,
                            alignItems: 'center'
                        }}>
                            <Typography variant="labelSmall">surface</Typography>
                        </ThemedView>
                        <ThemedView variant="surfaceContainer" style={{
                            padding: spacing.lg,
                            borderRadius: spacing.sm,
                            minWidth: 100,
                            alignItems: 'center'
                        }}>
                            <Typography variant="labelSmall">surfaceContainer</Typography>
                        </ThemedView>
                    </View>
                </DemoSection>

                <Typography variant="titleLarge" weight="medium" style={{marginTop: spacing.lg}}>
                    Props
                </Typography>
                <PropsTable props={screenProps}/>
            </View>
        </Screen>
        </>
    );
}
