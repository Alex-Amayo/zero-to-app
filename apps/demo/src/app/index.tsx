import { useTheme, Screen, Container, ThemedView, Typography, Button, Collapsible } from 'zero-to-app';
import { router } from "expo-router";
import { Image, Platform, StyleSheet } from "react-native";

const FEATURES = [
  {
    title: 'iOS, Android, and Web',
    description: 'Single codebase with full support for iOS, Android, and web.',
  },
  {
    title: 'Material Design 3',
    description: 'Build polished, accessible interfaces with Google’s open source design system.',
  },
  {
    title: 'Native Components',
    description: 'Use SwiftUI and Jetpack Compose when needed for performance and deep platform integration.',
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
      edges={['top', 'bottom']}
      contentContainerStyle={{ gap: spacing.xxl, justifyContent: Platform.OS === 'web' ? 'center' : 'flex-start' }}
    >
      <Container style={{ gap: spacing.xxl }}>
        {/* Hero Section */}
        <ThemedView style={{ alignItems: 'center', gap: spacing.xxl }}>
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
        </ThemedView>

        {/* Features */}
        <ThemedView style={{ gap: spacing.md }}>
          {FEATURES.map((feature, index) => (
            <Collapsible key={index} title={feature.title}>
              <Typography variant="bodyLarge" color={theme.onSurfaceVariant}>
                {feature.description}
              </Typography>
            </Collapsible>
          ))}
        </ThemedView>

        {/* CTA Section */}
        <ThemedView style={{ alignItems: 'center', gap: spacing.lg }}>
          <Button
            title="Get Started"
            variant="filled"
            icon={{ name: 'arrow-right' }}
            onPress={() => router.push('/explore')}
          />
        </ThemedView>
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
