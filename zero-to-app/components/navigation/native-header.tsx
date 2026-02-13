import React from 'react';
import { Stack } from 'expo-router';
import { useTheme } from '../../theme';

export interface NativeHeaderProps {
  /** SF Symbol name for the right toolbar button */
  rightIcon?: string;
  /** Press handler for the right toolbar button */
  onRightPress?: () => void;
  /** SF Symbol name for the left toolbar button */
  leftIcon?: string;
  /** Press handler for the left toolbar button */
  onLeftPress?: () => void;
}

/**
 * Screen-level native header toolbar for iOS.
 * Renders SF Symbol buttons in the Stack header via Stack.Toolbar.
 * Use inside screen components, not layouts.
 */
export const NativeHeader = ({
  rightIcon,
  onRightPress,
  leftIcon,
  onLeftPress,
}: NativeHeaderProps) => {
  const theme = useTheme();

  return (
    <>
      {rightIcon && (
        <Stack.Toolbar placement="right">
          <Stack.Toolbar.Button
            icon={rightIcon as any}
            onPress={onRightPress}

          />
        </Stack.Toolbar>
      )}
      {leftIcon && (
        <Stack.Toolbar placement="left">
          <Stack.Toolbar.Button
            icon={leftIcon as any}
            onPress={onLeftPress}
            tintColor={theme.onSurface}
          />
        </Stack.Toolbar>
      )}
    </>
  );
};

NativeHeader.displayName = 'NativeHeader';
