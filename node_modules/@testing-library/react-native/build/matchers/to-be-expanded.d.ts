import { ReactTestInstance } from 'react-test-renderer';
export declare function toBeExpanded(this: jest.MatcherContext, element: ReactTestInstance): {
    pass: boolean;
    message: () => string;
};
export declare function toBeCollapsed(this: jest.MatcherContext, element: ReactTestInstance): {
    pass: boolean;
    message: () => string;
};
