import { View, Text, TextInput, StyleSheet, Image, KeyboardAvoidingView, Platform, SafeAreaView, Keyboard } from 'react-native';
import FormSeparator from '../../components/FormSeparator';
import TextLink from '../../components/TextLink';
import Button from '../../components/Button';
import { router } from 'expo-router';
import brand from '../../brand/brandConfig';
import Card from '../../components/Card';
import List from '../../components/List';

export default function SignupPage() {
  return (
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container} keyboardVerticalOffset={50}>
          <View 
            style={styles.formContainer}
            onStartShouldSetResponder={() => {
              Keyboard.dismiss();
              return false;
            }}
            >
            <Image source={require('../../assets/logo.png')} style={styles.logo} />
            <Card>
              <List>
                <Text style={styles.title}>Create A New Account</Text>
                <Text style={styles.subTitle}>It's quick and easy.</Text>
                <FormSeparator />
                <View style={styles.nameContainer}>
                  <TextInput placeholder='First Name' style={styles.nameTextInput} />
                  <TextInput placeholder='Last Name' style={styles.nameTextInput} />
                </View>
                <TextInput placeholder='Mobile number or email' style={styles.textInput} />
                <TextInput placeholder='Re-enter email' style={styles.textInput} />
                <TextInput placeholder='New Password' style={styles.textInput} secureTextEntry />
                <Button title='Sign Up' secondary />
                <TextLink text='Already have an account?' onPress={() => router.push('/login')} />
              </List>
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
    alignItems: 'center'
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
  subTitle: {
    fontSize: brand.fontSizes.medium,
    textAlign: 'center',
    color: brand.colors.text,
    marginBottom: 15,
  },
  textInput: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ddd'
  },
  nameTextInput: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ddd',
    width: '50%',
  },
  nameContainer: {    
    flexDirection: 'row',   
    gap: 10,
  },
});