// 1. IMPORTS
import React from 'react';
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import { Typography } from './typography';
import { useTheme } from '../../theme';
import { useBrand } from '../../brand';

// 2. TYPES

/**
 * Props for the SidebarFooter component
 *
 * @example
 * ```tsx
 * <SidebarFooter>
 *   <Text>© 2024 My App</Text>
 * </SidebarFooter>
 * ```
 */
export interface SidebarFooterProps {
  /** Footer content */
  children: React.ReactNode;
  /** Custom styles */
  style?: StyleProp<ViewStyle>;
  /** Test ID for testing */
  testID?: string;
}

// 3. COMPONENT

/**
 * Footer component for sidebar with custom content
 *
 * @example
 * ```tsx
 * <SidebarFooter>
 *   <Typography variant="labelSmall" muted>
 *     © 2024 My Company
 *   </Typography>
 *   <Typography variant="labelSmall" muted>
 *     v1.0.0
 *   </Typography>
 * </SidebarFooter>
 * ```
 */
export const SidebarFooter: React.FC<SidebarFooterProps> = ({
  children,
  style,
  testID,
}) => {
  const { values: theme } = useTheme();
  const brand = useBrand();

  return (
    <View
      style={[
        styles.container,
        {
          padding: brand.spacing.lg,
          borderTopWidth: 1,
          borderTopColor: theme.tokens.sidebar.divider,
        },
        style,
      ]}
      testID={testID}
    >
      {children}
    </View>
  );
};

// 4. STYLES
const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
});
