/**
 * Run given async callback with temporarily disabled `act` environment and flushes microtasks queue.
 *
 * @param callback Async callback to run
 * @returns Result of the callback
 */
export declare function wrapAsync<Result>(callback: () => Promise<Result>): Promise<Result>;
