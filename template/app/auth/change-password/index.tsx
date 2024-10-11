import React, { useState } from 'react';
import Button from '../../../components/Button';
import { Redirect, router } from 'expo-router';
import Card from '../../../components/Card';
import List from '../../../components/List';
import useAuthStore from '../../../stores/authStore/authStore';
import FormInput from '../../../components/FormInput';
import FormErrors from '../../../components/FormErrors';
import TextLink from '../../../components/TextLink';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  changePasswordSchema,
  changePasswordSchemaValues,
} from '../../../schemas/changePasswordSchema';
import { StyledText } from '../../../components/StyledText';

export default function ChangePasswordPage() {
  // Retrieving changePassword, loading, error, setAuthError from useAuthStore
  const { changePassword, loading, error, setAuthError, isAuthenticated, clearErrorState } =
    useAuthStore();

  //Initialize form with react-hook-form
  const { control, handleSubmit } = useForm({
    defaultValues: {
      newPassword: '',
      newPasswordConfirmation: '',
    },
    resolver: zodResolver(changePasswordSchema),
  });

  //Initialize success state for tracking successful password change
  const [success, setSuccess] = useState(false);

  // Function to handle password change form submission
  const handleChangePassword = async (data: changePasswordSchemaValues) => {
    // Change password
    try {
      await changePassword(data.newPassword);
      setSuccess(true);
    } catch (error) {
      setAuthError(error as string);
    }
  };
  // Redirect to login page if user is not authenticated
  if (!isAuthenticated()) {
    return <Redirect href="/auth/login" />;
  }
  return (
    <Card>
      <List>
        {
          // Display success message if password changed successfully
          success ? (
            <>
              <StyledText fontSize={'lg'} align={'center'}>
                Password Changed Successfully
              </StyledText>
              {/* Navigate back to log in */}
              <TextLink text="Take me back to the app" onPress={() => router.push('/core')} />
            </>
          ) : (
            // Display change password form
            <>
              <StyledText fontSize={'lg'} align={'center'}>
                Change Password
              </StyledText>
              <FormInput name="newPassword" placeholder="New Password" control={control} secure />
              <FormInput
                name="newPasswordConfirmation"
                placeholder="Confirm New Password"
                control={control}
                secure
              />
              <Button
                title="Change Password"
                onPress={handleSubmit(handleChangePassword)}
                loading={loading}
              />
              <FormErrors error={error} clearError={clearErrorState} />
            </>
          )
        }
      </List>
    </Card>
  );
}
