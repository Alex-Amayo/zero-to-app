import React from 'react';
import { View } from 'react-native';
import { Typography, ThemedView, useTheme } from 'zero-to-app';

interface DemoSectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

export function DemoSection({ title, description, children }: DemoSectionProps) {
  const { spacing, borderRadius } = useTheme();

  return (
    <View style={{ gap: spacing.lg }}>
      <Typography variant="titleMedium" weight="medium">
        {title}
      </Typography>
      {description && (
        <Typography variant="bodySmall" muted>
          {description}
        </Typography>
      )}
      <ThemedView variant="card" style={{ padding:spacing.md, borderRadius: borderRadius, gap: spacing.md }}>
        {children}
      </ThemedView>
    </View>
  );
}
