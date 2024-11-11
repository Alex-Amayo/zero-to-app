import { StyleProp, ViewStyle } from 'react-native';
import type { NavigationState, Route, SceneRendererProps } from './types';
export type GetTabWidth = (index: number) => number;
export type Props<T extends Route> = SceneRendererProps & {
    navigationState: NavigationState<T>;
    width: string | number;
    style?: StyleProp<ViewStyle>;
    getTabWidth: GetTabWidth;
    gap?: number;
};
export declare function TabBarIndicator<T extends Route>({ getTabWidth, layout, navigationState, position, width, gap, style, }: Props<T>): JSX.Element;
//# sourceMappingURL=TabBarIndicator.d.ts.map