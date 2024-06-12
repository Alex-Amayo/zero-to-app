import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import brand from '../brand/brandConfig';

type IconButtonProps = {
    iconName: any;
    onPress?: () => void;
} 

const IconButton = ({iconName, onPress}: IconButtonProps) => {
    return (
        <TouchableOpacity onPress={onPress? onPress : () => console.log('Button pressed')} style={styles.container}>
            <FontAwesome name={iconName} size={20} />
        </TouchableOpacity> 
    );
};

export default IconButton;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 40,
        height: 40,
        backgroundColor: '#E4E6EB',
        borderRadius: 25,
    }
});