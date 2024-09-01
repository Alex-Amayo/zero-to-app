import React from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ActivityIndicator,
  GestureResponderEvent,
} from 'react-native';
import brand from '../brand/brandConfig';

type ButtonProps = {
  title: string;
  secondary?: boolean;
  loading?: boolean;
  onPress: (event: GestureResponderEvent) => void;
};

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
        <Text
          style={{
            ...styles.text,
          }}>
          {title}
        </Text>
      </View>
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  primary: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: brand.borderRadius,
    backgroundColor: brand.colors.primary,
  },
  secondary: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
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
