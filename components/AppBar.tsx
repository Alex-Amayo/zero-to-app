import React from 'react';
import { View, Text, ImageSourcePropType, StyleSheet, Image } from 'react-native';
import IconButton from './IconButton';
import brand from '../brand/brandConfig';

type AppbarProps = {
    logo?: ImageSourcePropType,
    title?: string,
    
};

const Appbar = ({logo, title}: AppbarProps) => {
    return (
        <View style={styles.appbar}>
            <Text style={styles.title}>{title}</Text>
            <IconButton iconName='question-circle' />
        </View>
    );
};

export default Appbar;

const styles = StyleSheet.create({
    appbar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: brand.colors.primary,
        padding: 25,
    },
    logo: {
        width: 40,
        height: 40,
    },
    title: {
        fontSize: brand.fontSizes.large,
        marginLeft: 10,
        color: brand.colors.textAlternate,
    },
});