import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import brand from '../brand/brandConfig';

type CardProps = {
    children?: React.ReactNode;
};

const Card = ({children}: CardProps) => {
    return (
        <View style={styles.container}>
            {children}
        </View>
    );
};

export default Card;

const styles = StyleSheet.create({
    container: {
        backgroundColor: brand.card.cardBackground,
        padding: 20,
        borderRadius: brand.card.borderRadius,
        borderWidth: 1,
        borderColor: '#ddd',
        minWidth: '100%',
        gap: 15,
        shadowColor: brand.card.shadow ? '#171717' : undefined,
        shadowOffset: brand.card.shadow ? {width: -2, height: 4} : undefined,
        shadowOpacity: brand.card.shadow ? 0.2 : undefined,
        shadowRadius: brand.card.shadow ? 3 : undefined,
        elevation: brand.card.shadow ? 20 : undefined
    }
});