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
import { useBrand } from '../../brand';
import { StyledText } from './StyledText';
import { ThemeContext } from '../../theme';
import { renderIcon } from '../navigation/iconUtils';
import type { InteractiveComponentProps, LoadableComponentProps } from '../shared/types';
import type { IconLibrary } from '../../brand/brandTypes';

// 2. TYPES
export interface IconConfig {
  library?: IconLibrary;
  name: string;
  size?: number;
  color?: string;
}

export type ButtonVariant = 'default' | 'secondary' | 'outline' | 'destructive';

export interface ButtonProps extends Omit<InteractiveComponentProps, 'onPress'>, LoadableComponentProps {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  variant?: ButtonVariant;
  icon?: IconConfig;
  iconPosition?: 'left' | 'right';
  color?: string;
  backgroundColor?: string;
  raised?: boolean;
}

// 3. COMPONENT
/**
 * A unified button component supporting multiple variants:
 * - default: Primary filled button
 * - secondary: Alternative filled button
 * - outline: Outlined button with transparent background
 * - destructive: Danger/delete actions
 */
const Button = forwardRef<View, ButtonProps>(({
  title,
  variant = 'default',
  loading = false,
  disabled = false,
  icon,
  onPress,
  iconPosition = 'right',
  style,
  testID,
  accessibilityLabel,
  accessibilityHint,
  color,
  backgroundColor,
  raised = false,
}, ref) => {
  const theme = useContext(ThemeContext);
  const brand = useBrand();

  const styles = useMemo(() => StyleSheet.create({
    base: {
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: brand.borderRadius,
    },
    default: {
      backgroundColor: brand.colors.primary,
      paddingHorizontal: 20,
      paddingVertical: 12,
      minWidth: 100,
    },
    outline: {
      backgroundColor: 'transparent',
      borderWidth: 2,
      borderColor: brand.colors.primary,
      paddingHorizontal: 20,
      paddingVertical: 12,
      minWidth: 100,
    },
    destructive: {
      backgroundColor: '#dc2626',
      paddingHorizontal: 20,
      paddingVertical: 12,
      minWidth: 100,
    },
    secondary: {
      backgroundColor: brand.colors.secondary,
      paddingHorizontal: 20,
      paddingVertical: 12,
      minWidth: 100,
    },
    disabled: {
      opacity: 0.5,
    },
    raised: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 4,
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

  const getTextColor = () => {
    if (color) return color;
    switch (variant) {
      case 'default':
      case 'destructive':
      case 'secondary':
        return brand.colors.buttonText ?? '#FFFFFF';
      case 'outline':
        return brand.colors.primary;
      default:
        return theme.values.color;
    }
  };

  const getIconColor = () => {
    if (icon?.color) return icon.color;
    if (color) return color;
    return getTextColor();
  };

  const buttonStyle: StyleProp<ViewStyle> = [
    styles.base,
    styles[variant],
    backgroundColor && { backgroundColor },
    disabled && styles.disabled,
    raised && styles.raised,
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
        <ActivityIndicator size="small" color={getTextColor()} />
      </View>
    );
  }

  const renderButtonIcon = (position: 'left' | 'right') => {
    if (!icon || iconPosition !== position) return null;

    const iconSize = icon.size || 20;
    const iconColor = getIconColor();
    const iconLibrary = icon.library || 'Feather';

    return (
      <View style={position === 'left' ? styles.iconLeft : styles.iconRight}>
        {renderIcon(icon, iconLibrary, iconSize, iconColor)}
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
        {renderButtonIcon('left')}
        <StyledText
          fontSize="sm"
          color={getTextColor()}
          fontWeight={500}
          numberOfLines={1}
          align="center"
        >
          {title}
        </StyledText>
        {renderButtonIcon('right')}
      </View>
    </Pressable>
  );
});

Button.displayName = 'Button';

// 4. EXPORTS
export { Button };
