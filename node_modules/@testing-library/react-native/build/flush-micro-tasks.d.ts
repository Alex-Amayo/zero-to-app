export declare function flushMicroTasks(): Promise<unknown>;
/**
 * @deprecated To be removed in the next major release.
 */
type Thenable<T> = {
    then: (callback: () => T) => unknown;
};
/**
 * This legacy implementation of `flushMicroTasks` is used for compatibility with
 * older versions of React Native (pre 0.71) which uses Promise polyfil.
 *
 * For users with older version of React Native there is a workaround of using our own
 * Jest preset instead the `react-native` one, but requiring such change would be a
 * breaking change for existing users.
 *
 * @deprecated To be removed in the next major release.
 */
export declare function flushMicroTasksLegacy(): Thenable<void>;
export {};
