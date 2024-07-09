import { useContext } from 'react';
import {
  KeyboardAvoidingView,
  StyleSheet,
  Image,
  Platform,
  SafeAreaView,
  Keyboard,
  View,
} from 'react-native';
import { Slot } from 'expo-router';
import { ThemeContext } from '../../theme/theme';
import ToggleIconButton from '../../components/ToggleIconButton';

export default function LoginPage() {
  //Initializing theme context
  const theme = useContext(ThemeContext);
  const { toggleTheme } = useContext(ThemeContext);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: 'center',
        backgroundColor: theme.values.backgroundColor,
      }}
      onStartShouldSetResponder={() => {
        Keyboard.dismiss();
        return false;
      }}>
        <View style={styles.toggleThemeButton}>
          <ToggleIconButton iconName='sun' alternateIconName='moon' onPress={toggleTheme}/>
        </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <Image source={require('../../assets/logo.png')} style={styles.logo} />
        <Slot />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 300,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 50,
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
