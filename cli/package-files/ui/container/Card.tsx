import React, { useContext, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { useBrand } from '../../brand';
import { ThemeContext } from '../../theme';

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
  const brand = useBrand();
  
  const styles = useMemo(() => StyleSheet.create({
    container: {
      maxWidth: 1000,
      borderRadius: brand.borderRadius,
      padding: 15,
    },
  }), [brand]);
  
  return (
    <View
      style={{
        // Configure background and border color with theme
        backgroundColor: theme.values.cardBackgroundColor,
        ...(!theme.values.isDark && {
          borderColor: theme.values.borderColor,
          borderWidth: 1,
        }),
        ...styles.container,
      }}>
      {children}
    </View>
  );
};

export { Card };
