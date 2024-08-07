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
import useAuthStore from '../../../stores/authStore/authStore';
import FormErrors from '../../../components/FormErrors';
import { useCreateUserProfile } from '../../../hooks/useUserProfile';

export default function SignupPage() {
  //Initialize the theme
  const theme = useContext(ThemeContext);

  //Retrieving logIn, loading and error, setAuthError from useAuthStore
  const { signUpWithEmail, loading, error, setAuthError, clearAuthState, getUserId } =
    useAuthStore();

  //Clear auth state on mount
  useEffect(() => {
    clearAuthState();
  }, [clearAuthState]);

  //Initialize first name, last name, email, and password state
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const createUserProfile = useCreateUserProfile();

  // Function to handle sign up form submission
  const handleEmailSignupSubmit = async () => {
    // Check if any fields are empty
    if (!firstName || !lastName || !email || !password || !passwordConfirmation) {
      setAuthError('Please fill out all fields');
      return;
    }
    // Check if password and password confirmation match
    else if (password !== passwordConfirmation) {
      setAuthError('Passwords do not match');
      return;
    } else {
      // Sign up
      await signUpWithEmail(email, password);
      // Get the user id
      const user_id = getUserId();
      // Create the user profile
      createUserProfile.mutate(user_id, firstName, lastName);
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
            onChangeText={(firstName) => setFirstName(firstName)}
          />
          <FormInput
            half
            placeholder="Last Name"
            onChangeText={(lastName) => setLastName(lastName)}
          />
        </View>

        {/* Input for Email */}
        <FormInput placeholder="Email" onChangeText={(email) => setEmail(email)} />

        {/* Input for password */}
        <FormInput placeholder="Password" onChangeText={(password) => setPassword(password)} />

        {/* Input for password confirmation */}
        <FormInput
          placeholder="Confirm your password"
          onChangeText={(passwordConfirmation) => setPasswordConfirmation(passwordConfirmation)}
        />
        {/* Sign up button */}
        <Button title="Sign Up" onPress={handleEmailSignupSubmit} loading={loading} />

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
