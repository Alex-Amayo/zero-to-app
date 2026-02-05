import React from 'react';
import { View, type ViewProps, type ViewStyle } from 'react-native';
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

export const ThemedView = ({ variant = 'surface', color, rounded = true, columns, gap, style, children, ...rest }: ThemedViewProps) => {
  const theme = useTheme();
  const { width } = useDimensions();
  const isMid = width >= breakpoints.medium;

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
    const containerStyle: ViewStyle = {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap,
    };

    const responsiveChildren = React.Children.map(children, (child) => {
      if (React.isValidElement(child)) {
        const gapOffset = gap ? (gap * (columns - 1)) / columns : 0;
        // On medium+: use flexBasis to set column width, on small: full width
        const itemStyle = isMid
          ? {
              flexBasis: `calc(${100 / columns}% - ${gapOffset}px)`,
              flexGrow: 0,
              flexShrink: 0,
              maxWidth: `calc(${100 / columns}% - ${gapOffset}px)`,
            }
          : {
              width: '100%',
            };
        return React.cloneElement(child as React.ReactElement<any>, {
          style: [(child as React.ReactElement<any>).props.style, itemStyle],
        });
      }
      return child;
    });

    return (
      <View style={[viewStyle, containerStyle, style]} {...rest}>
        {responsiveChildren}
      </View>
    );
  }

  return (
    <View style={[viewStyle, style]} {...rest}>
      {children}
    </View>
  );
};

ThemedView.displayName = 'ThemedView';

export default ThemedView;
