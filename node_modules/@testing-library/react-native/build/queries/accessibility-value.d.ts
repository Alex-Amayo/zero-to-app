import type { ReactTestInstance } from 'react-test-renderer';
import { AccessibilityValueMatcher } from '../helpers/matchers/match-accessibility-value';
import type { FindAllByQuery, FindByQuery, GetAllByQuery, GetByQuery, QueryAllByQuery, QueryByQuery } from './make-queries';
import { CommonQueryOptions } from './options';
export type ByA11yValueQueries = {
    getByA11yValue: GetByQuery<AccessibilityValueMatcher, CommonQueryOptions>;
    getAllByA11yValue: GetAllByQuery<AccessibilityValueMatcher, CommonQueryOptions>;
    queryByA11yValue: QueryByQuery<AccessibilityValueMatcher, CommonQueryOptions>;
    queryAllByA11yValue: QueryAllByQuery<AccessibilityValueMatcher, CommonQueryOptions>;
    findByA11yValue: FindByQuery<AccessibilityValueMatcher, CommonQueryOptions>;
    findAllByA11yValue: FindAllByQuery<AccessibilityValueMatcher, CommonQueryOptions>;
    getByAccessibilityValue: GetByQuery<AccessibilityValueMatcher, CommonQueryOptions>;
    getAllByAccessibilityValue: GetAllByQuery<AccessibilityValueMatcher, CommonQueryOptions>;
    queryByAccessibilityValue: QueryByQuery<AccessibilityValueMatcher, CommonQueryOptions>;
    queryAllByAccessibilityValue: QueryAllByQuery<AccessibilityValueMatcher, CommonQueryOptions>;
    findByAccessibilityValue: FindByQuery<AccessibilityValueMatcher, CommonQueryOptions>;
    findAllByAccessibilityValue: FindAllByQuery<AccessibilityValueMatcher, CommonQueryOptions>;
};
export declare const bindByA11yValueQueries: (instance: ReactTestInstance) => ByA11yValueQueries;
