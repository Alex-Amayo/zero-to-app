import { ReactTestInstance } from 'react-test-renderer';
import { HostTestInstance } from './component-tree';
interface FindAllOptions {
    /** Match elements hidden from accessibility */
    includeHiddenElements?: boolean;
    /** RTL-compatible alias to `includeHiddenElements` */
    hidden?: boolean;
    matchDeepestOnly?: boolean;
}
export declare function findAll(root: ReactTestInstance, predicate: (element: ReactTestInstance) => boolean, options?: FindAllOptions): HostTestInstance[];
export {};
