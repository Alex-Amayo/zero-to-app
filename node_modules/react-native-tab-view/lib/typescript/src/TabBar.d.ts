import * as React from 'react';
import { PressableAndroidRippleConfig, StyleProp, TextStyle, ViewStyle } from 'react-native';
import { Props as IndicatorProps } from './TabBarIndicator';
import { Props as TabBarItemProps } from './TabBarItem';
import type { Event, NavigationState, Route, Scene, SceneRendererProps } from './types';
export type Props<T extends Route> = SceneRendererProps & {
    navigationState: NavigationState<T>;
    scrollEnabled?: boolean;
    bounces?: boolean;
    activeColor?: string;
    inactiveColor?: string;
    pressColor?: string;
    pressOpacity?: number;
    getLabelText?: (scene: Scene<T>) => string | undefined;
    getAccessible?: (scene: Scene<T>) => boolean | undefined;
    getAccessibilityLabel?: (scene: Scene<T>) => string | undefined;
    getTestID?: (scene: Scene<T>) => string | undefined;
    renderLabel?: (scene: Scene<T> & {
        focused: boolean;
        color: string;
    }) => React.ReactNode;
    renderIcon?: (scene: Scene<T> & {
        focused: boolean;
        color: string;
    }) => React.ReactNode;
    renderBadge?: (scene: Scene<T>) => React.ReactNode;
    renderIndicator?: (props: IndicatorProps<T>) => React.ReactNode;
    renderTabBarItem?: (props: TabBarItemProps<T> & {
        key: string;
    }) => React.ReactElement;
    onTabPress?: (scene: Scene<T> & Event) => void;
    onTabLongPress?: (scene: Scene<T>) => void;
    tabStyle?: StyleProp<ViewStyle>;
    indicatorStyle?: StyleProp<ViewStyle>;
    indicatorContainerStyle?: StyleProp<ViewStyle>;
    labelStyle?: StyleProp<TextStyle>;
    contentContainerStyle?: StyleProp<ViewStyle>;
    style?: StyleProp<ViewStyle>;
    gap?: number;
    testID?: string;
    android_ripple?: PressableAndroidRippleConfig;
};
export declare function TabBar<T extends Route>({ getLabelText, getAccessible, getAccessibilityLabel, getTestID, renderIndicator, gap, scrollEnabled, jumpTo, navigationState, position, activeColor, bounces, contentContainerStyle, inactiveColor, indicatorContainerStyle, indicatorStyle, labelStyle, onTabLongPress, onTabPress, pressColor, pressOpacity, renderBadge, renderIcon, renderLabel, renderTabBarItem, style, tabStyle, testID, android_ripple, }: Props<T>): JSX.Element;
//# sourceMappingURL=TabBar.d.ts.map