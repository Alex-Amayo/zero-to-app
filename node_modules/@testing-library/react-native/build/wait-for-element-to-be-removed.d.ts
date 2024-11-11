import type { WaitForOptions } from './wait-for';
export default function waitForElementToBeRemoved<T>(expectation: () => T, options?: WaitForOptions): Promise<T>;
