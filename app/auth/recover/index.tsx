import React, { useContext } from 'react';
import { Text, StyleSheet } from 'react-native';
import Button from '../../../components/Button';
import { router } from 'expo-router';
import brand from '../../../brand/brandConfig';
import Card from '../../../components/Card';
import List from '../../../components/List';
import TextLink from '../../../components/TextLink';
import { ThemeContext } from '../../../theme/theme';
import FormInput from '../../../components/FormInput';

export default function RecoverPage() {
  //Initializing theme context
  const theme = useContext(ThemeContext);
  return (
    <Card>
      <List>
        <Text
          style={{
            ...styles.title,
            //Text color is set using theme values
            color: theme.values.color,
          }}>
          Recover Your {brand.name} Password
        </Text>
        <FormInput placeholder="Email or Password" />
        <Button title="Reset Password" onPress={() => router.push('/core')} />
        <TextLink text="Go back to login" onPress={() => router.push('/auth/login')} />
      </List>
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
