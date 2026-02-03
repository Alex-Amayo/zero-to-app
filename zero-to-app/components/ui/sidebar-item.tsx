// 1. IMPORTS
import React, { forwardRef, useState } from 'react';
import {
  Platform,
  Pressable,
  StyleSheet,
  View,
  type GestureResponderEvent,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { Typography } from './typography';
import { useTheme } from '../../theme';
import { useBrand } from '../../brand';
import { useSidebar } from '../../context/sidebar-context';
import { useDimensions, breakpoints } from '../../hooks';
import { renderIcon, type IconLibrary } from '../../icons';
import type { InteractiveComponentProps } from '../shared/types';

// 2. TYPES

/**
 * Configuration for sidebar item icons
 */
export interface SidebarItemIconConfig {
  /** Icon library to use. @default 'Feather' */
  library?: IconLibrary;
  /** Name of the icon from the specified library */
  name: string;
  /** Icon size in pixels. @default 20 */
  size?: number;
}

/**
 * Props for the SidebarItem component
 *
 * @example
 * ```tsx
 * <SidebarItem
 *   icon={{ library: 'Feather', name: 'home' }}
 *   label="Home"
 *   active={route === '/home'}
 *   onPress={() => navigate('/home')}
 * />
 * ```
 */
export interface SidebarItemProps extends Omit<InteractiveComponentProps, 'onPress'> {
  /** Item label text */
  label: string;
  /** Optional icon configuration */
  icon?: SidebarItemIconConfig;
  /** Whether this item is currently active/selected. @default false */
  active?: boolean;
  /** Press handler. Receives optional GestureResponderEvent */
  onPress?: (event?: GestureResponderEvent) => void;
  /** Custom styles */
  style?: StyleProp<ViewStyle>;
}

// 3. COMPONENT

/**
 * Sidebar menu item component with icon, label, and active state
 *
 * @example
 * ```tsx
 * <SidebarItem
 *   icon={{ library: 'Feather', name: 'settings' }}
 *   label="Settings"
 *   active={pathname === '/settings'}
 *   onPress={() => router.push('/settings')}
 * />
 * ```
 */
const SidebarItem = forwardRef<View, SidebarItemProps>(({
  label,
  icon,
  active = false,
  disabled = false,
  onPress,
  style,
  testID,
  accessibilityLabel,
  accessibilityHint,
}, ref) => {
  const { values: theme } = useTheme();
  const brand = useBrand();
  const { close } = useSidebar();
  const { width } = useDimensions();
  const tokens = theme.tokens.sidebar;

  // Track hover state (web-only)
  const [hovered, setHovered] = useState(false);

  // Determine if we're on mobile (drawer mode)
  const isMobile = width < breakpoints.large;

  // Handle press with auto-close on mobile
  const handlePress = (event?: GestureResponderEvent) => {
    if (onPress) {
      onPress(event);
    }
    // Auto-close drawer on mobile after item press
    if (isMobile) {
      close();
    }
  };

  // Determine colors based on state
  const backgroundColor = active
    ? tokens.itemActiveBg
    : hovered
    ? tokens.itemHoverBg
    : 'transparent';

  const textColor = active ? tokens.itemActiveText : tokens.itemText;
  const iconColor = active ? tokens.itemActiveText : tokens.itemText;

  // Render icon if provided
  const renderItemIcon = () => {
    if (!icon) return null;

    const iconSize = icon.size || 20;
    const iconLibrary = icon.library || 'Feather';

    return (
      <View style={styles.iconContainer}>
        {renderIcon(icon, iconLibrary, iconSize, iconColor)}
      </View>
    );
  };

  return (
    <Pressable
      ref={ref}
      testID={testID}
      onPress={disabled ? undefined : handlePress}
      disabled={disabled}
      onHoverIn={() => setHovered(true)}
      onHoverOut={() => setHovered(false)}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? label}
      accessibilityHint={accessibilityHint}
      accessibilityState={{ disabled, selected: active }}
      style={[
        styles.container,
        {
          backgroundColor,
          borderRadius: brand.borderRadius,
          paddingHorizontal: brand.spacing.md,
          paddingVertical: brand.spacing.sm,
        },
        disabled && styles.disabled,
        style,
      ]}
      // Platform-specific ripple effect for Android
      android_ripple={
        !disabled && Platform.OS === 'android'
          ? {
              color: theme.primary + '20', // 12.5% opacity
              borderless: false,
            }
          : undefined
      }
    >
      <View style={styles.content}>
        {renderItemIcon()}
        <Typography
          variant="labelLarge"
          weight="medium"
          color={textColor}
          numberOfLines={1}
        >
          {label}
        </Typography>
      </View>
    </Pressable>
  );
});

SidebarItem.displayName = 'SidebarItem';

// 4. STYLES
const styles = StyleSheet.create({
  container: {
    minHeight: 48, // M3 minimum touch target
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconContainer: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabled: {
    opacity: 0.38, // M3 disabled opacity
  },
});

// 5. EXPORTS
export { SidebarItem };
