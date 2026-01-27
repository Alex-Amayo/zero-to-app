import React from 'react';
import { View, type ViewProps } from 'react-native';
import { useTheme } from '../../theme';

export type ThemedViewVariant = 'surface' | 'surfaceContainer' | 'card' | 'appbar' | 'primary' | 'background';

export interface ThemedViewProps extends ViewProps {
  /** Variant selects a semantic background from the theme */
  variant?: ThemedViewVariant;
  /** Override with a specific color */
  color?: string;
}

export const ThemedView = ({ variant = 'surface', color, style, children, ...rest }: ThemedViewProps) => {
  const { values: theme } = useTheme();

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

  return (
    <View style={[{ backgroundColor }, style]} {...rest}>
      {children}
    </View>
  );
};

ThemedView.displayName = 'ThemedView';

export default ThemedView;
