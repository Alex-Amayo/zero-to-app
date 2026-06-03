import { useTheme, useThemeMode, Screen, Container, ThemedView, Typography, Button, renderIcon } from 'zero-to-app';
import { router } from "expo-router";
import { Image, StyleSheet, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

const FEATURES = [
  {
    title: 'MCP Server',
    icon: { name: 'zap', library: 'Feather' as const },
    description: 'Claude calls live tools for component props, theme tokens, and code generation mid-conversation. No docs tab — just accurate code from the first prompt.',
    accent: true,
  },
  {
    title: 'Native-first',
    icon: { name: 'cpu', library: 'Feather' as const },
    description: 'Key components render in SwiftUI on iOS and Jetpack Compose on Android via Expo UI. Platform-native feel and performance — not JavaScript approximations.',
    accent: false,
  },
  {
    title: 'Material Design 3',
    icon: { name: 'layers', library: 'Feather' as const },
    description: 'Semantic color tokens, type scale, elevation, and shape across every component. One seed color generates your entire M3 palette.',
    accent: false,
  },
  {
    title: 'Accessible by default',
    icon: { name: 'eye', library: 'Feather' as const },
    description: 'Every interactive component ships with ARIA roles, states, and labels. Focus management, reduced-motion handling, and screen reader support — built in.',
    accent: false,
  },
];

export default function HomeScreen() {
  const theme = useTheme();
  const { spacing } = theme;
  const { mode, toggleTheme } = useThemeMode();

  return (
    <Screen scrollable variant="background" edges={['bottom']} padded={false}>
      {/* Hero */}
      <SafeAreaView style={[styles.hero, { paddingHorizontal: spacing.xl, paddingTop: 80, paddingBottom: spacing.xxl, gap: spacing.xl }]}>
        <Image
          source={
            mode === 'dark'
              ? require('../../assets/images/rocket_logo_white.png')
              : require('../../assets/images/rocket_logo_black.png')
          }
          style={styles.logo}
          resizeMode="contain"
        />
        <View style={[styles.heroText, { gap: spacing.md }]}>
          <Typography variant="displaySmall" weight="bold" align="center">
            The Expo UI library{'\n'}built for the AI era
          </Typography>
          <Typography variant="bodyLarge" align="center" color={theme.onSurfaceVariant}>
            Native components on iOS and Android. M3 everywhere.{'\n'}MCP server + Claude Skills — so AI generates code that fits from the first prompt.
          </Typography>
        </View>
        <View style={[styles.ctaRow, { gap: spacing.md }]}>
          <Button
            title="Get Started"
            variant="filled"
            icon={{ name: 'arrow-right' }}
            onPress={() => router.push('/explore')}
          />
          <Button
            title={mode === 'dark' ? 'Light mode' : 'Dark mode'}
            variant="outlined"
            icon={{ name: mode === 'dark' ? 'sun' : 'moon' }}
            onPress={toggleTheme}
          />
        </View>
      </SafeAreaView>

      {/* Features */}
      <Container style={{ paddingVertical: spacing.xxl }}>
        <ThemedView columns={2} gap={spacing.lg}>
          {FEATURES.map((feature, index) => (
            <ThemedView
              key={index}
              variant={feature.accent ? 'surfaceContainer' : 'surface'}
              style={[
                styles.card,
                {
                  padding: spacing.lg,
                  gap: spacing.sm,
                  borderRadius: theme.borderRadius.md,
                  borderWidth: 1,
                  borderColor: feature.accent ? theme.primary + '40' : theme.outlineVariant,
                },
              ]}
            >
              <View
                style={[
                  styles.iconWrap,
                  {
                    backgroundColor: feature.accent ? theme.primaryContainer : theme.surfaceContainerHigh,
                    borderRadius: theme.borderRadius.sm,
                  },
                ]}
              >
                {renderIcon(
                  feature.icon,
                  'Feather',
                  16,
                  feature.accent ? theme.onPrimaryContainer : theme.onSurfaceVariant,
                )}
              </View>
              <Typography variant="titleSmall" weight="bold">
                {feature.title}
              </Typography>
              <Typography variant="bodySmall" color={theme.onSurfaceVariant}>
                {feature.description}
              </Typography>
            </ThemedView>
          ))}
        </ThemedView>
      </Container>
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: {
    alignItems: 'center',
  },
  heroText: {
    alignItems: 'center',
    maxWidth: 520,
  },
  logo: {
    width: 64,
    height: 64,
  },
  ctaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  card: {},
  iconWrap: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
