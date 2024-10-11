import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import LottieView from 'lottie-react-native';
import { ThemeContext } from '../theme/theme';

/**
 * Loading Screen component.
 * Can be displayed conditionally when a page is loading
 */

const LoadingScreen = () => {
  // Initialize theme
  const theme = useContext(ThemeContext);

  return (
    <View style={{ ...styles.container, backgroundColor: theme.values.backgroundColor }}>
      <LottieView
        source={require('../assets/loading.json')}
        autoPlay
        loop
        style={styles.lottieView}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lottieView: {
    width: '50%',
    height: '50%',
  },
});

export default LoadingScreen;
