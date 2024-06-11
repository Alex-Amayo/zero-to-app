import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import brand from '../brand/brandConfig';

type IconButtonProps = {
    iconName: any;
    name?: string;
} 

const IconButton = ({iconName, name}: IconButtonProps) => {
    return (
        <TouchableOpacity onPress={() => console.log('Button pressed')} style={styles.container} >
            <FontAwesome name={iconName} size={20} color={brand.colors.textAlternate} />
            { name? <Text style={styles.buttonText}>{name}</Text> : null }        
        </TouchableOpacity> 
    );
};

export default IconButton;

const styles = StyleSheet.create({
    container: {
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        width: 50,
        height: 50,
    },
    buttonText: {
        color: brand.colors.textAlternate,
    },
});