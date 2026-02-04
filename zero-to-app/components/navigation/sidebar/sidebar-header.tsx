// 1. IMPORTS
import React from 'react';
import { StyleSheet, View, type StyleProp, type ViewStyle, type ImageSourcePropType, Image } from 'react-native';
import { Typography } from '../../ui/typography';
import { useTheme } from '../../../theme';
import { useBrand } from '../../../brand';

// 2. TYPES

/**
 * Props for the SidebarHeader component
 *
 * @example
 * ```tsx
 * <SidebarHeader
 *   title="My App"
 *   subtitle="v1.0.0"
 * />
 * ```
 */
export interface SidebarHeaderProps {
  /** Header title text */
  title?: string;
  /** Optional subtitle text */
  subtitle?: string;
  /** Optional logo image source */
  logo?: ImageSourcePropType;
  /** Custom styles */
  style?: StyleProp<ViewStyle>;
  /** Custom content (overrides title/subtitle/logo) */
  children?: React.ReactNode;
  /** Test ID for testing */
  testID?: string;
}

// 3. COMPONENT

/**
 * Header component for sidebar with optional logo, title, and subtitle
 *
 * @example
 * ```tsx
 * <SidebarHeader
 *   logo={require('./logo.png')}
 *   title="My App"
 *   subtitle="Dashboard"
 * />
 * ```
 *
 * @example
 * ```tsx
 * // Custom content
 * <SidebarHeader>
 *   <View>
 *     <Text>Custom Header</Text>
 *   </View>
 * </SidebarHeader>
 * ```
 */
export const SidebarHeader: React.FC<SidebarHeaderProps> = ({
  title,
  subtitle,
  logo,
  style,
  children,
  testID,
}) => {
  const { values: theme } = useTheme();
  const brand = useBrand();

  // If custom children provided, use them
  if (children) {
    return (
      <View
        style={[
          styles.container,
          {
            padding: brand.spacing.lg,
            borderBottomWidth: 1,
            borderBottomColor: theme.tokens.sidebar.divider,
          },
          style,
        ]}
        testID={testID}
      >
        {children}
      </View>
    );
  }

  // Default header with logo, title, subtitle
  return (
    <View
      style={[
        styles.container,
        {
          padding: brand.spacing.lg,
          gap: brand.spacing.sm,
          borderBottomWidth: 1,
          borderBottomColor: theme.tokens.sidebar.divider,
        },
        style,
      ]}
      testID={testID}
    >
      {logo && (
        <Image
          source={logo}
          style={styles.logo}
          resizeMode="contain"
        />
      )}

      {title && (
        <Typography
          variant="titleMedium"
          weight="bold"
          color={theme.onSurface}
          numberOfLines={1}
        >
          {title}
        </Typography>
      )}

      {subtitle && (
        <Typography
          variant="bodySmall"
          color={theme.onSurfaceVariant}
          numberOfLines={1}
        >
          {subtitle}
        </Typography>
      )}
    </View>
  );
};

// 4. STYLES
const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  logo: {
    width: 40,
    height: 40,
  },
});
