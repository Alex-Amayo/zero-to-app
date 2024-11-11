"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = debugDeep;
var _format = _interopRequireDefault(require("./format"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/**
 * Log pretty-printed deep test component instance
 */
function debugDeep(instance, options) {
  const message = typeof options === 'string' ? options : options?.message;
  const formatOptions = typeof options === 'object' ? {
    mapProps: options?.mapProps
  } : undefined;
  if (message) {
    // eslint-disable-next-line no-console
    console.log(`${message}\n\n`, (0, _format.default)(instance, formatOptions));
  } else {
    // eslint-disable-next-line no-console
    console.log((0, _format.default)(instance, formatOptions));
  }
}
//# sourceMappingURL=debug-deep.js.map