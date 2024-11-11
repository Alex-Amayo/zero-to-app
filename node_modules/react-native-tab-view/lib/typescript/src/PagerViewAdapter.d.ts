import * as React from 'react';
import { Animated } from 'react-native';
import type { EventEmitterProps, NavigationState, PagerProps, Route } from './types';
type Props<T extends Route> = PagerProps & {
    onIndexChange: (index: number) => void;
    navigationState: NavigationState<T>;
    children: (props: EventEmitterProps & {
        position: Animated.AnimatedInterpolation<number>;
        render: (children: React.ReactNode) => React.ReactNode;
        jumpTo: (key: string) => void;
    }) => React.ReactElement;
};
export declare function PagerViewAdapter<T extends Route>({ keyboardDismissMode, swipeEnabled, navigationState, onIndexChange, onSwipeStart, onSwipeEnd, children, style, animationEnabled, ...rest }: Props<T>): React.ReactElement<any, string | React.JSXElementConstructor<any>>;
export {};
//# sourceMappingURL=PagerViewAdapter.d.ts.map