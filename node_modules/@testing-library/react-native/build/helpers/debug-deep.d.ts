import type { ReactTestRendererJSON } from 'react-test-renderer';
import { FormatOptions } from './format';
export type DebugOptions = {
    message?: string;
} & FormatOptions;
/**
 * Log pretty-printed deep test component instance
 */
export default function debugDeep(instance: ReactTestRendererJSON | ReactTestRendererJSON[], options?: DebugOptions | string): void;
