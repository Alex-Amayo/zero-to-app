import React from 'react';
import { View, Text, TouchableHighlight, StyleSheet, TouchableOpacity } from 'react-native';

type ListButtonProps = {
    text: string;
    onPress?: () => void;
};

const ListButton = ({onPress, text}: ListButtonProps) => {
    return (
        <View>
            <TouchableOpacity style={styles.listButton} onPress={onPress? onPress : () => console.log('Icon Button pressed')}>
                <Text>{text}</Text>
            </TouchableOpacity>
        </View>
    );
};

export default ListButton;

const styles = StyleSheet.create({
    listButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        padding: 15,
    }
});