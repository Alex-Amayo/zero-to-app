import type { ReactTestInstance } from 'react-test-renderer';
import { TextMatch, TextMatchOptions } from '../matches';
import type { FindAllByQuery, FindByQuery, GetAllByQuery, GetByQuery, QueryAllByQuery, QueryByQuery } from './make-queries';
import type { CommonQueryOptions } from './options';
type ByTextOptions = CommonQueryOptions & TextMatchOptions;
export type ByTextQueries = {
    getByText: GetByQuery<TextMatch, ByTextOptions>;
    getAllByText: GetAllByQuery<TextMatch, ByTextOptions>;
    queryByText: QueryByQuery<TextMatch, ByTextOptions>;
    queryAllByText: QueryAllByQuery<TextMatch, ByTextOptions>;
    findByText: FindByQuery<TextMatch, ByTextOptions>;
    findAllByText: FindAllByQuery<TextMatch, ByTextOptions>;
};
export declare const bindByTextQueries: (instance: ReactTestInstance) => ByTextQueries;
export {};
