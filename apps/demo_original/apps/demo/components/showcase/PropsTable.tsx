import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Typography } from 'zero-to-app';
import { PropDefinition } from './componentData';

interface PropsTableProps {
  props: PropDefinition[];
}

export const PropsTable: React.FC<PropsTableProps> = ({ props }) => {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View style={styles.container}>
        <View style={styles.headerRow}>
          <View style={[styles.cell, styles.headerCell, styles.nameCell]}>
            <Typography variant="bodySmall" weight="bold">Name</Typography>
          </View>
          <View style={[styles.cell, styles.headerCell, styles.typeCell]}>
            <Typography variant="bodySmall" weight="bold">Type</Typography>
          </View>
          <View style={[styles.cell, styles.headerCell, styles.requiredCell]}>
            <Typography variant="bodySmall" weight="bold">Required</Typography>
          </View>
          <View style={[styles.cell, styles.headerCell, styles.defaultCell]}>
            <Typography variant="bodySmall" weight="bold">Default</Typography>
          </View>
          <View style={[styles.cell, styles.headerCell, styles.descriptionCell]}>
            <Typography variant="bodySmall" weight="bold">Description</Typography>
          </View>
        </View>
        {props.map((prop, index) => (
          <View key={index} style={styles.row}>
            <View style={[styles.cell, styles.nameCell]}>
              <Typography variant="bodySmall">{prop.name}</Typography>
            </View>
            <View style={[styles.cell, styles.typeCell]}>
              <Typography variant="bodySmall" style={styles.typeText}>
                {prop.type}
              </Typography>
            </View>
            <View style={[styles.cell, styles.requiredCell]}>
              {prop.required ? (
                <View style={styles.requiredBadge}>
                  <Typography variant="labelSmall" color="#fff">
                    Required
                  </Typography>
                </View>
              ) : (
                <Typography variant="bodySmall" muted>
                  Optional
                </Typography>
              )}
            </View>
            <View style={[styles.cell, styles.defaultCell]}>
              <Typography variant="bodySmall" muted>
                {prop.default || '-'}
              </Typography>
            </View>
            <View style={[styles.cell, styles.descriptionCell]}>
              <Typography variant="bodySmall">{prop.description}</Typography>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  headerRow: {
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    borderBottomWidth: 2,
    borderBottomColor: '#e0e0e0',
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  cell: {
    padding: 12,
    justifyContent: 'center',
  },
  headerCell: {
    backgroundColor: '#f5f5f5',
  },
  nameCell: {
    minWidth: 100,
    maxWidth: 120,
  },
  typeCell: {
    minWidth: 120,
    maxWidth: 150,
  },
  requiredCell: {
    minWidth: 80,
    maxWidth: 100,
  },
  defaultCell: {
    minWidth: 80,
    maxWidth: 100,
  },
  descriptionCell: {
    minWidth: 200,
    flex: 1,
  },
  typeText: {
    fontFamily: 'monospace',
  },
  requiredBadge: {
    backgroundColor: '#ff5757',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
});
