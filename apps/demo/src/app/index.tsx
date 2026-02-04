import { Platform, StyleSheet } from 'react-native';
import { Screen } from 'zero-to-app';

import { AnimatedIcon } from '@/components/animated-icon';
import { HintRow } from '@/components/hint-row';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { WebBadge } from '@/components/web-badge';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { Image } from 'expo-image';

export default function HomeScreen() {
  return (
    <Screen 
      variant="background" 
      edges={['top']}
      centered
      contentContainerStyle={styles.contentContainer}
    >
      <ThemedView style={styles.heroSection}>
        <Image source={require('@/assets/images/zero-to-app.png')} style={{ width: 200, height: 200, marginBottom: Spacing.four }} />
        <ThemedText type="title" style={styles.title}>
          Welcome to&nbsp;Zero To App
        </ThemedText>
      </ThemedView>

      <ThemedText type="code" style={styles.code}>
        get started
      </ThemedText>

      <ThemedView type="backgroundElement" style={styles.stepContainer}>
        <HintRow title="Try editing" hint="src/app/index.tsx" />
        <HintRow title="Dev tools" hint="cmd+d" />
        <HintRow title="Fresh start" hint="npm reset project" />
      </ThemedView>

      {Platform.OS === 'web' && <WebBadge />}
    </Screen>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: Spacing.four,
    alignItems: 'center',
    gap: Spacing.three,
    paddingBottom: BottomTabInset + Spacing.three,
  },
  heroSection: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.four,
    gap: Spacing.four,
  },
  title: {
    textAlign: 'center',
  },
  code: {
    textTransform: 'uppercase',
  },
  stepContainer: {
    gap: Spacing.three,
    alignSelf: 'stretch',
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.four,
    borderRadius: Spacing.four,
  },
});
