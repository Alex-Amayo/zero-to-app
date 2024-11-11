import type { ReactTestRendererJSON } from 'react-test-renderer';
export type MapPropsFunction = (props: Record<string, unknown>, node: ReactTestRendererJSON) => Record<string, unknown>;
export type FormatOptions = {
    mapProps?: MapPropsFunction;
};
declare const format: (input: ReactTestRendererJSON | ReactTestRendererJSON[], options?: FormatOptions) => string;
export default format;
