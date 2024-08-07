import React, { useContext, useState } from 'react';
import { Text, StyleSheet } from 'react-native';
import Button from '../../../components/Button';
import { Redirect, router } from 'expo-router';
import brand from '../../../brand/brandConfig';
import Card from '../../../components/Card';
import List from '../../../components/List';
import { ThemeContext } from '../../../theme/theme';
import useAuthStore from '../../../stores/authStore/authStore';
import FormInput from '../../../components/FormInput';
import FormErrors from '../../../components/FormErrors';
import TextLink from '../../../components/TextLink';

export default function ChangePasswordPage() {
  // Initializing theme context
  const theme = useContext(ThemeContext);

  // Retrieving changePassword, loading, error, setAuthError from useAuthStore
  const { changePassword, loading, error, setAuthError, isAuthenticated } = useAuthStore();

  // Initializing state variables
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [success, setSuccess] = useState(false);

  // Function to handle password change form submission
  const handleChangePassword = async () => {
    // Check if any field is empty
    if (!password || !confirmPassword) {
      setAuthError('Please fill in all fields');
      return;
    }

    // Check if new password and confirm password match
    if (password !== confirmPassword) {
      setAuthError('New password and confirm password do not match');
      return;
    }

    // Change password
    try {
      await changePassword(password);
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
          // Display success message if password changed successfullyaA
          success ? (
            <>
              <Text style={{ ...styles.title, color: theme.values.color }}>
                Password changed successfully
              </Text>
              {/* Navigate back to login */}
              <TextLink text="Take me back to the app" onPress={() => router.push('/core')} />
            </>
          ) : (
            // Display change password form
            <>
              <Text style={{ ...styles.title, color: theme.values.color }}>Change Password</Text>
              <FormInput placeholder="New Password" onChangeText={setPassword} secure />
              <FormInput
                placeholder="Confirm New Password"
                onChangeText={setConfirmPassword}
                secure
              />
              <Button title="Change Password" onPress={handleChangePassword} loading={loading} />
              <FormErrors error={error} />
            </>
          )
        }
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
