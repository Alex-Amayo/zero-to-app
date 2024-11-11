import type { ReactTestInstance } from 'react-test-renderer';
import { TextMatch, TextMatchOptions } from '../matches';
import type { FindAllByQuery, FindByQuery, GetAllByQuery, GetByQuery, QueryAllByQuery, QueryByQuery } from './make-queries';
import type { CommonQueryOptions } from './options';
type ByTestIdOptions = CommonQueryOptions & TextMatchOptions;
export type ByTestIdQueries = {
    getByTestId: GetByQuery<TextMatch, ByTestIdOptions>;
    getAllByTestId: GetAllByQuery<TextMatch, ByTestIdOptions>;
    queryByTestId: QueryByQuery<TextMatch, ByTestIdOptions>;
    queryAllByTestId: QueryAllByQuery<TextMatch, ByTestIdOptions>;
    findByTestId: FindByQuery<TextMatch, ByTestIdOptions>;
    findAllByTestId: FindAllByQuery<TextMatch, ByTestIdOptions>;
};
export declare const bindByTestIdQueries: (instance: ReactTestInstance) => ByTestIdQueries;
export {};
