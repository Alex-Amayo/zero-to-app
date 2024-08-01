import { useContext, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import TextLink from '../../../components/TextLink';
import Button from '../../../components/Button';
import Card from '../../../components/Card';
import List from '../../../components/List';
import ListDivider from '../../../components/ListDivider';
import { router } from 'expo-router';
import FormInput from '../../../components/FormInput';
import { ThemeContext } from '../../../theme/theme';
import { useAuthStore } from '../../../store/authStore/authStore';

export default function SignupPage() {
  //Initialize the theme
  const theme = useContext(ThemeContext);

  //Initialize first name, last name, email, and password state
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [PasswordConfirmation, setPasswordConfirmation] = useState('');

  //Destructure the signup function from the auth store
  const { signup } = useAuthStore();

  //Function to handle form submission
  const handleSubmit = async () => {
    await signup(email, password);
  };

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
            onChange={(e) => setFirstName(e.nativeEvent.text)}
          />
          <FormInput
            half
            placeholder="Last Name"
            onChange={(e) => setLastName(e.nativeEvent.text)}
          />
        </View>

        {/* Input for Email */}
        <FormInput placeholder="Mobile or Email" onChange={(e) => setEmail(e.nativeEvent.text)} />

        {/* Input for password */}
        <FormInput placeholder="Password" onChange={(e) => setPassword(e.nativeEvent.text)} />

        {/* Input for password confirmation */}
        <FormInput
          placeholder="Confirm your password"
          onChange={(e) => setPasswordConfirmation(e.nativeEvent.text)}
        />
        {/* Sign up button */}
        <Button title="Sign Up" secondary onPress={handleSubmit} />
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
