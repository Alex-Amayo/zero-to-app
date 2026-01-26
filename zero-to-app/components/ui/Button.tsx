// 1. IMPORTS
import React, { forwardRef, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  GestureResponderEvent,
  Platform,
  Pressable,
  StyleSheet,
  View,
  type PressableStateCallbackType,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { Typography } from './Typography';
import { useTheme } from '../../theme';
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

export type ButtonVariant = 'elevated' | 'filled' | 'tonal' | 'outlined' | 'text';
export const ButtonVariants = ['filled', 'elevated', 'tonal', 'outlined', 'text'] as const;

export interface ButtonProps extends Omit<InteractiveComponentProps, 'onPress'>, LoadableComponentProps {
  title: string;
  // Accept either an event-aware handler or a simple no-arg callback for flexibility
  onPress?: (event?: GestureResponderEvent) => void;
  variant?: ButtonVariant;
  // `raised` is a convenience legacy prop mapped to `variant='elevated'`
  raised?: boolean;
  icon?: IconConfig;
  iconPosition?: 'left' | 'right';
  color?: string;
  backgroundColor?: string;
  size?: 'xs' | 's' | 'm' | 'l' | 'xl';
}

// 3. COMPONENT
/**
 * Material Design 3 Button component
 * https://m3.material.io/components/buttons
 *
 * Supports five variants:
 * - filled: High-emphasis actions (default)
 * - elevated: Medium-emphasis actions with elevation
 * - tonal: Medium-emphasis with container color
 * - outlined: Medium-emphasis with border
 * - text: Low-emphasis actions
 */
const Button = forwardRef<View, ButtonProps>(({
  title,
  variant = 'filled',
  raised = false,
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
  size = 's',
}, ref) => {
  const { values: theme } = useTheme();
  const tokens = theme.tokens;

  // Resolve legacy `raised` prop to `elevated` variant for backwards-compatibility
  const resolvedVariant: ButtonVariant = raised ? 'elevated' : variant;

  // Track hover and focus states (web-only features)
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);

  // Respect reduce-motion preference where available and map sizes
  const [reduceMotionEnabled, setReduceMotionEnabled] = useState(false);
  useEffect(() => {
    let mounted = true;
    try {
      // dynamically require to avoid bundler differences across platforms
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const { AccessibilityInfo } = require('react-native');
      AccessibilityInfo?.isReduceMotionEnabled?.().then((enabled: boolean) => {
        if (mounted) setReduceMotionEnabled(!!enabled);
      });
    } catch (e) {
      // ignore if not available
    }
    return () => { mounted = false; };
  }, []);

  // Visual heights in dp per size token
  const sizeMap: Record<string, number> = {
    xs: 32,
    s: 40,
    m: 56,
    l: 96,
    xl: 136,
  };
  // default to 's' if not provided via props
  const visualHeight = sizeMap[size] ?? sizeMap.s;
  // Ensure a minimum touch target of 48dp
  const touchHeight = Math.max(48, visualHeight);

  // Dynamic styles based on state
  const getButtonStyle = ({ pressed }: PressableStateCallbackType): StyleProp<ViewStyle> => {
    const t = tokens.button;
    let bg: string | undefined;
    let borderColor: string | undefined;
    let elevation: number | undefined;

    if (disabled) {
      bg = t.disabledBg;
      borderColor = variant === 'outlined' ? theme.outlineVariant : undefined;
    } else {
      switch (resolvedVariant) {
        case 'filled':
          bg = pressed ? t.filledPressedBg : hovered ? t.filledHoverBg : t.filledBg;
          if (Platform.OS !== 'web') {
            elevation = pressed ? tokens.elevation.level0 : tokens.elevation.level1;
          }
          break;
        case 'elevated':
          bg = hovered ? t.elevatedHoverBg : t.elevatedBg;
          elevation = pressed ? tokens.elevation.level1 : tokens.elevation.level3;
          break;
        case 'tonal':
          bg = hovered ? t.tonalHoverBg : t.tonalBg;
          break;
        case 'outlined':
          bg = 'transparent';
          borderColor = hovered ? t.outlinedHoverBorder : t.outlinedBorder;
          break;
        case 'text':
          bg = 'transparent';
          break;
      }
    }

    // Apply custom background color override
    if (backgroundColor) {
      bg = backgroundColor;
    }

    const baseStyle: StyleProp<ViewStyle> = [
      styles.base,
      styles[variant],
      // reserve touch target height for accessibility
      { minHeight: touchHeight },
      bg ? { backgroundColor: bg } : null,
      borderColor ? { borderColor } : null,
      disabled ? styles.disabled : null,
    ];

    // Add elevation shadow for elevated buttons
    if (elevation !== undefined && elevation > 0) {
      (baseStyle as ViewStyle[]).push({
        shadowColor: theme.shadow,
        shadowOffset: { width: 0, height: Math.max(1, Math.floor(elevation / 2)) },
        shadowOpacity: 0.08,
        shadowRadius: Math.max(1, Math.floor(elevation / 2)),
        elevation: elevation,
      });
    }

    // Add focus ring for web/keyboard navigation
    if (focused && Platform.OS === 'web') {
      (baseStyle as ViewStyle[]).push({
        borderWidth: tokens.focusRing.width,
        borderColor: tokens.focusRing.color,
        borderStyle: 'solid' as 'solid',
      });
    }

    // subtle transform for hover/press unless user requests reduced motion
    if (!reduceMotionEnabled) {
      if (pressed) {
        (baseStyle as ViewStyle[]).push({ transform: [{ scale: 0.997 }] });
      } else if (hovered && Platform.OS === 'web') {
        (baseStyle as ViewStyle[]).push({ transform: [{ translateY: -1 }, { scale: 1.01 }] });
      }
    }

    // Add custom style last
    if (style) {
      (baseStyle as ViewStyle[]).push(style as ViewStyle);
    }

    return baseStyle;
  };

  // Get text color based on variant and state
  const getTextColor = (isDisabled: boolean): string => {
    if (color) return color;
    if (isDisabled) return tokens.button.disabledText;

    const t = tokens.button;
    switch (resolvedVariant) {
      case 'filled':
        return t.filledText;
      case 'elevated':
        return t.elevatedText;
      case 'tonal':
        // tonal should use a high-contrast label (avoid looking disabled)
        return theme.onSurface;
      case 'outlined':
        return t.outlinedText;
      case 'text':
        return t.textColor;
      default:
        return t.filledText;
    }
  };

  const getIconColor = (isDisabled: boolean): string => {
    if (icon?.color) return icon.color;
    return getTextColor(isDisabled);
  };

  const textColor = getTextColor(disabled);
  const iconColor = getIconColor(disabled);

  if (loading) {
    return (
      <View
        ref={ref}
        testID={testID}
        style={[styles.base, styles[variant], { minHeight: touchHeight }, backgroundColor && { backgroundColor }]}
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel ?? title}
        accessibilityHint={accessibilityHint}
        accessibilityState={{ disabled: true, busy: true }}
      >
        <ActivityIndicator size="small" color={textColor} />
      </View>
    );
  }

  const renderButtonIcon = (position: 'left' | 'right') => {
    if (!icon || iconPosition !== position) return null;

    const iconSize = icon.size || 18;
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
      style={getButtonStyle}
      onHoverIn={() => setHovered(true)}
      onHoverOut={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? title}
      accessibilityHint={accessibilityHint}
      accessibilityState={{ disabled }}
      // Platform-specific ripple effect for Android
      android_ripple={
        !disabled && Platform.OS === 'android'
          ? {
              color: theme.primary + '40', // 25% opacity
              borderless: false,
            }
          : undefined
      }
    >
      <View style={[styles.contentContainer, { height: visualHeight }]}> 
        {renderButtonIcon('left')}
        <Typography
          variant="labelLarge"
          weight="medium"
          color={textColor}
          numberOfLines={1}
          align="center"
        >
          {title}
        </Typography>
        {renderButtonIcon('right')}
      </View>
    </Pressable>
  );
});

Button.displayName = 'Button';

// 4. STYLES
const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20, // M3 standard button radius
    
  },
  filled: {
    paddingHorizontal: 24,
    minWidth: 100,
  },
  elevated: {
    paddingHorizontal: 24,
    minWidth: 100,
  },
  tonal: {
    paddingHorizontal: 24,
    minWidth: 100,
  },
  outlined: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    paddingHorizontal: 24,
    minWidth: 100,
  },
  text: {
    backgroundColor: 'transparent',
    paddingHorizontal: 12,
    minWidth: 100,
  },
  disabled: {
    opacity: 0.38, // M3 disabled opacity
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  iconLeft: {
    marginRight: 0, // gap handles spacing
  },
  iconRight: {
    marginLeft: 0, // gap handles spacing
  },
});

// 5. EXPORTS
export { Button };
