import React, { useContext } from 'react';
import { ScrollView, StyleSheet, Image, View, KeyboardAvoidingView, Platform } from 'react-native';
import { ThemeContext } from '../../theme/theme';
import { Slot } from 'expo-router';
import ToggleIconButton from '../../components/ToggleIconButton';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LoginPage() {
  // Initializing theme context
  const theme = useContext(ThemeContext);
  const { toggleTheme } = useContext(ThemeContext);

  return (
    <KeyboardAvoidingView
      style={{ ...styles.safeArea, backgroundColor: theme.values.backgroundColor }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <StatusBar style={theme.values.isDark ? 'light' : 'dark'} />
      <SafeAreaView style={styles.safeArea}>
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
            {/* Change width depending on platform */}
            <View style={{ width: Platform.OS === 'web' ? '25%' : '90%' }}>
              <Slot />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
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
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
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
