import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Typography, ThemedView } from 'zero-to-app';

interface DemoSectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

export function DemoSection({ title, description, children }: DemoSectionProps) {
  return (
    <View style={styles.container}>
      <Typography variant="titleMedium" weight="medium">
        {title}
      </Typography>
      {description && (
        <Typography variant="bodySmall" muted style={styles.description}>
          {description}
        </Typography>
      )}
      <ThemedView variant="surface" style={styles.content}>
        {children}
      </ThemedView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  description: {
    marginBottom: 4,
  },
  content: {
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
});
