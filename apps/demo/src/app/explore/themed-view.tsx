import React from 'react';
import { View } from 'react-native';
import { Typography, ThemedView, useTheme, Screen, NativeHeader, useSidebar } from 'zero-to-app';
import { DemoSection } from '../../components/demo-section';
import { PropsTable, type PropDefinition } from '../../components/props-table';

const themedViewProps: PropDefinition[] = [
  {
    name: 'variant',
    type: "'surface' | 'surfaceContainer' | 'card' | 'appbar' | 'primary' | 'background'",
    default: "'surface'",
    description: 'Semantic background variant from the theme',
  },
  {
    name: 'color',
    type: 'string',
    description: 'Override with a specific background color',
  },
  {
    name: 'columns',
    type: 'number',
    description: 'Number of columns on medium+ screens (1 column on small). Enables responsive grid layout.',
  },
  {
    name: 'gap',
    type: 'number',
    description: 'Gap between items when columns is set',
  },
  {
    name: 'rounded',
    type: 'boolean',
    default: 'true',
    description: 'Apply border radius from theme',
  },
  {
    name: 'style',
    type: 'ViewStyle',
    description: 'Additional styles to apply',
  },
  {
    name: 'children',
    type: 'React.ReactNode',
    description: 'Content to render inside the themed view',
  },
];

export default function ThemedViewPage() {
  const theme = useTheme();
  const { spacing } = theme;

  const { open } = useSidebar();
  const rowStyle = { flexDirection: 'row' as const, flexWrap: 'wrap' as const, gap: spacing.md };

  return (
    <>
      <NativeHeader rightIcon="sidebar.right" onRightPress={open} />
      <Screen scrollable variant="background" edges={['bottom']}>
        <View style={{ paddingHorizontal: spacing.xxl, paddingTop: spacing.xxl, gap: spacing.xxl }}>
          <View style={{ gap: spacing.xs }}>
            <Typography variant="headlineMedium" weight="bold">
              ThemedView
          </Typography>
          <Typography variant="bodyMedium" muted>
            Theme-aware View component with semantic background variants for consistent styling.
          </Typography>
        </View>

        <DemoSection
          title="Surface Variants"
          description="Different surface levels for visual hierarchy"
        >
          <View style={rowStyle}>
            <ThemedView variant="background" style={{ padding: spacing.lg, borderRadius: spacing.md, minWidth: 140, gap: spacing.xs }}>
              <Typography variant="labelMedium" weight="medium">background</Typography>
              <Typography variant="labelSmall" muted>Page backgrounds</Typography>
            </ThemedView>

            <ThemedView variant="surface" style={{ padding: spacing.lg, borderRadius: spacing.md, minWidth: 140, gap: spacing.xs }}>
              <Typography variant="labelMedium" weight="medium">surface</Typography>
              <Typography variant="labelSmall" muted>Default surface</Typography>
            </ThemedView>

            <ThemedView variant="surfaceContainer" style={{ padding: spacing.lg, borderRadius: spacing.md, minWidth: 140, gap: spacing.xs }}>
              <Typography variant="labelMedium" weight="medium">surfaceContainer</Typography>
              <Typography variant="labelSmall" muted>Container surfaces</Typography>
            </ThemedView>

            <ThemedView variant="card" style={{ padding: spacing.lg, borderRadius: spacing.md, minWidth: 140, gap: spacing.xs }}>
              <Typography variant="labelMedium" weight="medium">card</Typography>
              <Typography variant="labelSmall" muted>Card backgrounds</Typography>
            </ThemedView>

            <ThemedView variant="appbar" style={{ padding: spacing.lg, borderRadius: spacing.md, minWidth: 140, gap: spacing.xs }}>
              <Typography variant="labelMedium" weight="medium">appbar</Typography>
              <Typography variant="labelSmall" muted>App bar backgrounds</Typography>
            </ThemedView>

            <ThemedView variant="primary" style={{ padding: spacing.lg, borderRadius: spacing.md, minWidth: 140, gap: spacing.xs }}>
              <Typography variant="labelMedium" weight="medium" color={theme.onPrimary}>
                primary
              </Typography>
              <Typography variant="labelSmall" color={theme.onPrimary} style={{ opacity: 0.8 }}>
                Primary brand color
              </Typography>
            </ThemedView>
          </View>
        </DemoSection>

        <DemoSection
          title="Custom Colors"
          description="Override the variant with a specific color"
        >
          <View style={rowStyle}>
            <ThemedView color="#E8DEF8" style={{ padding: spacing.lg, borderRadius: spacing.sm, minWidth: 100, alignItems: 'center' }}>
              <Typography variant="labelMedium">#E8DEF8</Typography>
            </ThemedView>
            <ThemedView color="#D0BCFF" style={{ padding: spacing.lg, borderRadius: spacing.sm, minWidth: 100, alignItems: 'center' }}>
              <Typography variant="labelMedium">#D0BCFF</Typography>
            </ThemedView>
            <ThemedView color="#6750A4" style={{ padding: spacing.lg, borderRadius: spacing.sm, minWidth: 100, alignItems: 'center' }}>
              <Typography variant="labelMedium" color="#FFFFFF">#6750A4</Typography>
            </ThemedView>
          </View>
        </DemoSection>

        <DemoSection
          title="Responsive Grid"
          description="Use columns prop for automatic responsive layouts (2 columns on medium+, 1 on small)"
        >
          <ThemedView columns={2} gap={spacing.lg}>
            <ThemedView variant="card" style={{ padding: spacing.lg, gap: spacing.xs }}>
              <Typography variant="titleSmall" weight="medium">Card 1</Typography>
              <Typography variant="bodySmall" muted>Automatically responsive</Typography>
            </ThemedView>
            <ThemedView variant="card" style={{ padding: spacing.lg, gap: spacing.xs }}>
              <Typography variant="titleSmall" weight="medium">Card 2</Typography>
              <Typography variant="bodySmall" muted>No manual breakpoint logic</Typography>
            </ThemedView>
            <ThemedView variant="card" style={{ padding: spacing.lg, gap: spacing.xs }}>
              <Typography variant="titleSmall" weight="medium">Card 3</Typography>
              <Typography variant="bodySmall" muted>Just set columns={'{2}'}</Typography>
            </ThemedView>
            <ThemedView variant="card" style={{ padding: spacing.lg, gap: spacing.xs }}>
              <Typography variant="titleSmall" weight="medium">Card 4</Typography>
              <Typography variant="bodySmall" muted>Children get responsive styles</Typography>
            </ThemedView>
          </ThemedView>
        </DemoSection>

        <DemoSection
          title="Use Cases"
          description="Common patterns for using ThemedView"
        >
          <View style={{ gap: spacing.lg }}>
            <ThemedView variant="card" style={{ padding: spacing.xl, borderRadius: spacing.lg, gap: spacing.sm }}>
              <Typography variant="titleMedium" weight="medium">Card Component</Typography>
              <Typography variant="bodySmall" muted>
                Use the card variant for elevated content cards
              </Typography>
            </ThemedView>

            <ThemedView variant="surface" style={{ padding: spacing.lg, borderRadius: spacing.md, gap: spacing.md }}>
              <Typography variant="labelMedium" weight="medium">Surface</Typography>
              <ThemedView variant="surfaceContainer" style={{ padding: spacing.md, borderRadius: spacing.sm }}>
                <Typography variant="labelSmall">surfaceContainer (nested)</Typography>
              </ThemedView>
            </ThemedView>
          </View>
        </DemoSection>

        <Typography variant="titleLarge" weight="medium" style={{ marginTop: spacing.lg }}>
          Props
        </Typography>
        <PropsTable props={themedViewProps} />
      </View>
    </Screen>
    </>
  );
}
