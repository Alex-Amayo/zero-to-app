import React from 'react';
import { View, Text } from 'react-native';

type HomePageProps = {
    username: String;
};

const HomePage = ({username}: HomePageProps) => {
    return (
        <View>
            <Text>Home Page</Text>
        </View>
    );
};

export default HomePage;