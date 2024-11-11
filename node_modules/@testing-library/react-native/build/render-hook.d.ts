import type { ComponentType } from 'react';
export type RenderHookResult<Result, Props> = {
    rerender: (props: Props) => void;
    result: {
        current: Result;
    };
    unmount: () => void;
};
export type RenderHookOptions<Props> = {
    initialProps?: Props;
    wrapper?: ComponentType<any>;
};
export declare function renderHook<Result, Props>(renderCallback: (props: Props) => Result, options?: RenderHookOptions<Props>): RenderHookResult<Result, Props>;
