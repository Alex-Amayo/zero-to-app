import { ZipOptions } from 'fflate';
import { Animation } from '@lottiefiles/lottie-types';
import { a as ManifestAnimation, P as PlayMode } from './manifest-c3ad44f7.js';

/**
 * Copyright 2023 Design Barn Inc.
 */

declare type AudioData = string | ArrayBuffer | Blob;
interface AudioOptions {
    data?: AudioData;
    fileName: string;
    id: string;
    parentAnimations?: LottieAnimationCommon[];
    url?: string;
    zipOptions?: ZipOptions;
}
declare class LottieAudioCommon {
    protected _data?: AudioData;
    protected _id: string;
    protected _url?: string;
    protected _fileName: string;
    protected _parentAnimations: LottieAnimationCommon[];
    protected _zipOptions: ZipOptions;
    constructor(options: AudioOptions);
    get zipOptions(): ZipOptions;
    set zipOptions(zipOptions: ZipOptions);
    get fileName(): string;
    set fileName(fileName: string);
    get id(): string;
    set id(id: string);
    get data(): AudioData | undefined;
    set data(data: AudioData | undefined);
    get parentAnimations(): LottieAnimationCommon[];
    set parentAnimations(parentAnimations: LottieAnimationCommon[]);
    toDataURL(): Promise<string>;
    /**
     * Renames the id and fileName to newName.
     * @param newName - A new id and filename for the audio.
     */
    renameAudio(newName: string): void;
    toArrayBuffer(): Promise<ArrayBuffer>;
    toBlob(): Promise<Blob>;
    protected _fromUrlToBlob(url: string): Promise<Blob>;
    protected _isArrayBuffer(data: AudioData): boolean;
    protected _isDataURL(data: AudioData): boolean;
    protected _isBlob(data: AudioData): boolean;
    /**
     * Ensure that the provided id is a valid string.
     * The id must be a non-empty string, otherwise an error will be thrown.
     * @param id - The id to validate.
     * @throws Error - if the id is not a valid string.
     */
    private _requireValidId;
    /**
     * Ensure that the provided fileName is a valid string.
     * The fileName must be a non-empty string, otherwise an error will be thrown.
     * @param fileName - The fileName to validate.
     * @throws Error - if the fileName is not a valid string.
     */
    private _requireValidFileName;
}

/**
 * Copyright 2023 Design Barn Inc.
 */

declare type ImageData = string | ArrayBuffer | Blob;
interface ImageOptions {
    data?: ImageData;
    fileName: string;
    id: string;
    parentAnimations?: LottieAnimationCommon[];
    zipOptions?: ZipOptions;
}
declare class LottieImageCommon {
    protected _data?: ImageData;
    protected _id: string;
    protected _fileName: string;
    protected _parentAnimations: LottieAnimationCommon[];
    protected _zipOptions: ZipOptions;
    constructor(options: ImageOptions);
    get zipOptions(): ZipOptions;
    set zipOptions(zipOptions: ZipOptions);
    /**
     * Ensure that the provided id is a valid string.
     * The id must be a non-empty string, otherwise an error will be thrown.
     * @param id - The id to validate.
     * @throws Error - if the id is not a valid string.
     */
    private _requireValidId;
    /**
     * Ensure that the provided fileName is a valid string.
     * The fileName must be a non-empty string, otherwise an error will be thrown.
     * @param fileName - The fileName to validate.
     * @throws Error - if the fileName is not a valid string.
     */
    private _requireValidFileName;
    get fileName(): string;
    set fileName(fileName: string);
    get id(): string;
    set id(id: string);
    get data(): ImageData | undefined;
    set data(data: ImageData | undefined);
    get parentAnimations(): LottieAnimationCommon[];
    set parentAnimations(parentAnimations: LottieAnimationCommon[]);
    toDataURL(): Promise<string>;
    /**
     * Renames the id and fileName to newName.
     * @param newName - A new id and filename for the image.
     */
    renameImage(newName: string): void;
    toArrayBuffer(): Promise<ArrayBuffer>;
    toBlob(): Promise<Blob>;
    protected _fromUrlToBlob(url: string): Promise<Blob>;
    protected _isArrayBuffer(data: ImageData): boolean;
    protected _isDataURL(data: ImageData): boolean;
    protected _isBlob(data: ImageData): boolean;
}

/**
 * Copyright 2023 Design Barn Inc.
 */

declare type AnimationData = Animation;
interface ExportOptions {
    inlineAssets?: boolean;
}
interface AnimationOptions extends ManifestAnimation {
    data?: AnimationData;
    defaultActiveAnimation?: boolean;
    url?: string;
    zipOptions?: ZipOptions;
}
declare class LottieAnimationCommon {
    protected _data?: AnimationData;
    protected _id: string;
    protected _url?: string;
    private _direction;
    private _speed;
    private _playMode;
    private _loop;
    private _autoplay;
    private _hover;
    private _intermission;
    private _zipOptions;
    protected _defaultActiveAnimation: boolean;
    protected _imageAssets: LottieImageCommon[];
    protected _audioAssets: LottieAudioCommon[];
    protected _themesMap: Map<string, LottieThemeCommon>;
    protected _defaultTheme?: string;
    constructor(options: AnimationOptions);
    toBase64(): Promise<string>;
    get zipOptions(): ZipOptions;
    set zipOptions(zipOptions: ZipOptions);
    get id(): string;
    set id(id: string);
    get defaultTheme(): string | undefined;
    set defaultTheme(defaultTheme: string | undefined);
    get themes(): LottieThemeCommon[];
    set themes(themes: LottieThemeCommon[]);
    get imageAssets(): LottieImageCommon[];
    set imageAssets(imageAssets: LottieImageCommon[]);
    get audioAssets(): LottieAudioCommon[];
    set audioAssets(audioAssets: LottieAudioCommon[]);
    get data(): AnimationData | undefined;
    set data(data: AnimationData | undefined);
    get url(): string | undefined;
    set url(url: string | undefined);
    get direction(): ManifestAnimation['direction'];
    set direction(direction: ManifestAnimation['direction']);
    get speed(): number;
    set speed(speed: number);
    get playMode(): PlayMode;
    set playMode(playMode: PlayMode);
    get loop(): boolean | number;
    set loop(loop: boolean | number);
    get autoplay(): boolean;
    set autoplay(autoplay: boolean);
    get defaultActiveAnimation(): boolean;
    set defaultActiveAnimation(defaultActiveAnimation: boolean);
    get hover(): boolean;
    set hover(hover: boolean);
    get intermission(): number;
    set intermission(intermission: number);
    addTheme(theme: LottieThemeCommon): void;
    removeTheme(themeId: string): void;
    /**
     * Return the animation data as an array buffer.
     * @returns data - The animation data as an ArrayBuffer.
     * @throws Error - if the animation data is not set and the url is not provided.
     * @throws Error - if the animation data is not a valid Lottie animation data object.
     * @throws Error - if the fetch request fails.
     */
    toArrayBuffer(options?: ExportOptions): Promise<ArrayBuffer>;
    protected _extractImageAssets(): Promise<boolean>;
    protected _extractAudioAssets(): Promise<boolean>;
    /**
     * Return the animation data as a blob.
     * @returns blob - The animation data as a Blob.
     * @throws Error - if the animation data is not set and the url is not provided.
     * @throws Error - if the animation data is not a valid Lottie animation data object.
     * @throws Error - if the fetch request fails.
     */
    toBlob(options?: ExportOptions): Promise<Blob>;
    /**
     * Return the animation data as a JSON object.
     * If the animation data is not already set, it will be fetched from the provided url.
     * @returns data - The animation data.
     * @throws Error - if the animation data is not a valid Lottie animation data object.
     * @throws Error - if the fetch request fails.
     */
    toJSON(options?: ExportOptions): Promise<Animation>;
    /**
     * Fetch the animation data from the provided url.
     * @param url - The url to fetch the animation data from.
     * @returns animationData - The animation data.
     * @throws Error - if the fetch request fails.
     * @throws Error - if the data object is not a valid Lottie animation data object.
     */
    private _fromUrl;
    /**
     * Ensure that the provided url is a valid string.
     * The url must be a non-empty string, otherwise an error will be thrown.
     * @param url - The url to validate.
     * @throws Error - if the url is not a valid string.
     *
     */
    private _requireValidUrl;
    /**
     * Ensure that the provided data object is a valid Lottie animation data object.
     * The data object must contain the following mandatory properties: v, ip, op, layers, fr, w, h.
     * If the data object does not contain all mandatory properties, an error will be thrown.
     * @param data - The data object to validate.
     * @throws Error - if the data object is not a valid Lottie animation data object.
     */
    private _requireValidLottieData;
    /**
     * Ensure that the provided id is a valid string.
     * The id must be a non-empty string, otherwise an error will be thrown.
     * @param id - The id to validate.
     * @throws Error - if the id is not a valid string.
     */
    private _requireValidId;
    /**
     * Ensure that the provided url is a valid string.
     * The url must be a non-empty string, otherwise an error will be thrown.
     * @param url - The url to validate.
     * @throws Error - if the url is not a valid string.
     *
     */
    private _requireValidDirection;
    /**
     * Ensure that the provided intermission is a valid, positive number.
     * @param intermission - The intermission to validate.
     * @throws Error - if the intermission is not a valid number.
     */
    private _requireValidIntermission;
    /**
     * Ensure that the provided loop is a valid, positive number or boolean.
     * @param loop - The loop to validate.
     * @throws Error - if the loop is not a valid number or boolean.
     */
    private _requireValidLoop;
    /**
     * Ensure that the provided options object is a valid AnimationOptions object.
     * The options object must contain the following mandatory properties: id, data or url.
     * If the options object does not contain all mandatory properties, an error will be thrown.
     * @param options - The options object to validate.
     * @throws Error - if the options object is not a valid AnimationOptions object.
     * @throws Error - if the id is not a valid string.
     * @throws Error - if the data object is not a valid Lottie animation data object.
     * @throws Error - if the url is not a valid url string.
     * @throws Error - if the data object is not set and the url is not provided.
     */
    private _requireValidOptions;
}

/**
 * Copyright 2023 Design Barn Inc.
 */

declare type Data = Record<string, unknown>;
interface ThemeOptions {
    data?: Data;
    id: string;
    url?: string;
    zipOptions?: ZipOptions;
}
declare class LottieThemeCommon {
    protected _data?: Data;
    protected _id: string;
    protected _url?: string;
    protected readonly _animationsMap: Map<string, LottieAnimationCommon>;
    protected _zipOptions: ZipOptions;
    constructor(options: ThemeOptions);
    get zipOptions(): ZipOptions;
    set zipOptions(zipOptions: ZipOptions);
    get id(): string;
    set id(id: string | undefined);
    get url(): string | undefined;
    set url(url: string | undefined);
    get data(): Data | undefined;
    set data(data: Data | undefined);
    get animations(): LottieAnimationCommon[];
    toString(): Promise<string>;
    addAnimation(animation: LottieAnimationCommon): void;
    removeAnimation(animationId: string): void;
    private _requireValidId;
    private _requireValidUrl;
    private _requireValidData;
    private _loadDataFromUrl;
}

export { AnimationOptions as A, ExportOptions as E, ImageData as I, LottieAnimationCommon as L, ThemeOptions as T, LottieThemeCommon as a, LottieImageCommon as b, LottieAudioCommon as c, AnimationData as d, ImageOptions as e, AudioData as f, AudioOptions as g };
