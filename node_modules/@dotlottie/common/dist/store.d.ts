import { Signal } from '@preact/signals-core';

/**
 * Copyright 2023 Design Barn Inc.
 */

declare class Store<T> {
    protected _state: Signal<T>;
    protected _prevState: T;
    constructor(initialState: T);
    setState(state: T): void;
    subscribe(callback: (value: T, prevValue: T) => void): () => void;
}

export { Store };
