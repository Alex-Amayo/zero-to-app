// 1. IMPORTS
import React from 'react';
import {
  StyleSheet,
  View,
  Pressable,
  ScrollView,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import Animated, { useAnimatedStyle, withTiming, useSharedValue } from 'react-native-reanimated';
import { useThemeContext } from '../../../theme';
import { useDimensions, breakpoints } from '../../../hooks';
import { useSidebar } from '../../../context/sidebar-context';
import { useLayout } from '../../../context/layout-context';

// 2. TYPES

/**
 * Props for the Sidebar component (Web)
 */
export interface SidebarProps {
  /** Optional header component */
  header?: React.ReactNode;
  /** Sidebar content (usually SidebarSection and SidebarItem components) */
  children: React.ReactNode;
  /** Optional footer component */
  footer?: React.ReactNode;
  /** Custom styles */
  style?: StyleProp<ViewStyle>;
  /** Test ID for testing */
  testID?: string;
}

// 3. COMPONENT

/**
 * Sidebar component for web platform
 * - Desktop (≥1024px): Persistent sidebar on left (always visible, below AppBar)
 * - Mobile/Tablet (<1024px): Overlay drawer with backdrop
 */
export const Sidebar: React.FC<SidebarProps> = ({
  header,
  children,
  footer,
  style,
  testID,
}) => {
  const { values: theme } = useThemeContext();
  const { width } = useDimensions();
  const { isOpen, close } = useSidebar();
  const { appBarHeight } = useLayout();
  const tokens = theme.tokens.sidebar;

  const isDesktop = width >= breakpoints.large;

  const translateX = useSharedValue(isDesktop || isOpen ? 0 : -tokens.width);
  const backdropOpacity = useSharedValue(isOpen && !isDesktop ? 0.5 : 0);

  React.useEffect(() => {
    if (isDesktop) {
      translateX.value = 0;
      backdropOpacity.value = 0;
    } else {
      translateX.value = withTiming(isOpen ? 0 : -tokens.width, { duration: 300 });
      backdropOpacity.value = withTiming(isOpen ? 0.5 : 0, { duration: 300 });
    }
  }, [isOpen, isDesktop, translateX, backdropOpacity, tokens.width]);

  const animatedSidebarStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const animatedBackdropStyle = useAnimatedStyle(() => ({
    opacity: backdropOpacity.value,
    pointerEvents: backdropOpacity.value > 0 ? ('auto' as any) : ('none' as any),
  }));

  // Desktop: persistent sidebar below AppBar
  if (isDesktop) {
    return (
      <View
        style={[
          styles.sidebarDesktop,
          {
            width: tokens.width,
            backgroundColor: tokens.background,
            borderRightWidth: 1,
            borderRightColor: tokens.divider,
            top: appBarHeight,
            height: `calc(100vh - ${appBarHeight}px)` as any,
          },
          style,
        ]}
        testID={testID}
      >
        {header}
        <ScrollView style={styles.scrollContent} contentContainerStyle={styles.scrollContentContainer}>
          {children}
        </ScrollView>
        {footer}
      </View>
    );
  }

  // Mobile: drawer with backdrop
  if (!isOpen) {
    return null;
  }

  return (
    <>
      <Animated.View
        style={[
          styles.backdrop,
          { backgroundColor: theme.scrim },
          animatedBackdropStyle,
        ]}
      >
        <Pressable style={StyleSheet.absoluteFill} onPress={close} />
      </Animated.View>

      <Animated.View
        style={[
          styles.drawerMobile,
          {
            width: tokens.width,
            backgroundColor: tokens.background,
            shadowColor: theme.shadow,
            shadowOffset: { width: 2, height: 0 },
            shadowOpacity: 0.15,
            shadowRadius: 8,
          },
          animatedSidebarStyle,
          style,
        ]}
        testID={testID}
      >
        {header}
        <ScrollView style={styles.scrollContent} contentContainerStyle={styles.scrollContentContainer}>
          {children}
        </ScrollView>
        {footer}
      </Animated.View>
    </>
  );
};

// 4. STYLES
const styles = StyleSheet.create({
  sidebarDesktop: {
    position: 'fixed' as any,
    left: 0,
    zIndex: 100,
  },
  drawerMobile: {
    height: '100vh' as any,
    position: 'fixed' as any,
    left: 0,
    top: 0,
    zIndex: 1001,
  },
  backdrop: {
    position: 'fixed' as any,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
  },
  scrollContent: {
    flex: 1,
  },
  scrollContentContainer: {
    flexGrow: 1,
  },
});
