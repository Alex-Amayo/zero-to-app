import { version } from 'expo/package.json';
import { Image } from 'expo-image';
import React from 'react';
import { useColorScheme, StyleSheet } from 'react-native';

import { Typography, ThemedView } from 'zero-to-app';


export function WebBadge() {
  const scheme = useColorScheme();

  return (
    <ThemedView style={styles.container}>
      <Typography variant="body"  style={styles.versionText}>
        v{version}
      </Typography>
      <Image
        source={
          scheme === 'dark'
            ? require('@/assets/images/expo-badge-white.png')
            : require('@/assets/images/expo-badge.png')
        }
        style={styles.badgeImage}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  versionText: {
    textAlign: 'center',
  },
  badgeImage: {
    width: 123,
    aspectRatio: 123 / 24,
  },
});
