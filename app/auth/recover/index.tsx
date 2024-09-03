import React, { useContext, useState } from 'react';
import { Text, StyleSheet } from 'react-native';
import Button from '../../../components/Button';
import { router } from 'expo-router';
import brand from '../../../brand/brandConfig';
import Card from '../../../components/Card';
import List from '../../../components/List';
import TextLink from '../../../components/TextLink';
import { ThemeContext } from '../../../theme/theme';
import useAuthStore from '../../../stores/authStore/authStore';
import FormInput from '../../../components/FormInput';
import FormErrors from '../../../components/FormErrors';
import { useForm } from 'react-hook-form';
import { recoverSchema, recoverSchemaValues } from '../../../schemas/recoverSchema';
import { zodResolver } from '@hookform/resolvers/zod';

export default function RecoverPage() {
  // Initialize form with react-hook-form
  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: '',
      resolver: zodResolver(recoverSchema),
    },
  });
  //Initializing theme context
  const theme = useContext(ThemeContext);

  //Retrieving logIn, loading and error, setAuthError from useAuthStore
  const { resetPasswordWithEmail, loading, error, setAuthError } = useAuthStore();

  // Initialize success state
  const [success, setSuccess] = useState(false);

  //Function to handle password recovery form submission
  const handleEmailRecoverySubmit = async (data: recoverSchemaValues) => {
    try {
      await resetPasswordWithEmail(data.email);
      setSuccess(true);
    } catch (error) {
      setAuthError(error as string);
    }
  };

  return (
    <Card>
      {success ? (
        //Display success message
        <List>
          <Text style={{ ...styles.title, color: theme.values.color }}>
            Password reset email sent
          </Text>
          {/* Text Link to go back to login */}
          <TextLink text="Go back to login" onPress={() => router.push('/auth/login')} />
        </List>
      ) : (
        //Display password recovery form
        <List>
          <Text
            style={{
              ...styles.title,
              //Text color is set using theme values
              color: theme.values.color,
            }}>
            Recover Your {brand.name} Password
          </Text>
          {/* Input for email and Reset Password Button */}
          <FormInput name="email" placeholder="Enter email" control={control} />
          <Button
            title="Reset Password"
            onPress={handleSubmit(handleEmailRecoverySubmit)}
            loading={loading}
          />

          {/* Display errors */}
          <FormErrors error={error} />

          {/* Text Link to go back to login */}
          <TextLink text="Go back to login" onPress={() => router.push('/auth/login')} />
        </List>
      )}
    </Card>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: brand.fontSizes.large,
    textAlign: 'center',
  },
  textInput: {
    padding: 15,
    borderWidth: 1,
    borderRadius: brand.borderRadius,
  },
});
