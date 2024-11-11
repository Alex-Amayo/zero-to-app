import { L as LottieAnimationCommon, A as AnimationOptions } from './dotlottie-theme-common-21ec6cf8.js';
import 'fflate';
import '@lottiefiles/lottie-types';
import './manifest-dec4ae91.js';
import 'valibot';

/**
 * Copyright 2023 Design Barn Inc.
 */

declare class LottieAnimation extends LottieAnimationCommon {
    constructor(options: AnimationOptions);
    /**
     * Return the animation data as a base64 encoded string.
     *
     * @returns data - The animation data as a base64 encoded string.
     * @throws Error - if the animation data is not set and the url is not provided.
     * @throws Error - if the animation data is not a valid Lottie animation data object.
     * @throws Error - if the fetch request fails.
     */
    toBase64(): Promise<string>;
    /**
     *
     * Extract image assets from the animation.
     *
     * @returns boolean - true on error otherwise false on success
     */
    protected _extractImageAssets(): Promise<boolean>;
    /**
     *
     * Extract audio assets from the animation.
     *
     * @returns boolean - true on error otherwise false on success
     */
    protected _extractAudioAssets(): Promise<boolean>;
}

export { LottieAnimation };
