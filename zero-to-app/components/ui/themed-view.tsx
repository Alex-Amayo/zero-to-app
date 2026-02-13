import React, { useState } from 'react';
import { View, Platform, StyleSheet, type ViewProps, type ViewStyle, type LayoutChangeEvent } from 'react-native';
import { useTheme } from '../../theme';
import { useDimensions, breakpoints } from '../../hooks';

export type ThemedViewVariant = 'surface' | 'surfaceContainer' | 'card' | 'appbar' | 'primary' | 'background';

export interface ThemedViewProps extends ViewProps {
  /** Variant selects a semantic background from the theme */
  variant?: ThemedViewVariant;
  /** Override with a specific color */
  color?: string;
  /** Apply border radius from theme. @default true */
  rounded?: boolean;
  /** Number of columns on medium+ screens (1 column on small). Enables responsive grid layout. */
  columns?: number;
  /** Gap between items when columns is set */
  gap?: number;
}

export const ThemedView = ({ variant = 'surface', color, rounded = true, columns, gap, style, children, onLayout, ...rest }: ThemedViewProps) => {
  const theme = useTheme();
  const { width } = useDimensions();
  const isMid = width >= breakpoints.medium;
  const [containerWidth, setContainerWidth] = useState(0);

  const variantMap: Record<ThemedViewVariant, string> = {
    surface: theme.surface,
    surfaceContainer: // prefer semantic container token when available
      (theme as any).surfaceContainer ?? theme.surface,
    card: theme.tokens.card.background,
    appbar: theme.tokens.appbar.background,
    primary: theme.primary,
    background: theme.surface,
  };

  const backgroundColor = color ?? variantMap[variant] ?? theme.surface;

  const viewStyle: ViewStyle[] = [
    { backgroundColor },
    ...(rounded ? [{ borderRadius: theme.borderRadius }] : []),
  ];

  // Handle responsive grid layout
  if (columns && columns > 1) {
    // Resolve gap from prop, falling back to gap in style
    const flatStyle = style ? StyleSheet.flatten(style) : undefined;
    const effectiveGap = gap ?? (flatStyle as any)?.gap ?? 0;
    const gapOffset = effectiveGap * (columns - 1) / columns;

    const containerStyle: ViewStyle = {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: effectiveGap,
    };

    const handleLayout = (e: LayoutChangeEvent) => {
      setContainerWidth(e.nativeEvent.layout.width);
      onLayout?.(e);
    };

    const responsiveChildren = React.Children.map(children, (child) => {
      if (!React.isValidElement(child)) return child;

      let itemStyle: ViewStyle;

      if (!isMid) {
        // Small screens: single column
        itemStyle = { width: '100%' };
      } else if (Platform.OS === 'web') {
        // Web: use calc() for precise sizing
        itemStyle = {
          flexBasis: `calc(${100 / columns}% - ${gapOffset}px)` as any,
          flexGrow: 0,
          flexShrink: 0,
          maxWidth: `calc(${100 / columns}% - ${gapOffset}px)` as any,
        };
      } else if (containerWidth > 0) {
        // Native: use measured width for pixel-perfect sizing
        const itemWidth = (containerWidth - effectiveGap * (columns - 1)) / columns;
        itemStyle = { width: itemWidth, flexGrow: 0, flexShrink: 0 };
      } else {
        // Native fallback before layout measurement
        itemStyle = { flexBasis: `${Math.floor(100 / columns)}%`, flexShrink: 1 };
      }

      return React.cloneElement(child as React.ReactElement<any>, {
        style: [(child as React.ReactElement<any>).props.style, itemStyle],
      });
    });

    return (
      <View style={[viewStyle, containerStyle, style]} onLayout={handleLayout} {...rest}>
        {responsiveChildren}
      </View>
    );
  }

  return (
    <View style={[viewStyle, style]} onLayout={onLayout} {...rest}>
      {children}
    </View>
  );
};

ThemedView.displayName = 'ThemedView';

export default ThemedView;
