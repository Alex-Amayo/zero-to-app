import { useLayoutEffect } from 'react';
/**
 * Use `useEffect` during SSR and `useLayoutEffect` in the browser to avoid warnings.
 */
declare const useIsomorphicLayoutEffect: typeof useLayoutEffect;
export default useIsomorphicLayoutEffect;
