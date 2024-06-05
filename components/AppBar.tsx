import React from 'react';
import { View, Text, ImageSourcePropType, StyleSheet, Image } from 'react-native';

type AppbarProps = {
    logo?: ImageSourcePropType,
    title?: string,
    
};

const Appbar = ({logo, title}: AppbarProps) => {
    return (
        <View style={styles.appbar}>
            <Image source={logo} style={styles.logo} />
            <Text style={styles.title}>{title}</Text>
        </View>
    );
};

export default Appbar;

const styles = StyleSheet.create({
    appbar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'blue',
        padding: 10,
    },
    logo: {
        width: 40,
        height: 40,
    },
    title: {
        fontSize: 20,
        marginLeft: 10,
        color: '#FFFFFF',
    },
});