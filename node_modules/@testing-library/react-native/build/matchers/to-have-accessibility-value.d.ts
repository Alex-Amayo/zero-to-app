import type { ReactTestInstance } from 'react-test-renderer';
import { AccessibilityValueMatcher } from '../helpers/matchers/match-accessibility-value';
export declare function toHaveAccessibilityValue(this: jest.MatcherContext, element: ReactTestInstance, expectedValue: AccessibilityValueMatcher): {
    pass: boolean;
    message: () => string;
};
