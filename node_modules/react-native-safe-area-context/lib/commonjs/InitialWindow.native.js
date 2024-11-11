"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initialWindowSafeAreaInsets = exports.initialWindowMetrics = void 0;
var _NativeSafeAreaContext = _interopRequireDefault(require("./specs/NativeSafeAreaContext"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const initialWindowMetrics = exports.initialWindowMetrics = _NativeSafeAreaContext.default?.getConstants?.()?.initialWindowMetrics ?? null;

/**
 * @deprecated
 */
const initialWindowSafeAreaInsets = exports.initialWindowSafeAreaInsets = initialWindowMetrics?.insets;
//# sourceMappingURL=InitialWindow.native.js.map