import { View, Text, TextInput, StyleSheet, Image, KeyboardAvoidingView, Platform, SafeAreaView, Keyboard } from 'react-native';
import TextLink from '../../components/TextLink';
import Button from '../../components/Button';
import { router } from 'expo-router';
import brand from '../../brand/brandConfig';
import Card from '../../components/Card';
import List from '../../components/List';
import ListDivider from '../../components/ListDivider';
import { useWindowHeight } from '../../hooks/useWindowHeight';

export default function SignupPage() {
  const windowHeight = useWindowHeight();
  return (
    <SafeAreaView 
      style={styles.screen}
      onStartShouldSetResponder={() => {
      Keyboard.dismiss();
      return false;
      }}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container} keyboardVerticalOffset={ windowHeight * 0.2}>
            <Image source={require('../../assets/logo.png')} style={styles.logo} />
            <Card>
              <List>
                <Text style={styles.title}>Create A New Account</Text>
                <Text style={styles.subTitle}>It's quick and easy.</Text>
                <ListDivider />
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
        </KeyboardAvoidingView>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: brand.colors.background,
    margin: 15,
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
    alignSelf: "center",
  },
  title: {
    fontSize: brand.fontSizes.large,
    textAlign: "center",
    color: brand.colors.text,
  },
  subTitle: {
    fontSize: brand.fontSizes.medium,
    textAlign: "center",
    color: brand.colors.text,
    marginBottom: 15,
  },
  textInput: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#ddd",
    minWidth: 300,
  },
  nameTextInput: {
    padding: 10,
    borderWidth: 1,
    borderRadius: brand.card.borderRadius,
    borderColor: "#ddd",
    width: "48%"
  },
  nameContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
});