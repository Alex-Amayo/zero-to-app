import { ReactTestInstance } from 'react-test-renderer';
/**
 * ReactTestInstance referring to host element.
 */
export type HostTestInstance = ReactTestInstance & {
    type: string;
};
/**
 * Checks if the given element is a host element.
 * @param element The element to check.
 */
export declare function isHostElement(element?: ReactTestInstance | null): element is HostTestInstance;
export declare function isElementMounted(element: ReactTestInstance | null): boolean;
/**
 * Returns first host ancestor for given element.
 * @param element The element start traversing from.
 */
export declare function getHostParent(element: ReactTestInstance | null): HostTestInstance | null;
/**
 * Returns host children for given element.
 * @param element The element start traversing from.
 */
export declare function getHostChildren(element: ReactTestInstance | null): HostTestInstance[];
/**
 * Return the array of host elements that represent the passed element.
 *
 * @param element The element start traversing from.
 * @returns If the passed element is a host element, it will return an array containing only that element,
 * if the passed element is a composite element, it will return an array containing its host children (zero, one or many).
 */
export declare function getHostSelves(element: ReactTestInstance | null): HostTestInstance[];
/**
 * Returns host siblings for given element.
 * @param element The element start traversing from.
 */
export declare function getHostSiblings(element: ReactTestInstance | null): HostTestInstance[];
/**
 * Returns the unsafe root element of the tree (probably composite).
 *
 * @param element The element start traversing from.
 * @returns The root element of the tree (host or composite).
 */
export declare function getUnsafeRootElement(element: ReactTestInstance | null): ReactTestInstance | null;
