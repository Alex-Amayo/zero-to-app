import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { ThemeContext } from '../theme/theme';

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
