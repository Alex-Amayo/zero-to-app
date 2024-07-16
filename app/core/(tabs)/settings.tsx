import React from 'react';
import { View, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import Card from '../../../components/Card';
import List from '../../../components/List';
import ListButton from '../../../components/ListButton';
import ListDivider from '../../../components/ListDivider';
import { ThemeContext } from '../../../theme/theme';

const SettingsPage = () => {
  // Initialize theme
  const theme = React.useContext(ThemeContext);
  return (
    <View
      style={{
        ...styles.screen,
        // Configure background color with theme
        backgroundColor: theme.values.backgroundColor,
      }}>
      <View style={styles.container}>
        <Card>
          <List>
            <ListButton text="Billing & Payments" icon="credit-card" />
            <ListDivider />
            <ListButton text="More Options" icon="more-horizontal" />
            <ListDivider />
            <ListButton text="Sign Out" icon="log-out" onPress={() => router.push('/auth/login')} />
          </List>
        </Card>
      </View>
    </View>
  );
};

export default SettingsPage;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: 300,
  },
});
