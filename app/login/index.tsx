import { View, Text, TextInput, StyleSheet, Image, ScrollView } from 'react-native';
import FormSeparator from '../../components/FormSeparator';
import TextLink from '../../components/TextLink';
import Button from '../../components/Button';
import { router } from 'expo-router';
import brand from '../../brand/brandConfig';
import Card from '../../components/Card';

export default function LoginPage() {
  return  (
    <View style={styles.container}>
      <Image source={require('../../assets/logo.png')} style={styles.logo} />
      <Card>
        <Text style={styles.title}>Log Into Zero To App</Text>
        <TextInput placeholder='Username' style={styles.textInput} />
        <TextInput placeholder='Password' style={styles.textInput} secureTextEntry/>
        <Button title='Log In' onPress={() => router.push('/core')} />
        <TextLink text='Forgot password?' />
        <FormSeparator text='or' /> 
        <Button title='Create New Account' onPress={() => router.push('/signup')} secondary /> 
      </Card>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: 15, 
    backgroundColor: brand.colors.background, 
  },
  logo: {
    height: 250,
    width: 250,
    marginBottom: 15,
  },
  title: {
    fontSize: brand.fontSizes.large,
    textAlign: 'center',
    color: brand.colors.text,
  },
  textInput: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ddd',
  },
  loginButton: {
    backgroundColor: brand.colors.primary,
    color: brand.colors.textAlternate,
    padding: 10,
    borderRadius: 5,
  },
});
