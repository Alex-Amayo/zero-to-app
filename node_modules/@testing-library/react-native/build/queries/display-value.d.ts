import type { ReactTestInstance } from 'react-test-renderer';
import { TextMatch, TextMatchOptions } from '../matches';
import type { FindAllByQuery, FindByQuery, GetAllByQuery, GetByQuery, QueryAllByQuery, QueryByQuery } from './make-queries';
import type { CommonQueryOptions } from './options';
type ByDisplayValueOptions = CommonQueryOptions & TextMatchOptions;
export type ByDisplayValueQueries = {
    getByDisplayValue: GetByQuery<TextMatch, ByDisplayValueOptions>;
    getAllByDisplayValue: GetAllByQuery<TextMatch, ByDisplayValueOptions>;
    queryByDisplayValue: QueryByQuery<TextMatch, ByDisplayValueOptions>;
    queryAllByDisplayValue: QueryAllByQuery<TextMatch, ByDisplayValueOptions>;
    findByDisplayValue: FindByQuery<TextMatch, ByDisplayValueOptions>;
    findAllByDisplayValue: FindAllByQuery<TextMatch, ByDisplayValueOptions>;
};
export declare const bindByDisplayValueQueries: (instance: ReactTestInstance) => ByDisplayValueQueries;
export {};
