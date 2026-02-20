import React from 'react';
import { View } from 'react-native';
import { Typography, Screen, Container, ThemedView, useTheme, NativeHeader, useSidebar } from 'zero-to-app';
import { DemoSection } from '../../components/demo-section';
import { DocsPagination } from '../../components/docs-pagination';
import { PropsTable, type PropDefinition } from '../../components/props-table';

const containerProps: PropDefinition[] = [
  {
    name: 'maxWidth',
    type: 'number',
    default: '1000',
    description: 'Maximum width in pixels. Content is centered horizontally beyond this width.',
  },
  {
    name: 'variant',
    type: "'background' | 'surface' | 'surfaceContainer' | 'card' | 'appbar' | 'primary'",
    default: "'surface'",
    description: 'Inherited from ThemedView. background and surface resolve to the same color.',
  },
  {
    name: 'columns',
    type: 'number',
    description: 'Inherited from ThemedView. Responsive grid — multi-column on medium+ screens (≥768px), single column on small.',
  },
  {
    name: 'gap',
    type: 'number',
    description: 'Gap between grid columns when columns is set.',
  },
  {
    name: 'style',
    type: 'ViewStyle',
    description: 'Additional styles. Note: rounded is always false — apply borderRadius via style if needed.',
  },
];

function Placeholder({ label, height = 48 }: { label: string; height?: number }) {
  const theme = useTheme();
  return (
    <ThemedView
      variant="surfaceContainer"
      style={{
        height,
        borderRadius: theme.shape.surfaceBorderRadius,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: theme.outlineVariant,
      }}
    >
      <Typography variant="labelMedium" muted>{label}</Typography>
    </ThemedView>
  );
}

export default function ContainerPage() {
  const { open } = useSidebar();
  const { spacing, shape } = useTheme();

  return (
    <>
      <NativeHeader rightIcon="sidebar.left" onRightPress={open} />
      <Screen scrollable variant="background" edges={['bottom']} padded={false}>
        <View style={{ paddingHorizontal: spacing.xxl, paddingVertical: spacing.xxl, gap: spacing.xxl }}>
          <View style={{ gap: spacing.xs }}>
            <Typography variant="headlineMedium" weight="bold">Container</Typography>
            <Typography variant="bodyMedium" muted>
              Constrains content width for readability on large screens. Centers horizontally and applies consistent horizontal padding.
            </Typography>
          </View>

          <DemoSection
            title="Default (maxWidth 1000)"
            description="Content is constrained and centered. On narrow screens it fills the available width."
          >
            <Container style={{ gap: spacing.md, borderWidth: 1, borderColor: '#6750A430', borderRadius: shape.surfaceBorderRadius }}>
              <Placeholder label="Content" />
              <Placeholder label="Content" />
            </Container>
          </DemoSection>

          <DemoSection
            title="Custom maxWidth"
            description="Useful for narrow reading columns or tighter layouts."
          >
            <Container maxWidth={480} style={{ gap: spacing.md, borderWidth: 1, borderColor: '#6750A430', borderRadius: shape.surfaceBorderRadius }}>
              <Placeholder label="Narrow content (480px max)" />
            </Container>
          </DemoSection>

          <DemoSection
            title="Responsive grid"
            description="Inherits ThemedView's columns prop. Single column on small screens, multi-column on medium+ (≥768px)."
          >
            <Container columns={2} gap={spacing.md}>
              <Placeholder label="Col 1" />
              <Placeholder label="Col 2" />
            </Container>
            <Container columns={3} gap={spacing.md} style={{ marginTop: spacing.md }}>
              <Placeholder label="Col 1" />
              <Placeholder label="Col 2" />
              <Placeholder label="Col 3" />
            </Container>
          </DemoSection>

          <DemoSection
            title="Full-bleed layout pattern"
            description="Use padded={false} on Screen with Container inside to get a hero image edge-to-edge while keeping content constrained."
          >
            <ThemedView variant="surfaceContainer" style={{ borderRadius: shape.surfaceBorderRadius, overflow: 'hidden' }}>
              <View style={{ height: 64, backgroundColor: '#6750A420', alignItems: 'center', justifyContent: 'center' }}>
                <Typography variant="labelMedium" muted>Full-bleed hero (no Container)</Typography>
              </View>
              <Container style={{ paddingVertical: spacing.lg, gap: spacing.sm }}>
                <Placeholder label="Constrained content" />
              </Container>
            </ThemedView>
          </DemoSection>

          <Typography variant="titleLarge" weight="medium">Props</Typography>
          <PropsTable props={containerProps} />
          <DocsPagination />
        </View>
      </Screen>
    </>
  );
}
