import { ReactTestInstance } from 'react-test-renderer';
/**
 * Basic dispatch event function used by User Event module.
 *
 * @param element element trigger event on
 * @param eventName name of the event
 * @param event event payload(s)
 */
export declare function dispatchEvent(element: ReactTestInstance, eventName: string, ...event: unknown[]): void;
