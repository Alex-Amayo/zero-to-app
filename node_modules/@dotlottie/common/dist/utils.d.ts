import { Animation } from '@lottiefiles/lottie-types';

/**
 * Copyright 2023 Design Barn Inc.
 */

declare function createError(error: string, prefix?: string): Error;
declare function logError(error: string, prefix?: string, ...rest: any[]): void;
declare function logWarning(warning: string, prefix?: string, ...rest: any[]): void;
declare function getFilename(url?: string): string;
declare function isValidLottieJSON(json: Record<string, unknown>): boolean;
declare function lottieContainsAudio(json: Animation): boolean;
declare function isValidLottieString(str: string): boolean;
declare function getKeyByValue<T extends Record<string, unknown>, V>(object: T, value: V): keyof T;
/**
 * Deep clone of the Lottie JSON
 *
 * This is to resolve the issue of the Lottie JSON being mutated by the lottie-web renderer.
 *
 * @param obj  - Lottie JSON
 * @returns  - Deep clone of the Lottie JSON
 */
declare function deepCloneLottieJson<T>(obj: T): T;

export { createError, deepCloneLottieJson, getFilename, getKeyByValue, isValidLottieJSON, isValidLottieString, logError, logWarning, lottieContainsAudio };
