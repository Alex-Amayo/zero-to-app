import { ReactTestInstance } from 'react-test-renderer';
import { UserEventInstance } from '../setup';
export declare const DEFAULT_MIN_PRESS_DURATION = 130;
export declare const DEFAULT_LONG_PRESS_DELAY_MS = 500;
export interface PressOptions {
    duration?: number;
}
export declare function press(this: UserEventInstance, element: ReactTestInstance): Promise<void>;
export declare function longPress(this: UserEventInstance, element: ReactTestInstance, options?: PressOptions): Promise<void>;
