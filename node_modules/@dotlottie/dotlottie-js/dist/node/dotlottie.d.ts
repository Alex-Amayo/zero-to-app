import { D as DotLottieCommon, a as DotLottieOptions, b as DotLottiePlugin, C as ConversionOptions } from './dotlottie-common-9fd79824.js';
import { A as AnimationOptions } from './dotlottie-theme-common-21ec6cf8.js';
import 'fflate';
import './dotlottie-state-machine-common-e02ef581.js';
import './manifest-dec4ae91.js';
import 'valibot';
import '@lottiefiles/lottie-types';

/**
 * Copyright 2023 Design Barn Inc.
 */

declare class DotLottie extends DotLottieCommon {
    constructor(options?: DotLottieOptions);
    addPlugins(...plugins: DotLottiePlugin[]): DotLottieCommon;
    create(): DotLottieCommon;
    toBase64(options: ConversionOptions | undefined): Promise<string>;
    download(_fileName: string, _options?: ConversionOptions | undefined): Promise<void>;
    addAnimation(animationOptions: AnimationOptions): DotLottieCommon;
    toArrayBuffer(options: ConversionOptions | undefined): Promise<ArrayBuffer>;
    /**
     * Creates a DotLottie instance from an array buffer
     * @param arrayBuffer - array buffer of the dotlottie file
     * @returns DotLottie instance
     * @throws Error
     */
    fromArrayBuffer(arrayBuffer: ArrayBuffer): Promise<DotLottie>;
}

export { DotLottie };
