import type { ReactTestInstance } from 'react-test-renderer';
import { TextMatch, TextMatchOptions } from '../matches';
export declare function toHaveDisplayValue(this: jest.MatcherContext, element: ReactTestInstance, expectedValue: TextMatch, options?: TextMatchOptions): {
    pass: boolean;
    message: () => string;
};
