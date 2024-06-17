import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import brand from '../brand/brandConfig';
import IconButton from './IconButton';

type TextLinkprops = {
    text: string;
    onPress?: () => void;
};

const TextLink = ({ text, onPress }: TextLinkprops) => {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress ? onPress : () => console.log('Icon Button pressed')}>
            <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: '#1877f2',
        fontSize: brand.fontSizes.medium,
        textAlign: 'center',
    },
});

export default TextLink;