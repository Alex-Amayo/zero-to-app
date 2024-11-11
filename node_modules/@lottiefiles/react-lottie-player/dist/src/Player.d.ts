import { AnimationItem } from 'lottie-web';
import * as React from 'react';
/**
 * Parse a resource into a JSON object or a URL string
 */
export declare function parseSrc(src: string | object): string | object;
declare global {
    interface Window {
        lottie: any;
    }
}
export declare enum PlayerState {
    Loading = "loading",
    Playing = "playing",
    Paused = "paused",
    Stopped = "stopped",
    Frozen = "frozen",
    Error = "error"
}
export declare enum PlayerEvent {
    Load = "load",
    InstanceSaved = "instanceSaved",
    Error = "error",
    Ready = "ready",
    Play = "play",
    Pause = "pause",
    Stop = "stop",
    Freeze = "freeze",
    Loop = "loop",
    Complete = "complete",
    Frame = "frame"
}
export declare type Versions = {
    lottieWebVersion: string;
    lottiePlayerVersion: string;
};
export declare type PlayerDirection = -1 | 1;
export interface IPlayerProps {
    id?: string;
    lottieRef?: (ref: AnimationItem) => void;
    onEvent?: (event: PlayerEvent) => any;
    onStateChange?: (state: PlayerState) => any;
    onBackgroundChange?: (color: string) => void;
    autoplay?: boolean;
    background?: string;
    children?: React.ReactNode | React.ReactNode[];
    controls?: boolean;
    direction?: PlayerDirection;
    hover?: boolean;
    loop?: boolean | number;
    renderer?: any;
    speed?: number;
    src: object | string;
    style?: React.CSSProperties;
    rendererSettings?: object;
    keepLastFrame?: boolean;
    className?: string;
}
interface IPlayerState {
    animationData: any;
    background: string;
    containerRef: React.Ref<HTMLDivElement> | null;
    debug?: boolean;
    instance: AnimationItem | null;
    seeker: number;
    playerState: PlayerState;
}
export declare class Player extends React.Component<IPlayerProps, IPlayerState> {
    static getDerivedStateFromProps(nextProps: any, prevState: any): Promise<{
        background: any;
    } | null>;
    container: Element | null;
    unmounted: boolean;
    constructor(props: IPlayerProps);
    /**
     * Returns the lottie-web version and this player's version
     */
    getVersions(): Versions;
    static defaultProps: {
        loop: boolean;
    };
    componentDidMount(): Promise<void>;
    componentWillUnmount(): void;
    componentDidUpdate(prevProps: any): Promise<void>;
    handleBgChange: (childData: any) => void;
    triggerDownload: (dataUri: any, filename: any) => void;
    snapshot: (download?: boolean) => string | undefined;
    render(): JSX.Element;
    private toggleDebug;
    private createLottie;
    play(): void;
    pause(): void;
    stop(): void;
    setPlayerSpeed(speed: number): void;
    setPlayerDirection(direction: PlayerDirection): void;
    setSeeker(seek: number, play?: boolean): void;
    setLoop(loop: boolean): void;
    private triggerEvent;
}
export {};
