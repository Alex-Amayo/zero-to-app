import { ReactTestInstance } from 'react-test-renderer';
export interface AccessibilityStateMatcher {
    disabled?: boolean;
    selected?: boolean;
    checked?: boolean | 'mixed';
    busy?: boolean;
    expanded?: boolean;
}
export declare function matchAccessibilityState(node: ReactTestInstance, matcher: AccessibilityStateMatcher): boolean;
