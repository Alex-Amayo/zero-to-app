import { useTheme, Screen, ThemedView, Typography, Button, renderIcon } from 'zero-to-app';
import {router} from "expo-router";

const BENEFITS = [
  {
    title: 'Less duplicate code',
    description: 'Shared UI components across all platforms.',
    icon: 'content-copy',
  },
  {
    title: 'Type-safe styling',
    description: 'Full TypeScript support for your design system.',
    icon: 'shield',
  },
  {
    title: 'Theming',
    description: 'Material 3 based dynamic theming engine.',
    icon: 'theme-light-dark',
  },
  {
    title: 'Theming',
    description: 'Material 3 based dynamic theming engine.',
    icon: 'theme-light-dark',
  },
];

export default function HomeScreen() {
  const theme = useTheme();
  const { spacing } = theme;

  return (
    <Screen
      scrollable
      variant="background"
      edges={['top']}
      style={{ alignItems: 'center'}}
    >
      <ThemedView style={{ alignItems: 'center', justifyContent: 'center', gap: spacing.lg, padding: spacing.xxl }}>
        <Typography variant="displayLarge" weight="bold">
          Zero To App
        </Typography>
        <Typography variant={"displaySmall"} align="center">
          Material 3 based UI library for React Native.
        </Typography>
        <Typography variant={"titleLarge"} align="center">
          Seamless experiences across iOS, Android, and web.
        </Typography>
      </ThemedView>

      <ThemedView columns={2} gap={spacing.lg} style={{ width: '100%', paddingHorizontal: spacing.xl }}>
        {BENEFITS.map((benefit, index) => (
          <ThemedView
            key={index}
            variant="card"
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              padding: spacing.lg,
              gap: spacing.lg,
            }}
          >
            <ThemedView
              style={{
                width: 48,
                height: 48,
                borderRadius: 24,
                backgroundColor: theme.primaryContainer,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {renderIcon(benefit.icon, 'MaterialCommunityIcons', 24, theme.onPrimaryContainer)}
            </ThemedView>
            <ThemedView variant={"card"} style={{ flex: 1, gap: spacing.xs, padding: spacing.sm }}>
              <Typography align={"center"} variant="titleMedium" weight="bold">
                {benefit.title}
              </Typography>
              <Typography align={"center"} variant="bodyMedium" color={theme.onSurfaceVariant}>
                {benefit.description}
              </Typography>
            </ThemedView>
          </ThemedView>
        ))}
      </ThemedView>

      <ThemedView  style={{ alignItems: 'center', justifyContent: 'center', gap: spacing.lg, marginHorizontal: spacing.xl, marginTop: spacing.xl }}>
        <Typography variant={"titleMedium"}>
          Ready to build your next big thing?
        </Typography>
        <Button title="Explore Components" variant="elevated"
                onPress={() => {router.push('/explore')}}
                icon={
                  {name: 'chevron-right', color: theme.onSurfaceVariant}
                }
        />
      </ThemedView>

    </Screen>
  );
}
