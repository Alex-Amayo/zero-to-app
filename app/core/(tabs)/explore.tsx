import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ThemeContext } from '../../../theme/theme';

const ExplorePage = () => {
  //Initialze theme
  const theme = useContext(ThemeContext);
  return (
    <View
      style={{
        ...styles.container,
        //Confingure background color with theme
        backgroundColor: theme.values.backgroundColor,
      }}>
      <Text style={{ color: theme.values.color }}>Explore Page</Text>
    </View>
  );
};

export default ExplorePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
