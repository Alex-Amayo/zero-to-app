import React from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

const LoadingScreen = () => {
  return (
    <View style={styles.container}>
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
    backgroundColor: '#fff', // Optional: Set background color
  },
  lottieView: {
    width: 200,
    height: 200,
  },
});

export default LoadingScreen;
