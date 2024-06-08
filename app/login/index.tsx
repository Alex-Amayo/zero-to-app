import { View, Text, TextInput, StyleSheet, Image } from 'react-native';
import FormSeparator from '../../components/FormSeparator';
import TextLink from '../../components/TextLink';
import Button from '../../components/Button';
import { router } from 'expo-router';

export default function LoginPage() {
  return  (
    <View style={styles.container}>
      <Image source={require('../../assets/logo.png')} style={styles.logo} />
      <View style={styles.formContainer}>
        <Text style={styles.title}>Log into Zero To App</Text>
        <TextInput placeholder='Username' style={styles.textInput} />
        <TextInput placeholder='Password' style={styles.textInput} secureTextEntry/>
        <Button title='Log In' onPress={() => router.push('/core')} />
        <TextLink text='Forgot password?' />
        <FormSeparator text='or' /> 
        <Button title='Create New Account' onPress={() => router.push('/signup')} secondary /> 
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,  
  },
  formContainer: {
    minWidth: '40%',
    padding: 15,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ddd',
    alignItems: 'stretch',
    gap: 15,
  },
  logo: {
    width: 300,
    height: 100,
    marginBottom: 15,
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
  },
  textInput: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ddd',
  },
  loginButton: {
    backgroundColor: 'blue',
    color: 'white',
    padding: 10,
    borderRadius: 5,
  },
});
