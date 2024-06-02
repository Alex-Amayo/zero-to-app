import { View, Text, TextInput, StyleSheet, Button } from 'react-native';
import FormSeparator from '../../components/FormSeparator';
import TextLink from '../../components/TextLink';


export default function LoginPage() {
  return  (
    <View style={styles.container}>
      <View style={styles.loginFormContainer}>
        <Text style={styles.title}>Log into Zero To App</Text>
        <TextInput placeholder="Username" style={styles.textInput} />
        <TextInput placeholder="Password" style={styles.textInput} />
        <Button title="Log In" style={styles.loginButton}/>
        <TextLink text="Forgot password?" />
        <FormSeparator text="or" /> 
        <Button title="Create New Account" style={styles.createNewAccountButton}/> 
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
    borderColor: "#ddd",
    alignItems: "stretch",
    gap: 15,
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
  },
  textInput: {
    borderWidth: 1,
    padding: 10,
  },
});