import type { ReactTestInstance } from 'react-test-renderer';
import { TextMatch, TextMatchOptions } from '../matches';
export declare function toHaveTextContent(this: jest.MatcherContext, element: ReactTestInstance, expectedText: TextMatch, options?: TextMatchOptions): {
    pass: boolean;
    message: () => string;
};
