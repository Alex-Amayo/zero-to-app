import React from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { Typography, ThemedView, Button, Screen, useDimensions, breakpoints } from 'zero-to-app';

export default function ExploreIndex() {
  const router = useRouter();
  const { width } = useDimensions();
  const isDesktop = width >= breakpoints.large;

  const components = [
    {
      name: 'Button',
      description: 'Material Design 3 buttons with 5 variants, sizes, icons, and loading states',
      route: '/explore/button',
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

  return (
    <Screen scrollable variant="background" edges={Platform.OS === 'web' || isDesktop ? ['top', 'bottom'] : ['bottom']}>
      <View style={styles.container}>
        <Typography variant="headlineMedium" weight="bold">
          Component Showcase
        </Typography>
        <Typography variant="bodyMedium" muted style={styles.subtitle}>
          Explore the Zero to App component library
        </Typography>

        <View style={styles.grid}>
          {components.map((component) => (
            <ThemedView key={component.name} variant="surface" style={styles.card}>
              <Typography variant="titleMedium" weight="medium">
                {component.name}
              </Typography>
              <Typography variant="bodySmall" muted style={styles.cardDescription}>
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
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    gap: 8,
  },
  subtitle: {
    marginBottom: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  card: {
    padding: 20,
    borderRadius: 12,
    gap: 12,
    minWidth: 250,
    maxWidth: 350,
    flex: 1,
  },
  cardDescription: {
    flex: 1,
  },
});
