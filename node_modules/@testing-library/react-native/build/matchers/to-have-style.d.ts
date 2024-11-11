import type { ReactTestInstance } from 'react-test-renderer';
import { ImageStyle, StyleProp, TextStyle, ViewStyle } from 'react-native';
export type Style = ViewStyle | TextStyle | ImageStyle;
export declare function toHaveStyle(this: jest.MatcherContext, element: ReactTestInstance, style: StyleProp<Style>): {
    pass: boolean;
    message: () => string;
};
