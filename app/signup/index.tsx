import { View, Text, TextInput, StyleSheet } from 'react-native';
import FormSeparator from '../../components/FormSeparator';
import TextLink from '../../components/TextLink';
import Button from '../../components/Button';

export default function SignupPage() {
  return  (
    <View style={styles.container}>
      <View style={styles.loginFormContainer}>
        <Text style={styles.title}>Create A New Account</Text>
        <Text style={styles.subTitle}>It's quick and easy.</Text>
        <FormSeparator/>
        <View style={styles.nameContainer} >
            <TextInput placeholder="First Name" style={styles.textInput} /> 
            <TextInput placeholder="Last Name" style={styles.textInput} />
        </View>
        <TextInput placeholder="Mobile number or email" style={styles.textInput} />
        <TextInput placeholder="Re-enter email" style={styles.textInput} />
        <TextInput placeholder="New Password" style={styles.textInput} secureTextEntry/>
        <Button title="Sign Up" secondary /> 
        <TextLink text="Already have an account?" />
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
    gap: 10,
  },
  nameContainer: {    
    flexDirection: "row",    
    gap: 10,
  },
  title: {
    fontSize: 25,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  subTitle: {
    color: "#666",
    fontSize: 15,
    textAlign: 'center',
    },
  textInput: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#ddd",
    placeholderTextColor: "#ddd",
  },
  loginButton: {
    backgroundColor: "blue",
    color: "white",
    padding: 10,
    borderRadius: 5,
  },
});