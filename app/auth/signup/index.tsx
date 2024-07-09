import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import TextLink from '../../../components/TextLink';
import Button from '../../../components/Button';
import Card from '../../../components/Card';
import List from '../../../components/List';
import ListDivider from '../../../components/ListDivider';
import { router } from 'expo-router';
import FormInput from '../../../components/FormInput';

export default function SignupPage() {
  return (
    <Card>
      <List>
        {/* Title for the signup form */}
        <Text style={styles.title}>Create A New Account</Text>
        <Text style={styles.subTitle}>It's quick and easy.</Text>
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
        <FormInput placeholder="Re-ednter password" secure />
        {/* Sign up button */}
        <Button title="Sign Up" secondary />
        <TextLink text="Already have an account?" onPress={() => router.push('/auth/login')} />
      </List>
    </Card>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    textAlign: 'center',
    color: '#000',
  },
  subTitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#000',
    marginBottom: 15,
  },
  textInput: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ddd',
  },

  nameContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
});
