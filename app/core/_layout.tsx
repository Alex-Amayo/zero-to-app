import React, { useContext } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Stack, Redirect } from 'expo-router';
import { ThemeContext } from '../../theme/theme';
import { StatusBar } from 'expo-status-bar';
import useAuthStore from '../../stores/authStore/authStore';

// This layout component redirects to the login page if the user is not authenticated otherwise it renders the main layout

const Layout = () => {
  // Initializing theme context
  const theme = useContext(ThemeContext);

  // Retrieving authentication state from store
  const { isAuthenticated } = useAuthStore();

  // Redirect to login page if user is not authenticated
  if (!isAuthenticated()) {
    return <Redirect href="/auth/login" />;
  }
  return (
    <SafeAreaView style={{ ...styles.container, backgroundColor: theme.values.appbarColor }}>
      <StatusBar style={theme.values.isDark ? 'light' : 'dark'} backgroundColor="red" />
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Layout;
