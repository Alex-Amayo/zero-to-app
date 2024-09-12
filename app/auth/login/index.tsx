import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { zodResolver } from '@hookform/resolvers/zod';
import brand from '../../../brand/brandConfig';
import FormInput from '../../../components/FormInput';
import Button from '../../../components/Button';
import Card from '../../../components/Card';
import List from '../../../components/List';
import FormErrors from '../../../components/FormErrors';
import { useContext } from 'react';
import { ThemeContext } from '../../../theme/theme';
import { useRouter } from 'expo-router';
import useAuthStore from '../../../stores/authStore/authStore';
import { useForm } from 'react-hook-form';
import FormSeparator from '../../../components/FormSeparator';
import TextLink from '../../../components/TextLink';
import { loginSchema, LoginFormValues } from '../../../schemas/loginSchema';
import { StyledText } from '../../../components/StyledText';

export default function LoginForm() {
  // Initialize form with react hook form
  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(loginSchema),
  });

  // Initialize authentication methods from store
  const { logInWithEmail, loading, error, clearErrorState } = useAuthStore();
  const theme = useContext(ThemeContext);
  const router = useRouter();

  //Login Function
  const handleEmailLoginSubmit = async (data: LoginFormValues) => {
    await logInWithEmail(data.email, data.password);
    router.push('/home');
  };

  return (
    <Card>
      <List>
        <StyledText lg center>Log Into {brand.name}</StyledText>
        <FormInput name="email" placeholder="Email" control={control} />
        <FormInput name="password" placeholder="Password" secure control={control} />
        <Button title="Login" onPress={handleSubmit(handleEmailLoginSubmit)} loading={loading} />
        <FormErrors error={error} clearError={clearErrorState} />
        <TextLink text="Forgot password?" onPress={() => router.replace('auth/recover')} />
        <FormSeparator text="or" />
        <TextLink text="Create a new account" onPress={() => router.replace('auth/signup')} />
        <></>
      </List>
    </Card>
  );
}
