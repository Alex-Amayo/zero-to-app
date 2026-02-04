import React from 'react';
import { ScrollView, StyleSheet, View, Platform } from 'react-native';
import { Typography, ThemedView, Screen, useDimensions, breakpoints } from 'zero-to-app';
import { DemoSection } from '../../components/demo-section';
import { PropsTable, type PropDefinition } from '../../components/props-table';

const typographyProps: PropDefinition[] = [
  {
    name: 'children',
    type: 'React.ReactNode',
    description: 'Text content to render',
  },
  {
    name: 'variant',
    type: "'displayLarge' | 'displayMedium' | 'displaySmall' | 'headlineLarge' | 'headlineMedium' | 'headlineSmall' | 'titleLarge' | 'titleMedium' | 'titleSmall' | 'bodyLarge' | 'bodyMedium' | 'bodySmall' | 'labelLarge' | 'labelMedium' | 'labelSmall'",
    default: "'bodyMedium'",
    description: 'Typography scale variant following M3 type system',
  },
  {
    name: 'weight',
    type: "'light' | 'regular' | 'medium' | 'bold' | number",
    default: "'regular'",
    description: 'Font weight using semantic names or numeric values',
  },
  {
    name: 'align',
    type: "'left' | 'center' | 'right' | 'justify'",
    default: "'left'",
    description: 'Text alignment',
  },
  {
    name: 'color',
    type: 'string',
    description: "Custom text color. Defaults to theme's onSurface color",
  },
  {
    name: 'muted',
    type: 'boolean',
    default: 'false',
    description: "Apply muted styling using theme's onSurfaceVariant color",
  },
  {
    name: 'uppercase',
    type: 'boolean',
    default: 'false',
    description: 'Transform text to uppercase',
  },
  {
    name: 'numberOfLines',
    type: 'number',
    description: 'Maximum number of lines before truncating with ellipsis',
  },
];

export default function TypographyPage() {
  const { width } = useDimensions();
  const isDesktop = width >= breakpoints.large;

  return (
    <Screen scrollable variant="background" edges={Platform.OS === 'web' || isDesktop ? ['top', 'bottom'] : ['bottom']}>
      <View style={styles.container}>
        <Typography variant="headlineMedium" weight="bold">
          Typography
        </Typography>
        <Typography variant="bodyMedium" muted style={styles.description}>
          Material Design 3 type scale with display, headline, title, body, and label variants.
        </Typography>

        <DemoSection
          title="Display"
          description="Hero text and large promotional content (57-36px)"
        >
          <Typography variant="displayLarge">Display Large</Typography>
          <Typography variant="displayMedium">Display Medium</Typography>
          <Typography variant="displaySmall">Display Small</Typography>
        </DemoSection>

        <DemoSection
          title="Headline"
          description="Page titles and section headers (32-24px)"
        >
          <Typography variant="headlineLarge">Headline Large</Typography>
          <Typography variant="headlineMedium">Headline Medium</Typography>
          <Typography variant="headlineSmall">Headline Small</Typography>
        </DemoSection>

        <DemoSection
          title="Title"
          description="Card titles and list headers (22-14px)"
        >
          <Typography variant="titleLarge">Title Large</Typography>
          <Typography variant="titleMedium">Title Medium</Typography>
          <Typography variant="titleSmall">Title Small</Typography>
        </DemoSection>

        <DemoSection
          title="Body"
          description="Main content text (16-12px)"
        >
          <Typography variant="bodyLarge">Body Large - For longer reading content</Typography>
          <Typography variant="bodyMedium">Body Medium - Default body text style</Typography>
          <Typography variant="bodySmall">Body Small - Supporting or secondary text</Typography>
        </DemoSection>

        <DemoSection
          title="Label"
          description="Buttons, captions, and metadata (14-11px)"
        >
          <Typography variant="labelLarge">Label Large - Button text</Typography>
          <Typography variant="labelMedium">Label Medium - Tabs, chips</Typography>
          <Typography variant="labelSmall">Label Small - Captions, timestamps</Typography>
        </DemoSection>

        <DemoSection
          title="Font Weights"
          description="Semantic weight options for emphasis"
        >
          <View style={styles.row}>
            <Typography variant="bodyLarge" weight="light">Light</Typography>
            <Typography variant="bodyLarge" weight="regular">Regular</Typography>
            <Typography variant="bodyLarge" weight="medium">Medium</Typography>
            <Typography variant="bodyLarge" weight="bold">Bold</Typography>
          </View>
        </DemoSection>

        <DemoSection
          title="Text Styles"
          description="Muted, uppercase, and custom colors"
        >
          <Typography variant="bodyMedium">Normal text</Typography>
          <Typography variant="bodyMedium" muted>Muted text for secondary content</Typography>
          <Typography variant="labelLarge" uppercase>Uppercase label</Typography>
          <Typography variant="bodyMedium" color="#6750A4">Custom colored text</Typography>
        </DemoSection>

        <DemoSection
          title="Text Alignment"
          description="Control text alignment within its container"
        >
          <ThemedView variant="surfaceContainer" style={styles.alignmentDemo}>
            <Typography variant="bodyMedium" align="left">Left aligned (default)</Typography>
            <Typography variant="bodyMedium" align="center">Center aligned</Typography>
            <Typography variant="bodyMedium" align="right">Right aligned</Typography>
          </ThemedView>
        </DemoSection>

        <Typography variant="titleLarge" weight="medium" style={styles.propsTitle}>
          Props
        </Typography>
        <PropsTable props={typographyProps} />
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
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 24,
  },
  alignmentDemo: {
    padding: 12,
    borderRadius: 8,
    gap: 8,
  },
  propsTitle: {
    marginTop: 16,
  },
});
