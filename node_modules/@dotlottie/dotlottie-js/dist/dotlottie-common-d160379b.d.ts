import { ZipOptions } from 'fflate';
import { D as DotLottieStateMachineCommon, a as DotLottieStateMachineCommonOptions } from './dotlottie-state-machine-common-f17570dd.js';
import { L as LottieAnimationCommon, a as LottieThemeCommon, A as AnimationOptions, b as LottieImageCommon, c as LottieAudioCommon, T as ThemeOptions } from './dotlottie-theme-common-14ad81ae.js';
import { M as Manifest } from './manifest-c3ad44f7.js';

/**
 * Copyright 2023 Design Barn Inc.
 */

interface DotLottiePluginOptions {
    parallel?: boolean;
}
declare class DotLottiePlugin {
    protected dotlottie: DotLottieCommon | undefined;
    protected _parallel: boolean;
    constructor(options?: DotLottiePluginOptions);
    install(dotlottie: DotLottieCommon): void;
    uninstall(): void;
    get parallel(): boolean;
    set parallel(value: boolean);
    onBuild(): Promise<void>;
    protected _requireDotLottie(dotLottie: DotLottieCommon | undefined): asserts dotLottie;
}

/**
 * Copyright 2023 Design Barn Inc.
 */

interface DotLottieOptions {
    author?: string;
    customData?: Record<string, string>;
    description?: string;
    enableDuplicateImageOptimization?: boolean;
    generator?: string;
    keywords?: string;
    plugins?: DotLottiePlugin[];
    revision?: number;
    version?: string;
}
interface GetAnimationOptions {
    inlineAssets?: boolean;
}
interface ConversionOptions {
    zipOptions?: ZipOptions;
}
declare class DotLottieCommon {
    protected readonly _animationsMap: Map<string, LottieAnimationCommon>;
    protected readonly _plugins: DotLottiePlugin[];
    protected readonly _themesMap: Map<string, LottieThemeCommon>;
    protected readonly _stateMachinesMap: Map<string, DotLottieStateMachineCommon>;
    protected _author?: string;
    protected _description?: string;
    protected _generator?: string;
    protected _keywords?: string;
    protected _version?: string;
    protected _revision?: number;
    protected _customData?: Record<string, unknown>;
    enableDuplicateImageOptimization?: boolean;
    constructor(options?: DotLottieOptions);
    toBase64(_options?: ConversionOptions | undefined): Promise<string>;
    create(_options?: DotLottieOptions): DotLottieCommon;
    download(_fileName: string, _options?: ConversionOptions | undefined): Promise<void>;
    addPlugins(..._plugins: DotLottiePlugin[]): DotLottieCommon;
    addAnimation(_animationOptions: AnimationOptions): DotLottieCommon;
    fromArrayBuffer(_arrayBuffer: ArrayBuffer): Promise<DotLottieCommon>;
    toArrayBuffer(_options?: ConversionOptions | undefined): Promise<ArrayBuffer>;
    get plugins(): DotLottiePlugin[];
    get version(): string | undefined;
    get revision(): number | undefined;
    get author(): string | undefined;
    get description(): string | undefined;
    get keywords(): string | undefined;
    get generator(): string | undefined;
    get animations(): LottieAnimationCommon[];
    get manifest(): Manifest;
    get custom(): Record<string, unknown> | undefined;
    get themes(): LottieThemeCommon[];
    get stateMachines(): DotLottieStateMachineCommon[];
    setCustomData(customData: Record<string, unknown> | undefined): DotLottieCommon;
    setAuthor(author: string | undefined): DotLottieCommon;
    setDescription(description: string | undefined): DotLottieCommon;
    setGenerator(generator: string | undefined): DotLottieCommon;
    setKeywords(keywords: string | undefined): DotLottieCommon;
    setVersion(version: string | undefined): DotLottieCommon;
    setRevision(revision: number): DotLottieCommon;
    removePlugins(...plugins: DotLottiePlugin[]): DotLottieCommon;
    /**
     * Renames the underlying LottieImage, as well as updating the image asset path inside the animation data.
     * @param newName - desired id and fileName,
     * @param imageId - The id of the LottieImage to rename
     */
    private _renameImage;
    private _renameImageAssets;
    /**
     * Renames the underlying LottieAudio, as well as updating the audio asset path inside the animation data.
     * @param newName - desired id and fileName,
     * @param audioId - The id of the LottieAudio to rename
     */
    private _renameAudio;
    private _renameAudioAssets;
    protected _addLottieAnimation(animation: LottieAnimationCommon): DotLottieCommon;
    /**
     * Inlines all assets of the passed animation
     * @param animation - Animation whose asset are to be inlined
     * @returns LottieAnimationCommon with inlined assets
     */
    private _findAssetsAndInline;
    /**
     * Returns the desired animation
     * @param animationId - desired animation id
     * @param inlineAssets - if true will inline the assets inside the data of the LottieAnimation
     * @returns
     */
    getAnimation(animationId: string, options?: GetAnimationOptions): Promise<LottieAnimationCommon | undefined>;
    getAnimations(): Array<[string, LottieAnimationCommon]> | undefined;
    removeAnimation(animationId: string): DotLottieCommon;
    getImages(): LottieImageCommon[];
    getAudio(): LottieAudioCommon[];
    getTheme(themeId: string): LottieThemeCommon | undefined;
    protected _buildManifest(): Manifest;
    /**
     * Constructs the manifest and calls toJSON on the animations
     * so the data is fetched for every animation.
     *
     * @returns DotLottie context
     */
    build(): Promise<DotLottieCommon>;
    toBlob(options?: ConversionOptions | undefined): Promise<Blob>;
    /**
     * Creates a DotLottie instance from a url to a dotlottie file
     * @param url - url to the dotlottie file
     * @returns DotLottie instance
     */
    fromURL(url: string): Promise<DotLottieCommon>;
    merge(...dotlotties: DotLottieCommon[]): DotLottieCommon;
    addTheme(themeOptions: ThemeOptions): DotLottieCommon;
    removeTheme(id: string): DotLottieCommon;
    assignTheme({ animationId, themeId }: {
        animationId: string;
        themeId: string;
    }): DotLottieCommon;
    unassignTheme({ animationId, themeId }: {
        animationId: string;
        themeId: string;
    }): DotLottieCommon;
    addStateMachine(stateMachineOptions: DotLottieStateMachineCommonOptions): DotLottieCommon;
    getStateMachine(stateId: string): DotLottieStateMachineCommon | undefined;
    removeStateMachine(stateMachineId: string): DotLottieCommon;
    protected _requireValidAuthor(author: string | undefined): asserts author is string;
    protected _requireValidDescription(description: string | undefined): asserts description is string;
    protected _requireValidGenerator(generator: string | undefined): asserts generator is string;
    protected _requireValidKeywords(keywords: string | undefined): asserts keywords is string;
    protected _requireValidVersion(version: string | undefined): asserts version is string;
    protected _requireValidCustomData(customData: Record<string, unknown> | undefined): asserts customData is Record<string, unknown>;
}

export { ConversionOptions as C, DotLottieCommon as D, GetAnimationOptions as G, DotLottieOptions as a, DotLottiePlugin as b };
