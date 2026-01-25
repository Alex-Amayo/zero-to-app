// 1. IMPORTS
import React, { forwardRef, useContext } from 'react';
import { StyleSheet, Pressable, View, type StyleProp, type ViewStyle } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import { ThemeContext } from '../../theme';
import type { InteractiveComponentProps } from '../shared/types';

// 2. TYPES
export interface IconButtonProps extends InteractiveComponentProps {
  iconName: keyof typeof Feather.glyphMap;
  color?: string;
  backgroundColor?: string;
  size?: number;
}

// 3. COMPONENT
/**
 * Renders rounded icon button with icon from expo-vector icons.
 */
const IconButton = forwardRef<View, IconButtonProps>(({
  iconName,
  onPress,
  color,
  backgroundColor,
  size = 20,
  disabled = false,
  style,
  testID,
  accessibilityLabel,
  accessibilityHint,
}, ref) => {
  const theme = useContext(ThemeContext);

  const containerStyle: StyleProp<ViewStyle> = [
    styles.container,
    {
      backgroundColor: backgroundColor ?? 'transparent',
      opacity: disabled ? 0.5 : 1,
    },
    style,
  ];

  return (
    <Pressable
      ref={ref}
      testID={testID}
      onPress={disabled ? undefined : onPress}
      disabled={disabled}
      style={containerStyle}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? iconName}
      accessibilityHint={accessibilityHint}
      accessibilityState={{ disabled }}
    >
      <Feather
        name={iconName}
        size={size}
        color={color ?? theme.values.color}
      />
    </Pressable>
  );
});

IconButton.displayName = 'IconButton';

// 4. EXPORTS
export { IconButton };

// Static styles - no theme/brand dependency
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    borderRadius: 25,
  },
});
