import { b as DotLottiePlugin } from './dotlottie-common-9fd79824.js';
import { b as LottieImageCommon, L as LottieAnimationCommon } from './dotlottie-theme-common-21ec6cf8.js';

/**
 * Copyright 2023 Design Barn Inc.
 */

declare class DuplicateImageDetectorCommon extends DotLottiePlugin {
    generatePhash(_image: LottieImageCommon): Promise<string>;
    distanceTo(_imageHash: string, _targetImageHash: string): number;
    private _createRecordOfDuplicates;
    /**
     * Apply the image path to all duplicate images.
     *
     * @param recordOfDuplicates - A record of duplicate images, the key being a fileName,
     * the value being the identical LottieImageCommon object.
     */
    adjustDuplicateImageAssetPath(animation: LottieAnimationCommon, recordOfDuplicates: Record<string, LottieImageCommon[]>): void;
    onBuild(): Promise<void>;
}

export { DuplicateImageDetectorCommon as D };
