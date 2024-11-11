import * as React from 'react';
import { Animated } from 'react-native';
import type { EventEmitterProps, Layout, NavigationState, PagerProps, Route } from './types';
type Props<T extends Route> = PagerProps & {
    layout: Layout;
    onIndexChange: (index: number) => void;
    navigationState: NavigationState<T>;
    children: (props: EventEmitterProps & {
        position: Animated.AnimatedInterpolation<number>;
        render: (children: React.ReactNode) => React.ReactNode;
        jumpTo: (key: string) => void;
    }) => React.ReactElement;
};
export declare function PanResponderAdapter<T extends Route>({ layout, keyboardDismissMode, swipeEnabled, navigationState, onIndexChange, onSwipeStart, onSwipeEnd, children, style, animationEnabled, }: Props<T>): React.ReactElement<any, string | React.JSXElementConstructor<any>>;
export {};
//# sourceMappingURL=PanResponderAdapter.d.ts.map