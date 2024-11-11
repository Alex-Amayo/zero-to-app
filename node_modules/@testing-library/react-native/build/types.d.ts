/**
 * Location of an element.
 */
export interface Point {
    y: number;
    x: number;
}
/**
 * Size of an element.
 */
export interface Size {
    height: number;
    width: number;
}
export type StringWithAutocomplete<T> = T | (string & {});
