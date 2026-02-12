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
import { useThemeContext } from '../../../theme';
import { useDimensions, breakpoints } from '../../../hooks';
import { useSidebar } from '../../../context/sidebar-context';
import { useLayout } from '../../../context/layout-context';
import { usePathname } from 'expo-router';
import { renderIcon } from '../../../icons';
import { Drawer } from '../drawer/drawer';

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
  /** Anchor side for the sidebar: 'left' | 'right' (desktop and mobile drawer) */
  anchor?: 'left' | 'right';
}

// 3. COMPONENT

/**
 * Sidebar component for web platform
 * - Desktop (≥1024px): Persistent sidebar on left (always visible, below AppBar)
 * - Mobile/Tablet (<1024px): Floating trigger icon + overlay Drawer
 */
export const Sidebar: React.FC<SidebarProps> = ({
  header,
  children,
  footer,
  style,
  testID,
  anchor = 'left',
}) => {
  const { values: theme } = useThemeContext();
  const { width } = useDimensions();
  const { isOpen, open, close } = useSidebar();
  const { appBarHeight } = useLayout();
  const tokens = theme.tokens.sidebar;
  const spacing = theme.spacing;
  const pathname = usePathname();

  // Capture the route scope on first mount so the sidebar only renders
  // when the current pathname matches (prevents showing on other tabs
  // when expo-router caches mounted layouts).
  const routeScopeRef = React.useRef<string | null>(null);
  if (routeScopeRef.current === null) {
    const firstSegment = pathname.split('/').filter(Boolean)[0];
    routeScopeRef.current = firstSegment ? `/${firstSegment}` : '/';
  }

  const isOnSidebarRoute = routeScopeRef.current === '/' ||
    pathname === routeScopeRef.current ||
    pathname.startsWith(routeScopeRef.current + '/');

  const isDesktop = width >= breakpoints.large;
  const isRight = anchor === 'right';

  // Don't render anything when on a different route (cached tab)
  if (!isOnSidebarRoute) {
    return null;
  }

  // Desktop: persistent sidebar below AppBar
  if (isDesktop) {
    return (
      <View
        style={[
          styles.sidebarDesktop,
          {
            width: tokens.width,
            backgroundColor: tokens.background,
            borderRightWidth: isRight ? 0 : 1,
            borderRightColor: isRight ? 'transparent' : tokens.divider,
            borderLeftWidth: isRight ? 1 : 0,
            borderLeftColor: isRight ? tokens.divider : 'transparent',
            top: appBarHeight,
            height: `calc(100vh - ${appBarHeight}px)` as any,
            left: isRight ? 'auto' as any : 0,
            right: isRight ? 0 : 'auto' as any,
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

  // Mobile: self-contained trigger + Drawer
  return (
    <>
      {!isOpen && (
        <Pressable
          onPress={open}
          style={[
            styles.mobileTrigger,
            {
              top: appBarHeight + spacing.sm,
              left: isRight ? 'auto' as any : spacing.sm,
              right: isRight ? spacing.sm : 'auto' as any,
              backgroundColor: tokens.background,
              borderRadius: theme.borderRadius,
              shadowColor: theme.shadow,
            },
          ]}
        >
          {renderIcon({ library: 'Feather', name: 'menu' }, 'Feather', 20, theme.onSurface)}
        </Pressable>
      )}
      <Drawer
        isOpen={isOpen}
        onClose={close}
        side={anchor}
        header={header}
        footer={footer}
        style={style}
      >
        {children}
      </Drawer>
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
  mobileTrigger: {
    position: 'fixed' as any,
    zIndex: 99,
    padding: 8,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  scrollContent: {
    flex: 1,
  },
  scrollContentContainer: {
    flexGrow: 1,
  },
});
