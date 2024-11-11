import type { ReactTestInstance } from 'react-test-renderer';
import { TextMatch, TextMatchOptions } from '../matches';
import type { FindAllByQuery, FindByQuery, GetAllByQuery, GetByQuery, QueryAllByQuery, QueryByQuery } from './make-queries';
import type { CommonQueryOptions } from './options';
type ByPlaceholderTextOptions = CommonQueryOptions & TextMatchOptions;
export type ByPlaceholderTextQueries = {
    getByPlaceholderText: GetByQuery<TextMatch, ByPlaceholderTextOptions>;
    getAllByPlaceholderText: GetAllByQuery<TextMatch, ByPlaceholderTextOptions>;
    queryByPlaceholderText: QueryByQuery<TextMatch, ByPlaceholderTextOptions>;
    queryAllByPlaceholderText: QueryAllByQuery<TextMatch, ByPlaceholderTextOptions>;
    findByPlaceholderText: FindByQuery<TextMatch, ByPlaceholderTextOptions>;
    findAllByPlaceholderText: FindAllByQuery<TextMatch, ByPlaceholderTextOptions>;
};
export declare const bindByPlaceholderTextQueries: (instance: ReactTestInstance) => ByPlaceholderTextQueries;
export {};
