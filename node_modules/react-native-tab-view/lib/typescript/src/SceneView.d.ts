import * as React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import type { EventEmitterProps, NavigationState, Route, SceneRendererProps } from './types';
type Props<T extends Route> = SceneRendererProps & EventEmitterProps & {
    navigationState: NavigationState<T>;
    lazy: boolean;
    lazyPreloadDistance: number;
    index: number;
    children: (props: {
        loading: boolean;
    }) => React.ReactNode;
    style?: StyleProp<ViewStyle>;
};
export declare function SceneView<T extends Route>({ children, navigationState, lazy, layout, index, lazyPreloadDistance, addEnterListener, style, }: Props<T>): JSX.Element;
export {};
//# sourceMappingURL=SceneView.d.ts.map