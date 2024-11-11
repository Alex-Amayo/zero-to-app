import { DebugOptions } from './helpers/debug-deep';
/**
 * Global configuration options for React Native Testing Library.
 */
export type Config = {
    /** Default timeout, in ms, for `waitFor` and `findBy*` queries. */
    asyncUtilTimeout: number;
    /** Default value for `includeHiddenElements` query option. */
    defaultIncludeHiddenElements: boolean;
    /** Default options for `debug` helper. */
    defaultDebugOptions?: Partial<DebugOptions>;
    /**
     * Set to `true` to enable concurrent rendering.
     * Otherwise `render` will default to legacy synchronous rendering.
     */
    concurrentRoot: boolean;
};
export type ConfigAliasOptions = {
    /** RTL-compatibility alias to `defaultIncludeHiddenElements` */
    defaultHidden: boolean;
};
export type HostComponentNames = {
    text: string;
    textInput: string;
    image: string;
    switch: string;
    scrollView: string;
    modal: string;
};
export type InternalConfig = Config & {
    /** Names for key React Native host components. */
    hostComponentNames?: HostComponentNames;
};
/**
 * Configure global options for React Native Testing Library.
 */
export declare function configure(options: Partial<Config & ConfigAliasOptions>): void;
export declare function configureInternal(option: Partial<InternalConfig>): void;
export declare function resetToDefaults(): void;
export declare function getConfig(): {
    /** Default timeout, in ms, for `waitFor` and `findBy*` queries. */
    asyncUtilTimeout: number;
    /** Default value for `includeHiddenElements` query option. */
    defaultIncludeHiddenElements: boolean;
    /** Default options for `debug` helper. */
    defaultDebugOptions?: Partial<DebugOptions>;
    /**
     * Set to `true` to enable concurrent rendering.
     * Otherwise `render` will default to legacy synchronous rendering.
     */
    concurrentRoot: boolean;
    /** Names for key React Native host components. */
    hostComponentNames?: HostComponentNames;
};
