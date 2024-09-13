import React, { useContext } from 'react';
import {
  Text,
  StyleSheet,
  TextStyle,
} from 'react-native';
import brand from '../brand/brandConfig';
import { ThemeContext } from '../theme/theme';

type StyledTextProps = {
  children: string | React.ReactNode; // Text content to be displayed
  sm?: boolean; // Applies small text size if true
  md?: boolean; // Applies medium text size (base size) if true
  lg?: boolean; // Applies large text size if true
  xl?: boolean; // Applies extra-large text size if true
  left?: boolean; // Align text to the left
  center?: boolean; // Center align text
  right?: boolean; // Align text to the right
  color?: string; // Custom color for text
  bold?: boolean; // Applies bold text styling if true
};

/**
 * A component to display styled text with different sizes, alignment, and optional custom color and boldness.
 *
 * @param {React.ReactNode} children - The text or node to be displayed by the component.
 * @param {boolean} sm - If true, applies small text size.
 * @param {boolean} md - If true, applies medium text size (base size).
 * @param {boolean} lg - If true, applies large text size.
 * @param {boolean} xl - If true, applies extra-large text size.
 * @param {boolean} left - If true, aligns text to the left.
 * @param {boolean} center - If true, centers the text.
 * @param {boolean} right - If true, aligns text to the right.
 * @param {string} color - Optional custom color for the text.
 * @param {boolean} bold - If true, applies bold text styling.
 *
 * @returns { JSX.Element } - Returns rendered styled text.
 */
export const StyledText = ({ children, sm, md, lg, xl, left, center, right, color, bold }: StyledTextProps): JSX.Element => {

  // Initialize theme
  const theme = useContext(ThemeContext);

  // Determine the appropriate style based on props
  let textStyle: TextStyle = styles.base; // Start with base style

  // Apply text size
  if (sm) {
    textStyle = { ...textStyle, ...styles.sm };
  }
  if (md) {
    textStyle = { ...textStyle, ...styles.md };
  }
  if (lg) {
    textStyle = { ...textStyle, ...styles.lg };
  }
  if (xl) {
    textStyle = { ...textStyle, ...styles.xl };
  }

  // Apply text alignment
  if (left) {
    textStyle = { ...textStyle, ...styles.left };
  }
  if (center) {
    textStyle = { ...textStyle, ...styles.center };
  }
  if (right) {
    textStyle = { ...textStyle, ...styles.right };
  }

  // Apply color from props or theme
  textStyle = { ...textStyle, color: color || theme.values.color };

  // Apply bold text styling if prop is true
  if (bold) {
    textStyle = { ...textStyle, ...styles.bold };
  }

  return (
    <Text style={textStyle}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  base: {
    fontSize: brand.fontSizes.medium 
  },
  sm: { fontSize: brand.fontSizes.small },
  md: { fontSize: brand.fontSizes.medium },
  lg: { fontSize: brand.fontSizes.large },
  xl: { fontSize: brand.fontSizes.xlarge },
  left: { textAlign: 'left' },
  center: { textAlign: 'center' },
  right: { textAlign: 'right' },
  bold: { fontWeight: '700' },
});
