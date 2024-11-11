import { ParamListBase, TabNavigationState } from '@react-navigation/native';
import { Animated, StyleProp, ViewStyle } from 'react-native';
import { EdgeInsets } from 'react-native-safe-area-context';
import type { BottomTabBarProps, BottomTabDescriptorMap } from '../types';
type Props = BottomTabBarProps & {
    style?: Animated.WithAnimatedValue<StyleProp<ViewStyle>>;
};
type Options = {
    state: TabNavigationState<ParamListBase>;
    descriptors: BottomTabDescriptorMap;
    layout: {
        height: number;
        width: number;
    };
    dimensions: {
        height: number;
        width: number;
    };
};
export declare const getTabBarHeight: ({ state, descriptors, dimensions, insets, style, ...rest }: Options & {
    insets: EdgeInsets;
    style: Animated.WithAnimatedValue<StyleProp<ViewStyle>> | undefined;
}) => number;
export default function BottomTabBar({ state, navigation, descriptors, insets, style, }: Props): JSX.Element;
export {};
//# sourceMappingURL=BottomTabBar.d.ts.map