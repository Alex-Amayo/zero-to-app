import React from 'react';
import {
  ActivityIndicator,
  GestureResponderEvent,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import brand from '../brand/brandConfig';
import { StyledText } from './StyledText';

type ButtonProps = {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
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

export default Button;

const styles = StyleSheet.create({
  primary: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: brand.borderRadius,
    backgroundColor: brand.colors.primary,
  },
  secondary: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: brand.borderRadius,
    backgroundColor: brand.colors.secondary,
  },
  text: {
    fontSize: brand.fontSizes.medium,
    textAlign: 'center',
    fontWeight: '500',
    color: '#FFFFFF',
  },
});
