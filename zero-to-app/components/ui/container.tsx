import React from 'react';
import { StyleSheet, type StyleProp, type ViewStyle } from 'react-native';
import { ThemedView } from './themed-view';
import { useTheme } from '../../theme';

export interface ContainerProps {
  /** Content to render within the container */
  children: React.ReactNode;
  /** Maximum width in pixels. @default 1000 */
  maxWidth?: number;
  /** Additional styles to apply */
  style?: StyleProp<ViewStyle>;
  /** Test ID for testing */
  testID?: string;
}

/**
 * Container component that constrains content width for better readability on large screens.
 * Centers content horizontally and applies consistent padding.
 *
 * Common for web layouts, marketing pages, and content-heavy screens.
 *
 * @example
 * ```tsx
 * <Screen scrollable>
 *   <Container>
 *     <Typography>Constrained content</Typography>
 *   </Container>
 * </Screen>
 * ```
 *
 * @example
 * ```tsx
 * // Custom max-width
 * <Container maxWidth={800}>
 *   <Typography>Narrower content</Typography>
 * </Container>
 * ```
 */
export const Container: React.FC<ContainerProps> = ({
  children,
  maxWidth = 1000,
  style,
  testID,
}) => {
  const theme = useTheme();

  return (
    <ThemedView
      testID={testID}
      style={[
        styles.container,
        {
          maxWidth,
          paddingHorizontal: theme.spacing.xl,
        },
        style,
      ]}
    >
      {children}
    </ThemedView>
  );
};

Container.displayName = 'Container';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignSelf: 'center',
  },
});
