import React, { useContext, useState, useEffect } from 'react';
import { Text, StyleSheet } from 'react-native';
import Button from '../../../components/Button';
import { router } from 'expo-router';
import brand from '../../../brand/brandConfig';
import Card from '../../../components/Card';
import List from '../../../components/List';
import TextLink from '../../../components/TextLink';
import { ThemeContext } from '../../../theme/theme';
import useAuthStore from '../../../store/authStore/authStore';
import FormInput from '../../../components/FormInput';
import FormErrors from '../../../components/FormErrors';

export default function RecoverPage() {
  //Initializing theme context
  const theme = useContext(ThemeContext);

  //Retrieving logIn, loading and error, setAuthError from useAuthStore
  const { resetPasswordWithEmail, loading, error, setAuthError, clearAuthState } = useAuthStore();

  //Clear auth state on mount
  useEffect(() => {
    clearAuthState();
  }, [clearAuthState]);

  //Initializing email state
  const [email, setEmail] = useState('');

  // Initialize success state
  const [success, setSuccess] = useState(false);

  //Function to handle password recovery form submission
  const handleEmailRecoverySubmit = async () => {
    //check if email is empty
    if (!email) {
      setAuthError('Please enter your email');
      return;
    } else {
      //reset password
      try {
        await resetPasswordWithEmail(email);
        setSuccess(true);
      } catch (error) {
        setAuthError(error as string);
      }
    }
  };

  //Clear auth state on unmount
  useEffect(() => {
    return () => {
      clearAuthState();
    };
  }, [clearAuthState]);

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
          <FormInput placeholder="Enter email" onChangeText={(email) => setEmail(email)} />
          <Button
            title={loading ? 'Looking for account...' : 'Reset Password'}
            onPress={handleEmailRecoverySubmit}
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
