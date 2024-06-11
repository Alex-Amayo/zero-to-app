import { useEffect } from 'react';
import { router } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';


export default function HomePage() {
  useEffect(() => {
    setTimeout(() => {
      router.push('/login');
    }, 3000);
  }, []);

  return (
    <View style={styles.container}>
      <Text>Welcome to My Screen!</Text>
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