import React from 'react';
import { ScrollView, StyleSheet, View, Platform } from 'react-native';
import { Typography, ThemedView, useTheme, Screen, useDimensions, breakpoints } from 'zero-to-app';
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
  const { width } = useDimensions();
  const isDesktop = width >= breakpoints.large;

  return (
    <Screen scrollable variant="background" edges={Platform.OS === 'web' || isDesktop ? ['top', 'bottom'] : ['bottom']}>
      <View style={styles.container}>
        <Typography variant="headlineMedium" weight="bold">
          ThemedView
        </Typography>
        <Typography variant="bodyMedium" muted style={styles.description}>
          Theme-aware View component with semantic background variants for consistent styling.
        </Typography>

        <DemoSection
          title="Surface Variants"
          description="Different surface levels for visual hierarchy"
        >
          <View style={styles.variantsGrid}>
            <ThemedView variant="background" style={styles.variantBox}>
              <Typography variant="labelMedium" weight="medium">background</Typography>
              <Typography variant="labelSmall" muted>Page backgrounds</Typography>
            </ThemedView>

            <ThemedView variant="surface" style={styles.variantBox}>
              <Typography variant="labelMedium" weight="medium">surface</Typography>
              <Typography variant="labelSmall" muted>Default surface</Typography>
            </ThemedView>

            <ThemedView variant="surfaceContainer" style={styles.variantBox}>
              <Typography variant="labelMedium" weight="medium">surfaceContainer</Typography>
              <Typography variant="labelSmall" muted>Container surfaces</Typography>
            </ThemedView>

            <ThemedView variant="card" style={styles.variantBox}>
              <Typography variant="labelMedium" weight="medium">card</Typography>
              <Typography variant="labelSmall" muted>Card backgrounds</Typography>
            </ThemedView>

            <ThemedView variant="appbar" style={styles.variantBox}>
              <Typography variant="labelMedium" weight="medium">appbar</Typography>
              <Typography variant="labelSmall" muted>App bar backgrounds</Typography>
            </ThemedView>

            <ThemedView variant="primary" style={styles.variantBox}>
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
          <View style={styles.row}>
            <ThemedView color="#E8DEF8" style={styles.customBox}>
              <Typography variant="labelMedium">#E8DEF8</Typography>
            </ThemedView>
            <ThemedView color="#D0BCFF" style={styles.customBox}>
              <Typography variant="labelMedium">#D0BCFF</Typography>
            </ThemedView>
            <ThemedView color="#6750A4" style={styles.customBox}>
              <Typography variant="labelMedium" color="#FFFFFF">#6750A4</Typography>
            </ThemedView>
          </View>
        </DemoSection>

        <DemoSection
          title="Use Cases"
          description="Common patterns for using ThemedView"
        >
          <View style={styles.useCasesGrid}>
            {/* Card example */}
            <ThemedView variant="card" style={styles.cardExample}>
              <Typography variant="titleMedium" weight="medium">Card Component</Typography>
              <Typography variant="bodySmall" muted>
                Use the card variant for elevated content cards
              </Typography>
            </ThemedView>

            {/* Nested surfaces */}
            <ThemedView variant="surface" style={styles.nestedExample}>
              <Typography variant="labelMedium" weight="medium">Surface</Typography>
              <ThemedView variant="surfaceContainer" style={styles.nestedInner}>
                <Typography variant="labelSmall">surfaceContainer (nested)</Typography>
              </ThemedView>
            </ThemedView>
          </View>
        </DemoSection>

        <Typography variant="titleLarge" weight="medium" style={styles.propsTitle}>
          Props
        </Typography>
        <PropsTable props={themedViewProps} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    gap: 24,
  },
  description: {
    marginBottom: 8,
  },
  variantsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  variantBox: {
    padding: 16,
    borderRadius: 12,
    minWidth: 140,
    gap: 4,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  customBox: {
    padding: 16,
    borderRadius: 8,
    minWidth: 100,
    alignItems: 'center',
  },
  useCasesGrid: {
    gap: 16,
  },
  cardExample: {
    padding: 20,
    borderRadius: 16,
    gap: 8,
  },
  nestedExample: {
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
  nestedInner: {
    padding: 12,
    borderRadius: 8,
  },
  propsTitle: {
    marginTop: 16,
  },
});
