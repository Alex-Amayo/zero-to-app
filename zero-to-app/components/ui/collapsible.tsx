// 1. IMPORTS
import React, { forwardRef, useState } from 'react';
import { Pressable, StyleSheet, View, type ViewProps } from 'react-native';
import Animated, {
  FadeIn,
  FadeOut,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { Typography } from './typography';
import { ThemedView } from './themed-view';
import { useTheme } from '../../theme';
import { renderIcon, type IconLibrary } from '../../icons';

// 2. TYPES

/**
 * Props for the Collapsible component.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Collapsible title="More details">
 *   <Typography>Hidden content that can be expanded</Typography>
 * </Collapsible>
 * ```
 *
 * @example
 * ```tsx
 * // Controlled state
 * const [open, setOpen] = useState(false);
 * <Collapsible title="Settings" open={open} onToggle={setOpen}>
 *   <Typography>Settings content</Typography>
 * </Collapsible>
 * ```
 *
 * @example
 * ```tsx
 * // Custom styling
 * <Collapsible
 *   title="FAQ Item"
 *   headerVariant="surfaceContainer"
 *   contentVariant="surface"
 * >
 *   <Typography>Answer to the question</Typography>
 * </Collapsible>
 * ```
 */
export interface CollapsibleProps extends Omit<ViewProps, 'children'> {
  /** Title text displayed in the header */
  title: string;
  /** Content to show when expanded */
  children: React.ReactNode;
  /**
   * Controlled open state. If provided, component becomes controlled.
   */
  open?: boolean;
  /**
   * Whether the collapsible starts expanded (uncontrolled mode).
   * @default false
   */
  defaultOpen?: boolean;
  /**
   * Callback when the open state changes.
   */
  onToggle?: (isOpen: boolean) => void;
  /**
   * ThemedView variant for the icon button background.
   * @default 'surfaceContainer'
   */
  headerVariant?: 'surface' | 'surfaceContainer' | 'card' | 'primary';
  /**
   * ThemedView variant for the content area.
   * @default 'surfaceContainer'
   */
  contentVariant?: 'surface' | 'surfaceContainer' | 'card';
  /**
   * Icon library to use for the chevron.
   * @default 'Feather'
   */
  iconLibrary?: IconLibrary;
  /**
   * Custom icon name for the chevron.
   * @default 'chevron-right'
   */
  iconName?: string;
  /** Test ID for testing */
  testID?: string;
}

// 3. COMPONENT

/**
 * Collapsible component for expandable/collapsible content sections.
 *
 * Features:
 * - Animated expand/collapse with rotation and fade
 * - Controlled and uncontrolled modes
 * - Customizable header and content styling
 * - Accessible with proper press states
 */
const Collapsible = forwardRef<View, CollapsibleProps>(
  (
    {
      title,
      children,
      open: controlledOpen,
      defaultOpen = false,
      onToggle,
      headerVariant = 'surfaceContainer',
      contentVariant = 'surfaceContainer',
      iconLibrary = 'Feather',
      iconName = 'chevron-right',
      testID,
      style,
      ...rest
    },
    ref
  ) => {
    const theme = useTheme();

    // Support both controlled and uncontrolled modes
    const [internalOpen, setInternalOpen] = useState(defaultOpen);
    const isControlled = controlledOpen !== undefined;
    const isOpen = isControlled ? controlledOpen : internalOpen;

    // Animation value for chevron rotation
    const rotation = useSharedValue(isOpen ? 90 : 0);

    const handlePress = () => {
      const newState = !isOpen;

      if (!isControlled) {
        setInternalOpen(newState);
      }

      onToggle?.(newState);
      rotation.value = withTiming(newState ? 90 : 0, { duration: 200 });
    };

    const animatedIconStyle = useAnimatedStyle(() => ({
      transform: [{ rotate: `${rotation.value}deg` }],
    }));

    return (
      <View ref={ref} style={style} testID={testID} {...rest}>
        <Pressable
          style={({ pressed }) => [styles.heading, pressed && styles.pressedHeading]}
          onPress={handlePress}
          accessibilityRole="button"
          accessibilityState={{ expanded: isOpen }}
          accessibilityLabel={`${title}, ${isOpen ? 'expanded' : 'collapsed'}`}
        >
          <ThemedView variant={headerVariant} style={styles.iconButton}>
            <Animated.View style={animatedIconStyle}>
              {renderIcon(
                { name: iconName },
                iconLibrary,
                14,
                theme.onSurface
              )}
            </Animated.View>
          </ThemedView>

          <Typography variant="labelLarge">{title}</Typography>
        </Pressable>

        {isOpen && (
          <Animated.View entering={FadeIn.duration(200)} exiting={FadeOut.duration(150)}>
            <ThemedView variant={contentVariant} style={styles.content}>
              {children}
            </ThemedView>
          </Animated.View>
        )}
      </View>
    );
  }
);

Collapsible.displayName = 'Collapsible';

// 4. STYLES
const styles = StyleSheet.create({
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  pressedHeading: {
    opacity: 0.7,
  },
  iconButton: {
    width: 32,
    height: 32,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    marginTop: 12,
    borderRadius: 12,
    marginLeft: 32,
    padding: 16,
  },
});

// 5. EXPORTS
export { Collapsible };
