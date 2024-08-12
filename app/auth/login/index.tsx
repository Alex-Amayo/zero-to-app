import React from 'react';
import { Text, StyleSheet } from 'react-native';
import FormSeparator from '../../../components/FormSeparator';
import TextLink from '../../../components/TextLink';
import Button from '../../../components/Button';
import { router } from 'expo-router';
import brand from '../../../brand/brandConfig';
import Card from '../../../components/Card';
import List from '../../../components/List';
import FormInput from '../../../components/FormInput';
import { useContext, useState } from 'react';
import { ThemeContext } from '../../../theme/theme';
import useAuthStore from '../../../stores/authStore/authStore';
import FormErrors from '../../../components/FormErrors';

export default function LoginPage() {
  //Retrieving logIn, loading and error from useAuthStore
  const { logInWithEmail, loading, error } = useAuthStore();

  //Initializing theme context and toggleTheme function
  const theme = useContext(ThemeContext);

  //Initializing email and password state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  //Function to handle form submission
  const handleEmailLoginSubmit = async () => {
    await logInWithEmail(email, password);
    router.push('/home');
  };

  return (
    <Card>
      <List>
        {/* Email, password and login button */}
        <Text style={{ ...styles.title, color: theme.values.color }}>Log Into {brand.name}</Text>
        <FormInput placeholder="Email" onChangeText={(email) => setEmail(email)} />
        <FormInput
          placeholder="Password"
          secure
          onChangeText={(password) => setPassword(password)}
        />
        <Button title="Login" onPress={handleEmailLoginSubmit} loading={loading} />

        {/* Error message */}
        <FormErrors error={error} />

        {/* Forgot password button, create new account button */}
        <TextLink text="Forgot password?" onPress={() => router.push('/auth/recover')} />
        <FormSeparator text="or" />
        <Button title="Create New Account" onPress={() => router.push('/auth/signup')} secondary />
      </List>
    </Card>
  );
}
const styles = StyleSheet.create({
  title: {
    fontSize: brand.fontSizes.large,
    textAlign: 'center',
  },
  error: {
    color: 'red',
    textAlign: 'center',
  },
});
