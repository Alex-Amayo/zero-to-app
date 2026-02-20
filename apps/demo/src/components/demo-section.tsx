import React from 'react';
import { View } from 'react-native';
import { Typography, ThemedView, useTheme } from 'zero-to-app';

interface DemoSectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

export function DemoSection({ title, description, children }: DemoSectionProps) {
  const { spacing, shape, surfaceContainerHighest } = useTheme();

  return (
    <View style={{ gap: spacing.sm }}>
      <Typography variant="titleMedium" weight="medium">
        {title}
      </Typography>
      {description && (
        <Typography variant="bodySmall" muted>
          {description}
        </Typography>
      )}
      <ThemedView
        color={surfaceContainerHighest}
        style={{ padding: spacing.xl, borderRadius: shape.surfaceBorderRadius, gap: spacing.lg }}
      >
        {children}
      </ThemedView>
    </View>
  );
}
