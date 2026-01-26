import { StyleSheet, View, Platform, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import React from 'react';
import { Typography, useTheme } from 'zero-to-app';
import { ComponentPreviewCard } from '../../components/showcase/ComponentPreviewCard';
import { componentData } from '../../components/showcase/componentData';

export default function ComponentsScreen() {
  const insets = useSafeAreaInsets();
  const { values: theme } = useTheme();
  
  // Group components by category
  const componentsByCategory = componentData.reduce(
    (acc, component) => {
      if (!acc[component.category]) {
        acc[component.category] = [];
      }
      acc[component.category].push(component);
      return acc;
    },
    {} as Record<string, typeof componentData>,
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.surface }, Platform.OS !== 'web' && { paddingTop: insets.top }]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
      <View style={styles.content}>
        <View style={styles.titleContainer}>
          <Typography variant="displaySmall" weight="bold">
            Component Showcase
          </Typography>
        </View>
        <Typography variant="bodyMedium" muted style={styles.subtitle}>
          Explore the zero-to-app design system components with live previews, code examples, and
          documentation.
        </Typography>

        {Object.entries(componentsByCategory).map(([category, components]) => (
          <View key={category} style={styles.categorySection}>
            <View style={styles.categoryHeader}>
              <Typography variant="bodyLarge" weight="bold">
                {category}
              </Typography>
              <View style={[styles.categoryBadge, { backgroundColor: theme.isDark ? (theme.outlineVariant ?? theme.outline) : theme.primaryContainer }]}>
                <Typography variant="labelSmall" color={theme.primary}>
                  {components.length} {components.length === 1 ? 'component' : 'components'}
                </Typography>
              </View>
            </View>
            <View style={styles.componentsGrid}>
              {components.map((component) => (
                <View key={component.name} style={styles.cardWrapper}>
                  <ComponentPreviewCard component={component} />
                </View>
              ))}
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    padding: 24,
    gap: 32,
    maxWidth: 1200,
    alignSelf: 'center',
    width: '100%',
  },
  titleContainer: {
    marginBottom: 8,
  },
  subtitle: {
    marginBottom: 24,
  },
  categorySection: {
    marginBottom: 32,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  categoryBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  componentsGrid: {
    gap: 16,
    flexDirection: 'column',
    ...Platform.select({
      web: {
        flexDirection: 'row',
        flexWrap: 'wrap',
      },
      default: {
        // Mobile: single column (column is default)
      },
    }),
  },
  cardWrapper: {
    width: '100%',
    ...Platform.select({
      web: {
        width: 'calc(50% - 8px)',
        minWidth: 400,
        maxWidth: 600,
      },
      default: {
        width: '100%',
      },
    }),
  },
});
