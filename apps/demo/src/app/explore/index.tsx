import React from 'react';
import { Platform, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Typography, ThemedView, Button, Screen, useTheme, Container, NativeHeader, useSidebar } from 'zero-to-app';


export default function ExploreIndex() {
  const router = useRouter();
  const { spacing } = useTheme();

  const components = [
    {
      name: 'Button',
      description: 'Material Design 3 buttons with 5 variants, sizes, icons, and loading states',
      route: '/explore/button',
    },
    {
      name: 'Collapsible',
      description: 'Expandable/collapsible sections with animated transitions',
      route: '/explore/collapsible',
    },
    {
      name: 'Typography',
      description: 'Complete M3 type scale with display, headline, title, body, and label variants',
      route: '/explore/typography',
    },
    {
      name: 'ThemedView',
      description: 'Theme-aware container with surface variants for consistent backgrounds',
      route: '/explore/themed-view',
    },
    {
      name: 'Screen',
      description: 'Screen wrapper with safe areas, themed backgrounds, and optional scrolling',
      route: '/explore/screen',
    },
  ];

  const { open } = useSidebar();

  return (
    <>
      <NativeHeader rightIcon="sidebar.left" onRightPress={open} />
      <Screen scrollable variant="background" edges={['bottom']} contentContainerStyle={{ paddingTop: spacing.xxxl }}>
        <Container style={{ gap: spacing.xxl }}>
          <ThemedView style={{ gap: spacing.xl }}>
            <Typography variant="headlineMedium" weight="bold">
              Explore Components
            </Typography>
            <Typography variant="bodyMedium" muted>
              Browse the component demos to see the theming system in action and view usage examples.
            </Typography>
          </ThemedView>
          <ThemedView columns={3} gap={spacing.lg}>
            {components.map((component) => (
              <ThemedView
                key={component.name}
                variant="card"
                style={{
                  padding: spacing.xl,
                  borderRadius: spacing.md,
                  gap: spacing.md,
                }}
              >
                <Typography variant="titleMedium" weight="medium">
                  {component.name}
                </Typography>
                <Typography variant="bodySmall" muted style={{ flex: 1 }}>
                  {component.description}
                </Typography>
                <Button
                  title="View"
                  variant="tonal"
                  size="xs"
                  onPress={() => router.push(component.route as any)}
                />
              </ThemedView>
            ))}
          </ThemedView>
        </Container>
      </Screen>
    </>
  );
}
