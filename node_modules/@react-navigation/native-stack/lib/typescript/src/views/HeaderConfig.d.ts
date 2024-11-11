import { Route } from '@react-navigation/native';
import type { NativeStackNavigationOptions } from '../types';
type Props = NativeStackNavigationOptions & {
    headerTopInsetEnabled: boolean;
    headerHeight: number;
    route: Route<string>;
    canGoBack: boolean;
};
export default function HeaderConfig({ headerBackImageSource, headerBackButtonMenuEnabled, headerBackTitle, headerBackTitleStyle, headerBackTitleVisible, headerBackVisible, headerShadowVisible, headerLargeStyle, headerLargeTitle, headerLargeTitleShadowVisible, headerLargeTitleStyle, headerBackground, headerLeft, headerRight, headerShown, headerStyle, headerBlurEffect, headerTintColor, headerTitle, headerTitleAlign, headerTitleStyle, headerTransparent, headerSearchBarOptions, headerTopInsetEnabled, route, title, canGoBack, }: Props): JSX.Element;
export {};
//# sourceMappingURL=HeaderConfig.d.ts.map