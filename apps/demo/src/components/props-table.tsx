import React from 'react';
import { View } from 'react-native';
import { Typography, ThemedView, useTheme } from 'zero-to-app';

export interface PropDefinition {
  name: string;
  type: string;
  default?: string;
  description: string;
}

interface PropsTableProps {
  props: PropDefinition[];
}

export function PropsTable({ props }: PropsTableProps) {
  const theme = useTheme();
  const { spacing } = theme;

  const rowStyle = {
    flexDirection: 'row' as const,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
  };

  return (
    <ThemedView variant="surface" style={{ borderRadius: spacing.sm, overflow: 'hidden' }}>
      {/* Header row */}
      <View style={[rowStyle, { borderBottomWidth: 2, borderBottomColor: theme.outlineVariant }]}>
        <View style={{ flex: 1, minWidth: 100 }}>
          <Typography variant="labelMedium" weight="bold">Prop</Typography>
        </View>
        <View style={{ flex: 2, minWidth: 150 }}>
          <Typography variant="labelMedium" weight="bold">Type</Typography>
        </View>
        <View style={{ flex: 1, minWidth: 80 }}>
          <Typography variant="labelMedium" weight="bold">Default</Typography>
        </View>
        <View style={{ flex: 2, minWidth: 150 }}>
          <Typography variant="labelMedium" weight="bold">Description</Typography>
        </View>
      </View>

      {/* Data rows */}
      {props.map((prop, index) => (
        <View
          key={prop.name}
          style={[
            rowStyle,
            index < props.length - 1 && { borderBottomColor: theme.outlineVariant, borderBottomWidth: 1 }
          ]}
        >
          <View style={{ flex: 1, minWidth: 100 }}>
            <Typography variant="bodySmall" weight="medium" style={{ fontFamily: 'monospace' }}>
              {prop.name}
            </Typography>
          </View>
          <View style={{ flex: 2, minWidth: 150 }}>
            <Typography variant="bodySmall" muted style={{ fontFamily: 'monospace' }}>
              {prop.type}
            </Typography>
          </View>
          <View style={{ flex: 1, minWidth: 80 }}>
            <Typography variant="bodySmall" muted style={{ fontFamily: 'monospace' }}>
              {prop.default ?? '-'}
            </Typography>
          </View>
          <View style={{ flex: 2, minWidth: 150 }}>
            <Typography variant="bodySmall">{prop.description}</Typography>
          </View>
        </View>
      ))}
    </ThemedView>
  );
}
