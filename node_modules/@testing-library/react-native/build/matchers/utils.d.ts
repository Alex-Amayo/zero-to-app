import { ReactTestInstance } from 'react-test-renderer';
/**
 * Throws HostElementTypeError if passed element is not a host element.
 *
 * @param element ReactTestInstance to check.
 * @param matcherFn Matcher function calling the check used for formatting error.
 * @param context Jest matcher context used for formatting error.
 */
export declare function checkHostElement(element: ReactTestInstance | null | undefined, matcherFn: jest.CustomMatcher, context: jest.MatcherContext): asserts element is ReactTestInstance;
/***
 * Format given element as a pretty-printed string.
 *
 * @param element Element to format.
 */
export declare function formatElement(element: ReactTestInstance | null): string;
export declare function formatElementArray(elements: ReactTestInstance[]): string;
export declare function formatMessage(matcher: string, expectedLabel: string, expectedValue: string | RegExp | null | undefined, receivedLabel: string, receivedValue: string | null | undefined): string;
