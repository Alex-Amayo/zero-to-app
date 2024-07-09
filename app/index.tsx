import { useEffect } from 'react';
import { router } from 'expo-router';
import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

export default function HomePage() {
  //Plays animation for 3 sec then pushes '/login' route
  useEffect(() => {
    setTimeout(() => {
      router.push('/auth/login');
    }, 3000);
  }, []);

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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lottieView: {
    width: 300,
    height: 300,
  },
});
