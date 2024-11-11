import * as React from 'react';
import { StyleProp, ViewProps, ViewStyle } from 'react-native';
type Props = {
    visible: boolean;
    children: React.ReactNode;
    enabled: boolean;
    freezeOnBlur?: boolean;
    style?: StyleProp<ViewStyle>;
};
export declare const MaybeScreenContainer: ({ enabled, ...rest }: ViewProps & {
    enabled: boolean;
    hasTwoStates: boolean;
    children: React.ReactNode;
}) => JSX.Element;
export declare function MaybeScreen({ visible, children, ...rest }: Props): JSX.Element;
export {};
//# sourceMappingURL=ScreenFallback.d.ts.map