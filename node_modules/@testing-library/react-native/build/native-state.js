"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.nativeState = void 0;
/**
 * Simulated native state for unmanaged controls.
 *
 * Values from `value` props (managed controls) should take precedence over these values.
 */

let nativeState = exports.nativeState = {
  valueForElement: new WeakMap(),
  contentOffsetForElement: new WeakMap()
};
//# sourceMappingURL=native-state.js.map