import { useContext, useEffect, useState } from 'react'; // Import useEffect
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
import { useCreateUserProfile } from '../../../hooks/useCreateUserProfile';

export default function SignupPage() {
  //Initialize the theme
  const theme = useContext(ThemeContext);

  //Retrieving logIn, loading and error, setAuthError from useAuthStore
  const { signUpWithEmail, loading, error, setAuthError, logInWithEmail } = useAuthStore();

  //Initialize first name, last name, email, and password state
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [userId, setUserId] = useState('');

  //Create user user profile user id is createdz
  const { mutateAsync: createUserProfile } = useCreateUserProfile(userId, firstName, lastName);

  //Function to handle email signup
  const handleEmailSignup = async (): Promise<void> => {
    if (password !== passwordConfirmation) {
      setAuthError('Passwords do not match');
      return;
    }
    // Check that all fields are filled out
    if (!firstName || !lastName || !email || !password || !passwordConfirmation) {
      setAuthError('Please fill out all fields');
      return;
    }
    try {
      const result = await signUpWithEmail(email, password);
      const uuid = result?.user?.id ?? '';
      setUserId(uuid);
      await logInWithEmail(email, password);
    } catch (error) {
      setAuthError('Signup failed');
      console.error(error);
    }
  };

  useEffect(() => {
    if (userId !== '') {
      const createUserProfileAsync = async () => {
        try {
          await createUserProfile();
          console.log('User profile created');
        } catch (error) {
          console.error('Failed to create user profile', error);
        }
      };
      createUserProfileAsync();
      router.push('/home');
    }
  }, [createUserProfile, userId]);

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
        <FormInput
          placeholder="Password"
          secure
          onChangeText={(password) => setPassword(password)}
        />

        {/* Input for password confirmation */}
        <FormInput
          placeholder="Confirm your password"
          onChangeText={(passwordConfirmation) => setPasswordConfirmation(passwordConfirmation)}
          secure
        />
        {/* Sign up button */}
        <Button title="Sign Up" onPress={handleEmailSignup} loading={loading} />

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
