import React, { useState, useContext, useEffect, useCallback, useMemo } from 'react';
import { View, StyleSheet, Pressable, Animated, Modal, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { ThemeContext } from '../../../theme';
import { useBrand } from '../../../brand';
import { StyledText } from '../../../ui/text/StyledText';
import Feather from '@expo/vector-icons/Feather';
import { useDimensions } from '../../../hooks';
import Logo from './Logo';
import { renderIcon } from '../iconUtils';

type MobileMenuDrawerProps = {
  currentRoute?: string;
  onNavigate?: (route: string) => void;
  logoUri?: string;
};

/**
 * Hamburger menu drawer for mobile web that opens a side drawer
 * Contains navigation links and theme toggle
 * Enhanced with keyboard support, accessibility, and improved animations
 */
const MobileMenuDrawer = ({ currentRoute, onNavigate, logoUri }: MobileMenuDrawerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const theme = useContext(ThemeContext);
  const router = useRouter();
  const dimensions = useDimensions();
  const brand = useBrand();
  const slideAnim = React.useRef(new Animated.Value(300)).current; // Start off-screen (right side)
  const backdropRef = React.useRef<View>(null);
  
  const styles = useMemo(() => StyleSheet.create({
    hamburgerButton: {
      padding: 8,
      justifyContent: 'center',
      alignItems: 'center',
    },
    backdrop: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
      ...(Platform.OS === 'web' && {
        // Add backdrop blur effect for web
        backdropFilter: 'blur(4px)',
        WebkitBackdropFilter: 'blur(4px)',
      }),
    },
    drawer: {
      width: 280,
      height: '100%',
      position: 'absolute',
      right: 0,
      top: 0,
      shadowColor: '#000',
      shadowOffset: { width: -2, height: 0 },
      shadowOpacity: 0.25,
      shadowRadius: brand.borderRadius,
      elevation: 10,
    },
    drawerHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 20,
      borderBottomWidth: 1,
      paddingTop: Platform.OS === 'web' ? 20 : 20, // Simplified - safe area handled by browser
    },
    closeButton: {
      padding: 4,
    },
    drawerContent: {
      flex: 1,
      padding: 20,
    },
    menuItem: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 16,
      borderRadius: brand.borderRadius,
      marginBottom: 8,
    },
    themeToggleContainer: {
      marginTop: 'auto',
    },
    themeToggleButton: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 12,
      borderRadius: brand.borderRadius,
      borderWidth: 1,
    },
  }), [brand]);

  // Only show on mobile web
  if (!(Platform.OS === 'web' && dimensions.breakpoint === 'small')) {
    return null;
  }

  const closeMenu = useCallback(() => {
    Animated.spring(slideAnim, {
      toValue: 300,
      useNativeDriver: true,
      tension: 70,
      friction: 12,
      overshootClamping: false,
    }).start(() => {
      setIsOpen(false);
    });
  }, [slideAnim]);

  const openMenu = () => {
    setIsOpen(true);
    Animated.spring(slideAnim, {
      toValue: 0,
      useNativeDriver: true,
      tension: 70,
      friction: 12,
      overshootClamping: false,
    }).start();
  };

  // Handle keyboard escape key (web only)
  useEffect(() => {
    if (!isOpen || Platform.OS !== 'web') return;

    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeMenu();
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen, closeMenu]);

  // Handle backdrop clicks on web
  useEffect(() => {
    if (!isOpen || Platform.OS !== 'web' || !backdropRef.current) return;

    const backdropElement = (backdropRef.current as any)?._nativeNode;
    if (!backdropElement) return;

    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      // Close if clicking on backdrop itself, not on drawer
      if (target === backdropElement || (backdropElement.contains(target) && !target.closest('[data-drawer]'))) {
        closeMenu();
      }
    };

    backdropElement.addEventListener('click', handleClick);
    return () => {
      backdropElement.removeEventListener('click', handleClick);
    };
  }, [isOpen, closeMenu]);

  const handleNavigate = (route: string) => {
    closeMenu();
    if (onNavigate) {
      // Extract route name from full path (e.g., '/(tabs)/home' -> 'home')
      const routeName = route.split('/').pop() || route;
      onNavigate(routeName);
    } else {
      router.push(route as any);
    }
  };

  // Get navigation items from brand config
  const navigationItems = brand.navigation.items;

  return (
    <>
      {/* Hamburger Button */}
      <Pressable 
        onPress={openMenu} 
        style={styles.hamburgerButton}
        accessibilityLabel="Open menu"
        accessibilityRole="button"
        accessibilityHint="Opens the navigation menu"
      >
        <Feather name="menu" size={24} color={theme.values.color} />
      </Pressable>

      {/* Drawer Modal */}
      <Modal
        visible={isOpen}
        transparent
        animationType="none"
        onRequestClose={closeMenu}
        accessibilityViewIsModal={true}
      >
        <View 
          ref={backdropRef}
          style={styles.backdrop}
          {...(Platform.OS === 'web' && { 'data-backdrop': true } as any)}
          onStartShouldSetResponder={() => Platform.OS !== 'web'}
          onResponderRelease={closeMenu}
        >
          <Animated.View
            style={[
              styles.drawer,
              {
                backgroundColor: theme.values.cardBackgroundColor || theme.values.backgroundColor,
                transform: [{ translateX: slideAnim }],
              },
            ]}
            onStartShouldSetResponder={() => true}
            onResponderTerminationRequest={() => false}
            accessibilityRole="menu"
            accessibilityLabel="Navigation menu"
            {...(Platform.OS === 'web' && { 'data-drawer': true } as any)}
          >
            {/* Drawer Header */}
            <View style={[styles.drawerHeader, { borderBottomColor: theme.values.borderColor }]}>
              <Logo logoUri={logoUri} />
              <Pressable 
                onPress={closeMenu} 
                style={styles.closeButton}
                accessibilityLabel="Close menu"
                accessibilityRole="button"
                accessibilityHint="Closes the navigation menu"
              >
                <Feather name="x" size={24} color={theme.values.color} />
              </Pressable>
            </View>

            {/* Navigation Links */}
            <View style={styles.drawerContent}>
              {navigationItems.map((item, index) => {
                // Extract route name from full path (e.g., '/(tabs)/home' -> 'home')
                const routeName = item.route.split('/').pop() || item.route;
                const isActive = currentRoute === routeName;
                // Use web icon for mobile web drawer (defaults to Feather)
                const iconConfig = item.icon.web || item.icon.mobile;
                const iconColor = isActive ? theme.values.highlightColor : theme.values.color;
                const renderedIcon = renderIcon(iconConfig, 'Feather', 22, iconColor);
                
                return (
                  <Pressable
                    key={index}
                    onPress={() => handleNavigate(item.route)}
                    style={[
                      styles.menuItem,
                      isActive && { backgroundColor: theme.values.highlightColor + '20' },
                    ]}
                    accessibilityRole="menuitem"
                    accessibilityLabel={`Navigate to ${item.title}`}
                    accessibilityState={{ selected: isActive }}
                  >
                    {renderedIcon}
                    <StyledText
                      fontSize="md"
                      style={{ marginLeft: 20 }}
                      color={iconColor}
                    >
                      {item.title}
                    </StyledText>
                  </Pressable>
                );
              })}

              {/* Theme Toggle */}
              <View style={styles.themeToggleContainer}>
                <StyledText fontSize="sm" muted style={{ marginBottom: 16 }}>
                  Appearance
                </StyledText>
                <Pressable
                  onPress={theme.toggleTheme}
                  style={[
                    styles.themeToggleButton,
                    { borderColor: theme.values.borderColor },
                  ]}
                  accessibilityRole="button"
                  accessibilityLabel={`Switch to ${theme.values.isDark ? 'light' : 'dark'} mode`}
                  accessibilityHint="Toggles between light and dark theme"
                >
                  <Feather
                    name={theme.values.isDark ? 'sun' : 'moon'}
                    size={20}
                    color={theme.values.color}
                  />
                  <StyledText fontSize="sm" style={{ marginLeft: 12 }}>
                    {theme.values.isDark ? 'Light Mode' : 'Dark Mode'}
                  </StyledText>
                </Pressable>
              </View>
            </View>
          </Animated.View>
        </View>
      </Modal>
    </>
  );
};

export default MobileMenuDrawer;

