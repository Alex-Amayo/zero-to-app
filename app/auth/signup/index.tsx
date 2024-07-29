import { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import TextLink from '../../../components/TextLink';
import Button from '../../../components/Button';
import Card from '../../../components/Card';
import List from '../../../components/List';
import ListDivider from '../../../components/ListDivider';
import { router } from 'expo-router';
import FormInput from '../../../components/FormInput';
import { ThemeContext } from '../../../theme/theme';

export default function SignupPage() {
  //Initialize the theme
  const theme = useContext(ThemeContext);
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
          <FormInput half placeholder="First Name" />
          <FormInput half placeholder="Last Name" />
        </View>
        {/* Input for Mobile or email */}
        <FormInput placeholder="Email or Mobile number" />
        {/* Input for password */}
        <FormInput placeholder="Password" secure />
        {/* Input for password confirmation */}
        <FormInput placeholder="Re-enter password" secure />
        {/* Sign up button */}
        <Button title="Sign Up" secondary onPress={() => {}} />
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
