import { AnimationData, LottieStateMachine, Manifest } from '@dotlottie/dotlottie-js';
import './dotlottie-player-c67bc7de.js';
import '@lottiefiles/lottie-types';
import 'lottie-web';
import './dotlottie-audio.js';
import 'howler';
import './store.js';
import '@preact/signals-core';

/**
 * Copyright 2023 Design Barn Inc.
 */

declare class DotLottieLoader {
    private _dotLottie?;
    private readonly _animationsMap;
    private readonly _themeMap;
    private readonly _stateMachinesMap;
    private _manifest?;
    get dotLottie(): Uint8Array | undefined;
    get animationsMap(): Map<string, AnimationData>;
    get themeMap(): Map<string, Record<string, unknown>>;
    get stateMachinesMap(): Map<string, LottieStateMachine>;
    get manifest(): Manifest | undefined;
    loadFromUrl(url: string): Promise<void>;
    loadFromLottieJSON(json: Record<string, unknown>): void;
    loadFromArrayBuffer(arrayBuffer: ArrayBuffer): Promise<void>;
    getAnimation(animationId: string): Promise<AnimationData | undefined>;
    getTheme(themeId: string): Promise<Record<string, unknown> | undefined>;
    getStateMachines(): Promise<LottieStateMachine[] | undefined>;
    getStateMachine(stateMachineId: string): Promise<LottieStateMachine | undefined>;
}

export { DotLottieLoader };
