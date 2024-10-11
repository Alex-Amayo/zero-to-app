import React, { useContext } from 'react';
import { StyleSheet, Text, TextStyle } from 'react-native';
import brand from '../brand/brandConfig';
import { ThemeContext } from '../theme/theme';

type StyledTextProps = {
  children: React.ReactNode; // Text content or nested components
  fontSize?: 'sm' | 'md' | 'lg' | 'xl' | number; // Font size: 'sm', 'md', 'lg', 'xl', or a number
  align?: 'left' | 'center' | 'right'; // Text alignment
  color?: string; // Custom color for the text
  bold?: boolean; // Bold text style if true
};

/**
 * A component to display customizable text with adjustable size, alignment, color, and boldness.
 */
export const StyledText = ({
  children,
  fontSize = 'md', // Default font size
  align = 'left', // Default alignment
  color,
  bold = false,
}: StyledTextProps): JSX.Element => {
  // Get theme context for default color
  const theme = useContext(ThemeContext);

  // Determine text style based on props
  const textStyle: TextStyle = {
    fontSize: typeof fontSize === 'number' ? fontSize : styles[fontSize].fontSize, // Custom size or predefined
    textAlign: align, // Alignment from prop
    color: color || theme.values.color, // Custom color or default from theme
    fontWeight: bold ? 500 : 'normal', // Bold if true
  };

  return <Text style={textStyle}>{children}</Text>;
};

// Predefined font size styles
const styles = StyleSheet.create({
  sm: { fontSize: brand.fontSizes.small },
  md: { fontSize: brand.fontSizes.medium },
  lg: { fontSize: brand.fontSizes.large },
  xl: { fontSize: brand.fontSizes.xlarge },
});
