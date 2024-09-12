import React from 'react';
import {
  View,
  Pressable,
  StyleSheet,
  ActivityIndicator,
  GestureResponderEvent,
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
 *
 * @param {string} title - The text to display on the button.
 * @param {function} onPress - Function to call when the button is pressed.
 * @param {boolean} [secondary] - If true, applies the secondary style to the button.
 * @param {boolean} [loading] - If true, shows a loading spinner instead of the button text.
 *
 * @returns { JSX.Element } - Returns rendered Button Component
 */

const Button = ({ title, secondary, loading, onPress }: ButtonProps): JSX.Element => {
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
        <StyledText md color="white">
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
