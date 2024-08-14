import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import { ThemeContext } from '../theme/theme';

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
