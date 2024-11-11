import { b as LottieImageCommon } from './dotlottie-theme-common-14ad81ae.js';
import { D as DuplicateImageDetectorCommon } from './duplicate-image-detector-common-a9a39caf.js';
import 'fflate';
import '@lottiefiles/lottie-types';
import './manifest-c3ad44f7.js';
import 'valibot';
import './dotlottie-common-d160379b.js';
import './dotlottie-state-machine-common-f17570dd.js';

/**
 * Copyright 2023 Design Barn Inc.
 */

declare class DuplicateImageDetector extends DuplicateImageDetectorCommon {
    generatePhash(image: LottieImageCommon): Promise<string>;
    distanceTo(imageHash: string, targetImageHash: string): number;
}

export { DuplicateImageDetector };
