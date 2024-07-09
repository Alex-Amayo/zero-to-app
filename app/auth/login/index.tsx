import { Text, StyleSheet } from 'react-native';
import FormSeparator from '../../../components/FormSeparator';
import TextLink from '../../../components/TextLink';
import Button from '../../../components/Button';
import { router } from 'expo-router';
import brand from '../../../brand/brandConfig';
import Card from '../../../components/Card';
import List from '../../../components/List';
import FormInput from '../../../components/FormInput';
import { useContext } from 'react';
import { ThemeContext } from '../../../theme/theme';

export default function LoginPage() {
  //Initializing theme context and toggleTheme function
  const theme = useContext(ThemeContext);
  return (
    <Card>
      <List>
        <Text style={{ ...styles.title, color: theme.values.color }}>Log Into {brand.name}</Text>
        <FormInput placeholder="Mobile or Email" />
        <FormInput placeholder="Password" />
        <Button title="Log In" onPress={() => router.push('/core')} />
        <TextLink text="Forgot password?" onPress={() => router.push('/auth/recover')} />
        <FormSeparator text="or" />
        <Button title="Create New Account" onPress={() => router.push('/auth/signup')} secondary />
      </List>
    </Card>
  );
}
const styles = StyleSheet.create({
  logo: {
    height: 200,
    width: 200,
    alignSelf: 'center',
  },
  title: {
    fontSize: brand.fontSizes.large,
    textAlign: 'center',
  },
});
