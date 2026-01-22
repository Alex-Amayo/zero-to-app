import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { StyledText } from 'zero-to-app';
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
            <StyledText fontSize="sm" bold>Name</StyledText>
          </View>
          <View style={[styles.cell, styles.headerCell, styles.typeCell]}>
            <StyledText fontSize="sm" bold>Type</StyledText>
          </View>
          <View style={[styles.cell, styles.headerCell, styles.requiredCell]}>
            <StyledText fontSize="sm" bold>Required</StyledText>
          </View>
          <View style={[styles.cell, styles.headerCell, styles.defaultCell]}>
            <StyledText fontSize="sm" bold>Default</StyledText>
          </View>
          <View style={[styles.cell, styles.headerCell, styles.descriptionCell]}>
            <StyledText fontSize="sm" bold>Description</StyledText>
          </View>
        </View>
        {props.map((prop, index) => (
          <View key={index} style={styles.row}>
            <View style={[styles.cell, styles.nameCell]}>
              <StyledText fontSize="sm">{prop.name}</StyledText>
            </View>
            <View style={[styles.cell, styles.typeCell]}>
              <StyledText fontSize="sm" style={styles.typeText}>
                {prop.type}
              </StyledText>
            </View>
            <View style={[styles.cell, styles.requiredCell]}>
              {prop.required ? (
                <View style={styles.requiredBadge}>
                  <StyledText fontSize="xs" color="#fff">
                    Required
                  </StyledText>
                </View>
              ) : (
                <StyledText fontSize="sm" muted>
                  Optional
                </StyledText>
              )}
            </View>
            <View style={[styles.cell, styles.defaultCell]}>
              <StyledText fontSize="sm" muted>
                {prop.default || '-'}
              </StyledText>
            </View>
            <View style={[styles.cell, styles.descriptionCell]}>
              <StyledText fontSize="sm">{prop.description}</StyledText>
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
