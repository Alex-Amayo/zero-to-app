import { useEffect } from 'react';
import { router } from 'expo-router';
import { View, Text } from 'react-native';

export default function HomePage() {
  useEffect(() => {
    setTimeout(() => {
      router.push('/login');
    }, 1000);
  }, []);

  return (
    <View>
      <Text>Welcome to My Screen!</Text>
    </View>
  );
}