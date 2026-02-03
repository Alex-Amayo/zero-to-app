// 1. IMPORTS
import React from 'react';
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import { Typography } from './typography';
import { useTheme } from '../../theme';
import { useBrand } from '../../brand';

// 2. TYPES

/**
 * Props for the SidebarSection component
 *
 * @example
 * ```tsx
 * <SidebarSection title="Navigation">
 *   <SidebarItem label="Home" />
 *   <SidebarItem label="Settings" />
 * </SidebarSection>
 * ```
 */
export interface SidebarSectionProps {
  /** Optional section header title */
  title?: string;
  /** Section content (usually SidebarItem components) */
  children: React.ReactNode;
  /** Custom styles */
  style?: StyleProp<ViewStyle>;
  /** Test ID for testing */
  testID?: string;
}

// 3. COMPONENT

/**
 * Groups sidebar items with an optional section header
 *
 * @example
 * ```tsx
 * <SidebarSection title="Main">
 *   <SidebarItem icon={{ name: 'home' }} label="Home" />
 *   <SidebarItem icon={{ name: 'search' }} label="Search" />
 * </SidebarSection>
 *
 * <SidebarSection title="Settings">
 *   <SidebarItem icon={{ name: 'settings' }} label="Settings" />
 *   <SidebarItem icon={{ name: 'help-circle' }} label="Help" />
 * </SidebarSection>
 * ```
 */
export const SidebarSection: React.FC<SidebarSectionProps> = ({
  title,
  children,
  style,
  testID,
}) => {
  const { values: theme } = useTheme();
  const brand = useBrand();
  const tokens = theme.tokens.sidebar;

  return (
    <View
      style={[
        styles.container,
        {
          paddingVertical: brand.spacing.sm,
        },
        style,
      ]}
      testID={testID}
    >
      {title && (
        <View
          style={[
            styles.header,
            {
              paddingHorizontal: brand.spacing.md,
              paddingBottom: brand.spacing.xs,
            },
          ]}
        >
          <Typography
            variant="labelSmall"
            weight="medium"
            color={theme.onSurfaceVariant}
            uppercase
          >
            {title}
          </Typography>
        </View>
      )}

      <View style={[styles.itemsContainer, { gap: brand.spacing.xs }]}>
        {children}
      </View>

      {/* Divider after section */}
      <View
        style={[
          styles.divider,
          {
            backgroundColor: tokens.divider,
            marginTop: brand.spacing.sm,
          },
        ]}
      />
    </View>
  );
};

// 4. STYLES
const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  header: {
    justifyContent: 'center',
  },
  itemsContainer: {
    width: '100%',
  },
  divider: {
    width: '100%',
    height: 1,
  },
});
