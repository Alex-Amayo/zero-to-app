import type { ReactTestInstance } from 'react-test-renderer';
import type { AccessibilityRole, Role } from 'react-native';
import { AccessibilityStateMatcher } from '../helpers/matchers/match-accessibility-state';
import { AccessibilityValueMatcher } from '../helpers/matchers/match-accessibility-value';
import type { TextMatch } from '../matches';
import { StringWithAutocomplete } from '../types';
import type { FindAllByQuery, FindByQuery, GetAllByQuery, GetByQuery, QueryAllByQuery, QueryByQuery } from './make-queries';
import { CommonQueryOptions } from './options';
export type ByRoleMatcher = StringWithAutocomplete<AccessibilityRole | Role> | RegExp;
export type ByRoleOptions = CommonQueryOptions & AccessibilityStateMatcher & {
    name?: TextMatch;
    value?: AccessibilityValueMatcher;
};
export type ByRoleQueries = {
    getByRole: GetByQuery<ByRoleMatcher, ByRoleOptions>;
    getAllByRole: GetAllByQuery<ByRoleMatcher, ByRoleOptions>;
    queryByRole: QueryByQuery<ByRoleMatcher, ByRoleOptions>;
    queryAllByRole: QueryAllByQuery<ByRoleMatcher, ByRoleOptions>;
    findByRole: FindByQuery<ByRoleMatcher, ByRoleOptions>;
    findAllByRole: FindAllByQuery<ByRoleMatcher, ByRoleOptions>;
};
export declare const bindByRoleQueries: (instance: ReactTestInstance) => ByRoleQueries;
