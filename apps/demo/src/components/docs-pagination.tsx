import { View } from 'react-native';
import { Button, Typography, useTheme } from 'zero-to-app';
import { usePathname, useRouter } from 'expo-router';

const PAGES = [
  { label: 'Installation', route: '/explore' },
  { label: 'Theming', route: '/explore/theming' },
  { label: 'Tokens', route: '/explore/tokens' },
  { label: 'Icons', route: '/explore/icons' },
  { label: 'Screen', route: '/explore/screen' },
  { label: 'Container', route: '/explore/container' },
  { label: 'ThemedView', route: '/explore/themed-view' },
  { label: 'Typography', route: '/explore/typography' },
  { label: 'ThemedImage', route: '/explore/themed-image' },
  { label: 'Button', route: '/explore/button' },
];

export function DocsPagination() {
  const pathname = usePathname();
  const router = useRouter();
  const { spacing, outlineVariant } = useTheme();

  const currentIndex = PAGES.findIndex((p) => p.route === pathname);
  const prev = currentIndex > 0 ? PAGES[currentIndex - 1] : null;
  const next = currentIndex < PAGES.length - 1 ? PAGES[currentIndex + 1] : null;

  return (
    <View style={{ gap: spacing.md, marginTop: spacing.xxxl }}>
      <View style={{ height: 1, backgroundColor: outlineVariant }} />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style={{ flex: 1 }}>
          {prev && (
            <View style={{ gap: spacing.xs, alignItems: 'flex-start' }}>
              <Typography variant="labelSmall" muted>Previous</Typography>
              <Button
                title={prev.label}
                variant="outlined"
                icon={{ name: 'chevron-left' }}
                iconPosition="left"
                onPress={() => router.push(prev.route as any)}
              />
            </View>
          )}
        </View>
        <View style={{ flex: 1, alignItems: 'flex-end' }}>
          {next && (
            <View style={{ gap: spacing.xs, alignItems: 'flex-end' }}>
              <Typography variant="labelSmall" muted>Next</Typography>
              <Button
                title={next.label}
                variant="tonal"
                icon={{ name: 'chevron-right' }}
                iconPosition="right"
                onPress={() => router.push(next.route as any)}
              />
            </View>
          )}
        </View>
      </View>
    </View>
  );
}
