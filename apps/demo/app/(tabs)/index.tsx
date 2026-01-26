import { Platform, StyleSheet, View, ScrollView, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import React from 'react';
import { Typography, Button } from 'zero-to-app';
import { HelloWave } from '../../components/hello-wave';

export default function HomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const themeDefaults = { surface: '#ffffff' };

  return (
    <View style={[styles.container, { backgroundColor: themeDefaults.surface }, Platform.OS !== 'web' && { paddingTop: insets.top }]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <View style={styles.heroSection}>
              {/* Logo removed from simplified demo — keep title only */}
            <View style={styles.titleContainer}>
              <Typography variant="displaySmall" weight="bold">
                Zero to App
              </Typography>
            </View>
            <Typography variant="bodyMedium" style={styles.subtitle}>
             React Native UI Library for iOS, Android, and Web
            </Typography>
            <View style={styles.buttonContainer}>
              <Button
                title="Explore Components"
                onPress={() => router.push('/(tabs)/components')}
                icon={{ library: 'Feather', name: 'arrow-right', size: 20 }}
                iconPosition="right"
              />
            </View>
          </View>

          <View style={styles.featuresSection}>
            <Typography variant="bodyLarge" weight="bold" style={styles.sectionTitle}>
              Features
            </Typography>
            <View style={styles.featuresGrid}>
              <View style={[styles.featureCard, styles.featureCardContainer]}>
                <Typography variant="bodyMedium" weight="bold" style={styles.featureTitle}>
                  Component Showcase
                </Typography>
                <Typography variant="bodySmall" muted>
                  Browse and interact with available components in the showcase
                </Typography>
              </View>
              <View style={[styles.featureCard, styles.featureCardContainer]}>
                <Typography variant="bodyMedium" weight="bold" style={styles.featureTitle}>
                  Theme Support
                </Typography>
                <Typography variant="bodySmall" muted>
                  Light/dark themes configured by the design system
                </Typography>
              </View>
              <View style={[styles.featureCard, styles.featureCardContainer]}>
                <Typography variant="bodyMedium" weight="bold" style={styles.featureTitle}>
                  Cross-Platform
                </Typography>
                <Typography variant="bodySmall" muted>
                  Works on iOS, Android, and Web
                </Typography>
              </View>
            </View>
          </View>

          <View style={styles.quickStartSection}>
            <Typography variant="bodyLarge" weight="bold" style={styles.sectionTitle}>
              Quick Start
            </Typography>
            <View style={styles.stepContainer}>
              <Typography variant="bodyMedium" weight="bold">
                1. Explore Components
              </Typography>
              <Typography variant="bodySmall" muted>
                Check out the Components tab to see all available components with live previews and code
                examples.
              </Typography>
            </View>
            <View style={styles.stepContainer}>
              <Typography variant="bodyMedium" weight="bold">
                2. Customize Your Brand
              </Typography>
              <Typography variant="bodySmall" muted>
                Modify the brand configuration in <Typography weight="bold">{'app/_layout.tsx'}</Typography> to
                match your design.
              </Typography>
            </View>
            <View style={styles.stepContainer}>
              <Typography variant="bodyMedium" weight="bold">
                3. Build Your App
              </Typography>
              <Typography variant="bodySmall" muted>
                Use the components from <Typography weight="bold">{'zero-to-app'}</Typography> to build your
                application.
              </Typography>
            </View>
          </View>
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
  heroSection: {
    gap: 20,
    alignItems: 'center',
    paddingVertical: 32,
  },
  logo: {
    width: 500,
    height: 80,
    marginBottom: 16,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  subtitle: {
    textAlign: 'center',
    maxWidth: 600,
  },
  buttonContainer: {
    marginTop: 8,
    width: '100%',
    maxWidth: 300,
  },
  featuresSection: {
    gap: 16,
  },
  sectionTitle: {
    marginBottom: 8,
  },
  featuresGrid: {
    gap: 16,
    ...Platform.select({
      web: {
        flexDirection: 'row',
        flexWrap: 'wrap',
      },
      default: {
        flexDirection: 'column',
      },
    }),
  },
  featureCard: {
    flex: 1,
    minWidth: 250,
    ...Platform.select({
      web: {
        maxWidth: 'calc(33.333% - 11px)',
      },
      default: {
        width: '100%',
      },
    }),
  },
  featureTitle: {
    marginBottom: 8,
  },
  featureCardContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: '#ececec',
  },
  quickStartSection: {
    gap: 16,
  },
  stepContainer: {
    gap: 8,
    paddingVertical: 12,
  },
});
