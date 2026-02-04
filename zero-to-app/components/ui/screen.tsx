// 1. IMPORTS
import React from 'react';
import { ScrollView, StyleSheet, type StyleProp, type ViewStyle, Platform, View } from 'react-native';
import { Screen as RNScreen } from 'react-native-screens';
import { SafeAreaView, type Edge } from 'react-native-safe-area-context';
import { ThemedView, type ThemedViewVariant } from './themed-view';
import { useLayout } from '../../context/layout-context';

// 2. TYPES

/**
 * Props for the Screen component
 *
 * @example
 * ```tsx
 * // Basic screen with safe areas
 * <Screen>
 *   <Typography>Hello World</Typography>
 * </Screen>
 * ```
 *
 * @example
 * ```tsx
 * // Scrollable screen
 * <Screen scrollable>
 *   <Typography>Long content...</Typography>
 *   <Typography>More content...</Typography>
 * </Screen>
 * ```
 */
export interface ScreenProps {
  /** Screen content */
  children: React.ReactNode;
  /** Whether to wrap content in ScrollView. @default false */
  scrollable?: boolean;
  /** Themed background variant. @default 'background' */
  variant?: ThemedViewVariant;
  /** Which safe area edges to respect. @default ['top', 'bottom'] */
  edges?: Edge[];
  /** Styles for the ScrollView content container (only applies if scrollable=true) */
  contentContainerStyle?: StyleProp<ViewStyle>;
  /** Styles for the outer container */
  style?: StyleProp<ViewStyle>;
  /** Test ID for testing */
  testID?: string;
  /** Whether to show vertical scroll indicator. @default true */
  showsVerticalScrollIndicator?: boolean;
  /** 
   * Whether to center content horizontally and apply a max-width.
   * Useful for home screens or landing pages on web.
   * @default false
   */
  centered?: boolean;
}

// 3. COMPONENT

/**
 * Screen component with react-native-screens for truly native screen behavior
 *
 * Provides consistent screen layout with:
 * - Native screen container from react-native-screens
 * - SafeAreaView for mobile safe areas (notches, status bars, etc.)
 * - Themed background via ThemedView
 * - Optional scrollable content via ScrollView
 *
 * @example
 * ```tsx
 * // Non-scrollable screen
 * <Screen variant="background">
 *   <Typography variant="headlineLarge">Welcome</Typography>
 *   <Button title="Get Started" />
 * </Screen>
 * ```
 *
 * @example
 * ```tsx
 * // Scrollable screen with custom content padding
 * <Screen
 *   scrollable
 *   variant="surface"
 *   contentContainerStyle={{ padding: 24, gap: 16 }}
 * >
 *   <Typography>Content 1</Typography>
 *   <Typography>Content 2</Typography>
 *   <Typography>Content 3</Typography>
 * </Screen>
 * ```
 *
 * @example
 * ```tsx
 * // Screen respecting only top safe area
 * <Screen edges={['top']}>
 *   <Typography>Content</Typography>
 * </Screen>
 * ```
 */
export const Screen: React.FC<ScreenProps> = ({
  children,
  scrollable = false,
  variant = 'background',
  edges = ['top', 'bottom'],
  contentContainerStyle,
  style,
  testID,
  showsVerticalScrollIndicator = true,
  centered = false,
}) => {
  const { appBarHeight } = useLayout();

  const content = (
    <View style={[
      styles.content,
      centered && styles.centeredContent,
      style
    ]}>
      {children}
    </View>
  );

  return (
    <RNScreen style={styles.screen}>
      <SafeAreaView 
        style={[
          styles.safeArea, 
          Platform.OS === 'web' && { marginTop: appBarHeight }
        ]} 
        edges={edges} 
        testID={testID}
      >
        <ThemedView variant={variant} style={styles.container}>
          {scrollable ? (
            <ScrollView
              style={styles.scrollView}
              contentContainerStyle={[
                contentContainerStyle,
                centered && styles.centeredContentContainer
              ]}
              showsVerticalScrollIndicator={showsVerticalScrollIndicator}
            >
              {content}
            </ScrollView>
          ) : (
            content
          )}
        </ThemedView>
      </SafeAreaView>
    </RNScreen>
  );
};

Screen.displayName = 'Screen';

// 4. STYLES
const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  centeredContent: {
    width: '100%',
    maxWidth: 1200,
    alignSelf: 'center',
  },
  centeredContentContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  scrollView: {
    flex: 1,
  },
});
