import React, { useEffect, useState } from 'react'; // Import useEffect
import { StyleSheet, View } from 'react-native';
import TextLink from '../../../components/TextLink';
import Button from '../../../components/Button';
import Card from '../../../components/Card';
import List from '../../../components/List';
import ListDivider from '../../../components/ListDivider';
import { router } from 'expo-router';
import FormInput from '../../../components/FormInput';
import useAuthStore from '../../../stores/authStore/authStore';
import FormErrors from '../../../components/FormErrors';
import { useCreateUserProfile } from '../../../hooks/useCreateUserProfile';
import { useForm, useWatch } from 'react-hook-form';
import { SignUpFormValues, signUpSchema } from '../../../schemas/signUpSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { StyledText } from '../../../components/StyledText';

export default function SignupPage() {
  //Retrieving logIn, loading and error, setAuthError from useAuthStore
  const { signUpWithEmail, loading, error, setAuthError, logInWithEmail, clearErrorState } =
    useAuthStore();

  //Initialize form with react hook form
  const { control, handleSubmit } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      userID: '',
    },
    resolver: zodResolver(signUpSchema),
  });

  // Initialize userID state as empty
  const [userId, setUserId] = useState('');
  //Retrieve first and last name from form values
  const firstName = useWatch({ control, name: 'firstName' });
  const lastName = useWatch({ control, name: 'lastName' });

  //Create user user profile user id is created
  const { mutateAsync: createUserProfile } = useCreateUserProfile(userId, firstName, lastName);

  //Function to handle email sign up
  const handleEmailSignUp = async (data: SignUpFormValues) => {
    try {
      // Call the signUpWithEmail function from useAuthStore
      const result = await signUpWithEmail(data.email, data.password);
      const uuid = result?.user?.id ?? '';
      // Set the userId state to the user id
      setUserId(uuid);
      // Call the logInWithEmail function from useAuthStore
      await logInWithEmail(data.email, data.password);
    } catch (error) {
      setAuthError('Sign up failed');
      console.error(error);
    }
  };

  // useEffect to create user profile and navigate to /home  after userID is set
  useEffect(() => {
    if (userId !== '') {
      const createUserProfileAsync = async () => {
        try {
          await createUserProfile();
        } catch (error) {
          console.error('Failed to create user profile', error);
        }
      };
      createUserProfileAsync();
      router.replace('/home');
    }
  }, [createUserProfile, userId]);

  return (
    <Card>
      <List>
        {/* Title for the sign up form */}
        <StyledText fontSize={'lg'} align={'center'}>
          Create A New Account
        </StyledText>
        <StyledText fontSize={'md'} align={'center'}>
          It's quick and easy
        </StyledText>
        <ListDivider />

        {/* Input for Names half property added to display in rows*/}
        <View style={styles.nameContainer}>
          <FormInput name="firstName" control={control} half placeholder="First Name" />
          <FormInput name="lastName" control={control} half placeholder="Last Name" />
        </View>

        {/* Input for Email */}
        <FormInput name="email" control={control} placeholder="Email" />

        {/* Input for password */}
        <FormInput name="password" control={control} placeholder="Password" secure />

        {/* Input for password confirmation */}
        <FormInput
          name="passwordConfirmation"
          control={control}
          placeholder="Password Confirmation"
          secure
        />
        {/* Sign up button */}
        <Button title="Sign Up" onPress={handleSubmit(handleEmailSignUp)} loading={loading} />

        {/* Error message */}
        <FormErrors error={error} clearError={clearErrorState} />

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
