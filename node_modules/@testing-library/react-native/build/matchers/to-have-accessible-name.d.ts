import type { ReactTestInstance } from 'react-test-renderer';
import { TextMatch, TextMatchOptions } from '../matches';
export declare function toHaveAccessibleName(this: jest.MatcherContext, element: ReactTestInstance, expectedName?: TextMatch, options?: TextMatchOptions): {
    pass: boolean;
    message: () => string;
};
