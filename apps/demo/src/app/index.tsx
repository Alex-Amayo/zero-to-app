import { useTheme, useThemeMode, Screen, Container, ThemedView, Typography, Button, renderIcon } from 'zero-to-app';
import { router } from "expo-router";
import { Image, ImageBackground, StyleSheet, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

const FEATURES = [
  {
    title: 'Material Design 3',
    icon: { name: 'layers', library: 'Feather' as const },
    description: 'A complete implementation of Google\'s design system. Semantic tokens keep color, spacing, and typography consistent across every component.',
  },
  {
    title: 'Cross-platform',
    icon: { name: 'smartphone', library: 'Feather' as const },
    description: 'iOS, Android, and web from a single component tree. No platform forks, no duplicated styles.',
  },
  {
    title: 'Claude Skills',
    icon: { name: 'zap', library: 'Feather' as const },
    description: 'AI-assisted development that understands your design tokens and primitives. Generate components and flows that match your codebase, not generic boilerplate.',
  },
];

export default function HomeScreen() {
  const theme = useTheme();
  const { spacing } = theme;
  const { mode, toggleTheme } = useThemeMode();

  return (
    <Screen
      scrollable
      variant="background"
      edges={['bottom']}
      padded={false}
    >
      {/* Head Section — Image Background with Title + Rocket */}
      <ImageBackground
        source={require('../../assets/images/gradient_background.png')}
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
              React Native components built on Material Design 3.
            </Typography>
          </View>
          <View style={{ flexDirection: 'row', gap: spacing.md }}>
            <Button
              title="Get Started"
              variant="filled"
              icon={{ name: 'arrow-right' }}
              onPress={() => router.push('/explore')}
            />
            <Button
              title={mode === 'dark' ? 'Light Mode' : 'Dark Mode'}
              variant="tonal"
              icon={{ name: mode === 'dark' ? 'sun' : 'moon' }}
              onPress={toggleTheme}
            />
          </View>
        </SafeAreaView>
      </ImageBackground>

      <Container style={{ gap: spacing.xl, justifyContent: 'center', paddingVertical: spacing.xl }}>
        <Typography variant="displaySmall" weight="bold" align="center">
          Build consistent cross-platform experiences.
        </Typography>

      </Container>

      <Container>
        <ThemedView columns={2} gap={spacing.xl}>
          {/* Left Column — Title, Introduction, Installation */}
          <ThemedView style={{ gap: spacing.xxl }}>

            <ThemedView style={{ gap: spacing.lg }}>
              <Typography variant="bodyLarge" color={theme.onSurfaceVariant}>
                Zero to App uses semantic Material 3 tokens and standard React Native Stylesheets to deliver a performant, unified design system consistently across platforms.
              </Typography>
              <Typography variant="bodyLarge" color={theme.onSurfaceVariant}>Generate accessible color palettes from a single brand color. Start with one hex — refine
                individual colors when you&#39;re ready.</Typography>
              <Typography variant="bodyLarge" color={theme.onSurfaceVariant}>
                Large Language Models (LLMs) perform best with structure. Included Claude Skills provide the context needed for AI to generate consistent, theme-aware flows and components — not just generic code snippets.
              </Typography>
            </ThemedView>

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
