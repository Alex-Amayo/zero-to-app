import React from 'react';
import { ScrollView, StyleSheet, View, Platform } from 'react-native';
import { Typography, ThemedView, Screen, useDimensions, breakpoints } from 'zero-to-app';
import { DemoSection } from '../../components/demo-section';
import { PropsTable, type PropDefinition } from '../../components/props-table';

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
    default: "['top', 'bottom']",
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
  const { width } = useDimensions();
  const isDesktop = width >= breakpoints.large;

  return (
    <Screen scrollable variant="background" edges={Platform.OS === 'web' || isDesktop ? ['top', 'bottom'] : ['bottom']}>
      <View style={styles.container}>
        <Typography variant="headlineMedium" weight="bold">
          Screen
        </Typography>
        <Typography variant="bodyMedium" muted style={styles.description}>
          Screen wrapper component providing consistent layout with native screen behavior,
          safe areas, themed backgrounds, and optional scrolling.
        </Typography>

        <DemoSection
          title="Features"
          description="Key features of the Screen component"
        >
          <View style={styles.featureList}>
            <ThemedView variant="surfaceContainer" style={styles.featureItem}>
              <Typography variant="labelLarge" weight="medium">Native Screen Container</Typography>
              <Typography variant="bodySmall" muted>
                Uses react-native-screens for truly native screen behavior and transitions
              </Typography>
            </ThemedView>

            <ThemedView variant="surfaceContainer" style={styles.featureItem}>
              <Typography variant="labelLarge" weight="medium">Safe Area Support</Typography>
              <Typography variant="bodySmall" muted>
                Automatically handles notches, status bars, and home indicators via SafeAreaView
              </Typography>
            </ThemedView>

            <ThemedView variant="surfaceContainer" style={styles.featureItem}>
              <Typography variant="labelLarge" weight="medium">Themed Backgrounds</Typography>
              <Typography variant="bodySmall" muted>
                Consistent background colors via ThemedView with variant support
              </Typography>
            </ThemedView>

            <ThemedView variant="surfaceContainer" style={styles.featureItem}>
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
          <ThemedView variant="surfaceContainer" style={styles.codeBlock}>
            <Typography variant="bodySmall" style={styles.code}>
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
          <ThemedView variant="surfaceContainer" style={styles.codeBlock}>
            <Typography variant="bodySmall" style={styles.code}>
              {`<Screen
  scrollable
  variant="surface"
  contentContainerStyle={{
    padding: 24,
    gap: 16
  }}
>
  <Typography>Content 1</Typography>
  <Typography>Content 2</Typography>
  <Typography>Content 3</Typography>
</Screen>`}
            </Typography>
          </ThemedView>
        </DemoSection>

        <DemoSection
          title="Custom Safe Area Edges"
          description="Control which edges respect safe areas"
        >
          <View style={styles.edgesDemo}>
            <ThemedView variant="surfaceContainer" style={styles.edgeBox}>
              <Typography variant="labelSmall" weight="medium">Top only</Typography>
              <Typography variant="labelSmall" muted style={styles.code}>
                edges={`{['top']}`}
              </Typography>
            </ThemedView>

            <ThemedView variant="surfaceContainer" style={styles.edgeBox}>
              <Typography variant="labelSmall" weight="medium">Bottom only</Typography>
              <Typography variant="labelSmall" muted style={styles.code}>
                edges={`{['bottom']}`}
              </Typography>
            </ThemedView>

            <ThemedView variant="surfaceContainer" style={styles.edgeBox}>
              <Typography variant="labelSmall" weight="medium">All edges</Typography>
              <Typography variant="labelSmall" muted style={styles.code}>
                edges={`{['top', 'bottom', 'left', 'right']}`}
              </Typography>
            </ThemedView>

            <ThemedView variant="surfaceContainer" style={styles.edgeBox}>
              <Typography variant="labelSmall" weight="medium">No edges</Typography>
              <Typography variant="labelSmall" muted style={styles.code}>
                edges={`{[]}`}
              </Typography>
            </ThemedView>
          </View>
        </DemoSection>

        <DemoSection
          title="Background Variants"
          description="Use different themed backgrounds"
        >
          <View style={styles.row}>
            <ThemedView variant="background" style={styles.variantExample}>
              <Typography variant="labelSmall">background</Typography>
            </ThemedView>
            <ThemedView variant="surface" style={styles.variantExample}>
              <Typography variant="labelSmall">surface</Typography>
            </ThemedView>
            <ThemedView variant="surfaceContainer" style={styles.variantExample}>
              <Typography variant="labelSmall">surfaceContainer</Typography>
            </ThemedView>
          </View>
        </DemoSection>

        <Typography variant="titleLarge" weight="medium" style={styles.propsTitle}>
          Props
        </Typography>
        <PropsTable props={screenProps} />
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
  featureList: {
    gap: 12,
  },
  featureItem: {
    padding: 16,
    borderRadius: 8,
    gap: 4,
  },
  codeBlock: {
    padding: 16,
    borderRadius: 8,
  },
  code: {
    fontFamily: 'monospace',
  },
  edgesDemo: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  edgeBox: {
    padding: 12,
    borderRadius: 8,
    minWidth: 120,
    gap: 4,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  variantExample: {
    padding: 16,
    borderRadius: 8,
    minWidth: 100,
    alignItems: 'center',
  },
  propsTitle: {
    marginTop: 16,
  },
});
