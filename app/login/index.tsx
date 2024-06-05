import { View, Text, TextInput, StyleSheet } from 'react-native';
import FormSeparator from '../../components/FormSeparator';
import TextLink from '../../components/TextLink';
import Button from '../../components/Button';

export default function LoginPage() {
  return  (
    <View style={styles.container}>
      <View style={styles.loginFormContainer}>
        <Text style={styles.title}>Log into Zero To App</Text>
        <TextInput placeholder='Username' style={styles.textInput} />
        <TextInput placeholder='Password' style={styles.textInput} secureTextEntry/>
        <Button title='Log In'/>
        <TextLink text='Forgot password?' />
        <FormSeparator text='or' /> 
        <Button title='Create New Account' secondary /> 
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginFormContainer: {
    width: 400,
    padding: 15,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ddd',
    alignItems: 'stretch',
    gap: 15,
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
