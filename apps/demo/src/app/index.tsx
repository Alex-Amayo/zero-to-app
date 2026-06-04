import {
  useTheme,
  useThemeMode,
  useDimensions,
  Screen,
  Container,
  ThemedView,
  Typography,
  Button,
  Chip,
  Divider,
  renderIcon,
} from 'zero-to-app';
import { router } from 'expo-router';
import { Image, Linking, Platform, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';

// ─── Stats (fetched but displayed muted) ──────────────────────────────────────

function formatStat(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return String(n);
}

function useGithubStars() {
  const [stars, setStars] = useState<string | null>(null);
  useEffect(() => {
    fetch('https://api.github.com/repos/Alex-Amayo/zero-to-app')
      .then((r) => r.json())
      .then((d) => setStars(formatStat(d.stargazers_count)))
      .catch(() => setStars(null));
  }, []);
  return stars;
}

function useNpmDownloads() {
  const [downloads, setDownloads] = useState<string | null>(null);
  useEffect(() => {
    fetch('https://api.npmjs.org/downloads/point/last-week/zero-to-app')
      .then((r) => r.json())
      .then((d) => setDownloads(formatStat(d.downloads)))
      .catch(() => setDownloads(null));
  }, []);
  return downloads;
}

// ─── GitHub icon — svgl on web, Feather fallback on native ───────────────────

function GitHubIcon({ size, color, isDark }: { size: number; color: string; isDark: boolean }) {
  if (Platform.OS === 'web') {
    const filterStyle = isDark ? { filter: 'invert(1)' } as any : {};
    return (
      <Image
        source={{ uri: 'https://svgl.app/library/github.svg' }}
        style={[{ width: size, height: size }, filterStyle]}
      />
    );
  }
  return <>{renderIcon({ name: 'github', library: 'Feather' }, 'Feather', size, color)}</>;
}

// ─── Feature cards ────────────────────────────────────────────────────────────

const FEATURES = [
  {
    title: 'MCP Server',
    icon: { name: 'zap', library: 'Feather' as const },
    description:
      'Claude calls live tools for component props, theme tokens, and code generation mid-conversation. No docs tab — just accurate code from the first prompt.',
    accent: true,
  },
  {
    title: 'Native-first',
    icon: { name: 'cpu', library: 'Feather' as const },
    description:
      'Key components render in SwiftUI on iOS and Jetpack Compose on Android via Expo UI. Platform-native feel and performance — not JavaScript approximations.',
    accent: false,
  },
  {
    title: 'Material Design 3',
    icon: { name: 'layers', library: 'Feather' as const },
    description:
      'Semantic color tokens, type scale, elevation, and shape across every component. One seed color generates your entire M3 palette.',
    accent: false,
  },
  {
    title: 'Accessible by default',
    icon: { name: 'eye', library: 'Feather' as const },
    description:
      'Every interactive component ships with ARIA roles, states, and labels. Focus management, reduced-motion handling, and screen reader support — built in.',
    accent: false,
  },
];


// ─── Home screen ──────────────────────────────────────────────────────────────

export default function HomeScreen() {
  const theme = useTheme();
  const { spacing, borderRadius } = theme;
  const { mode, toggleTheme } = useThemeMode();
  const { height: windowHeight } = useDimensions();
  const isDark = mode === 'dark';
  const stars = useGithubStars();
  const downloads = useNpmDownloads();

  const logoSource = isDark
    ? require('../../assets/images/rocket_logo_white.png')
    : require('../../assets/images/rocket_logo_black.png');

  return (
    <Screen scrollable variant="background" edges={['bottom']} padded={false}>

      {/* ── Hero: web split, mobile centered ── */}
      {Platform.OS === 'web' ? (
        <SafeAreaView style={[styles.heroWeb, { gap: spacing.xxl }]}>
          <View style={[styles.heroLeft, { gap: spacing.xl, paddingVertical: spacing.xxl }]}>
            <View style={[styles.heroTextBlock, { gap: spacing.md }]}>
              <Typography variant="displaySmall" weight="bold">
                The Expo UI library{'\n'}built for the AI era
              </Typography>
              <Typography variant="bodyLarge" color={theme.onSurfaceVariant}>
                Native components on iOS and Android. M3 everywhere. MCP server + Claude Skills — so AI generates code that fits from the first prompt.
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
                title={isDark ? 'Light mode' : 'Dark mode'}
                variant="outlined"
                icon={{ name: isDark ? 'sun' : 'moon' }}
                onPress={toggleTheme}
              />
            </View>
            <Typography variant="labelSmall" color={theme.onSurfaceVariant}>
              This site is built entirely with zero-to-app
            </Typography>
          </View>

          {/* Right: live UI showcase with soft primary gradient */}
          <View style={[styles.heroRight, { paddingVertical: spacing.xxl, paddingHorizontal: spacing.lg, gap: spacing.md, borderRadius: borderRadius.xl } as any, { background: `radial-gradient(ellipse at 60% 30%, ${theme.primaryContainer} 0%, transparent 70%)` }]}>
            {/* Profile card */}
            <ThemedView
              variant="card"
              elevation={1}
              style={{ borderRadius: borderRadius.md, padding: spacing.lg, gap: spacing.md }}>
              <View style={[styles.row, { alignItems: 'center', gap: spacing.md }]}>
                <View style={[styles.profileImage, { backgroundColor: theme.tertiaryContainer, borderRadius: borderRadius.full }]}>
                  <Typography variant="headlineSmall" weight="bold" color={theme.onTertiaryContainer}>AJ</Typography>
                </View>
                <View style={{ flex: 1, gap: spacing.xs }}>
                  <Typography variant="titleMedium" weight="bold">Alex Johnson</Typography>
                  <Typography variant="bodySmall" color={theme.onSurfaceVariant}>Product Designer · San Francisco</Typography>
                </View>
              </View>
              <View style={[styles.row, { gap: spacing.sm }]}>
                <Button title="Follow" variant="filled" onPress={() => {}} />
                <Button title="Message" variant="outlined" onPress={() => {}} />
              </View>
            </ThemedView>

            {/* Components card */}
            <ThemedView
              variant="surfaceContainer"
              elevation={1}
              style={{ borderRadius: borderRadius.md, padding: spacing.lg, gap: spacing.lg }}>
              <View style={{ gap: spacing.sm }}>
                <Typography variant="titleMedium" weight="bold">Components</Typography>
                <View style={[styles.row, { gap: spacing.sm, flexWrap: 'wrap' }]}>
                  <Chip label="M3 Design" variant="filled" selected onPress={() => {}} />
                  <Chip label="Native" variant="outlined" onPress={() => {}} />
                  <Chip label="AI-ready" variant="outlined" selected onPress={() => {}} />
                  <Chip label="Cross-platform" variant="outlined" onPress={() => {}} />
                </View>
              </View>
              <Divider />
              <View style={[styles.row, { gap: spacing.sm, flexWrap: 'wrap' }]}>
                <Button title="Primary" variant="filled" onPress={() => {}} />
                <Button title="Secondary" variant="tonal" onPress={() => {}} />
                <Button title="Cancel" variant="outlined" onPress={() => {}} />
              </View>
            </ThemedView>

            {/* Media player card */}
            <ThemedView
              variant="card"
              elevation={1}
              style={{ borderRadius: borderRadius.md, padding: spacing.lg, gap: spacing.lg }}>
              <View style={[styles.row, { alignItems: 'center', gap: spacing.md }]}>
                <View style={[styles.albumArt, { backgroundColor: theme.primary, borderRadius: borderRadius.sm }]}>
                  {renderIcon({ name: 'music', library: 'Feather' }, 'Feather', 22, theme.onPrimary)}
                </View>
                <View style={{ flex: 1, gap: spacing.xs }}>
                  <Typography variant="titleSmall" weight="bold">Midnight Drive</Typography>
                  <Typography variant="bodySmall" color={theme.onSurfaceVariant}>Synthwave Collection · 3:42</Typography>
                </View>
                {renderIcon({ name: 'heart', library: 'Feather' }, 'Feather', 18, theme.primary)}
              </View>
              <View style={[styles.progressTrack, { backgroundColor: theme.outlineVariant, borderRadius: borderRadius.full }]}>
                <View style={[styles.progressFill, { width: '45%', backgroundColor: theme.primary, borderRadius: borderRadius.full }]} />
              </View>
              <View style={[styles.row, { justifyContent: 'center', alignItems: 'center', gap: spacing.xl }]}>
                {renderIcon({ name: 'skip-back', library: 'Feather' }, 'Feather', 20, theme.onSurfaceVariant)}
                <View style={[styles.playButton, { backgroundColor: theme.primary, borderRadius: borderRadius.full }]}>
                  {renderIcon({ name: 'pause', library: 'Feather' }, 'Feather', 20, theme.onPrimary)}
                </View>
                {renderIcon({ name: 'skip-forward', library: 'Feather' }, 'Feather', 20, theme.onSurfaceVariant)}
              </View>
            </ThemedView>
          </View>
        </SafeAreaView>
      ) : (
        <SafeAreaView
          style={[
            styles.hero,
            { paddingHorizontal: spacing.xl, paddingTop: 80, paddingBottom: spacing.xxl, gap: spacing.xl },
          ]}>
          <Image source={logoSource} style={styles.logo} resizeMode="contain" />
          <View style={[styles.centered, { gap: spacing.md }]}>
            <Typography variant="displaySmall" weight="bold" align="center">
              The Expo UI library{'\n'}built for the AI era
            </Typography>
            <Typography variant="bodyLarge" align="center" color={theme.onSurfaceVariant}>
              Native components on iOS and Android. M3 everywhere.{'\n'}
              MCP server + Claude Skills — so AI generates code that fits from the first prompt.
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
              title={isDark ? 'Light mode' : 'Dark mode'}
              variant="outlined"
              icon={{ name: isDark ? 'sun' : 'moon' }}
              onPress={toggleTheme}
            />
          </View>
          <Typography variant="labelSmall" color={theme.onSurfaceVariant} align="center">
            This site is built entirely with zero-to-app
          </Typography>
        </SafeAreaView>
      )}

      {/* ── Feature cards — first thing after hero ── */}
      <Container style={{ paddingVertical: spacing.xxl }}>
        <View style={{ gap: spacing.xl }}>
          <View style={{ gap: spacing.sm }}>
            <Typography variant="headlineMedium" weight="bold">
              What&apos;s inside
            </Typography>
            <Typography variant="bodyMedium" color={theme.onSurfaceVariant}>
              Everything you need to build production-quality cross-platform apps.
            </Typography>
          </View>
          <ThemedView columns={2} gap={spacing.lg}>
            {FEATURES.map((feature, index) => (
              <ThemedView
                key={index}
                variant={feature.accent ? 'surfaceContainer' : 'surface'}
                style={[
                  styles.featureCard,
                  {
                    padding: spacing.lg,
                    gap: spacing.sm,
                    borderRadius: borderRadius.md,
                    borderWidth: 1,
                    borderColor: feature.accent ? theme.primary + '40' : theme.outlineVariant,
                  },
                ]}>
                <View
                  style={[
                    styles.iconWrap,
                    {
                      backgroundColor: feature.accent
                        ? theme.primaryContainer
                        : theme.surfaceContainerHigh,
                      borderRadius: borderRadius.sm,
                    },
                  ]}>
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
        </View>
      </Container>

      {/* ── Built with zero-to-app callout ── */}
      <Container style={{ paddingVertical: spacing.xxl }}>
        <ThemedView
          variant="primary"
          style={[styles.callout, { borderRadius: borderRadius.lg, padding: spacing.xxl, gap: spacing.md }]}>
          <Typography variant="headlineSmall" weight="bold" color={theme.onPrimary}>
            Built with zero-to-app
          </Typography>
          <Typography variant="bodyMedium" color={theme.onPrimary}>
            Every component on this page — buttons, cards, navigation, typography — is rendered by the same library you install. What you see is what you ship.
          </Typography>
          <Button
            title="Explore the components"
            variant="tonal"
            icon={{ name: 'arrow-right' }}
            onPress={() => router.push('/explore')}
          />
        </ThemedView>
      </Container>

      {/* ── GitHub contributions section ── */}
      <Container style={{ paddingVertical: spacing.xxl }}>
        <View style={[styles.githubSection, { borderTopWidth: 1, borderTopColor: theme.outlineVariant, paddingTop: spacing.xxl, gap: spacing.xl, alignItems: 'center' }]}>

          {/* License label */}
          <Typography variant="labelMedium" color={theme.outlineVariant} align="center">
            OPEN SOURCE · MIT LICENSE
          </Typography>

          {/* Stat tiles: GitHub stars, npm downloads, components, platforms */}
          <View style={[styles.statRow, { gap: spacing.lg, flexWrap: 'wrap', justifyContent: 'center' }]}>

            {/* GitHub stars */}
            <View style={[styles.statTile, { gap: spacing.sm, alignItems: 'center' }]}>
              <View style={[styles.row, { alignItems: 'center', gap: spacing.xs }]}>
                <GitHubIcon size={16} color={theme.onSurfaceVariant} isDark={isDark} />
                <Typography variant="headlineSmall" weight="bold" color={theme.onSurfaceVariant}>
                  {stars ?? '—'}
                </Typography>
              </View>
              <Typography variant="labelSmall" color={theme.outlineVariant}>Stars</Typography>
            </View>

            <View style={[styles.statDivider, { backgroundColor: theme.outlineVariant }]} />

            {/* npm downloads */}
            <View style={[styles.statTile, { gap: spacing.sm, alignItems: 'center' }]}>
              <View style={[styles.row, { alignItems: 'center', gap: spacing.xs }]}>
                {Platform.OS === 'web' ? (
                  <Image
                    source={{ uri: 'https://svgl.app/library/npm.svg' }}
                    style={{ width: 20, height: 20 }}
                  />
                ) : (
                  renderIcon({ name: 'package', library: 'Feather' }, 'Feather', 16, theme.onSurfaceVariant)
                )}
                <Typography variant="headlineSmall" weight="bold" color={theme.onSurfaceVariant}>
                  {downloads ?? '—'}
                </Typography>
              </View>
              <Typography variant="labelSmall" color={theme.outlineVariant}>Weekly downloads</Typography>
            </View>

            <View style={[styles.statDivider, { backgroundColor: theme.outlineVariant }]} />

            {/* Components */}
            <View style={[styles.statTile, { gap: spacing.sm, alignItems: 'center' }]}>
              <View style={[styles.row, { alignItems: 'center', gap: spacing.xs }]}>
                {renderIcon({ name: 'box', library: 'Feather' }, 'Feather', 16, theme.onSurfaceVariant)}
                <Typography variant="headlineSmall" weight="bold" color={theme.onSurfaceVariant}>
                  28
                </Typography>
              </View>
              <Typography variant="labelSmall" color={theme.outlineVariant}>Components</Typography>
            </View>

            <View style={[styles.statDivider, { backgroundColor: theme.outlineVariant }]} />

            {/* Platforms */}
            <View style={[styles.statTile, { gap: spacing.sm, alignItems: 'center' }]}>
              <View style={[styles.row, { alignItems: 'center', gap: spacing.sm }]}>
                {renderIcon({ name: 'smartphone', library: 'Feather' }, 'Feather', 15, theme.onSurfaceVariant)}
                {renderIcon({ name: 'android', library: 'MaterialIcons' }, 'MaterialIcons', 16, theme.onSurfaceVariant)}
                {renderIcon({ name: 'globe', library: 'Feather' }, 'Feather', 15, theme.onSurfaceVariant)}
              </View>
              <Typography variant="labelSmall" color={theme.outlineVariant}>iOS · Android · Web</Typography>
            </View>

          </View>

          {/* CTA */}
          <Button
            title="Star on GitHub"
            variant="outlined"
            icon={{ name: 'star', library: 'Feather' }}
            iconPosition="left"
            onPress={() => Linking.openURL('https://github.com/Alex-Amayo/zero-to-app')}
          />
        </View>
      </Container>

      {/* ── Footer ── */}
      <Container>
        <View
          style={[
            styles.footer,
            { paddingVertical: spacing.xl, borderTopWidth: 1, borderTopColor: theme.outlineVariant },
          ]}>
          <Typography variant="bodySmall" color={theme.onSurfaceVariant}>
            © 2025 zero-to-app
          </Typography>
          <View style={[styles.row, { gap: spacing.lg }]}>
            <Typography
              variant="bodySmall"
              color={theme.onSurfaceVariant}
              onPress={() => Linking.openURL('https://github.com/Alex-Amayo/zero-to-app')}>
              GitHub
            </Typography>
            <Typography
              variant="bodySmall"
              color={theme.onSurfaceVariant}
              onPress={() => Linking.openURL('https://www.npmjs.com/package/zero-to-app')}>
              NPM
            </Typography>
          </View>
        </View>
      </Container>

    </Screen>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  hero: { alignItems: 'center' },
  centered: { alignItems: 'center', maxWidth: 520 },
  heroWeb: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 24 },
  heroLeft: { flex: 1, alignItems: 'flex-start' },
  heroTextBlock: { maxWidth: 480 },
  heroRight: { flex: 1 },
  profileImage: { width: 56, height: 56, alignItems: 'center', justifyContent: 'center' },
  albumArt: { width: 52, height: 52, alignItems: 'center', justifyContent: 'center' },
  progressTrack: { height: 3, width: '100%' },
  progressFill: { height: 3 },
  playButton: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center' },
  logo: { width: 64, height: 64 },
  ctaRow: { flexDirection: 'row', flexWrap: 'wrap' },
  row: { flexDirection: 'row' },
  featureCard: {},
  iconWrap: { width: 36, height: 36, alignItems: 'center', justifyContent: 'center' },
  callout: {},
  githubSection: {},
  statRow: { flexDirection: 'row', alignItems: 'center' },
  statTile: { minWidth: 80 },
  statDivider: { width: 1, height: 40, opacity: 0.4 },
  footer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
});
