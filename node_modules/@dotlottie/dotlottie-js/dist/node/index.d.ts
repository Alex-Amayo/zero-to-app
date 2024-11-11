export { DotLottie } from './dotlottie.js';
export { LottieAnimation } from './lottie-animation.js';
export { LottieImage } from './lottie-image.js';
export { LottieTheme } from './lottie-theme.js';
export { C as ConversionOptions, D as DotLottieCommon, a as DotLottieOptions, b as DotLottiePlugin, G as GetAnimationOptions } from './dotlottie-common-9fd79824.js';
export { d as AnimationData, A as AnimationOptions, f as AudioData, g as AudioOptions, E as ExportOptions, I as ImageData, e as ImageOptions, L as LottieAnimationCommon, c as LottieAudioCommon, b as LottieImageCommon, a as LottieThemeCommon, T as ThemeOptions } from './dotlottie-theme-common-21ec6cf8.js';
export { D as DuplicateImageDetectorCommon } from './duplicate-image-detector-common-3ae43be3.js';
import { Asset, Animation } from '@lottiefiles/lottie-types';
import { UnzipFileFilter, Unzipped } from 'fflate';
import { D as DotLottieStateMachineCommon, a as DotLottieStateMachineCommonOptions } from './dotlottie-state-machine-common-e02ef581.js';
export { v as DotLottieState, B as DotLottieStateMachine, D as DotLottieStateMachineCommon, a as DotLottieStateMachineCommonOptions, z as DotLottieStateMachineDescriptor, y as DotLottieStateMachineDescriptorSchema, A as DotLottieStateMachineSchema, t as DotLottieStatePlaybackSettings, s as DotLottieStatePlaybackSettingsSchema, u as DotLottieStateSchema, r as DotLottieStateTransitionEvents, q as DotLottieStateTransitionEventsSchema, x as DotLottieStates, w as DotLottieStatesSchema, b as PlaybackOptions, P as PlaybackOptionsSchema, f as StateTransitionOnAfter, e as StateTransitionOnAfterSchema, d as StateTransitionOnClick, S as StateTransitionOnClickSchema, n as StateTransitionOnComplete, m as StateTransitionOnCompleteSchema, h as StateTransitionOnEnter, g as StateTransitionOnEnterSchema, j as StateTransitionOnMouseEnter, i as StateTransitionOnMouseEnterSchema, l as StateTransitionOnMouseLeave, k as StateTransitionOnMouseLeaveSchema, p as StateTransitionOnShow, o as StateTransitionOnShowSchema, c as Transitionable, T as TransitionableSchema } from './dotlottie-state-machine-common-e02ef581.js';
import { M as Manifest } from './manifest-dec4ae91.js';
export { M as Manifest, a as ManifestAnimation, c as ManifestAnimationSchema, f as ManifestSchema, e as ManifestTheme, d as ManifestThemeSchema, P as PlayMode, b as PlayModeSchema } from './manifest-dec4ae91.js';
export { LottieStateMachine } from './lottie-state-machine.js';
import 'valibot';

/**
 * Copyright 2023 Design Barn Inc.
 */

declare class LottieStateMachine extends DotLottieStateMachineCommon {
    constructor(options: DotLottieStateMachineCommonOptions);
}

/**
 * Copyright 2023 Design Barn Inc.
 */

interface MimeTypes {
    [key: string]: string;
}
interface MimeCodes {
    [key: string]: number[];
}
declare const MIME_TYPES: MimeTypes;
declare const MIME_CODES: MimeCodes;
interface MimeToExtension {
    [key: string]: string;
}
declare const MIME_TO_EXTENSION: MimeToExtension;
declare enum ErrorCodes {
    ASSET_NOT_FOUND = "ASSET_NOT_FOUND",
    INVALID_DOTLOTTIE = "INVALID_DOTLOTTIE",
    INVALID_STATEMACHINE = "INVALID_STATEMACHINE",
    INVALID_URL = "INVALID_URL"
}
declare class DotLottieError extends Error {
    code: ErrorCodes | undefined;
    constructor(message: string, code?: ErrorCodes);
}
/**
 * Creates an Error object with the specified message.
 *
 * @remarks
 * This function accepts a message string and constructs a new Error object prefixed with "[dotlottie-js]: ".
 *
 * @deprecated
 * This function has been deprecated in favor of using the {@link DotLottieError} class directly.
 *
 * @param message - The error message to include in the Error object.
 * @returns An Error object with the specified message, prefixed with "[dotlottie-js]: ".
 *
 * @example
 * ```typescript
 * const message = 'DotLottie not found';
 * const error = createError(message);
 * ```
 *
 * @public
 */
declare const createError: (message: string) => Error;
/**
 * Converts a base64 string into a Uint8Array.
 *
 * @remarks
 * This function accepts a base64 string and returns a Uint8Array containing the decoded bytes.
 *
 * @param base64String - The base64-encoded string to decode.
 * @returns A Uint8Array containing the decoded bytes.
 *
 * @example
 * ```typescript
 * const base64 = 'SGVsbG8gd29ybGQ=';
 * const array = base64ToUint8Array(base64);
 * ```
 *
 * @public
 */
declare const base64ToUint8Array: (base64String: string) => Uint8Array;
/**
 * Determines the MIME type from a base64-encoded string.
 *
 * @remarks
 * This function accepts a base64-encoded string and determines its MIME type by looking at the first few bytes.
 *
 * @param base64 - The base64-encoded string to analyze.
 * @returns The MIME type as a string, or null if the type cannot be determined.
 *
 * @example
 * ```typescript
 * const base64 = 'data:image/jpeg;base64,...';
 * const mimeType = getMimeTypeFromBase64(base64);
 * ```
 *
 * @public
 */
declare const getMimeTypeFromBase64: (base64: string) => string | undefined;
/**
 * Determines the file extension from a base64-encoded string.
 *
 * @remarks
 * This function accepts a base64-encoded string and determines its file extension by examining the MIME type.
 *
 * @param base64 - The base64-encoded string to analyze.
 * @returns The file extension as a string, or 'png' if the extension cannot be determined.
 *
 * @example
 * ```typescript
 * const base64 = 'data:image/jpeg;base64,...';
 * const extension = getExtensionTypeFromBase64(base64);
 * ```
 *
 * @public
 */
declare const getExtensionTypeFromBase64: (base64: string) => string | null;
/**
 * Validates a given URL string.
 *
 * @remarks
 * This function accepts a URL string and checks whether it's a valid URL according to the URL constructor.
 * It returns `true` if the URL is valid, `false` otherwise.
 *
 * @param url - The URL string to validate.
 * @returns `true` if the URL is valid, `false` otherwise.
 *
 * @example
 * ```typescript
 * const url = 'https://example.com';
 * const isValid = isValidURL(url); // true
 * ```
 *
 * @public
 */
declare const isValidURL: (url: string) => boolean;
/**
 * Creates a data URL from a Uint8Array.
 *
 * @remarks
 * This function accepts a Uint8Array and a file extension, then converts the Uint8Array into a base64 data URL string.
 * The mimeType is determined based on the provided file extension, or defaults to 'image/png' if the extension is not recognized.
 *
 * @param uint8Data - The Uint8Array containing the binary data.
 * @param fileExtension - The file extension used to determine the mimeType (e.g., 'png', 'jpeg').
 * @returns The data URL string.
 *
 * @example
 * ```typescript
 * const uint8Data = new Uint8Array(...);
 * const fileExtension = 'png';
 * const dataUrl = dataUrlFromU8(uint8Data, fileExtension);
 * ```
 */
declare function dataUrlFromU8(uint8Data: Uint8Array): string;
/**
 * Checks if an asset is an image asset.
 *
 * @remarks
 * This function accepts an asset object and determines whether it represents an image asset.
 * It returns `true` if it's an image asset, `false` otherwise.
 *
 * @param asset - The asset object to check.
 * @returns `true` if it's an image asset, `false` otherwise.
 *
 * @example
 * ```typescript
 * const asset = { w: 100, h: 100, p: 'image.png' };
 * const isImage = isImageAsset(asset); // true
 * ```
 *
 * @public
 */
declare function isImageAsset(asset: Asset.Value): asset is Asset.Image;
/**
 * Checks if an asset is an audio asset.
 *
 * @remarks
 * This function accepts an asset object and determines whether it represents an audio asset.
 * It returns `true` if it's an audio asset, `false` otherwise.
 *
 * @param asset - The asset object to check.
 * @returns `true` if it's an audio asset, `false` otherwise.
 *
 * @example
 * ```typescript
 * const asset = { e: 0, u: 'music/', p: 'audio.mp3' };
 * const isAudio = isAudioAsset(asset); // true
 * ```
 *
 * @public
 */
declare function isAudioAsset(asset: Asset.Value): asset is Asset.Image;
/**
 * Unzips the .lottie file.
 *
 * @remarks
 * This function accepts a .lottie file as a Uint8Array and an optional filter function to refine the unzipping process.
 * It returns a Promise that resolves with the unzipped data.
 *
 * @param dotLottie - The .lottie data as a Uint8Array.
 * @param filter - The filter function to apply to the files. Defaults to a function that always returns true.
 * @returns A Promise that resolves with the unzipped data.
 * @throws {@link DotLottieError} if the .lottie data is not provided or is invalid.
 *
 * @example
 * ```typescript
 * const dotLottie = new Uint8Array(...);
 * const unzippedData = await unzipDotLottie(dotLottie);
 * ```
 *
 * @public
 */
declare function unzipDotLottie(dotLottie: Uint8Array | undefined, filter?: UnzipFileFilter): Promise<Unzipped>;
/**
 * Unzips a specific file from a `.lottie` archive.
 *
 * @remarks
 * This function accepts a `.lottie` file as a `Uint8Array`, a path string representing the
 * target file to extract, and an optional filter function to further refine the extraction.
 * It returns a `Promise` that resolves to the unzipped `Uint8Array` of the target file.
 *
 * @param dotLottie - The `.lottie` file content as a `Uint8Array`.
 * @param path - The path of the target file within the `.lottie` archive to extract.
 * @param filter - An optional filter function to apply on the unzipping process.
 *                 Accepts a file object and returns a boolean indicating whether the file should be included.
 * @returns A `Promise` that resolves to the `Uint8Array` of the unzipped target file.
 *
 * @throws {@link DotLottieError} if the input is not a valid `.lottie` file or if the target file is not found.
 *
 * @example
 * ```typescript
 * const dotLottie = new Uint8Array(...);
 * const targetPath = 'images/image.png';
 * const unzippedFile = await unzipDotLottieFile(dotLottie, targetPath);
 * ```
 *
 * @public
 */
declare function unzipDotLottieFile(dotLottie: Uint8Array, path: string, filter?: UnzipFileFilter): Promise<Uint8Array | undefined>;
/**
 * Retrieves the manifest data from the given DotLottie object.
 *
 * @remarks
 * This function accepts a DotLottie object as a Uint8Array and extracts the manifest data from it.
 * The manifest contains metadata information about the .lottie file, such as the list of animations, themes, and image assets.
 * It returns a Promise that resolves to the manifest data or `undefined` if the manifest is not found.
 *
 * @param dotLottie - The Uint8Array of DotLottie data.
 * @returns A Promise that resolves with the manifest data or `undefined` if not found.
 *
 * @example
 * ```typescript
 * const dotLottie = new Uint8Array(...);
 * const manifestData = await getManifest(dotLottie);
 * ```
 *
 * @public
 */
declare function getManifest(dotLottie: Uint8Array): Promise<Manifest | undefined>;
/**
 * Validates the provided DotLottie data.
 *
 * @remarks
 * This function accepts a Uint8Array containing .lottie data and validates its structure and content.
 * It returns a Promise that resolves with an object containing a success boolean and an optional error string.
 *
 * @param dotLottie - The DotLottie data as a Uint8Array.
 * @returns A Promise that resolves with an object containing a success boolean and an optional error string.
 *
 * @example
 * ```typescript
 * const dotLottie = new Uint8Array(...);
 * const validationResult = await validateDotLottie(dotLottie);
 * ```
 *
 * @public
 */
declare function validateDotLottie(dotLottie: Uint8Array): Promise<{
    error?: string;
    success: boolean;
}>;
/**
 * Loads a .lottie file from an ArrayBuffer.
 *
 * @remarks
 * This function takes an ArrayBuffer containing .lottie data and converts it into a Uint8Array.
 * It validates the data and returns a Promise that resolves with the DotLottie data as a Uint8Array.
 *
 * @param arrayBuffer - The ArrayBuffer containing .lottie data.
 * @returns A Promise that resolves with the DotLottie data as a Uint8Array.
 * @throws {@link DotLottieError} if the data is invalid.
 *
 * @example
 * ```typescript
 * const arrayBuffer = new ArrayBuffer(...);
 * const dotLottie = await loadFromArrayBuffer(arrayBuffer);
 * ```
 *
 * @public
 */
declare function loadFromArrayBuffer(arrayBuffer: ArrayBuffer): Promise<Uint8Array>;
/**
 * Loads a .lottie file from a given URL.
 *
 * @remarks
 * This function takes a URL string as input and fetches the .lottie file from the provided URL.
 * It returns a Promise that resolves with the DotLottie data as a Uint8Array.
 *
 * @param src - The URL source of the .lottie file.
 * @returns A Promise that resolves with the DotLottie data as a Uint8Array.
 * @throws {@link DotLottieError} if the URL is invalid or if the content type is incorrect.
 *
 * @example
 * ```typescript
 * const url = 'https://example.com/animation.lottie';
 * const dotLottie = await loadFromURL(url);
 * ```
 *
 * @public
 */
declare function loadFromURL(src: string): Promise<Uint8Array>;
/**
 * Retrieves an audio from the given DotLottie object by its filename.
 *
 * @remarks
 * This function accepts a DotLottie object as a Uint8Array, the filename of the audio to retrieve, and an optional filter function.
 * It returns a Promise that resolves to the audio data URL or `undefined` if not found.
 *
 * @param dotLottie - The Uint8Array of DotLottie data.
 * @param filename - The filename of the image to get.
 * @param filter - An optional filter function to apply on the unzipping process.
 * @returns A Promise that resolves with the audio data URL or `undefined` if not found.
 *
 * @example
 * ```typescript
 * const dotLottie = new Uint8Array(...);
 * const filename = 'alarm.mp3';
 * const imageData = await getAudio(dotLottie, filename);
 * ```
 *
 * @public
 */
declare function getAudio(dotLottie: Uint8Array, filename: string, filter?: UnzipFileFilter): Promise<string | undefined>;
/**
 * Retrieves all audio files from the given DotLottie object.
 *
 * @remarks
 * This function accepts a DotLottie object as a Uint8Array and an optional filter function to further refine the extraction.
 * It returns a Promise that resolves to a record containing the audio data URLs mapped by their ID.
 *
 * @param dotLottie - The Uint8Array of DotLottie data.
 * @param filter - An optional filter function to apply on the unzipping process.
 * @returns A Promise that resolves to a record containing the audio data URLs mapped by their ID.
 *
 * @example
 * ```typescript
 * const dotLottie = new Uint8Array(...);
 * const allAudio = await getAllAudio(dotLottie);
 * ```
 *
 * @public
 */
declare function getAllAudio(dotLottie: Uint8Array, filter?: UnzipFileFilter): Promise<Record<string, string>>;
/**
 * Inlines audio assets for the given animations within a DotLottie object.
 *
 * @remarks
 * This function accepts a DotLottie object as a Uint8Array and a record containing the animations to process.
 * It identifies the audio used in the animations and replaces their references with the actual audio data.
 * This operation is performed asynchronously, and the function returns a Promise that resolves when the operation is complete.
 *
 * @param dotLottie - The DotLottie object containing the animations.
 * @param animations - A record containing the animations to process.
 * @returns A Promise that resolves when the operation is complete, returning nothing.
 *
 * @example
 * ```typescript
 * const dotLottie = new Uint8Array(...);
 * const animations = { animation1: {...}, animation2: {...} };
 * await inlineAudioAssets(dotLottie, animations);
 * ```
 *
 * @public
 */
declare function inlineAudioAssets(dotLottie: Uint8Array, animations: Record<string, Animation>): Promise<void>;
/**
 * Retrieves an image from the given DotLottie object by its filename.
 *
 * @remarks
 * This function accepts a DotLottie object as a Uint8Array, the filename of the image to retrieve, and an optional filter function.
 * It returns a Promise that resolves to the image data URL or `undefined` if not found.
 *
 * @param dotLottie - The Uint8Array of DotLottie data.
 * @param filename - The filename of the image to get.
 * @param filter - An optional filter function to apply on the unzipping process.
 * @returns A Promise that resolves with the image data URL or `undefined` if not found.
 *
 * @example
 * ```typescript
 * const dotLottie = new Uint8Array(...);
 * const filename = 'image.png';
 * const imageData = await getImage(dotLottie, filename);
 * ```
 *
 * @public
 */
declare function getImage(dotLottie: Uint8Array, filename: string, filter?: UnzipFileFilter): Promise<string | undefined>;
/**
 * Retrieves all images from the given DotLottie object.
 *
 * @remarks
 * This function accepts a DotLottie object as a Uint8Array and an optional filter function to further refine the extraction.
 * It returns a Promise that resolves to a record containing the image data URLs mapped by their ID.
 *
 * @param dotLottie - The Uint8Array of DotLottie data.
 * @param filter - An optional filter function to apply on the unzipping process.
 * @returns A Promise that resolves to a record containing the image data URLs mapped by their ID.
 *
 * @example
 * ```typescript
 * const dotLottie = new Uint8Array(...);
 * const images = await getImages(dotLottie);
 * ```
 *
 * @public
 */
declare function getImages(dotLottie: Uint8Array, filter?: UnzipFileFilter): Promise<Record<string, string>>;
/**
 * Inlines image assets for the given animations within a DotLottie object.
 *
 * @remarks
 * This function accepts a DotLottie object as a Uint8Array and a record containing the animations to process.
 * It identifies the images used in the animations and replaces their references with the actual image data.
 * This operation is performed asynchronously, and the function returns a Promise that resolves when the operation is complete.
 *
 * @param dotLottie - The DotLottie object containing the animations.
 * @param animations - A record containing the animations to process.
 * @returns A Promise that resolves when the operation is complete, returning nothing.
 *
 * @example
 * ```typescript
 * const dotLottie = new Uint8Array(...);
 * const animations = { animation1: {...}, animation2: {...} };
 * await inlineImageAssets(dotLottie, animations);
 * ```
 *
 * @public
 */
declare function inlineImageAssets(dotLottie: Uint8Array, animations: Record<string, Animation>): Promise<void>;
/**
 * Retrieves an animation from the given DotLottie object by its ID.
 *
 * @remarks
 * This function accepts a DotLottie object as a Uint8Array, the animation ID to retrieve, and an optional inlineAssets option.
 * It returns a Promise that resolves to the animation data or `undefined` if not found.
 *
 * @param dotLottie - The Uint8Array of DotLottie data.
 * @param animationId - The animation ID to get.
 * @param options - An object containing an optional `inlineAssets` boolean to control whether image assets should be inlined.
 * @param filter - An optional function to filter the files to be unzipped.
 * @returns A Promise that resolves with the animation data or `undefined` if not found.
 *
 * @example
 * ```typescript
 * const dotLottie = new Uint8Array(...);
 * const animationId = 'example';
 * const animationData = await getAnimation(dotLottie, animationId, { inlineAssets: true });
 * ```
 *
 * @public
 */
declare function getAnimation(dotLottie: Uint8Array, animationId: string, { inlineAssets }?: {
    inlineAssets?: boolean;
}, filter?: UnzipFileFilter): Promise<Animation | undefined>;
/**
 * Retrieves the animations from the given DotLottie object, with optional filtering and asset inlining.
 *
 * @remarks
 * This function accepts a DotLottie object as a Uint8Array, an optional inlineAssets option, and an optional filter function.
 * It returns a Promise that resolves to a record containing the animation data mapped by their ID.
 *
 * @param dotLottie - The Uint8Array of DotLottie data.
 * @param options - An object containing an optional `inlineAssets` boolean to control whether assets should be inlined.
 * @param filter - An optional function to filter the files to be unzipped.
 * @returns A Promise that resolves to a record containing the animation data mapped by their ID.
 *
 * @example
 * ```typescript
 * const dotLottie = new Uint8Array(...);
 * const animations = await getAnimations(dotLottie, { inlineAssets: true });
 * ```
 *
 * @public
 */
declare function getAnimations(dotLottie: Uint8Array, { inlineAssets }?: {
    inlineAssets?: boolean;
}, filter?: UnzipFileFilter): Promise<Record<string, Animation>>;
/**
 * Retrieves the themes from the given DotLottie object.
 *
 * @remarks
 * This function accepts a DotLottie object as a Uint8Array and an optional filter function to refine the extraction of themes.
 * It returns a Promise that resolves to a record containing the themes mapped by their ID.
 *
 * @param dotLottie - The DotLottie object containing the themes.
 * @param filter - An optional function to filter the files to be unzipped.
 * @returns A Promise that resolves to a record containing the themes mapped by their ID.
 *
 * @example
 * ```typescript
 * const dotLottie = new Uint8Array(...);
 * const themes = await getThemes(dotLottie);
 * ```
 */
declare function getThemes(dotLottie: Uint8Array, filter?: UnzipFileFilter): Promise<Record<string, Record<string, unknown>>>;
/**
 * Retrieves a specific theme by ID from the given DotLottie object.
 *
 * @remarks
 * This function accepts a DotLottie object as a Uint8Array, the theme ID to retrieve, and an optional filter function.
 * It returns a Promise that resolves to the theme as a string or `undefined` if not found.
 *
 * @param dotLottie - The DotLottie object containing the theme.
 * @param themeId - The ID of the theme to retrieve.
 * @param filter - An optional function to filter the files to be unzipped.
 * @returns A Promise that resolves to the theme as a string or `undefined` if not found.
 *
 * @example
 * ```typescript
 * const dotLottie = new Uint8Array(...);
 * const themeId = 'dark';
 * const theme = await getTheme(dotLottie, themeId);
 * ```
 */
declare function getTheme(dotLottie: Uint8Array, themeId: string, filter?: UnzipFileFilter): Promise<Record<string, unknown> | undefined>;
/**
 * Retrieves the state machines from the given DotLottie object.
 *
 * @remarks
 * This function accepts a DotLottie object as a Uint8Array and an optional filter function to refine the extraction of state machines.
 * It returns a Promise that resolves to a record containing the state machines mapped by their ID.
 *
 * @param dotLottie - The DotLottie object containing the state machines.
 * @param filter - An optional function to filter the files to be unzipped.
 * @returns A Promise that resolves to a record containing the state machines mapped by their ID.
 *
 * @example
 * ```typescript
 * const dotLottie = new Uint8Array(...);
 * const machines = await getStateMachines(dotLottie);
 * ```
 */
declare function getStateMachines(dotLottie: Uint8Array, filter?: UnzipFileFilter): Promise<Record<string, string>>;
/**
 * Retrieves a specific state machine by ID from the given DotLottie object.
 *
 * @remarks
 * This function accepts a DotLottie object as a Uint8Array, the state ID to retrieve, and an optional filter function.
 * It returns a Promise that resolves to the state machine as a string or `undefined` if not found.
 *
 * @param dotLottie - The DotLottie object containing the theme.
 * @param stateMachineId - The ID of the state machine to retrieve.
 * @param filter - An optional function to filter the files to be unzipped.
 * @returns A Promise that resolves to the state machine as a string or `undefined` if not found.
 *
 * @example
 * ```typescript
 * const dotLottie = new Uint8Array(...);
 * const stateMachineId = 'walk';
 * const stateMachine = await getState(dotLottie, stateMachineId);
 * ```
 */
declare function getStateMachine(dotLottie: Uint8Array, stateMachineId: string, filter?: UnzipFileFilter): Promise<LottieStateMachine | undefined>;

export { DotLottieError, ErrorCodes, MIME_CODES, MIME_TO_EXTENSION, MIME_TYPES, MimeCodes, MimeToExtension, MimeTypes, base64ToUint8Array, createError, dataUrlFromU8, getAllAudio, getAnimation, getAnimations, getAudio, getExtensionTypeFromBase64, getImage, getImages, getManifest, getMimeTypeFromBase64, getStateMachine, getStateMachines, getTheme, getThemes, inlineAudioAssets, inlineImageAssets, isAudioAsset, isImageAsset, isValidURL, loadFromArrayBuffer, loadFromURL, unzipDotLottie, unzipDotLottieFile, validateDotLottie };
