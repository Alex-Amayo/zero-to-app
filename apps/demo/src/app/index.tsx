import { useTheme, useThemeMode, Screen, Container, ThemedView, Typography, Button, renderIcon } from 'zero-to-app';
import { router } from "expo-router";
import { Image, StyleSheet, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

const FEATURES = [
  {
    title: 'Claude Skills',
    icon: { name: 'zap', library: 'Feather' as const },
    description: 'Built-in skills give Claude the full context of your design system — so it generates components that match your tokens, not generic boilerplate.',
    accent: true,
  },
  {
    title: 'Material Design 3',
    icon: { name: 'layers', library: 'Feather' as const },
    description: 'Semantic color tokens, type scale, and spacing that stay consistent across every component and screen.',
    accent: false,
  },
  {
    title: 'Cross-platform',
    icon: { name: 'smartphone', library: 'Feather' as const },
    description: 'iOS, Android, and web from a single component tree. No platform forks, no duplicated styles.',
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
            The React Native UI library{'\n'}built for AI development
          </Typography>
          <Typography variant="bodyLarge" align="center" color={theme.onSurfaceVariant}>
            Components that Claude understands.{'\n'}Ship consistent, accessible, theme-aware apps — faster.
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
        <ThemedView columns={3} gap={spacing.lg}>
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
