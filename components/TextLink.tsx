import React from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';

type TextLinkprops = {
    text: string;
};

const TextLink = ({ text }: TextLinkprops) => {
    return (
        <TouchableHighlight style={styles.container} onPress={() => console.log('TextLink pressed')}>
            <Text style={styles.text}>{text}</Text>
        </TouchableHighlight>
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