import { useTheme, Screen, Container, ThemedView, Typography, Button, renderIcon } from 'zero-to-app';
import { router } from "expo-router";
import { Image, ImageBackground, StyleSheet, View } from "react-native";
import {SafeAreaView} from 'react-native-safe-area-context';

const FEATURES = [
  {
    title: 'iOS, Android, and Web',
    icon: { name: 'smartphone', library: 'Feather' as const },
    description: 'Single codebase with full support for iOS, Android, and web platforms.',
  },
  {
    title: 'Material Design 3',
    icon: { name: 'layers', library: 'Feather' as const },
    description: 'Build polished, accessible interfaces with Google\'s open source design system.',
  },
  {
    title: 'Native Components',
    icon: { name: 'cpu', library: 'Feather' as const },
    description: 'Use SwiftUI and Jetpack Compose when needed for performance and deep platform integration.',
  },
  {
    title: 'Claude Skills',
    icon: { name: 'zap', library: 'Feather' as const },
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
      edges={['bottom']}
      padded={false}
    >
      {/* Head Section — Image Background with Title + Rocket */}
      <ImageBackground
        source={require('../../assets/images/stars_background.png')}
        resizeMode="cover"
        style={styles.headerBackground}
        imageStyle={styles.headerImage}
      >
        <SafeAreaView style={{ alignItems: 'center', gap: spacing.lg, paddingVertical: spacing.xxl }}>
          <Image
            source={require('../../assets/images/rocket.png')}
            style={styles.rocketImage}
            resizeMode="contain"
          />
          <View style={{ alignItems: 'center', gap: spacing.md }}>
            <Typography variant="displayLarge" weight="bold" color={"white"}>
              Zero To App
            </Typography>
            <Typography variant="headlineSmall" align="center" color={"white"}>
              A React Native component library
            </Typography>
          </View>
          <Button
            title="Get Started"
            variant="filled"
            icon={{ name: 'arrow-right' }}
            onPress={() => router.push('/explore')}
          />
        </SafeAreaView>
      </ImageBackground>

      {/* Content Section — Two columns: Cards (left) + Info (right) */}
      <Container style={{ gap: spacing.xxl, paddingVertical: spacing.xxl }}>
        <ThemedView columns={2} gap={spacing.lg}>
          {/* Left Column — About Section */}
          <ThemedView style={{ gap: spacing.lg }}>
            <Typography variant="headlineMedium" weight="bold">
              Build Apps Faster
            </Typography>
            <Typography variant="bodyLarge" color={theme.onSurfaceVariant}>
              Zero To App gives you a complete set of production-ready components built on Material Design 3.
              From buttons and typography to navigation and layout, everything is designed to work seamlessly
              across iOS, Android, and web.
            </Typography>
            <Typography variant="bodyLarge" color={theme.onSurfaceVariant}>
              Powered by Expo and React Native, the library includes a theming system with light and dark mode,
              responsive breakpoints, and semantic design tokens — so you can focus on building your product
              instead of reinventing the wheel.
            </Typography>
            <Typography variant="bodyLarge" color={theme.onSurfaceVariant}>
              Pair it with Claude Skills to accelerate your workflow. AI-powered code generation that understands
              your design system and generates components, screens, and flows that match your app&apos;s look and feel.
            </Typography>
          </ThemedView>

          {/* Right Column — Feature Cards */}
          <ThemedView style={{ gap: spacing.md }}>
            {FEATURES.map((feature, index) => (
              <ThemedView
                key={index}
                variant="surfaceContainer"
                style={[styles.card, { padding: spacing.lg, gap: spacing.sm, borderRadius: theme.borderRadius.lg }]}
              >
                <View style={[styles.iconCircle, { backgroundColor: theme.primaryContainer }]}>
                  {renderIcon(feature.icon, 'Feather', 22, theme.onPrimaryContainer)}
                </View>
                <Typography variant="titleMedium" weight="bold">
                  {feature.title}
                </Typography>
                <Typography variant="bodyMedium" color={theme.onSurfaceVariant}>
                  {feature.description}
                </Typography>
              </ThemedView>
            ))}
          </ThemedView>
        </ThemedView>
      </Container>
    </Screen>
  );
}

const styles = StyleSheet.create({
  headerBackground: {
    width: '100%',
    overflow: 'hidden',
  },
  headerImage: {
    resizeMode: 'cover',
  },
  rocketImage: {
    width: 160,
    height: 160,
  },
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 9999,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
