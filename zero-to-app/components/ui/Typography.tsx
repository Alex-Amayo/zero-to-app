import React, { forwardRef, useMemo } from 'react';
import { StyleSheet, Text, TextStyle, type TextProps as RNTextProps } from 'react-native';
import { useTheme } from '../../theme';

/**
 * Material Design 3 typography variants.
 *
 * **Display** (57-36px): Hero text, large promotional content
 * **Headline** (32-24px): Page titles, section headers
 * **Title** (22-14px): Card titles, list headers
 * **Body** (16-12px): Main content text
 * **Label** (14-11px): Buttons, captions, metadata
 *
 * Legacy aliases (`headline`, `title`, `body`, `label`, `caption`) are
 * supported for backwards compatibility but M3 variants are preferred.
 */
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

/**
 * Font weight options.
 * Can use semantic names or numeric values (100-900).
 */
export type TypographyWeight = 'light' | 'regular' | 'medium' | 'bold' | number;

/** Text alignment options */
export type TypographyAlign = 'left' | 'center' | 'right' | 'justify';

/**
 * Props for the Typography component.
 *
 * @example
 * ```tsx
 * // Basic usage with default body text
 * <Typography>Hello, world!</Typography>
 * ```
 *
 * @example
 * ```tsx
 * // Page title
 * <Typography variant="headlineLarge" weight="bold">
 *   Welcome Back
 * </Typography>
 * ```
 *
 * @example
 * ```tsx
 * // Card title with custom color
 * <Typography variant="titleMedium" color="#6750A4">
 *   Featured Article
 * </Typography>
 * ```
 *
 * @example
 * ```tsx
 * // Muted secondary text
 * <Typography variant="bodySmall" muted>
 *   Last updated 2 hours ago
 * </Typography>
 * ```
 *
 * @example
 * ```tsx
 * // Button label (uppercase)
 * <Typography variant="labelLarge" weight="medium" uppercase>
 *   Submit
 * </Typography>
 * ```
 *
 * @example
 * ```tsx
 * // Centered hero text
 * <Typography variant="displayMedium" align="center">
 *   Build Something Amazing
 * </Typography>
 * ```
 */
export interface TypographyProps extends Omit<RNTextProps, 'style'> {
  /** Text content to render */
  children: React.ReactNode;
  /**
   * Typography scale variant following M3 type system.
   * @default 'bodyMedium'
   */
  variant?: TypographyVariant;
  /**
   * Font weight. Use semantic names or numeric values.
   * @default 'regular'
   */
  weight?: TypographyWeight;
  /**
   * Text alignment.
   * @default 'left'
   */
  align?: TypographyAlign;
  /**
   * Custom text color. Defaults to theme's `onSurface` color.
   */
  color?: string;
  /**
   * Transform text to uppercase.
   * @default false
   */
  uppercase?: boolean;
  /**
   * Apply muted styling using theme's `onSurfaceVariant` color.
   * Useful for secondary or supporting text.
   * @default false
   */
  muted?: boolean;
  /** Additional text styles to merge */
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
