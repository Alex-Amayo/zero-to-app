import React from 'react';
import { ScrollView, StyleSheet, type StyleProp, type ViewStyle, Platform } from 'react-native';
import { SafeAreaView, type Edge, useSafeAreaInsets } from 'react-native-safe-area-context';
import { ThemedView, type ThemedViewVariant } from './themed-view';
import { useTheme } from '../../theme';

export interface ScreenProps {
  /** Screen content */
  children: React.ReactNode;
  /** Whether to wrap content in ScrollView. @default false */
  scrollable?: boolean;
  /** Themed background variant. @default 'background' */
  variant?: ThemedViewVariant;
  /** Which safe area edges to respect. @default ['bottom'] */
  edges?: Edge[];
  /** Styles for the ScrollView content container (only applies if scrollable=true) */
  contentContainerStyle?: StyleProp<ViewStyle>;
  /** Styles for the outer container */
  style?: StyleProp<ViewStyle>;
  /** Test ID for testing */
  testID?: string;
  /** Whether to show vertical scroll indicator. @default true */
  showsVerticalScrollIndicator?: boolean;
}

/**
 * Screen component providing consistent layout with safe areas and optional scrolling.
 *
 * @example
 * ```tsx
 * <Screen scrollable>
 *   <Typography>Content</Typography>
 * </Screen>
 * ```
 */
export const Screen: React.FC<ScreenProps> = ({
  children,
  scrollable = false,
  variant = 'background',
  edges = ['bottom'],
  contentContainerStyle,
  style,
  testID,
  showsVerticalScrollIndicator = true,
}) => {
  const insets = useSafeAreaInsets();
  const theme = useTheme();

  const iosBottomPadding = Platform.OS === 'ios' && edges.includes('bottom') 
    ?  theme.spacing.xxl
    : 0;

  return (
    <ThemedView variant={variant} style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={edges} testID={testID}>
        {scrollable ? (
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={[
              styles.scrollContent,
              { paddingBottom: iosBottomPadding },
              contentContainerStyle,
            ]}
            showsVerticalScrollIndicator={showsVerticalScrollIndicator}
          >
            {children}
          </ScrollView>
        ) : (
          <ThemedView
            variant={variant}
            style={[
              styles.content,
              { paddingBottom: iosBottomPadding },
              style,
            ]}
          >
            {children}
          </ThemedView>
        )}
      </SafeAreaView>
    </ThemedView>
  );
};

Screen.displayName = 'Screen';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
  },
});
