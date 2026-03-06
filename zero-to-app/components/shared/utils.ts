import { Platform, type GestureResponderEvent } from 'react-native';

/**
 * Blurs the pressed element on web after interaction.
 *
 * Prevents the focus ring from lingering after mouse/pointer clicks.
 * Keyboard-triggered focus is unaffected — the ring only clears when
 * `onPress` fires (i.e. after a click or Enter key), so tabbing to the
 * element still shows the ring as expected.
 *
 * Apply inside every interactive component's `onPress` handler on web:
 * ```tsx
 * onPress={(e) => {
 *   blurOnWeb(e);
 *   onPress?.(e);
 * }}
 * ```
 */
export const blurOnWeb = (e: GestureResponderEvent): void => {
  if (Platform.OS === 'web') {
    (e.currentTarget as any)?.blur?.();
  }
};
