export type NormalizerFn = (textToNormalize: string) => string;
export type TextMatch = string | RegExp;
export type TextMatchOptions = {
    exact?: boolean;
    normalizer?: NormalizerFn;
};
export declare function matches(matcher: TextMatch, text: string | undefined, normalizer?: NormalizerFn, exact?: boolean): boolean;
type NormalizerConfig = {
    trim?: boolean;
    collapseWhitespace?: boolean;
};
export declare function getDefaultNormalizer({ trim, collapseWhitespace, }?: NormalizerConfig): NormalizerFn;
export {};
