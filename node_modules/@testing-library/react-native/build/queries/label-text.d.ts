import type { ReactTestInstance } from 'react-test-renderer';
import { TextMatch, TextMatchOptions } from '../matches';
import type { FindAllByQuery, FindByQuery, GetAllByQuery, GetByQuery, QueryAllByQuery, QueryByQuery } from './make-queries';
import { CommonQueryOptions } from './options';
type ByLabelTextOptions = CommonQueryOptions & TextMatchOptions;
export type ByLabelTextQueries = {
    getByLabelText: GetByQuery<TextMatch, ByLabelTextOptions>;
    getAllByLabelText: GetAllByQuery<TextMatch, ByLabelTextOptions>;
    queryByLabelText: QueryByQuery<TextMatch, ByLabelTextOptions>;
    queryAllByLabelText: QueryAllByQuery<TextMatch, ByLabelTextOptions>;
    findByLabelText: FindByQuery<TextMatch, ByLabelTextOptions>;
    findAllByLabelText: FindAllByQuery<TextMatch, ByLabelTextOptions>;
};
export declare const bindByLabelTextQueries: (instance: ReactTestInstance) => ByLabelTextQueries;
export {};
