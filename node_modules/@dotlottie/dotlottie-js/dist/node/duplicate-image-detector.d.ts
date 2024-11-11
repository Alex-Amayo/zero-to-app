import { b as LottieImageCommon } from './dotlottie-theme-common-21ec6cf8.js';
import { D as DuplicateImageDetectorCommon } from './duplicate-image-detector-common-3ae43be3.js';
import 'fflate';
import '@lottiefiles/lottie-types';
import './manifest-dec4ae91.js';
import 'valibot';
import './dotlottie-common-9fd79824.js';
import './dotlottie-state-machine-common-e02ef581.js';

/**
 * Copyright 2023 Design Barn Inc.
 */

declare class DuplicateImageDetector extends DuplicateImageDetectorCommon {
    distanceTo(imageHash: string, targetImageHash: string): number;
    generatePhash(image: LottieImageCommon): Promise<string>;
}

export { DuplicateImageDetector };
