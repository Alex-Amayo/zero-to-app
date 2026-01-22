import { Platform, StyleSheet, View, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyledText, Button, Card } from 'zero-to-app';
import { HelloWave } from '../../components/hello-wave';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container} edges={Platform.OS === 'web' ? [] : ['top', 'bottom']}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <View style={styles.heroSection}>
            <View style={styles.titleContainer}>
              <StyledText fontSize="xl" bold>
                Welcome to Zero to App!
              </StyledText>
              <HelloWave />
            </View>
            <StyledText fontSize="md" muted style={styles.subtitle}>
              A modern design system and component library for React Native and Expo
            </StyledText>
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
            <StyledText fontSize="lg" bold style={styles.sectionTitle}>
              Features
            </StyledText>
            <View style={styles.featuresGrid}>
              <Card style={styles.featureCard}>
                <StyledText fontSize="md" bold style={styles.featureTitle}>
                  Component Showcase
                </StyledText>
                <StyledText fontSize="sm" muted>
                  Browse and interact with all available components in our showcase
                </StyledText>
              </Card>
              <Card style={styles.featureCard}>
                <StyledText fontSize="md" bold style={styles.featureTitle}>
                  Theme Support
                </StyledText>
                <StyledText fontSize="sm" muted>
                  Built-in light and dark mode support with customizable branding
                </StyledText>
              </Card>
              <Card style={styles.featureCard}>
                <StyledText fontSize="md" bold style={styles.featureTitle}>
                  Cross-Platform
                </StyledText>
                <StyledText fontSize="sm" muted>
                  Works seamlessly on iOS, Android, and Web
                </StyledText>
              </Card>
            </View>
          </View>

          <View style={styles.quickStartSection}>
            <StyledText fontSize="lg" bold style={styles.sectionTitle}>
              Quick Start
            </StyledText>
            <View style={styles.stepContainer}>
              <StyledText fontSize="md" bold>
                1. Explore Components
              </StyledText>
              <StyledText fontSize="sm" muted>
                Check out the Components tab to see all available components with live previews and code
                examples.
              </StyledText>
            </View>
            <View style={styles.stepContainer}>
              <StyledText fontSize="md" bold>
                2. Customize Your Brand
              </StyledText>
              <StyledText fontSize="sm" muted>
                Modify the brand configuration in <StyledText bold>app/_layout.tsx</StyledText> to
                match your design.
              </StyledText>
            </View>
            <View style={styles.stepContainer}>
              <StyledText fontSize="md" bold>
                3. Build Your App
              </StyledText>
              <StyledText fontSize="sm" muted>
                Use the components from <StyledText bold>zero-to-app</StyledText> to build your
                application.
              </StyledText>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
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
    gap: 16,
    alignItems: 'center',
    paddingVertical: 32,
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
  quickStartSection: {
    gap: 16,
  },
  stepContainer: {
    gap: 8,
    paddingVertical: 12,
  },
});
