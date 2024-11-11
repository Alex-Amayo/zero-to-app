import { CompositeMode } from './types';
export declare const COMPOSITE_NONE: CompositeMode;
export declare const COMPOSITE_NORMAL: CompositeMode;
export declare const COMPOSITE_MULTIPLY: CompositeMode;
export declare const COMPOSITE_SCREEN: CompositeMode;
export declare const COMPOSITE_OVERLAY: CompositeMode;
export declare const COMPOSITE_DARKEN: CompositeMode;
export declare const COMPOSITE_LIGHTEN: CompositeMode;
export declare const COMPOSITE_HARD_LIGHT: CompositeMode;
export declare const COMPOSITE_DIFFERENCE: CompositeMode;
export declare const COMPOSITE_EXCLUSION: CompositeMode;
export declare const compositeModeNames: string[];
export declare const compositeModeNameToMode: {
    [name: string]: CompositeMode;
};
