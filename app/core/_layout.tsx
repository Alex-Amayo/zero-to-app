import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';
import Appbar from '../../components/AppBar';


type LayoutProps = {
    children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
    return (
        <View style={styles.container}>
            <Appbar title='Zero To App' />
            <Stack>
                <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
            </Stack>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    appbar: {
        backgroundColor: 'blue',
        padding: 10,
    },
    appbarText: {
        color: 'white',
        fontSize: 20,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    footer: {
        backgroundColor: 'gray',
        padding: 10,
    },
    footerText: {
        color: 'white',
        fontSize: 16,
    },
});

export default Layout;