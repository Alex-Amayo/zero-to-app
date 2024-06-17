import { KeyboardAvoidingView, Text, TextInput, StyleSheet, Image, View, Platform, SafeAreaView, Keyboard } from 'react-native';
import FormSeparator from '../../components/FormSeparator';
import TextLink from '../../components/TextLink';
import Button from '../../components/Button';
import { router } from 'expo-router';
import brand from '../../brand/brandConfig';
import Card from '../../components/Card';

export default function RecoverPage() {
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container} keyboardVerticalOffset={-50} >
          <View 
            style={styles.formContainer}
            onStartShouldSetResponder={() => {
              Keyboard.dismiss();
              return false;
            }}
            >
            <Image source={require('../../assets/logo.png')} style={styles.logo} />
            <Card>
              <Text style={styles.title}>Recover Your Zero To App Account</Text>
              <TextInput placeholder='Email or Phone Number' style={styles.textInput} />
              <Button title='Reset Password' onPress={() => router.push('/core')} />
              <TextLink text='Go back to login' onPress={() => router.push('/login')}/>
            </Card>
          </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 15, 
    backgroundColor: brand.colors.background, 
  },
  formContainer: {
    minWidth: 350,
    justifyContent: 'center',
    alignItems: 'center',
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
