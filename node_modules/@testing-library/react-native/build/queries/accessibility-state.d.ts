import type { ReactTestInstance } from 'react-test-renderer';
import { AccessibilityStateMatcher } from '../helpers/matchers/match-accessibility-state';
import type { FindAllByQuery, FindByQuery, GetAllByQuery, GetByQuery, QueryAllByQuery, QueryByQuery } from './make-queries';
import { CommonQueryOptions } from './options';
export type ByA11yStateQueries = {
    getByA11yState: GetByQuery<AccessibilityStateMatcher, CommonQueryOptions>;
    getAllByA11yState: GetAllByQuery<AccessibilityStateMatcher, CommonQueryOptions>;
    queryByA11yState: QueryByQuery<AccessibilityStateMatcher, CommonQueryOptions>;
    queryAllByA11yState: QueryAllByQuery<AccessibilityStateMatcher, CommonQueryOptions>;
    findByA11yState: FindByQuery<AccessibilityStateMatcher, CommonQueryOptions>;
    findAllByA11yState: FindAllByQuery<AccessibilityStateMatcher, CommonQueryOptions>;
    getByAccessibilityState: GetByQuery<AccessibilityStateMatcher, CommonQueryOptions>;
    getAllByAccessibilityState: GetAllByQuery<AccessibilityStateMatcher, CommonQueryOptions>;
    queryByAccessibilityState: QueryByQuery<AccessibilityStateMatcher, CommonQueryOptions>;
    queryAllByAccessibilityState: QueryAllByQuery<AccessibilityStateMatcher, CommonQueryOptions>;
    findByAccessibilityState: FindByQuery<AccessibilityStateMatcher, CommonQueryOptions>;
    findAllByAccessibilityState: FindAllByQuery<AccessibilityStateMatcher, CommonQueryOptions>;
};
export declare const bindByA11yStateQueries: (instance: ReactTestInstance) => ByA11yStateQueries;
