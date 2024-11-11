import { D as DotLottieCommon, a as DotLottieOptions, b as DotLottiePlugin, C as ConversionOptions } from './dotlottie-common-d160379b.js';
import { A as AnimationOptions } from './dotlottie-theme-common-14ad81ae.js';
import 'fflate';
import './dotlottie-state-machine-common-f17570dd.js';
import './manifest-c3ad44f7.js';
import 'valibot';
import '@lottiefiles/lottie-types';

/**
 * Copyright 2023 Design Barn Inc.
 */

declare class DotLottie extends DotLottieCommon {
    constructor(options?: DotLottieOptions);
    addPlugins(...plugins: DotLottiePlugin[]): DotLottieCommon;
    addAnimation(animationOptions: AnimationOptions): DotLottie;
    toBase64(options: ConversionOptions | undefined): Promise<string>;
    download(fileName: string, options?: ConversionOptions | undefined): Promise<void>;
    create(options?: DotLottieOptions): DotLottieCommon;
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
