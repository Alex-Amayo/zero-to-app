import React from 'react';
import { View, StyleSheet } from 'react-native';

/**
 * Thin black bar for mobile web to replace footer
 * Provides visual separation without taking significant space
 */
const MobileFooterBar = () => {
  return <View style={styles.bar} />;
};

const styles = StyleSheet.create({
  bar: {
    width: '100%',
    height: 3,
    backgroundColor: '#000000',
  },
});

export default MobileFooterBar;

