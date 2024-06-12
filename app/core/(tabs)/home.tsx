import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import brand from '../../../brand/brandConfig';

type HomePageProps = {
    username: String;
};

const HomePage = ({username}: HomePageProps) => {
    return (
        <View style={styles.container}>
            <Text>Home Page</Text>
        </View>
    );
};

export default HomePage;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: brand.colors.background,
    },
  });