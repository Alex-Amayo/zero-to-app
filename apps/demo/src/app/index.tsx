import { useTheme, Screen, Container, ThemedView, Typography, Button } from 'zero-to-app';
import { router } from "expo-router";
import { Image, StyleSheet } from "react-native";

const FEATURES = [
  {
    title: 'Material Design 3 ',
    description: 'Utilize Google’s open-source design system to build beautiful and accessible apps',
  },
  {
    title: 'Material Design 3',
    description: 'Design system, color palette generation, beautiful and accessible apps',
  },
  {
    title: 'Native Swift & Kotlin Components',
    description: 'Built with Expo 55 and Expo Router, leveraging native SwiftUI and Kotlin components to deliver optimal performance and true platform fidelity.',
  },
  {
    title: 'Responsive',
    description: 'Adaptive layouts that look perfect on phones, tablets, and desktop screens.',
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
            Ship beautiful cross-platform apps in record time
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
          variant="outlined"
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
