import { KeyboardAvoidingView, Text, TextInput, StyleSheet, Image, View, Platform, SafeAreaView, Keyboard } from 'react-native';
import TextLink from '../../components/TextLink';
import Button from '../../components/Button';
import { router } from 'expo-router';
import brand from '../../brand/brandConfig';
import Card from '../../components/Card';
import List from '../../components/List';

export default function RecoverPage() {
  return (
    <SafeAreaView 
      style={styles.screen}
      onStartShouldSetResponder={() => {
        Keyboard.dismiss();
        return false;
      }}
      >
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
            <Image source={require('../../assets/logo.png')} style={styles.logo} />
            <Card>
              <List>
                <Text style={styles.title}>Recover Your {brand.name} Password</Text>
                <TextInput placeholder='Email or Phone Number' style={styles.textInput} />
                <Button title='Reset Password' onPress={() => router.push('/core')} />
                <TextLink text='Go back to login' onPress={() => router.push('/login')}/>
              </List>
            </Card>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: brand.colors.background,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 15,
    backgroundColor: brand.colors.background, 
  },
  logo: {
    height: 200,
    width: 200,
    marginBottom: 15,
    alignSelf: 'center'
  },
  title: {
    fontSize: brand.fontSizes.large,
    textAlign: 'center',
    color: brand.colors.text,
  },
  textInput: {
    padding: 15,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ddd',
  }
});
