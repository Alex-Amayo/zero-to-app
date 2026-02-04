import React from 'react';
import { StyleSheet, View } from 'react-native';
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

  return (
    <ThemedView variant="surface" style={styles.container}>
      {/* Header row */}
      <View style={[styles.row, styles.headerRow, { borderBottomColor: theme.outlineVariant }]}>
        <View style={styles.propCell}>
          <Typography variant="labelMedium" weight="bold">Prop</Typography>
        </View>
        <View style={styles.typeCell}>
          <Typography variant="labelMedium" weight="bold">Type</Typography>
        </View>
        <View style={styles.defaultCell}>
          <Typography variant="labelMedium" weight="bold">Default</Typography>
        </View>
        <View style={styles.descCell}>
          <Typography variant="labelMedium" weight="bold">Description</Typography>
        </View>
      </View>

      {/* Data rows */}
      {props.map((prop, index) => (
        <View
          key={prop.name}
          style={[
            styles.row,
            index < props.length - 1 && { borderBottomColor: theme.outlineVariant, borderBottomWidth: 1 }
          ]}
        >
          <View style={styles.propCell}>
            <Typography variant="bodySmall" weight="medium" style={{ fontFamily: 'monospace' }}>
              {prop.name}
            </Typography>
          </View>
          <View style={styles.typeCell}>
            <Typography variant="bodySmall" muted style={{ fontFamily: 'monospace' }}>
              {prop.type}
            </Typography>
          </View>
          <View style={styles.defaultCell}>
            <Typography variant="bodySmall" muted style={{ fontFamily: 'monospace' }}>
              {prop.default ?? '-'}
            </Typography>
          </View>
          <View style={styles.descCell}>
            <Typography variant="bodySmall">{prop.description}</Typography>
          </View>
        </View>
      ))}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  headerRow: {
    borderBottomWidth: 2,
  },
  propCell: {
    flex: 1,
    minWidth: 100,
  },
  typeCell: {
    flex: 2,
    minWidth: 150,
  },
  defaultCell: {
    flex: 1,
    minWidth: 80,
  },
  descCell: {
    flex: 2,
    minWidth: 150,
  },
});
