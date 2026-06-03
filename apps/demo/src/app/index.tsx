import {
  useTheme,
  useThemeMode,
  Screen,
  Container,
  ThemedView,
  Typography,
  Button,
  Chip,
  renderIcon,
} from 'zero-to-app';
import { router } from 'expo-router';
import { Image, Linking, Platform, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';

// ─── Stats ────────────────────────────────────────────────────────────────────

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

// ─── How it works steps ───────────────────────────────────────────────────────

const HOW_IT_WORKS = [
  {
    step: '1',
    icon: { name: 'terminal', library: 'Feather' as const },
    title: 'Install & configure',
    body: 'Run npx zero-to-app skills to drop context files into Claude Code — or add the MCP server for live tool access.',
  },
  {
    step: '2',
    icon: { name: 'zap', library: 'Feather' as const },
    title: 'Ask Claude',
    body: 'Describe what you want to build. Claude calls live tools for real props, correct token names, and working examples.',
  },
  {
    step: '3',
    icon: { name: 'check-circle', library: 'Feather' as const },
    title: 'Ship',
    body: 'Accurate, theme-aware code from the first prompt — not generic boilerplate that needs three rounds of fixes.',
  },
];

// ─── Home screen ──────────────────────────────────────────────────────────────

export default function HomeScreen() {
  const theme = useTheme();
  const { spacing, borderRadius } = theme;
  const { mode, toggleTheme } = useThemeMode();
  const stars = useGithubStars();
  const downloads = useNpmDownloads();

  const STATS = [
    { value: stars ?? '—', label: 'GitHub Stars' },
    { value: downloads ?? '—', label: 'Weekly Downloads' },
    { value: '28', label: 'Components' },
    { value: 'iOS · Android · Web', label: 'Platforms' },
  ];

  return (
    <Screen scrollable variant="background" edges={['bottom']} padded={false}>

      {/* ── Hero ── */}
      <SafeAreaView
        style={[
          styles.hero,
          { paddingHorizontal: spacing.xl, paddingTop: 80, paddingBottom: spacing.xxl, gap: spacing.xl },
        ]}>
        <Image
          source={
            mode === 'dark'
              ? require('../../assets/images/rocket_logo_white.png')
              : require('../../assets/images/rocket_logo_black.png')
          }
          style={styles.logo}
          resizeMode="contain"
        />
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
            title={mode === 'dark' ? 'Light mode' : 'Dark mode'}
            variant="outlined"
            icon={{ name: mode === 'dark' ? 'sun' : 'moon' }}
            onPress={toggleTheme}
          />
        </View>
        <Typography variant="labelSmall" color={theme.onSurfaceVariant} align="center">
          This site is built entirely with zero-to-app
        </Typography>
      </SafeAreaView>

      {/* ── Stats row ── */}
      <Container style={{ paddingVertical: spacing.xxl }}>
        <ThemedView columns={4} gap={spacing.md}>
          {STATS.map((s) => (
            <ThemedView
              key={s.label}
              variant="surfaceContainer"
              style={[styles.statCard, { borderRadius: borderRadius.md, padding: spacing.lg }]}>
              <Typography variant="headlineLarge" weight="bold" align="center">
                {s.value}
              </Typography>
              <Typography variant="labelMedium" muted align="center">
                {s.label}
              </Typography>
            </ThemedView>
          ))}
        </ThemedView>
      </Container>

      {/* ── Live component preview (web only) ── */}
      {Platform.OS === 'web' && (
        <Container style={{ paddingVertical: spacing.xxl }}>
          <View style={{ gap: spacing.lg }}>
            <View style={{ gap: spacing.sm }}>
              <Typography variant="headlineMedium" weight="bold">
                28 production-ready components
              </Typography>
              <Typography variant="bodyMedium" color={theme.onSurfaceVariant}>
                Every component is theme-aware and cross-platform. What you see below is rendered by the same library you install — no mock-ups.
              </Typography>
            </View>

            <ThemedView columns={3} gap={spacing.md}>

              {/* Panel A — Buttons */}
              <ThemedView
                variant="surfaceContainer"
                style={[styles.previewPanel, { borderRadius: borderRadius.md, padding: spacing.lg, gap: spacing.md }]}>
                <Typography variant="labelMedium" weight="medium" muted>
                  BUTTONS
                </Typography>
                <View style={{ gap: spacing.sm }}>
                  <Button title="Filled" variant="filled" onPress={() => {}} />
                  <Button title="Tonal" variant="tonal" onPress={() => {}} />
                  <Button title="Outlined" variant="outlined" onPress={() => {}} />
                  <Button title="Text" variant="text" onPress={() => {}} />
                  <Button title="Elevated" variant="elevated" onPress={() => {}} />
                </View>
              </ThemedView>

              {/* Panel B — Typography */}
              <ThemedView
                variant="surfaceContainer"
                style={[styles.previewPanel, { borderRadius: borderRadius.md, padding: spacing.lg, gap: spacing.md }]}>
                <Typography variant="labelMedium" weight="medium" muted>
                  TYPOGRAPHY
                </Typography>
                <View style={{ gap: spacing.xs }}>
                  <Typography variant="displaySmall">Display</Typography>
                  <Typography variant="headlineMedium">Headline</Typography>
                  <Typography variant="titleLarge">Title Large</Typography>
                  <Typography variant="bodyMedium">Body Medium — the quick brown fox</Typography>
                  <Typography variant="labelSmall" muted>Label Small</Typography>
                </View>
              </ThemedView>

              {/* Panel C — Controls */}
              <ThemedView
                variant="surfaceContainer"
                style={[styles.previewPanel, { borderRadius: borderRadius.md, padding: spacing.lg, gap: spacing.lg }]}>
                <Typography variant="labelMedium" weight="medium" muted>
                  CONTROLS
                </Typography>
                <View style={{ gap: spacing.md }}>
                  <View style={{ gap: spacing.xs }}>
                    <Typography variant="labelSmall" muted>Chips</Typography>
                    <View style={[styles.row, { gap: spacing.sm, flexWrap: 'wrap' }]}>
                      <Chip label="Filter" variant="outlined" selected onPress={() => {}} />
                      <Chip label="Action" variant="filled" onPress={() => {}} />
                      <Chip label="Option" variant="outlined" onPress={() => {}} />
                    </View>
                  </View>
                </View>
              </ThemedView>

            </ThemedView>
          </View>
        </Container>
      )}

      {/* ── How it works ── */}
      <Container style={{ paddingVertical: spacing.xxl }}>
        <View style={{ gap: spacing.xl }}>
          <View style={{ gap: spacing.sm }}>
            <Typography variant="headlineMedium" weight="bold">
              How it works
            </Typography>
            <Typography variant="bodyMedium" color={theme.onSurfaceVariant}>
              From install to AI-accurate code in three steps.
            </Typography>
          </View>

          <ThemedView columns={3} gap={spacing.md}>
            {HOW_IT_WORKS.map((item) => (
              <ThemedView
                key={item.step}
                variant="surface"
                style={[
                  styles.stepCard,
                  {
                    borderRadius: borderRadius.md,
                    padding: spacing.lg,
                    gap: spacing.md,
                    borderWidth: 1,
                    borderColor: theme.outlineVariant,
                  },
                ]}>
                <View style={[styles.row, { gap: spacing.sm, alignItems: 'center' }]}>
                  <View
                    style={[
                      styles.stepBadge,
                      {
                        backgroundColor: theme.primaryContainer,
                        borderRadius: borderRadius.full,
                      },
                    ]}>
                    <Typography variant="labelSmall" weight="bold" color={theme.onPrimaryContainer}>
                      {item.step}
                    </Typography>
                  </View>
                  {renderIcon(item.icon, 'Feather', 16, theme.primary)}
                </View>
                <View style={{ gap: spacing.xs }}>
                  <Typography variant="titleSmall" weight="bold">
                    {item.title}
                  </Typography>
                  <Typography variant="bodySmall" color={theme.onSurfaceVariant}>
                    {item.body}
                  </Typography>
                </View>
              </ThemedView>
            ))}
          </ThemedView>
        </View>
      </Container>

      {/* ── Feature cards ── */}
      <Container style={{ paddingVertical: spacing.xxl }}>
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
      </Container>

      {/* ── Built with zero-to-app callout ── */}
      <Container style={{ paddingVertical: spacing.xxl }}>
        <ThemedView
          variant="primary"
          style={[
            styles.callout,
            {
              borderRadius: borderRadius.lg,
              padding: spacing.xxl,
              gap: spacing.md,
            },
          ]}>
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

      {/* ── Footer ── */}
      <Container>
        <View
          style={[
            styles.footer,
            {
              paddingVertical: spacing.xl,
              borderTopWidth: 1,
              borderTopColor: theme.outlineVariant,
            },
          ]}>
          <Typography variant="bodySmall" color={theme.onSurfaceVariant}>
            © 2025 zero-to-app · MIT License
          </Typography>
          <View style={[styles.row, { gap: spacing.lg }]}>
            <Typography
              variant="bodySmall"
              color={theme.primary}
              onPress={() => Linking.openURL('https://github.com/Alex-Amayo/zero-to-app')}>
              GitHub
            </Typography>
            <Typography
              variant="bodySmall"
              color={theme.primary}
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
  logo: { width: 64, height: 64 },
  ctaRow: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' },
  statCard: { alignItems: 'center', gap: 4 },
  previewPanel: {},
  row: { flexDirection: 'row' },
  stepCard: {},
  stepBadge: { width: 24, height: 24, alignItems: 'center', justifyContent: 'center' },
  featureCard: {},
  iconWrap: { width: 36, height: 36, alignItems: 'center', justifyContent: 'center' },
  callout: {},
  footer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
});
