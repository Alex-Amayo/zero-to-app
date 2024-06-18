import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type ListProps = {
    children?: JSX.Element | JSX.Element[]
};

const List = ({children}: ListProps) => {
    return (
        <View style={styles.list}>
            {children}
        </View>
    );
};

export default List;

const styles = StyleSheet.create({
    list: {
        alignSelf: 'center',
        width: '100%',
        padding: 15,
        gap: 15,
    }
});