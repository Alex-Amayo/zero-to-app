import React from 'react';
import { View, Text,StyleSheet } from 'react-native';
import brand from '../../../brand/brandConfig';

type SettingsPageProps = {
    username: string;
};

const SettingsPage = ({username}: SettingsPageProps) => {
    return (
        <View style={styles.container}>
            <Text>Settings Page</Text>
        </View>
    );
};

export default SettingsPage;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: brand.colors.background,
    },
  });