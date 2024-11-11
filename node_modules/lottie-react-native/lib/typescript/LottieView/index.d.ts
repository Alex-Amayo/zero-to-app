import React from 'react';
import { ViewProps } from 'react-native';
import type { LottieViewProps } from '../types';
type Props = LottieViewProps & {
    containerProps?: ViewProps;
};
export declare class LottieView extends React.PureComponent<Props, {}> {
    static defaultProps: Props;
    private lottieAnimationViewRef;
    constructor(props: Props);
    play(startFrame?: number, endFrame?: number): void;
    reset(): void;
    pause(): void;
    resume(): void;
    private onAnimationFinish;
    private onAnimationFailure;
    private onAnimationLoaded;
    private captureRef;
    render(): React.ReactNode;
}
export {};
//# sourceMappingURL=index.d.ts.map