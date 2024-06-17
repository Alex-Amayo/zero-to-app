import React from 'react';
import { View, StyleSheet } from 'react-native';

const ListDivider = () => {
    return (
        <View style={styles.listDivider}>
        </View>
    );
};

export default ListDivider;

const styles = StyleSheet.create({
    listDivider: {
        width: '100%',
        height: 1,
        backgroundColor: '#E4E6EB',
    }
});