import { View, Text, TextInput, StyleSheet, Image, KeyboardAvoidingView } from 'react-native';
import FormSeparator from '../../components/FormSeparator';
import TextLink from '../../components/TextLink';
import Button from '../../components/Button';
import { router } from 'expo-router';
import brand from '../../brand/brandConfig';

export default function SignupPage() {
  return  (
    <View style={styles.container}>
      <Image source={require('../../assets/logo.png')} style={styles.logo} />
      <KeyboardAvoidingView style={styles.formContainer}>
        <Text style={styles.title}>Create A New Account</Text>
        <Text style={styles.subTitle}>It's quick and easy.</Text>
        <FormSeparator/>
        <View style={styles.nameContainer} >
            <TextInput placeholder='First Name' style={styles.textInput} /> 
            <TextInput placeholder='Last Name' style={styles.textInput} />
        </View>
        <TextInput placeholder='Mobile number or email' style={styles.textInput} />
        <TextInput placeholder='Re-enter email' style={styles.textInput} />
        <TextInput placeholder='New Password' style={styles.textInput} secureTextEntry/>
        <Button title='Sign Up' secondary /> 
        <TextLink text='Already have an account?' onPress={()=>router.push('/login')} />
      </KeyboardAvoidingView>
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
    minWidth: '30%',
    padding: 15,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ddd',
    alignItems: 'stretch',
    gap: 10,
  },
  nameContainer: {    
    flexDirection: 'row',    
    gap: 10,
  },
  logo: {
    width: 300,
    height: 100,
    marginBottom: 15,
  },
  title: {
    fontSize: brand.fontSizes.large,
    textAlign: 'center',
    fontWeight: 'bold',
    color: brand.colors.text,
  },
  subTitle: {
    color: brand.colors.text,
    fontSize: brand.fontSizes.medium,
    textAlign: 'center',
  },
  textInput: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ddd',
    minWidth: '48%',
  }
});