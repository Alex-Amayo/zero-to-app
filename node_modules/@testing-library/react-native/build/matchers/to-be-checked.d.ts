import type { ReactTestInstance } from 'react-test-renderer';
export declare function toBeChecked(this: jest.MatcherContext, element: ReactTestInstance): {
    pass: boolean;
    message: () => string;
};
