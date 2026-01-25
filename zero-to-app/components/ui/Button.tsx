// 1. IMPORTS
import React, { forwardRef, useContext, useMemo } from 'react';
import {
  ActivityIndicator,
  GestureResponderEvent,
  Pressable,
  StyleSheet,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import * as Icons from '@expo/vector-icons';
import { useBrand } from '../../brand';
import { StyledText } from './StyledText';
import { ThemeContext } from '../../theme';
import type { InteractiveComponentProps, LoadableComponentProps } from '../shared/types';

// 2. TYPES
type IconLibrary = keyof typeof Icons;

export type ButtonVariant = 'primary' | 'secondary';

export interface ButtonProps extends Omit<InteractiveComponentProps, 'onPress'>, LoadableComponentProps {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  variant?: ButtonVariant;
  icon?: {
    library: IconLibrary;
    name: string;
    size?: number;
    color?: string;
  };
  iconPosition?: 'left' | 'right';
}

// 3. COMPONENT
/**
 * A reusable button component that can be customized with different styles,
 * loading states, and behavior based on props. It can also display an optional icon.
 */
const Button = forwardRef<View, ButtonProps>(({
  title,
  variant = 'primary',
  loading = false,
  disabled = false,
  icon,
  onPress,
  iconPosition = 'right',
  style,
  testID,
  accessibilityLabel,
  accessibilityHint,
}, ref) => {
  const theme = useContext(ThemeContext);
  const brand = useBrand();

  const isSecondary = variant === 'secondary';

  const styles = useMemo(() => StyleSheet.create({
    primary: {
      maxHeight: 100,
      minWidth: 200,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 15,
      borderRadius: brand.borderRadius,
      backgroundColor: brand.colors.primary,
    },
    secondary: {
      maxHeight: 100,
      minWidth: 200,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 15,
      borderRadius: brand.borderRadius,
      backgroundColor: 'transparent',
      borderWidth: 2,
      borderColor: brand.colors.secondary,
    },
    disabled: {
      opacity: 0.5,
    },
    contentContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    iconLeft: {
      marginRight: 8,
    },
    iconRight: {
      marginLeft: 8,
    },
  }), [brand]);

  const buttonStyle: StyleProp<ViewStyle> = [
    isSecondary ? styles.secondary : styles.primary,
    disabled && styles.disabled,
    style,
  ];

  if (loading) {
    return (
      <View
        ref={ref}
        testID={testID}
        style={buttonStyle}
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel ?? title}
        accessibilityHint={accessibilityHint}
        accessibilityState={{ disabled: true, busy: true }}
      >
        <ActivityIndicator
          size="small"
          color={isSecondary ? brand.colors.secondary : '#FFFFFF'}
        />
      </View>
    );
  }

  const renderIcon = (position: 'left' | 'right') => {
    if (!icon || iconPosition !== position) return null;

    const IconComponent = icon.library && Icons[icon.library];
    if (!IconComponent) return null;

    return (
      <View style={position === 'left' ? styles.iconLeft : styles.iconRight}>
        {React.createElement(IconComponent, {
          name: icon.name,
          size: icon.size || 20,
          color: icon.color || (!isSecondary ? '#FFFFFF' : theme.values.color),
        })}
      </View>
    );
  };

  return (
    <Pressable
      ref={ref}
      testID={testID}
      onPress={disabled ? undefined : onPress}
      disabled={disabled}
      style={buttonStyle}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? title}
      accessibilityHint={accessibilityHint}
      accessibilityState={{ disabled }}
    >
      <View style={styles.contentContainer}>
        {renderIcon('left')}
        <StyledText
          fontSize="sm"
          color={!isSecondary ? '#FFFFFF' : theme.values.color}
          fontWeight={500}
          numberOfLines={1}
          align="center"
        >
          {title}
        </StyledText>
        {renderIcon('right')}
      </View>
    </Pressable>
  );
});

Button.displayName = 'Button';

// 4. EXPORTS
export { Button };
