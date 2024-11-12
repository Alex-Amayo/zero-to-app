import React from 'react';
import { ActivityIndicator, Pressable, View, StyleSheet } from 'react-native';
import { StyledText } from './StyledText';
import brand from '../brand/brandConfig';

type ButtonProps = {
  title: string;
  onPress: () => void;
  secondary?: boolean;
  loading?: boolean;
};

/**
 * A reusable button component that can be customized with different styles,
 * loading states, and behavior based on props.
 */
const Button = ({ title, secondary, loading, onPress }: ButtonProps) => {
  return loading ? (
    <View>
      <ActivityIndicator
        size="small"
        color={secondary ? brand.colors.secondary : brand.colors.primary}
      />
    </View>
  ) : (
    <Pressable onPress={onPress} style={secondary ? styles.secondary : styles.primary}>
      <View>
        <StyledText fontSize={'md'} color="white">
          {title}
        </StyledText>
      </View>
    </Pressable>
  );
};

export { Button };

const styles = StyleSheet.create({
  primary: {
    backgroundColor: brand.colors.primary,
    padding: 10,
    borderRadius: 5,
  },
  secondary: {
    backgroundColor: brand.colors.secondary,
    padding: 10,
    borderRadius: 5,
  },
});
