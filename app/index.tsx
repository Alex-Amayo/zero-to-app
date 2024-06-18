import { useEffect } from 'react';
import { router } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';


export default function HomePage() {
  useEffect(() => {
    setTimeout(() => {
      router.push('/login');
    }, 2000);
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