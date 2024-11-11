type CleanUpFunction = () => void;
export default function cleanup(): void;
export declare function addToCleanupQueue(fn: CleanUpFunction): void;
export {};
