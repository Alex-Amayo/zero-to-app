"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
/**
 * Use `useEffect` during SSR and `useLayoutEffect` in the browser to avoid warnings.
 */
var useIsomorphicLayoutEffect = typeof document !== 'undefined' ? react_1.useLayoutEffect : react_1.useEffect;
exports.default = useIsomorphicLayoutEffect;
