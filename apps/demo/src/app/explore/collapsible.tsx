import React, { useState } from 'react';
import { View } from 'react-native';
import { Typography, Collapsible, Screen, Button, useTheme, NativeHeader, useSidebar } from 'zero-to-app';
import { DemoSection } from '../../components/demo-section';
import { PropsTable, type PropDefinition } from '../../components/props-table';

const collapsibleProps: PropDefinition[] = [
  {
    name: 'title',
    type: 'string',
    description: 'Title text displayed in the header',
  },
  {
    name: 'children',
    type: 'React.ReactNode',
    description: 'Content to show when expanded',
  },
  {
    name: 'open',
    type: 'boolean',
    description: 'Controlled open state. If provided, component becomes controlled',
  },
  {
    name: 'defaultOpen',
    type: 'boolean',
    default: 'false',
    description: 'Whether the collapsible starts expanded (uncontrolled mode)',
  },
  {
    name: 'onToggle',
    type: '(isOpen: boolean) => void',
    description: 'Callback when the open state changes',
  },
  {
    name: 'headerVariant',
    type: "'surface' | 'surfaceContainer' | 'card' | 'primary'",
    default: "'surfaceContainer'",
    description: 'ThemedView variant for the icon button background',
  },
  {
    name: 'contentVariant',
    type: "'surface' | 'surfaceContainer' | 'card'",
    default: "'surfaceContainer'",
    description: 'ThemedView variant for the content area',
  },
  {
    name: 'iconLibrary',
    type: 'IconLibrary',
    default: "'Feather'",
    description: 'Icon library to use for the chevron',
  },
  {
    name: 'iconName',
    type: 'string',
    default: "'chevron-right'",
    description: 'Custom icon name for the chevron',
  },
];

export default function CollapsiblePage() {
  const [controlledOpen, setControlledOpen] = useState(false);
  const { spacing } = useTheme();
  const { open } = useSidebar();

  return (
    <>
      <NativeHeader rightIcon="sidebar.left" onRightPress={open} />
      <Screen scrollable variant="background" edges={['bottom']}>
        <View style={{ paddingHorizontal: spacing.xxl, gap: spacing.xxl }}>
          <View style={{ gap: spacing.xs }}>
            <Typography variant="headlineMedium" weight="bold">
              Collapsible
          </Typography>
          <Typography variant="bodyMedium" muted>
            Expandable/collapsible content sections with animated transitions.
          </Typography>
        </View>

        <DemoSection
          title="Basic Usage"
          description="Simple collapsible section with default styling"
        >
          <Collapsible title="Click to expand">
            <Typography>
              This content is hidden by default and revealed when the header is pressed.
              The chevron icon rotates to indicate the expanded state.
            </Typography>
          </Collapsible>
        </DemoSection>

        <DemoSection
          title="Default Open"
          description="Collapsible that starts in an expanded state"
        >
          <Collapsible title="Already expanded" defaultOpen>
            <Typography>
              This collapsible starts in an open state. Click the header to collapse it.
            </Typography>
          </Collapsible>
        </DemoSection>

        <DemoSection
          title="Controlled State"
          description="External control over the open state"
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.md, marginBottom: spacing.md }}>
            <Button
              title={controlledOpen ? 'Close' : 'Open'}
              variant="tonal"
              size="xs"
              onPress={() => setControlledOpen(!controlledOpen)}
            />
            <Typography variant="bodySmall" muted>
              State: {controlledOpen ? 'Open' : 'Closed'}
            </Typography>
          </View>
          <Collapsible
            title="Controlled section"
            open={controlledOpen}
            onToggle={setControlledOpen}
          >
            <Typography>
              This collapsible is controlled by external state.
              Both the button and the header can toggle it.
            </Typography>
          </Collapsible>
        </DemoSection>

        <DemoSection
          title="Nested Collapsibles"
          description="Collapsibles can be nested within each other"
        >
          <Collapsible title="Outer section">
            <Typography style={{ marginBottom: spacing.md }}>
              This is the outer content. Click below for more.
            </Typography>
            <Collapsible title="Inner section" contentVariant="card">
              <Typography>
                This is nested inside the outer collapsible.
              </Typography>
            </Collapsible>
          </Collapsible>
        </DemoSection>

        <DemoSection
          title="Style Variants"
          description="Different header and content background variants"
        >
          <View style={{ gap: spacing.lg }}>
            <Collapsible
              title="Surface variant"
              headerVariant="surface"
              contentVariant="surface"
            >
              <Typography>Content with surface styling</Typography>
            </Collapsible>
            <Collapsible
              title="Card variant"
              headerVariant="surfaceContainer"
              contentVariant="card"
            >
              <Typography>Content with card styling</Typography>
            </Collapsible>
          </View>
        </DemoSection>

        <Typography variant="titleLarge" weight="medium" style={{ marginTop: spacing.lg }}>
          Props
        </Typography>
        <PropsTable props={collapsibleProps} />
      </View>
    </Screen>
    </>
  );
}
