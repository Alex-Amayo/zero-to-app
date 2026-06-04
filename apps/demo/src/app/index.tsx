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
  Switch,
  Slider,
  SegmentedControl,
  Avatar,
  ListItem,
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
    iconAccent: true,
  },
  {
    title: 'Native-first',
    icon: { name: 'cpu', library: 'Feather' as const },
    description:
      'Key components render in SwiftUI on iOS and Jetpack Compose on Android via Expo UI. Platform-native feel and performance — not JavaScript approximations.',
    iconAccent: false,
  },
  {
    title: 'Material Design 3',
    icon: { name: 'layers', library: 'Feather' as const },
    description:
      'Semantic color tokens, type scale, elevation, and shape across every component. One seed color generates your entire M3 palette.',
    iconAccent: false,
  },
  {
    title: 'Accessible by default',
    icon: { name: 'eye', library: 'Feather' as const },
    description:
      'Every interactive component ships with ARIA roles, states, and labels. Focus management, reduced-motion handling, and screen reader support — built in.',
    iconAccent: false,
  },
];

// ─── Layout constants ─────────────────────────────────────────────────────────

// Container uses maxWidth: 1000 and paddingHorizontal: spacing.xl.
// At wide viewports it centres itself; heroLeft must match the same left edge.
const CONTAINER_MAX_WIDTH = 1000;

// ─── Home screen ──────────────────────────────────────────────────────────────

export default function HomeScreen() {
  const theme = useTheme();
  const { spacing, borderRadius } = theme;
  const { mode, toggleTheme } = useThemeMode();
  const { width: viewportWidth, height: viewportHeight } = useDimensions();
  const isDark = mode === 'dark';
  const stars = useGithubStars();
  const downloads = useNpmDownloads();

  // Exact left offset that Container gives at the current viewport width.
  // Matches (viewportWidth − maxWidth) / 2 + paddingHorizontal when wide,
  // or just paddingHorizontal when narrow.
  const containerLeftInset = Platform.OS === 'web' && viewportWidth > CONTAINER_MAX_WIDTH + spacing.xl * 2
    ? (viewportWidth - CONTAINER_MAX_WIDTH) / 2 + spacing.xl
    : spacing.xl;

  // All sections share the same height as the hero on web.
  // Content is centred vertically within each section.
  // On mobile sections revert to natural height with generous padding.
  const SECTION_PAD = 96; // mobile fallback
  const APPBAR_HEIGHT = 64;
  const SECTION_HEIGHT = Platform.OS === 'web' ? viewportHeight - APPBAR_HEIGHT : undefined;

  const logoSource = isDark
    ? require('../../assets/images/rocket_logo_white.png')
    : require('../../assets/images/rocket_logo_black.png');

  return (
    <Screen scrollable variant="background" edges={['bottom']} padded={false}>

      {/* ── Section 1: Hero + stats ── */}
      {Platform.OS === 'web' ? (
        <View>
          {/* Two-panel row — full width, showcase touches right viewport edge */}
          <View style={[styles.heroWeb, {paddingBottom: spacing.xxl}]}>

          {/* Left copy — left edge matches Container's computed inset */}
          <View style={[styles.heroLeft, { paddingLeft: containerLeftInset, paddingRight: 64, paddingVertical: spacing.xxxl }]}>
            <View style={{ gap: spacing.xl, maxWidth: 420 }}>
              <View style={{ gap: spacing.md }}>
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
          </View>

          {/* Right showcase — 80% section height, overflow clipped intentionally */}
          <View style={[styles.heroRight, {
            height: (viewportHeight - APPBAR_HEIGHT) * 0.8,
            paddingTop: spacing.xxl,
            paddingHorizontal: spacing.lg,
            gap: spacing.sm,
            backgroundColor: theme.primaryContainer,
            borderBottomLeftRadius: borderRadius.xl,
            overflow: 'hidden',
          }]}>
            {/* Row 1 */}
            <View style={[styles.row, { gap: spacing.sm }]}>
              <ThemedView variant="surface" elevation={1} style={[styles.demoCard, { borderRadius: borderRadius.md, padding: spacing.md, gap: spacing.md }]}>
                <View style={[styles.row, { alignItems: 'center', gap: spacing.sm }]}>
                  <Avatar name="Alex Johnson" size="md" />
                  <View style={{ flex: 1 }}>
                    <Typography variant="titleSmall" weight="bold">Alex Johnson</Typography>
                    <Typography variant="labelSmall" color={theme.onSurfaceVariant}>Product Designer · SF</Typography>
                  </View>
                </View>
                <Typography variant="bodySmall" color={theme.onSurfaceVariant}>Building cross-platform apps with M3 design and AI tooling.</Typography>
                <View style={[styles.row, { gap: spacing.xs }]}>
                  <Button title="Follow" variant="filled" onPress={() => {}} />
                  <Button title="Message" variant="tonal" onPress={() => {}} />
                </View>
              </ThemedView>

              <ThemedView variant="surface" elevation={1} style={[styles.demoCard, { borderRadius: borderRadius.md, padding: spacing.md, gap: spacing.md }]}>
                <Typography variant="titleSmall" weight="bold">Schedule</Typography>
                <SegmentedControl options={[{ label: 'Day', value: 'day' }, { label: 'Week', value: 'week' }, { label: 'Month', value: 'month' }]} value="week" onChange={() => {}} />
                <View style={{ gap: spacing.xs }}>
                  <Typography variant="labelMedium" weight="medium">This week</Typography>
                  <Typography variant="bodySmall" color={theme.onSurfaceVariant}>Mon 3 – Sun 9 June · 4 events</Typography>
                </View>
                <View style={[styles.row, { gap: spacing.xs, flexWrap: 'wrap' }]}>
                  <Chip label="Design" variant="filled" selected onPress={() => {}} />
                  <Chip label="Dev" variant="outlined" onPress={() => {}} />
                  <Chip label="Review" variant="outlined" onPress={() => {}} />
                </View>
              </ThemedView>
            </View>

            {/* Row 2 */}
            <View style={[styles.row, { gap: spacing.sm }]}>
              {/* Music player */}
              <ThemedView variant="primary" style={[styles.demoCard, { borderRadius: borderRadius.md, overflow: 'hidden', gap: spacing.sm }]}>
                {/* Full-width album art at controlled height */}
                <Image
                  source={{ uri: 'https://images.unsplash.com/photo-1501612780327-45045538702b?w=400&h=200&fit=crop' }}
                  style={{ width: '100%', height: 120 }}
                  resizeMode="cover"
                />
                <View style={{ paddingHorizontal: spacing.sm, paddingBottom: spacing.sm, gap: spacing.sm }}>
                  {/* Track info */}
                  <View style={[styles.row, { alignItems: 'center', gap: spacing.sm }]}>
                    <View style={{ flex: 1, gap: 2 }}>
                      <Typography variant="titleSmall" weight="bold" color={theme.onPrimary}>Midnight Drive</Typography>
                      <Typography variant="labelSmall" color={theme.onPrimary} style={{ opacity: 0.7 }}>Synthwave · 3:42</Typography>
                    </View>
                    {renderIcon({ name: 'heart', library: 'Feather' }, 'Feather', 15, theme.onPrimary)}
                  </View>
                  {/* Progress */}
                  <View style={[styles.progressTrack, { backgroundColor: theme.onPrimary, borderRadius: borderRadius.full, opacity: 0.3 }]}>
                    <View style={[styles.progressFill, { width: '45%', backgroundColor: theme.onPrimary, borderRadius: borderRadius.full, opacity: 1 }]} />
                  </View>
                  {/* Controls */}
                  <View style={[styles.row, { justifyContent: 'center', alignItems: 'center', gap: spacing.lg }]}>
                    {renderIcon({ name: 'skip-back', library: 'Feather' }, 'Feather', 16, theme.onPrimary)}
                    <ThemedView variant="surface" style={{ width: 36, height: 36, borderRadius: borderRadius.full, alignItems: 'center', justifyContent: 'center' }}>
                      {renderIcon({ name: 'pause', library: 'Feather' }, 'Feather', 15, theme.primary)}
                    </ThemedView>
                    {renderIcon({ name: 'skip-forward', library: 'Feather' }, 'Feather', 16, theme.onPrimary)}
                  </View>
                </View>
              </ThemedView>

              {/* Quick access — 3 items */}
              <ThemedView variant="surface" elevation={1} style={[styles.demoCard, { borderRadius: borderRadius.md, overflow: 'hidden' }]}>
                <Typography variant="titleSmall" weight="bold" style={{ paddingHorizontal: spacing.md, paddingTop: spacing.md, paddingBottom: spacing.xs }}>Quick access</Typography>
                {([
                  { icon: 'home' as const, label: 'Home', sub: 'Main workspace' },
                  { icon: 'briefcase' as const, label: 'Work', sub: '3 active projects' },
                  { icon: 'user' as const, label: 'Profile', sub: 'Alex Johnson' },
                ]).map((item) => (
                  <ListItem
                    key={item.icon}
                    title={item.label}
                    subtitle={item.sub}
                    leading={
                      <ThemedView variant="surfaceContainer" style={{ width: 32, height: 32, borderRadius: borderRadius.sm, alignItems: 'center', justifyContent: 'center' }}>
                        {renderIcon({ name: item.icon, library: 'Feather' }, 'Feather', 14, theme.primary)}
                      </ThemedView>
                    }
                    trailing={renderIcon({ name: 'chevron-right', library: 'Feather' }, 'Feather', 14, theme.outlineVariant)}
                    onPress={() => {}}
                  />
                ))}
              </ThemedView>
            </View>

            {/* Row 3 — intentionally taller than the panel; clipped at bottom */}
            <View style={[styles.row, { gap: spacing.sm }]}>
              <ThemedView variant="surface" elevation={1} style={[styles.demoCard, { borderRadius: borderRadius.md, minHeight: 220, overflow: 'hidden' }]}>
                <ListItem
                  title="Notifications"
                  leading={renderIcon({ name: 'bell', library: 'Feather' }, 'Feather', 16, theme.primary)}
                  trailing={<Switch value onValueChange={() => {}} />}
                />
                <Divider />
                {([
                  { icon: 'message-circle' as const, label: 'Messages', value: true },
                  { icon: 'refresh-cw' as const, label: 'App updates', value: true },
                  { icon: 'clock' as const, label: 'Reminders', value: false },
                  { icon: 'tag' as const, label: 'Promotions', value: false },
                  { icon: 'star' as const, label: 'Highlights', value: true },
                ]).map((item) => (
                  <ListItem
                    key={item.label}
                    title={item.label}
                    leading={renderIcon({ name: item.icon, library: 'Feather' }, 'Feather', 14, theme.onSurfaceVariant)}
                    trailing={<Switch value={item.value} onValueChange={() => {}} />}
                  />
                ))}
              </ThemedView>

              <ThemedView variant="primary" style={[styles.demoCard, { borderRadius: borderRadius.md, padding: spacing.md, gap: spacing.md, minHeight: 220 }]}>
                <View style={[styles.row, { alignItems: 'center', gap: spacing.xs }]}>
                  {renderIcon({ name: 'activity', library: 'Feather' }, 'Feather', 16, theme.onPrimary)}
                  <Typography variant="labelSmall" color={theme.onPrimary}>Performance</Typography>
                </View>
                <View>
                  <Typography variant="displaySmall" weight="bold" color={theme.onPrimary}>98.2%</Typography>
                  <Typography variant="labelSmall" color={theme.onPrimary} style={{ opacity: 0.7 }}>↑ Uptime this month</Typography>
                </View>
                <View style={[styles.row, { alignItems: 'flex-end', gap: 4, height: 64 }]}>
                  {[0.5, 0.7, 0.6, 0.9, 0.75, 1.0, 0.85, 0.95, 0.8, 0.98].map((h, i) => (
                    <View key={i} style={{ flex: 1, height: `${h * 100}%`, backgroundColor: theme.onPrimary, borderRadius: 3, opacity: 0.6 + h * 0.4 }} />
                  ))}
                </View>
                <Divider style={{ backgroundColor: theme.onPrimary, opacity: 0.2 }} />
                <View style={{ gap: spacing.xs }}>
                  {[{ label: 'Avg response', val: '142ms' }, { label: 'Error rate', val: '0.02%' }, { label: 'Requests/s', val: '2.4k' }].map(s => (
                    <View key={s.label} style={[styles.row, { justifyContent: 'space-between' }]}>
                      <Typography variant="labelSmall" color={theme.onPrimary} style={{ opacity: 0.7 }}>{s.label}</Typography>
                      <Typography variant="labelSmall" weight="bold" color={theme.onPrimary}>{s.val}</Typography>
                    </View>
                  ))}
                </View>
              </ThemedView>
            </View>
          </View>
        </View>

          {/* Stats strip — bottom row of section 1, inside max-width */}
          <Container style={{ paddingVertical: spacing.xxxl }}>
            <View style={{ gap: spacing.lg, alignItems: 'center' }}>
              <Typography variant="labelSmall" color={theme.outlineVariant} align="center">
                OPEN SOURCE · MIT LICENSE
              </Typography>
              <View style={[styles.statRow, { gap: spacing.lg, flexWrap: 'wrap', justifyContent: 'center' }]}>
                <View style={[styles.statTile, { gap: 4, alignItems: 'center' }]}>
                  <View style={[styles.row, { alignItems: 'center', gap: spacing.xs }]}>
                    <GitHubIcon size={22} color={theme.onSurfaceVariant} isDark={isDark} />
                    <Typography variant="headlineMedium" weight="bold" color={theme.onSurfaceVariant}>{stars ?? '—'}</Typography>
                  </View>
                  <Typography variant="labelMedium" color={theme.outlineVariant}>Stars</Typography>
                </View>
                <View style={[styles.statDivider, { backgroundColor: theme.outlineVariant }]} />
                <View style={[styles.statTile, { gap: 4, alignItems: 'center' }]}>
                  <View style={[styles.row, { alignItems: 'center', gap: spacing.xs }]}>
                    {Platform.OS === 'web' ? (
                      <Image source={{ uri: 'https://svgl.app/library/npm.svg' }} style={{ width: 22, height: 22 }} />
                    ) : (
                      renderIcon({ name: 'package', library: 'Feather' }, 'Feather', 20, theme.onSurfaceVariant)
                    )}
                    <Typography variant="headlineMedium" weight="bold" color={theme.onSurfaceVariant}>{downloads ?? '—'}</Typography>
                  </View>
                  <Typography variant="labelMedium" color={theme.outlineVariant}>Downloads / wk</Typography>
                </View>
                <View style={[styles.statDivider, { backgroundColor: theme.outlineVariant }]} />
                <View style={[styles.statTile, { gap: 4, alignItems: 'center' }]}>
                  <View style={[styles.row, { alignItems: 'center', gap: spacing.xs }]}>
                    {renderIcon({ name: 'box', library: 'Feather' }, 'Feather', 20, theme.onSurfaceVariant)}
                    <Typography variant="headlineMedium" weight="bold" color={theme.onSurfaceVariant}>28</Typography>
                  </View>
                  <Typography variant="labelMedium" color={theme.outlineVariant}>Components</Typography>
                </View>
                <View style={[styles.statDivider, { backgroundColor: theme.outlineVariant }]} />
                <View style={[styles.statTile, { gap: 4, alignItems: 'center' }]}>
                  <View style={[styles.row, { alignItems: 'center', gap: spacing.sm }]}>
                    {renderIcon({ name: 'smartphone', library: 'Feather' }, 'Feather', 20, theme.onSurfaceVariant)}
                    {renderIcon({ name: 'android', library: 'MaterialIcons' }, 'MaterialIcons', 20, theme.onSurfaceVariant)}
                    {renderIcon({ name: 'globe', library: 'Feather' }, 'Feather', 20, theme.onSurfaceVariant)}
                  </View>
                  <Typography variant="labelMedium" color={theme.outlineVariant}>iOS · Android · Web</Typography>
                </View>
              </View>
            </View>
          </Container>
        </View>
      ) : (
        <SafeAreaView style={[styles.hero, { paddingHorizontal: spacing.xl, paddingTop: 80, paddingBottom: spacing.xxl, gap: spacing.xl }]}>
          <Image source={logoSource} style={styles.logo} resizeMode="contain" />
          <View style={[styles.centered, { gap: spacing.md }]}>
            <Typography variant="displaySmall" weight="bold" align="center">
              The React Native UI library{'\n'}built for the AI era
            </Typography>
            <Typography variant="bodyLarge" align="center" color={theme.onSurfaceVariant}>
              MCP server + Claude Skills — so AI generates predictable, accessible and consistent components.{'\n'}
              Native iOS and Android components with EXPO UI.{'\n'}
              Material 3 Theming system great for use with Native Components{'\n'}
            </Typography>
          </View>
          <View style={[styles.ctaRow, { gap: spacing.md }]}>
            <Button title="Get Started" variant="filled" icon={{ name: 'arrow-right' }} onPress={() => router.push('/explore')} />
            <Button title={isDark ? 'Light mode' : 'Dark mode'} variant="outlined" icon={{ name: isDark ? 'sun' : 'moon' }} onPress={toggleTheme} />
          </View>
          <Typography variant="labelSmall" color={theme.onSurfaceVariant} align="center">
            This site is built entirely with zero-to-app
          </Typography>
        </SafeAreaView>
      )}

      {/* ─────────────────────────────────────────────────────────────────── */}
      <View style={{ height: 1, backgroundColor: theme.outlineVariant }} />

      {/* ── Features + Callout (free height) ── */}
      <Container style={{ paddingVertical: SECTION_PAD }}>
        <View style={{ gap: spacing.xxl }}>
          <View style={{ gap: spacing.xl }}>
            <View style={{ gap: spacing.sm }}>
              <Typography variant="headlineMedium" weight="bold">What&apos;s inside</Typography>
              <Typography variant="bodyMedium" color={theme.onSurfaceVariant}>
                Everything you need to build production-quality cross-platform apps.
              </Typography>
            </View>
            <ThemedView columns={2} gap={spacing.lg}>
              {FEATURES.map((feature, index) => (
                <ThemedView
                  key={index}
                  variant="card"
                  elevation={1}
                  style={{
                    padding: spacing.lg,
                    gap: spacing.sm,
                    borderRadius: borderRadius.md,
                    borderWidth: 1,
                    borderColor: theme.outlineVariant,
                  }}>
                  <View style={[styles.iconWrap, { backgroundColor: feature.iconAccent ? theme.primaryContainer : theme.surfaceContainerHigh, borderRadius: borderRadius.sm }]}>
                    {renderIcon(feature.icon, 'Feather', 16, feature.iconAccent ? theme.onPrimaryContainer : theme.onSurfaceVariant)}
                  </View>
                  <Typography variant="titleSmall" weight="bold">{feature.title}</Typography>
                  <Typography variant="bodySmall" color={theme.onSurfaceVariant}>{feature.description}</Typography>
                </ThemedView>
              ))}
            </ThemedView>
          </View>

          <ThemedView variant="primary" style={{ borderRadius: borderRadius.lg, padding: spacing.xxl, gap: spacing.md }}>
            <Typography variant="headlineSmall" weight="bold" color={theme.onPrimary}>
              Built with zero-to-app
            </Typography>
            <Typography variant="bodyMedium" color={theme.onPrimary}>
              Every component on this page — buttons, cards, navigation, typography — is rendered by the same library you install. What you see is what you ship.
            </Typography>
            <Button title="Explore the components" variant="tonal" icon={{ name: 'arrow-right' }} onPress={() => router.push('/explore')} />
          </ThemedView>
        </View>
      </Container>

      {/* ─────────────────────────────────────────────────────────────────── */}
      <View style={{ height: 1, backgroundColor: theme.outlineVariant }} />

      {/* ── Footer ── */}
      <Container>
        <View style={[styles.footer, { paddingVertical: spacing.xl }]}>
          <Typography variant="bodySmall" color={theme.onSurfaceVariant}>© 2025 zero-to-app</Typography>
          <View style={[styles.row, { gap: spacing.lg }]}>
            <Typography variant="bodySmall" color={theme.onSurfaceVariant} onPress={() => Linking.openURL('https://github.com/Alex-Amayo/zero-to-app')}>GitHub</Typography>
            <Typography variant="bodySmall" color={theme.onSurfaceVariant} onPress={() => Linking.openURL('https://www.npmjs.com/package/zero-to-app')}>NPM</Typography>
          </View>
        </View>
      </Container>

    </Screen>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  // Mobile hero
  hero: { alignItems: 'center' },
  centered: { alignItems: 'center', maxWidth: 520 },
  logo: { width: 64, height: 64 },
  // Web hero — heroLeft uses dynamic paddingLeft computed inline
  heroWeb: { flexDirection: 'row', alignItems: 'stretch' },
  heroLeft: { width: '50%', justifyContent: 'center' },
  heroRight: { width: '50%' },
  demoCard: { flex: 1, minWidth: 0 },
  progressTrack: { height: 3, width: '100%' },
  progressFill: { height: 3 },
  profileImage: { width: 56, height: 56 },
  ctaRow: { flexDirection: 'row', flexWrap: 'wrap' },
  row: { flexDirection: 'row' },
  iconWrap: { width: 36, height: 36, alignItems: 'center', justifyContent: 'center' },
  statRow: { flexDirection: 'row', alignItems: 'center' },
  statTile: { minWidth: 80 },
  statDivider: { width: 1, height: 56, opacity: 0.4 },
  footer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
});
