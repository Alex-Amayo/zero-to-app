import React from 'react';
import { useEffect } from 'react';
import { router } from 'expo-router';
import LoadingScreen from '../components/LoadingScreen';

export default function HomePage() {
  //Plays animation for 3 sec then pushes '/login' route
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/auth/login');
    }, 3000); // 3 seconds
    // Clear timer when component unmounts
    return () => clearTimeout(timer);
  }, []);

  return <LoadingScreen />;
}
