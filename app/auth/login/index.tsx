import { Text, StyleSheet, GestureResponderEvent } from 'react-native';
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
import useAuthStore from '../../../store/authStore/authStore';

export default function LoginPage() {
  //Initializing theme context and toggleTheme function
  const theme = useContext(ThemeContext);

  //Initializing email and password state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  //Destructuring logIn, loading and error from useAuthStore
  const { logIn, loading, error } = useAuthStore();

  //Function to handle form submission
  const handleSubmit = async (event: GestureResponderEvent) => {
    event.preventDefault();
    await logIn(email, password);
  };

  return (
    <Card>
      <List>
        {/* Email, password and login button */}
        <Text style={{ ...styles.title, color: theme.values.color }}>Log Into {brand.name}</Text>
        <FormInput placeholder="Mobile or Email" onChange={(e) => setEmail(e.nativeEvent.text)} />
        <FormInput placeholder="Password" onChange={(e) => setPassword(e.nativeEvent.text)} />
        <Button title={loading ? 'Logging in...' : 'Log In'} onPress={handleSubmit} />

        {/* Conditionally rendering error message */}
        {error ? <Text style={styles.error}>{error}</Text> : <></>}

        {/* Forgot password button, create new account button */}
        <TextLink text="Forgot password?" onPress={() => router.push('/auth/recover')} />
        <FormSeparator text="or" />
        <Button title="Create New Account" onPress={() => router.push('/auth/signup')} secondary />
      </List>
    </Card>
  );
}
const styles = StyleSheet.create({
  logo: {
    height: 200,
    width: 200,
    alignSelf: 'center',
  },
  title: {
    fontSize: brand.fontSizes.large,
    textAlign: 'center',
  },
  error: {
    color: 'red',
    textAlign: 'center',
  },
});
