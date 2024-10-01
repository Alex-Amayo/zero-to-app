import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { ThemeContext } from '../../../theme/theme';
import { StyledText } from '../../../components/StyledText';

const ExplorePage = () => {
  //Initialize theme
  const theme = useContext(ThemeContext);
  return (
    <View
      style={{
        ...styles.container,
        //Configure background color with theme
        backgroundColor: theme.values.backgroundColor,
      }}>
      <StyledText bold>Explore Page</StyledText>
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
