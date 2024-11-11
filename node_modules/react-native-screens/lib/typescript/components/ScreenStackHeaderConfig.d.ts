import React from 'react';
import { HeaderSubviewTypes, ScreenStackHeaderConfigProps, SearchBarProps } from 'react-native-screens';
import { ImageProps, ViewProps } from 'react-native';
export declare const ScreenStackHeaderConfig: React.ComponentType<ScreenStackHeaderConfigProps>;
export declare const ScreenStackHeaderSubview: React.ComponentType<React.PropsWithChildren<ViewProps & {
    type?: HeaderSubviewTypes;
}>>;
export declare const ScreenStackHeaderBackButtonImage: (props: ImageProps) => JSX.Element;
export declare const ScreenStackHeaderRightView: (props: React.PropsWithChildren<ViewProps>) => JSX.Element;
export declare const ScreenStackHeaderLeftView: (props: React.PropsWithChildren<ViewProps>) => JSX.Element;
export declare const ScreenStackHeaderCenterView: (props: React.PropsWithChildren<ViewProps>) => JSX.Element;
export declare const ScreenStackHeaderSearchBarView: (props: React.PropsWithChildren<SearchBarProps>) => JSX.Element;
//# sourceMappingURL=ScreenStackHeaderConfig.d.ts.map