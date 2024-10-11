import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import brand from '../brand/brandConfig';
import { ThemeContext } from '../theme/theme';

type CardProps = {
  children?: React.ReactNode | React.ReactNode[];
};

/**
 * Card component for displaying content within a styled container.
 * It utilizes theming for dynamic styling based on the current theme context.
 */

const Card = ({ children }: CardProps): React.JSX.Element => {
  // Initialize theme
  const theme = useContext(ThemeContext);
  return (
    <View
      style={{
        // Configure background and border color with theme
        backgroundColor: theme.values.cardBackgroundColor,
        borderColor: theme.values.borderColor,
        shadowColor: brand.shadows ? theme.values.shadowColor : undefined,
        ...styles.container,
      }}>
      {children}
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    minWidth: '100%',
    borderRadius: brand.borderRadius,
    borderWidth: 1,
    shadowOffset: brand.shadows ? { width: -2, height: 2 } : undefined,
    shadowOpacity: brand.shadows ? 0.3 : undefined,
    shadowRadius: brand.shadows ? 5 : undefined,
    elevation: brand.shadows ? 20 : undefined,
  },
});
