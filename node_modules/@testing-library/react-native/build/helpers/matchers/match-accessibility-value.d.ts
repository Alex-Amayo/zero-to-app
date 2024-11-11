import { ReactTestInstance } from 'react-test-renderer';
import { TextMatch } from '../../matches';
export interface AccessibilityValueMatcher {
    min?: number;
    max?: number;
    now?: number;
    text?: TextMatch;
}
export declare function matchAccessibilityValue(node: ReactTestInstance, matcher: AccessibilityValueMatcher): boolean;
