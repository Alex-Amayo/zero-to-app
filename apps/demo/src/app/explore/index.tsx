import React from 'react';
import { useRouter } from 'expo-router';
import { Typography, ThemedView, Button, Screen, useTheme, Container, NativeHeader, useSidebar } from 'zero-to-app';


export default function ExploreIndex() {
  const router = useRouter();
  const { spacing } = useTheme();

  const pages = [
    {
      name: 'Tokens',
      description: 'Design tokens reference: colors, spacing, border radius, typography, and component tokens',
      route: '/explore/tokens',
    },
    {
      name: 'Icons',
      description: 'Icon system reference with 12 supported libraries, usage patterns, and icon gallery',
      route: '/explore/icons',
    },
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
      <Screen scrollable variant="background" edges={['bottom']} padded={false} contentContainerStyle={{ paddingTop: spacing.xxxl }}>
        <Container style={{ gap: spacing.xxl }}>
          <ThemedView style={{ gap: spacing.xl }}>
            <Typography variant="headlineMedium" weight="bold">
              Explore Docs
            </Typography>
            <Typography variant="bodyMedium" muted>
              Browse foundation docs and component demos to see the theming system in action.
            </Typography>
          </ThemedView>
          <ThemedView columns={3} gap={spacing.lg}>
            {pages.map((page) => (
              <ThemedView
                key={page.name}
                variant="card"
                style={{
                  padding: spacing.xl,
                  borderRadius: spacing.md,
                  gap: spacing.md,
                }}
              >
                <Typography variant="titleMedium" weight="medium">
                  {page.name}
                </Typography>
                <Typography variant="bodySmall" muted style={{ flex: 1 }}>
                  {page.description}
                </Typography>
                <Button
                  title="View"
                  variant="tonal"
                  size="xs"
                  onPress={() => router.push(page.route as any)}
                />
              </ThemedView>
            ))}
          </ThemedView>
        </Container>
      </Screen>
    </>
  );
}
