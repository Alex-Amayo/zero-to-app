import { ReactTestInstance } from 'react-test-renderer';
import { setup } from './setup';
import { PressOptions } from './press';
import { TypeOptions } from './type';
import { ScrollToOptions } from './scroll';
export { UserEventConfig } from './setup';
export declare const userEvent: {
    setup: typeof setup;
    press: (element: ReactTestInstance) => Promise<void>;
    longPress: (element: ReactTestInstance, options?: PressOptions) => Promise<void>;
    type: (element: ReactTestInstance, text: string, options?: TypeOptions) => Promise<void>;
    clear: (element: ReactTestInstance) => Promise<void>;
    paste: (element: ReactTestInstance, text: string) => Promise<void>;
    scrollTo: (element: ReactTestInstance, options: ScrollToOptions) => Promise<void>;
};
