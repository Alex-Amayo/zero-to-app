import { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import TextLink from '../../../components/TextLink';
import Button from '../../../components/Button';
import Card from '../../../components/Card';
import List from '../../../components/List';
import ListDivider from '../../../components/ListDivider';
import { router } from 'expo-router';
import FormInput from '../../../components/FormInput';
import { ThemeContext } from '../../../theme/theme';
import useAuthStore from '../../../store/authStore/authStore';
import FormErrors from '../../../components/FormErrors';

export default function SignupPage() {
  //Initialize the theme
  const theme = useContext(ThemeContext);

  //Retrieving logIn, loading and error, setAuthError from useAuthStore
  const { signUp, loading, error, setAuthError, clearAuthState } = useAuthStore();

  //Clear auth state on mount
  useEffect(() => {
    clearAuthState();
  }, [clearAuthState]);

  //Initialize first name, last name, email, and password state
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [PasswordConfirmation, setPasswordConfirmation] = useState('');

  //Function to handle sign up form submission
  const handleSubmit = async () => {
    //check if any fields are empty
    if (!firstName || !lastName || !email || !password || !PasswordConfirmation) {
      setAuthError('Please fill out all fields');
      return;
    }
    //check if password and password confirmation match
    else if (password !== PasswordConfirmation) {
      setAuthError('Passwords do not match');
      return;
    } else {
      //sign up
      await signUp(email, password);
      return;
    }
  };
  return (
    <Card>
      <List>
        {/* Title for the signup form */}
        <Text
          style={{
            //Use the theme to set the font color
            color: theme.values.color,
            ...styles.title,
          }}>
          Create A New Account
        </Text>
        <Text style={{ ...styles.subTitle, color: theme.values.color }}>It's quick and easy.</Text>
        <ListDivider />

        {/* Input for Names half property added to display in rows*/}
        <View style={styles.nameContainer}>
          <FormInput
            half
            placeholder="First Name"
            onChange={(e) => setFirstName(e.nativeEvent.text)}
          />
          <FormInput
            half
            placeholder="Last Name"
            onChange={(e) => setLastName(e.nativeEvent.text)}
          />
        </View>

        {/* Input for Email */}
        <FormInput placeholder="Email" onChange={(e) => setEmail(e.nativeEvent.text)} />

        {/* Input for password */}
        <FormInput placeholder="Password" onChange={(e) => setPassword(e.nativeEvent.text)} />

        {/* Input for password confirmation */}
        <FormInput
          placeholder="Confirm your password"
          onChange={(e) => setPasswordConfirmation(e.nativeEvent.text)}
        />
        {/* Sign up button */}
        <Button title={loading ? 'Signing Up...' : 'Sign Up'} onPress={handleSubmit} />

        {/* Error message */}
        <FormErrors error={error} />

        {/* Navigate back to login */}
        <TextLink text="Already have an account?" onPress={() => router.push('/auth/login')} />
      </List>
    </Card>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    textAlign: 'center',
  },
  subTitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 15,
  },
  nameContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
});
