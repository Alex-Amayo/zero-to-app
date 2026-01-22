import { StyleSheet, View, Platform } from 'react-native';
import ParallaxScrollView from '../../components/parallax-scroll-view';
import { StyledText } from 'zero-to-app';
import { IconSymbol } from '../../components/ui/icon-symbol';
import { ComponentPreviewCard } from '../../components/showcase/ComponentPreviewCard';
import { componentData } from '../../components/showcase/componentData';

export default function TabTwoScreen() {
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
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="square.grid.2x2"
          style={styles.headerImage}
        />
      }>
      <View style={styles.titleContainer}>
        <StyledText fontSize="xl" bold>
          Component Showcase
        </StyledText>
      </View>
      <StyledText fontSize="md" muted style={styles.subtitle}>
        Explore the zero-to-app design system components with live previews, code examples, and
        documentation.
      </StyledText>

      {Object.entries(componentsByCategory).map(([category, components]) => (
        <View key={category} style={styles.categorySection}>
          <View style={styles.categoryHeader}>
            <StyledText fontSize="lg" bold>
              {category}
            </StyledText>
            <View style={styles.categoryBadge}>
              <StyledText fontSize="xs" color="#0a7ea4">
                {components.length} {components.length === 1 ? 'component' : 'components'}
              </StyledText>
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
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
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
    backgroundColor: '#e3f2fd',
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
