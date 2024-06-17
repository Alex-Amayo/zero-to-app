import React from 'react';
import { View, Text, ImageSourcePropType, StyleSheet, Image, TouchableOpacity } from 'react-native';
import IconButton from './IconButton';
import brand from '../brand/brandConfig';
import { Link } from 'expo-router';

type AppbarProps = {
    title?: string,
};

const Appbar = ({title}: AppbarProps) => {
    return (
        <View style={styles.appbar}>
            <Link href="/core/home">
                <Text style={styles.title}>{title}</Text>
            </Link>
            <View style={styles.iconContainer}>
                <IconButton iconName='search' />
                <IconButton iconName='plus' />
                <IconButton iconName='message-square' />
            </View>
        </View>
    );
};

export default Appbar;

const styles = StyleSheet.create({
    appbar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: brand.colors.background,
        padding: 25,
    },
    iconContainer: {
        flexDirection: 'row',
        gap: 10,
    },
    logo: {
        width: 40,
        height: 40,
    },
    title: {
        fontSize: brand.fontSizes.large,
        fontWeight: 'bold',
        marginLeft: 10,
        color: brand.colors.primary,
    },
});