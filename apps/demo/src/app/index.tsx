import { useTheme, Screen, Container, ThemedView, Typography, Button } from 'zero-to-app';
import { router } from "expo-router";
import { Image, StyleSheet } from "react-native";

const FEATURES = [
  {
    title: 'iOS, Android, and Web',
    description: 'Single codebase with full support for iOS, Android, and web.',
  },
  {
    title: 'Native Components',
    description: 'Use SwiftUI and Jetpack Compose when needed for performance and deep platform integration.',
  },
  {
    title: 'Material Design 3',
    description: 'Build polished, accessible interfaces with Google’s open source design system.',
  },
  {
    title: 'Claude Skills',
    description: 'Accelerate development with AI powered skills that use primitives and design tokens to generate components, screens, and flows.',
  },
];


export default function HomeScreen() {
  const theme = useTheme();
  const { spacing } = theme;

  return (
    <Screen
      scrollable
      variant="background"
      edges={['top','bottom' ]}
    >
      {/* Hero Section */}
      <Container style={{ alignItems: 'center', gap: spacing.xxl}}>
        <Image
          source={require('../../assets/images/rocket.png')}
          style={styles.rocketImage}
          resizeMode="contain"
        />
        <ThemedView style={{ alignItems: 'center', gap: spacing.md }}>
          <Typography variant="displayLarge" weight="bold">
            Zero To App
          </Typography>
          <Typography variant="headlineSmall" align="center" color={theme.onSurfaceVariant}>
            A React Native component library
          </Typography>
        </ThemedView>

      </Container>

      {/* Features Grid */}
      <Container style={{ marginTop: spacing.xxxl }}>
        <ThemedView columns={2} gap={spacing.lg}>
          {FEATURES.map((feature, index) => (
            <ThemedView
              key={index}
              variant="card"
              style={{
                padding: spacing.xl,
                gap: spacing.sm,
              }}
            >
              <Typography variant="titleLarge" weight="bold">
                {feature.title}
              </Typography>
              <Typography variant="bodyLarge" color={theme.onSurfaceVariant}>
                {feature.description}
              </Typography>
            </ThemedView>
          ))}
        </ThemedView>
      </Container>

      {/* CTA Section */}
      <Container style={{ alignItems: 'center', gap: spacing.lg, marginTop: spacing.xxxl }}>
        <Typography variant="headlineMedium" align="center" weight="bold">
          Ready to launch?
        </Typography>
        <Typography variant="bodyLarge" align="center" color={theme.onSurfaceVariant}>
          Explore our component library and start building today
        </Typography>
        <Button
          title="View Components"
          variant="filled"
          onPress={() => router.push('/explore')}
        />
      </Container>
    </Screen>
  );
}

const styles = StyleSheet.create({
  rocketImage: {
    width: 160,
    height: 160,
  },
});
