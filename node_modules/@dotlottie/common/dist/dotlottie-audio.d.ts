import { Howl } from 'howler';

/**
 * Copyright 2023 Design Barn Inc.
 */

interface DotLottieAudioOptions {
    src: string[];
}
declare class DotLottieAudio {
    private readonly _howl;
    constructor({ src }: DotLottieAudioOptions);
    play(): number;
    pause(): Howl;
    playing(): boolean;
    rate(): number;
    seek(): number;
    setVolume(): number;
    unload(): void;
}

export { DotLottieAudio, DotLottieAudioOptions };
