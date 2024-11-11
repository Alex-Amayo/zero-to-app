import React, { useContext } from 'react';
import { Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';
import { ThemeContext } from '../../theme/theme';
import { Slot } from 'expo-router';
import ToggleIconButton from '../../components/ToggleIconButton';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import brand from '../../brand/brandConfig';

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
              <ToggleIconButton
                iconName="moon"
                alternateIconName="sun"
                onPress={toggleTheme}
                raised
              />
            </View>
            <Image
              source={{
                uri: theme.values.isDark ? brand.logo.dark : brand.logo.light,
              }}
              style={styles.logo}
            />
            <View style={styles.formStyles}>
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
  formStyles: {
    width: 300,
  },
});
