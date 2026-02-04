// 1. IMPORTS
import React from 'react';
import { StyleSheet, View, type StyleProp, type ViewStyle, type ImageSourcePropType, Image } from 'react-native';
import { Typography } from '../../ui/typography';
import { useThemeContext } from '../../../theme';

// 2. TYPES

/**
 * Props for the SidebarHeader component
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
 */
export const SidebarHeader: React.FC<SidebarHeaderProps> = ({
  title,
  subtitle,
  logo,
  style,
  children,
  testID,
}) => {
  const { values: theme } = useThemeContext();
  const spacing = theme.spacing;

  if (children) {
    return (
      <View
        style={[
          styles.container,
          {
            padding: spacing.lg,
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

  return (
    <View
      style={[
        styles.container,
        {
          padding: spacing.lg,
          gap: spacing.sm,
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
