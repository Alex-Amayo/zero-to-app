import React, { useContext } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Image, View } from 'react-native';
import { ThemeContext } from '../../theme/theme';
import { Slot } from 'expo-router';
import ToggleIconButton from '../../components/ToggleIconButton';
import { StatusBar } from 'expo-status-bar';

export default function LoginPage() {
  // Initializing theme context
  const theme = useContext(ThemeContext);
  const { toggleTheme } = useContext(ThemeContext);

  return (
    <SafeAreaView style={{ ...styles.safeArea, backgroundColor: theme.values.backgroundColor }}>
      <StatusBar style={theme.values.isDark ? 'light' : 'dark'} />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.container}>
          <View style={styles.toggleThemeButton}>
            <ToggleIconButton iconName="moon" alternateIconName="sun" onPress={toggleTheme} />
          </View>
          <Image
            source={{
              uri: theme.values.isDark
                ? 'https://utfs.io/f/0f641941-fe3a-447e-bff3-a9ea1201006c-qkt02w.png'
                : 'https://utfs.io/f/6f54a643-3891-4def-9ee0-75165f57ffc2-1zbfv.png',
            }}
            style={styles.logo}
          />
          <Slot />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  keyboardAvoidingView: {
    width: 300,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  logo: {
    height: 200,
    width: 200,
    alignSelf: 'center',
  },
  toggleThemeButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: 10,
  },
});
