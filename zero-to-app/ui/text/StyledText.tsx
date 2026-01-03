import React, { useContext, useMemo } from 'react';
import { StyleSheet, Text, TextStyle } from 'react-native';
import { useBrand } from '../../brand';
import { ThemeContext } from '../../theme';

type StyledTextProps = {
  children: React.ReactNode;
  fontSize?: 'sm' | 'md' | 'lg' | 'xl' | number;
  align?: 'left' | 'center' | 'right';
  color?: string;
  bold?: boolean;
  uppercase?: boolean;
  numberOfLines?: number; // Prop for limiting lines
  muted?: boolean;
  fontWeight?: number;
  style?: TextStyle;
};

export const StyledText = ({
  children,
  fontSize = 'md',
  align = 'left',
  color,
  bold = false,
  numberOfLines,
  uppercase = false,
  muted = false,
  fontWeight,
  style,
}: StyledTextProps): React.ReactNode => {
  const theme = useContext(ThemeContext);
  const brand = useBrand();

  const styles = useMemo(() => StyleSheet.create({
    sm: { fontSize: brand.fontSizes.small },
    md: { fontSize: brand.fontSizes.medium },
    lg: { fontSize: brand.fontSizes.large },
    xl: { fontSize: brand.fontSizes.xlarge },
  }), [brand]);

  const textStyle: TextStyle = {
    fontSize: typeof fontSize === 'number' ? fontSize : styles[fontSize].fontSize,
    textAlign: align,
    color: muted ? 'gray' : color || theme.values.color,
    fontWeight: fontWeight ? (fontWeight as TextStyle['fontWeight']) : bold ? '700' : 'normal',
    letterSpacing: 1,
    ...style, // Merge custom style if provided
  };
  return (
    <Text style={textStyle} numberOfLines={numberOfLines}>
      {uppercase ? children?.toString().toUpperCase() : children}
    </Text>
  );
};
