import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';

type TextLinkprops = {
    text: string;
    onPress?: () => void;
};

const TextLink = ({ text, onPress }: TextLinkprops) => {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
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
        fontSize: 16,
        textAlign: 'center',
    },
});

export default TextLink;