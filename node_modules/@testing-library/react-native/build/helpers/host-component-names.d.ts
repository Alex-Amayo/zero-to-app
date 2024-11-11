import { ReactTestInstance } from 'react-test-renderer';
import { HostComponentNames } from '../config';
import { HostTestInstance } from './component-tree';
export declare function getHostComponentNames(): HostComponentNames;
export declare function configureHostComponentNamesIfNeeded(): void;
/**
 * Checks if the given element is a host Text element.
 * @param element The element to check.
 */
export declare function isHostText(element?: ReactTestInstance | null): element is HostTestInstance;
/**
 * Checks if the given element is a host TextInput element.
 * @param element The element to check.
 */
export declare function isHostTextInput(element?: ReactTestInstance | null): element is HostTestInstance;
/**
 * Checks if the given element is a host Image element.
 * @param element The element to check.
 */
export declare function isHostImage(element?: ReactTestInstance | null): element is HostTestInstance;
/**
 * Checks if the given element is a host Switch element.
 * @param element The element to check.
 */
export declare function isHostSwitch(element?: ReactTestInstance | null): element is HostTestInstance;
/**
 * Checks if the given element is a host ScrollView element.
 * @param element The element to check.
 */
export declare function isHostScrollView(element?: ReactTestInstance | null): element is HostTestInstance;
/**
 * Checks if the given element is a host Modal element.
 * @param element The element to check.
 */
export declare function isHostModal(element?: ReactTestInstance | null): element is HostTestInstance;
