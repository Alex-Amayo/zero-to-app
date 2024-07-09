import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ThemeContext } from '../../../theme/theme';

const HomePage = () => {
  // Initialize theme
  const theme = useContext(ThemeContext);

  return (
    <View
      style={{
        ...styles.container,
        // Configure background color with theme
        backgroundColor: theme.values.backgroundColor,
      }}>
      <Text style={{ color: theme.values.color }}>Home Page</Text>
    </View>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
