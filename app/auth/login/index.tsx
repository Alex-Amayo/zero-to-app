import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { z } from 'zod';
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

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(loginSchema),
  });
  const { logInWithEmail, loading, error } = useAuthStore();
  const theme = useContext(ThemeContext);
  const router = useRouter();

  const handleEmailLoginSubmit = async (data: LoginFormValues) => {
    await logInWithEmail(data.email, data.password);
    router.push('/home');
  };

  return (
    <Card>
      <List>
        <Text style={{ ...styles.title, color: theme.values.color }}>Log Into {brand.name}</Text>
        <FormInput
          name="email"
          placeholder="Email"
          rules={{ required: 'Email is required' }}
          control={control}
        />
        <FormInput
          name="password"
          placeholder="Password"
          secure
          rules={{ required: 'Password is required' }}
          control={control}
        />
        <Button title="Login" onPress={handleSubmit(handleEmailLoginSubmit)} loading={loading} />
        <FormErrors error={error} />
      </List>
    </Card>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: brand.fontSizes.large,
    textAlign: 'center',
  },
});
