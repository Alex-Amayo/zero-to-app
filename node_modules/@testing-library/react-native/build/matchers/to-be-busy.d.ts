import { ReactTestInstance } from 'react-test-renderer';
export declare function toBeBusy(this: jest.MatcherContext, element: ReactTestInstance): {
    pass: boolean;
    message: () => string;
};
