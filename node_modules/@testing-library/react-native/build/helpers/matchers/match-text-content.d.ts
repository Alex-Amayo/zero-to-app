import type { ReactTestInstance } from 'react-test-renderer';
import { TextMatch, TextMatchOptions } from '../../matches';
/**
 * Matches the given node's text content against string or regex matcher.
 *
 * @param node - Node which text content will be matched
 * @param text - The string or regex to match.
 * @returns - Whether the node's text content matches the given string or regex.
 */
export declare function matchTextContent(node: ReactTestInstance, text: TextMatch, options?: TextMatchOptions): boolean;
