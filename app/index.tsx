import React from 'react';
import { useEffect } from 'react';
import { router } from 'expo-router';
import LoadingScreen from '../components/LoadingScreen';

export default function HomePage() {
  //Plays animation for 3 sec then pushes '/login' route
  useEffect(() => {
    setTimeout(() => {
      router.push('/auth/login');
    }, 3000);
  }, []);

  return <LoadingScreen />;
}
