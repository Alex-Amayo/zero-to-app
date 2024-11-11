import { AccessibilityRole, AccessibilityState, AccessibilityValue, Role } from 'react-native';
import { ReactTestInstance } from 'react-test-renderer';
type IsInaccessibleOptions = {
    cache?: WeakMap<ReactTestInstance, boolean>;
};
export declare const accessibilityStateKeys: (keyof AccessibilityState)[];
export declare const accessibilityValueKeys: (keyof AccessibilityValue)[];
export declare function isHiddenFromAccessibility(element: ReactTestInstance | null, { cache }?: IsInaccessibleOptions): boolean;
/** RTL-compatibility alias for `isHiddenFromAccessibility` */
export declare const isInaccessible: typeof isHiddenFromAccessibility;
export declare function isAccessibilityElement(element: ReactTestInstance | null): boolean;
/**
 * Returns the accessibility role for given element. It will return explicit
 * role from either `role` or `accessibilityRole` props if set.
 *
 * If explicit role is not available, it would try to return default element
 * role:
 * - `text` for `Text` elements
 *
 * In all other cases this functions returns `none`.
 *
 * @param element
 * @returns
 */
export declare function getRole(element: ReactTestInstance): Role | AccessibilityRole;
/**
 * There are some duplications between (ARIA) `Role` and `AccessibilityRole` types.
 * Resolve them by using ARIA `Role` type where possible.
 *
 * @param role Role to normalize
 * @returns Normalized role
 */
export declare function normalizeRole(role: string): Role | AccessibilityRole;
export declare function computeAriaModal(element: ReactTestInstance): boolean | undefined;
export declare function computeAriaLabel(element: ReactTestInstance): string | undefined;
export declare function computeAriaLabelledBy(element: ReactTestInstance): string | undefined;
export declare function computeAriaBusy({ props }: ReactTestInstance): boolean;
export declare function computeAriaChecked(element: ReactTestInstance): AccessibilityState['checked'];
export declare function computeAriaDisabled(element: ReactTestInstance): boolean;
export declare function computeAriaExpanded({ props }: ReactTestInstance): boolean | undefined;
export declare function computeAriaSelected({ props }: ReactTestInstance): boolean;
export declare function computeAriaValue(element: ReactTestInstance): AccessibilityValue;
export declare function computeAccessibleName(element: ReactTestInstance): string | undefined;
type RoleSupportMap = Partial<Record<Role | AccessibilityRole, true>>;
export declare const rolesSupportingCheckedState: RoleSupportMap;
export {};
