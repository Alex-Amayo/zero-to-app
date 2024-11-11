import { DotLottieStatePlaybackSettings, LottieStateMachine, PlaybackOptions, ManifestAnimation, Manifest } from '@dotlottie/dotlottie-js';
import { Animation } from '@lottiefiles/lottie-types';
import { AnimationEventName, AnimationItem, SVGRendererConfig, CanvasRendererConfig, HTMLRendererConfig, RendererType, AnimationConfig, AnimationSegment } from 'lottie-web';
import { DotLottieAudio } from './dotlottie-audio.js';
import { Store } from './store.js';

/**
 * Copyright 2023 Design Barn Inc.
 */

declare const EVENT_MAP: {
    click: string;
    mouseenter: string;
    mouseleave: string;
    complete: string;
    after: string;
    enter: string;
    show: string;
};
type EventMap = typeof EVENT_MAP;
interface XStateTargetEvent {
    target: string;
}
interface XState {
    after: Record<number, XStateTargetEvent>;
    entry?: () => void;
    exit?: () => void;
    meta: DotLottieStatePlaybackSettings;
    on: Record<keyof EventMap, XStateTargetEvent>;
}
interface XStateMachine {
    id: string;
    initial: string;
    states: Record<string, XState>;
}

/**
 * Copyright 2023 Design Barn Inc.
 */

declare class DotLottieStateMachineManager {
    protected activeStateId: string;
    protected _service: any;
    protected _domListeners: Map<string, () => void>;
    protected _domElement: DotLottieElement | undefined;
    protected _playerListeners: Map<AnimationEventName, () => void>;
    protected _player: DotLottieCommonPlayer;
    protected _machineSchemas: Map<string, XStateMachine>;
    private _onShowPrevValue;
    constructor(schemas: LottieStateMachine[], player: DotLottieCommonPlayer);
    /**
     * Start the state machine with the passed id.
     *
     * @param stateId - The id of the state machine to start
     */
    start(stateId: string): void;
    /**
     * Stop the state machine.
     */
    stop(): void;
    /**
     * Removes all event listeners on the player and container.
     */
    protected _removeEventListeners(): void;
    /**
     * Adds event listeners to the player and container.
     * Subscribes to the state machine and listens for state changes.
     */
    protected _addEventListeners(): void;
    /**
     * Subscribe to state changes.
     * @param callback - Callback function to be called when state changes.
     */
    subscribe(callback: () => void): () => void;
    /**
     * Transform custom defined state machine to XState schema.
     * @param toConvert - Custom defined state machine to convert to XState schema
     * @returns - XState schema
     */
    protected _transformToXStateSchema(toConvert: LottieStateMachine[]): Map<string, XStateMachine>;
    /**
     * Handles playSegments playback setting.
     * @param playbackSettings - Playback settings containing segments
     */
    protected _handlePlaySegments(playbackSettings: DotLottieStatePlaybackSettings): void;
    /**
     * Handles playOnScroll playback setting.
     * @param playbackSettings - Playback settings containing playOnScroll
     */
    protected _handlePlayOnScroll(playbackSettings: DotLottieStatePlaybackSettings): void;
    /**
     * Update the playback settings of the current animation.
     * @param playbackSettings - Playback settings
     */
    protected _updatePlaybackSettings(playbackSettings: DotLottieStatePlaybackSettings): void;
    /**
     * Throws an error if the DOM element is not defined.
     */
    protected _requiresDomElement(): void;
}

/**
 * Copyright 2023 Design Barn Inc.
 */

declare enum PlayerEvents {
    Complete = "complete",
    DataFail = "data_fail",
    DataReady = "data_ready",
    Error = "error",
    Frame = "frame",
    Freeze = "freeze",
    LoopComplete = "loopComplete",
    Pause = "pause",
    Play = "play",
    Ready = "ready",
    Stop = "stop",
    VisibilityChange = "visibilityChange"
}
declare enum PlayerState {
    Completed = "completed",
    Error = "error",
    Fetching = "fetching",
    Frozen = "frozen",
    Initial = "initial",
    Loading = "loading",
    Paused = "paused",
    Playing = "playing",
    Ready = "ready",
    Stopped = "stopped"
}
declare enum PlayMode {
    Bounce = "bounce",
    Normal = "normal"
}

interface DotLottieElement extends HTMLDivElement {
    __lottie?: AnimationItem | null;
}
declare const DEFAULT_OPTIONS: PlaybackOptions;

type RendererSettings = SVGRendererConfig & CanvasRendererConfig & HTMLRendererConfig;
type DotLottieConfig<T extends RendererType> = Omit<AnimationConfig<T>, 'container'> & PlaybackOptions & {
    activeAnimationId?: string | null;
    activeStateId?: string;
    background?: string;
    light?: boolean;
    testId?: string | undefined;
    worker?: boolean;
};
declare global {
    interface Window {
        dotLottiePlayer: Record<string, Record<string, unknown>>;
    }
}
interface DotLottiePlayerState extends PlaybackOptions {
    activeStateId: string | undefined;
    background: string;
    currentAnimationId: string | undefined;
    currentState: PlayerState;
    frame: number;
    intermission: number;
    seeker: number;
    visibilityPercentage: number;
}
declare const DEFAULT_STATE: DotLottiePlayerState;
declare class DotLottieCommonPlayer {
    protected _lottie: AnimationItem | undefined;
    protected _src: string | Record<string, unknown>;
    protected _animationConfig: Omit<AnimationConfig<RendererType>, 'container'>;
    protected _prevUserPlaybackOptions: PlaybackOptions;
    protected _userPlaybackOptions: PlaybackOptions;
    protected _hover: boolean;
    protected _loop: boolean | number;
    protected _counter: number;
    protected _intermission: number;
    protected _counterInterval: number | null;
    protected _container: DotLottieElement | null;
    protected _name?: string;
    protected _mode: PlayMode;
    protected _background: string;
    protected _animation: Animation | undefined;
    protected _defaultTheme: string;
    protected _activeAnimationId?: string | undefined;
    protected _currentAnimationId?: string | undefined;
    protected _testId?: string;
    protected _listeners: Map<AnimationEventName, Set<() => void>>;
    protected _currentState: PlayerState;
    protected _stateBeforeFreeze: PlayerState;
    state: Store<DotLottiePlayerState>;
    private readonly _light;
    private readonly _worker;
    private readonly _dotLottieLoader;
    protected _activeStateId?: string;
    protected _inInteractiveMode: boolean;
    private _scrollTicking;
    private _scrollCallback;
    private _onShowIntersectionObserver;
    private _visibilityPercentage;
    private _audios;
    protected _stateMachineManager?: DotLottieStateMachineManager;
    constructor(src: string | Record<string, unknown>, container?: DotLottieElement | null, options?: DotLottieConfig<RendererType>);
    protected _listenToHover(): void;
    protected _onVisibilityChange(): void;
    protected _listenToVisibilityChange(): void;
    /**
     * Retrieves a specific playback option.
     *
     * @remarks
     * It grabs option in the following order.
     * 1. From this._playbackOptions (i.e user specified options) if available
     * 2. From Manifest if available
     * 3. Otherwise Default
     *
     * @param option - The option key to retrieve.
     * @returns The value of the specified playback option.
     */
    protected _getOption<T extends keyof Required<PlaybackOptions>, V extends Required<PlaybackOptions>[T]>(option: T): V;
    /**
     * Retrieves all playback options.
     *
     * @see _getOption() function for more context on how it retrieves options
     *
     * @returns An object containing all playback options.
     */
    protected _getPlaybackOptions<K extends keyof PlaybackOptions, V extends PlaybackOptions[K]>(): PlaybackOptions;
    /**
     * Update playbackOptions for lottie-web and local
     */
    protected _setPlayerState(getOptions: (currPlaybackOptions: PlaybackOptions) => PlaybackOptions): void;
    /**
     * Extracts playback options from a manifest animation, combining them with default options.
     *
     * @param manifestAnimation - The animation object from the manifest.
     * @returns A playback options object derived from the manifest animation and default options.
     */
    protected _getOptionsFromAnimation(manifestAnimation: ManifestAnimation): PlaybackOptions;
    protected _updateTestData(): void;
    setContainer(container: DotLottieElement): void;
    /**
     * Gets the current player state.
     *
     * @returns The current state of the player.
     */
    get currentState(): PlayerState;
    protected clearCountTimer(): void;
    protected setCurrentState(state: PlayerState): void;
    static isPathJSON(srcParsed: string): boolean;
    get src(): Record<string, unknown> | string;
    updateSrc(src: Record<string, unknown> | string): void;
    get intermission(): number;
    get hover(): boolean;
    setHover(hover: boolean): void;
    setIntermission(intermission: number): void;
    get mode(): PlayMode;
    get animations(): Map<string, Animation>;
    get themes(): Map<string, Record<string, unknown>>;
    setMode(mode: PlayMode): void;
    get container(): HTMLDivElement | undefined;
    goToAndPlay(value: number | string, isFrame?: boolean, name?: string): void;
    goToAndStop(value: number | string, isFrame?: boolean, name?: string): void;
    seek(value: number | string): void;
    private _areNumbersInRange;
    private _updatePosition;
    private _requestTick;
    playOnScroll(scrollOptions?: {
        positionCallback?: (position: number) => void;
        segments?: [number, number];
        threshold?: [number, number];
    }): void;
    stopPlayOnScroll(): void;
    stopPlayOnShow(): void;
    addIntersectionObserver(options?: {
        callbackOnIntersect?: (visibilityPercentage: number) => void;
        threshold?: number[];
    }): void;
    playOnShow(onShowOptions?: {
        threshold: number[];
    }): void;
    protected _validatePlaybackOptions(options?: Record<string, unknown>): Partial<PlaybackOptions>;
    private _requireAnimationsInTheManifest;
    private _requireAnimationsToBeLoaded;
    /**
     * Initiates playback of the animation in the DotLottie player.
     *
     * @param activeAnimation - The identifier of the animation to be played. Triggers re-render
     * @param getOptions - A function that allows customization of playback options.
     *
     * @remarks
     * This function starts playing the animation within the DotLottie player.
     * It can be used to play a specific animation by providing its identifier.
     * Should only pass activeAnimationId to render a specific animation. Triggers re-render when passed.
     * The `getOptions` function, if provided, can be used to customize playback options based on the current playback state and the options specified in the animation manifest.
     *
     * @returns void
     *
     * @example
     * ```
     * player.play('animation1'); // Renders the animation1. And only starts playing if autoplay === true
     * player.play(); // Can call with empty params to play animation1
     *
     * player.play(); // Start playing when player is paused or stopped. Doesn't change animation
     * ```
     */
    play(activeAnimation?: string | number, getOptions?: (currPlaybackOptions: PlaybackOptions, manifestPlaybackOptions: PlaybackOptions) => PlaybackOptions): Promise<void>;
    playSegments(segment: AnimationSegment | AnimationSegment[], force?: boolean): void;
    resetSegments(force: boolean): void;
    togglePlay(): void;
    /**
     * Retrieves a manifest animation by its identifier or index.
     *
     * @param animation - The identifier or index of the animation to retrieve.
     * @returns The manifest animation corresponding to the provided identifier or index.
     *
     * @throws If the specified animation identifier or index is not found in the manifest.
     * @throws If the first parameter is not a valid number or string.
     */
    protected _getAnimationByIdOrIndex(animation: string | number): ManifestAnimation;
    get activeAnimationId(): string | undefined;
    get currentAnimationId(): string | undefined;
    get activeStateId(): string | undefined;
    /**
     * Gets the state machines from file and starts the specified state machine.
     * @param stateId - The identifier of the state machine to use.
     * @returns
     */
    protected _startInteractivity(stateId: string): Promise<void>;
    /**
     * Enters interactive mode for the specified state machine and starts it.
     * @param stateId - The identifier of the state machine to use.
     */
    enterInteractiveMode(stateId: string): void;
    /**
     * Exits interactive mode and stops the current state machine.
     */
    exitInteractiveMode(): void;
    reset(): void;
    previous(getOptions?: (currPlaybackOptions: PlaybackOptions, manifestPlaybackOptions: PlaybackOptions) => PlaybackOptions): void;
    next(getOptions?: (currPlaybackOptions: PlaybackOptions, manifestPlaybackOptions: PlaybackOptions) => PlaybackOptions): void;
    getManifest(): Manifest | undefined;
    resize(): void;
    stop(): void;
    pause(): void;
    freeze(): void;
    unfreeze(): void;
    destroy(): void;
    getAnimationInstance(): AnimationItem | undefined;
    static getLottieWebVersion(): string;
    addEventListener(name: AnimationEventName, cb: () => void): void;
    getState(): DotLottiePlayerState;
    protected _notify(): void;
    get totalFrames(): number;
    get direction(): 1 | -1;
    setDirection(direction: 1 | -1): void;
    get speed(): number;
    setSpeed(speed: number): void;
    get autoplay(): boolean;
    setAutoplay(value: boolean): void;
    toggleAutoplay(): void;
    get defaultTheme(): string;
    setDefaultTheme(value: string): void;
    get loop(): number | boolean;
    setLoop(value: boolean | number): void;
    toggleLoop(): void;
    get background(): string;
    setBackground(color: string): void;
    protected get _frame(): number;
    protected get _seeker(): number;
    /**
     * Reverts playback options to their values as defined in the manifest for specified keys.
     *
     * @param playbackKeys - An optional array of playback option keys to revert. If not provided, all supported keys will be reverted.
     *
     * @remarks
     * - activeAnimationId added as an additional option as its part of Manifest.
     * - A re-render will be triggered if `activeAnimationId` or `defaultTheme` is being passed
     *
     * @returns Nothing.
     */
    revertToManifestValues(playbackKeys?: Array<keyof PlaybackOptions | 'activeAnimationId'>): Promise<void>;
    removeEventListener(name: AnimationEventName, cb: () => void): void;
    protected _handleAnimationComplete(): void;
    addEventListeners(): void;
    protected _setCurrentAnimation(animationId: string): Promise<void>;
    protected _getAudioFactory(): Promise<((assetPath: string) => DotLottieAudio) | null>;
    protected render(activeAnimation?: Partial<ManifestAnimation>): Promise<void>;
    private _getLottiePlayerInstance;
    private _getActiveAnimationId;
    load(playbackOptions?: PlaybackOptions): Promise<void>;
    protected setErrorState(msg: string): void;
    /**
     * Ensure that the provided direction is a valid number.
     * @param direction - The direction to validate.
     */
    private _requireValidDirection;
    /**
     * Ensure that the provided intermission is a valid, positive number.
     * @param intermission - The intermission to validate.
     * @throws Error - if the intermission is not a valid number.
     */
    private _requireValidIntermission;
    /**
     * Ensure that the provided loop is a valid, positive number or boolean.
     * @param loop - The loop to validate.
     * @throws Error - if the loop is not a valid number or boolean.
     */
    private _requireValidLoop;
    /**
     * Ensure that the provided speed is a valid number.
     * @param speed - The speed to validate.
     * @throws Error - if the speed is not a valid number.
     */
    private _requireValidSpeed;
    /**
     * Ensure that the provided background is a valid string.
     * @param background - The background to validate.
     * @throws Error - if the background is not a valid string.
     */
    private _requireValidBackground;
    /**
     * Ensure that the provided autoplay is a valid boolean.
     * @param autoplay - The autoplay to validate.
     * @throws Error - if the autoplay is not a valid boolean.
     */
    private _requireValidAutoplay;
    /**
     * Ensure that the provided options object is a valid PlaybackOptions object.
     * @param options - The options object to validate.
     */
    private _requireValidPlaybackOptions;
}

export { DotLottieElement as D, PlayerEvents as P, RendererSettings as R, PlayerState as a, PlayMode as b, DEFAULT_OPTIONS as c, DotLottieConfig as d, DotLottiePlayerState as e, DEFAULT_STATE as f, DotLottieCommonPlayer as g, DotLottieStateMachineManager as h };
