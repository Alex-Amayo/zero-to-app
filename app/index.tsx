import { useEffect } from 'react';
import { router } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';


export default function HomePage() {
  useEffect(() => {
    setTimeout(() => {
      router.push('/login');
    }, 5000);
  }, []);

  return (
    <View style={styles.container}>
      <LottieView source={require('../assets/loading.json')} autoPlay loop style={{width: '100%', height: '100%'}}/>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 15,
    },
});