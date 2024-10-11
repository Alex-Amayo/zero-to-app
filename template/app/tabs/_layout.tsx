import React, { useContext } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';
import { ThemeContext } from '../../theme/theme';
import { StatusBar } from 'expo-status-bar';

// This layout component redirects to the login page if the user is not authenticated otherwise it renders the main layout

const Layout = () => {
  // Initializing theme context
  const theme = useContext(ThemeContext);
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
