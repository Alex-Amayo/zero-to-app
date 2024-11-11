import React from 'react';
import { View } from 'react-native';
import { ScreenProps } from 'react-native-screens';
export declare const NativeScreen: React.ComponentType<ScreenProps>;
export declare class InnerScreen extends React.Component<ScreenProps> {
    private ref;
    private closing;
    private progress;
    private goingForward;
    setNativeProps(props: ScreenProps): void;
    setRef: (ref: React.ElementRef<typeof View> | null) => void;
    render(): React.JSX.Element;
}
export declare const ScreenContext: React.Context<typeof InnerScreen>;
declare class Screen extends React.Component<ScreenProps> {
    static contextType: React.Context<typeof InnerScreen>;
    render(): React.JSX.Element;
}
export default Screen;
//# sourceMappingURL=Screen.d.ts.map