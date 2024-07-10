import React, { useContext } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Image, View, Keyboard, Platform, KeyboardAvoidingView } from 'react-native';
import { ThemeContext } from '../../theme/theme';
import { Slot } from 'expo-router';
import ToggleIconButton from '../../components/ToggleIconButton'; 
export default function LoginPage() {
  // Initializing theme context
  const theme = useContext(ThemeContext);
  const { toggleTheme } = useContext(ThemeContext);

  return (
    <SafeAreaView style={{...styles.safeArea,  backgroundColor: theme.values.backgroundColor }}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.container}>
          <View style={styles.toggleThemeButton}>
            <ToggleIconButton iconName='moon' alternateIconName='sun' onPress={toggleTheme} />
          </View>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.keyboardAvoidingView}>
            <Image source={theme.values.isDark ? require('../../assets/logo-dark.png') : require('../../assets/logo.png')} style={styles.logo} />
            <Slot /> 
          </KeyboardAvoidingView>
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