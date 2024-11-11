import * as React from 'react';
import { PressableProps } from 'react-native';
export type Props = PressableProps & {
    pressColor?: string;
    pressOpacity?: number;
    children: React.ReactNode;
};
/**
 * PlatformPressable provides an abstraction on top of TouchableNativeFeedback and
 * TouchableOpacity to handle platform differences.
 *
 * On Android, you can pass the props of TouchableNativeFeedback.
 * On other platforms, you can pass the props of TouchableOpacity.
 */
export declare function PlatformPressable({ android_ripple, pressColor, pressOpacity, style, ...rest }: Props): JSX.Element;
//# sourceMappingURL=PlatformPressable.d.ts.map