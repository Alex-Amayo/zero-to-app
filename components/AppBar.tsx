import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import IconButton from './IconButton';
import brand from '../brand/brandConfig';
import { Link } from 'expo-router';
import Card from './Card';
import { useWindowWidth, breakpoints } from './hooks/useWindowWidth';

type AppbarProps = {
    title?: string,
    tabs?: JSX.Element | JSX.Element[],
};

const Appbar = ({ title, tabs }: AppbarProps) => {
    return Platform.OS === 'web' ? (
        <Card>
            <View style={styles.appbar}>
                <Link href="/core/home">
                    <Text style={styles.title}>{title}</Text>
                </Link>
                { useWindowWidth() >= breakpoints.medium ? tabs : null }
                <View style={styles.iconContainer}>
                    <IconButton iconName="search" />
                    <IconButton iconName="plus" />
                    <IconButton iconName="message-square" />
                </View>
            </View>
            { useWindowWidth() <= breakpoints.medium ? <View style={styles.appbarWebSmall}> {tabs}</View> : null }
        </Card>
    ) : (
        <View style={styles.appbar}>
            <Link href="/core/home">
                <Text style={styles.title}>{title}</Text>
            </Link>
            {tabs ? tabs : null}
            <View style={styles.iconContainer}>
                <IconButton iconName="search" />
                <IconButton iconName="plus" />
                <IconButton iconName="message-square" />
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
        height: 60,
        paddingHorizontal: 15,
    },
    appbarWebSmall: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: brand.colors.background,
        height: 60,
        width: '100%',
        paddingHorizontal: 15,
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