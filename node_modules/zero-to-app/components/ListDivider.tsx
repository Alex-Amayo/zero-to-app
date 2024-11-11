import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { ThemeContext } from '../theme/theme';

/**
 * Returns a line that extends the full width of the container
 * Derives color from theme
 */

const ListDivider = () => {
  const theme = useContext(ThemeContext);
  return (
    <View
      style={{
        backgroundColor: theme.values.dividerColor,
        ...styles.listDivider,
      }}></View>
  );
};

export default ListDivider;

const styles = StyleSheet.create({
  listDivider: {
    width: '100%',
    height: 1,
  },
});
