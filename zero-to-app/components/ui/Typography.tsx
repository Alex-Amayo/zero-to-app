import React, { forwardRef, useMemo } from 'react';
import { StyleSheet, Text, TextStyle, type TextProps as RNTextProps } from 'react-native';
import { useTheme } from '../../theme';

// M3 Typography variants
export type TypographyVariant =
  | 'displayLarge'
  | 'displayMedium'
  | 'displaySmall'
  | 'headlineLarge'
  | 'headlineMedium'
  | 'headlineSmall'
  | 'titleLarge'
  | 'titleMedium'
  | 'titleSmall'
  | 'bodyLarge'
  | 'bodyMedium'
  | 'bodySmall'
  | 'labelLarge'
  | 'labelMedium'
  | 'labelSmall'
  // Legacy aliases for backwards compatibility
  | 'headline'
  | 'title'
  | 'body'
  | 'label'
  | 'caption';

export type TypographyWeight = 'light' | 'regular' | 'medium' | 'bold' | number;
export type TypographyAlign = 'left' | 'center' | 'right' | 'justify';

export interface TypographyProps extends Omit<RNTextProps, 'style'> {
  children: React.ReactNode;
  variant?: TypographyVariant;
  weight?: TypographyWeight;
  align?: TypographyAlign;
  color?: string;
  uppercase?: boolean;
  muted?: boolean;
  style?: TextStyle;
}

/**
 * Typography component following Material Design 3 type system
 * https://m3.material.io/styles/typography/type-scale-tokens
 */
export const Typography = forwardRef<Text, TypographyProps>(
  (
    {
      children,
      variant = 'bodyMedium',
      weight = 'regular',
      align = 'left',
      color,
      uppercase = false,
      muted = false,
      style,
      numberOfLines,
      ...rest
    },
    ref
  ) => {
    const { values: theme } = useTheme();

    const textStyle: TextStyle = useMemo(() => {
      const tokens = theme.tokens.typography;

      // Map legacy aliases to M3 variants (keep compatibility)
      const legacyMap: Record<string, keyof typeof tokens> = {
        headline: 'headlineLarge',
        title: 'titleLarge',
        body: 'bodyMedium',
        label: 'labelMedium',
        caption: 'labelSmall',
      };

      const resolvedVariant = (legacyMap as Record<string, string>)[variant] ?? variant;

      // Resolve font size from variant
      const fontSize = (tokens as any)[resolvedVariant] ?? tokens.bodyMedium;

      // Resolve font weight
      let fontWeight: TextStyle['fontWeight'];
      if (typeof weight === 'number') {
        fontWeight = weight as TextStyle['fontWeight'];
      } else {
        switch (weight) {
          case 'light':
            fontWeight = tokens.weightLight as TextStyle['fontWeight'];
            break;
          case 'medium':
            fontWeight = tokens.weightMedium as TextStyle['fontWeight'];
            break;
          case 'bold':
            fontWeight = tokens.weightBold as TextStyle['fontWeight'];
            break;
          case 'regular':
          default:
            fontWeight = tokens.weightRegular as TextStyle['fontWeight'];
            break;
        }
      }

      // Resolve color
      const textColor = muted
        ? theme.onSurfaceVariant
        : color ?? theme.onSurface;

      // Compute line height based on variant
      let lineHeight: number;
      if (variant.startsWith('display') || variant.startsWith('headline')) {
        lineHeight = fontSize * tokens.lineHeightTight;
      } else if (variant.startsWith('title')) {
        lineHeight = fontSize * tokens.lineHeightNormal;
      } else {
        lineHeight = fontSize * tokens.lineHeightNormal;
      }

      return {
        fontSize,
        fontWeight,
        lineHeight,
        textAlign: align,
        color: textColor,
        ...style,
      };
    }, [variant, weight, align, color, muted, theme, style]);

    const content = uppercase && typeof children === 'string'
      ? children.toUpperCase()
      : children;

    return (
      <Text ref={ref} style={textStyle} numberOfLines={numberOfLines} {...rest}>
        {content}
      </Text>
    );
  }
);

Typography.displayName = 'Typography';
