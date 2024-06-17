import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type ListProps = {
    children?: React.ReactNode | React.ReactNode[]
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
        minWidth: 350,
        width: '100%',
        padding: 15,
        gap: 15,
    }
});