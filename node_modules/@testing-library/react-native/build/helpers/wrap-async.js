"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.wrapAsync = wrapAsync;
var _act = _interopRequireWildcard(require("../act"));
var _flushMicroTasks = require("../flush-micro-tasks");
var _reactVersions = require("../react-versions");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
/* istanbul ignore file */

/**
 * Run given async callback with temporarily disabled `act` environment and flushes microtasks queue.
 *
 * @param callback Async callback to run
 * @returns Result of the callback
 */
async function wrapAsync(callback) {
  if ((0, _reactVersions.checkReactVersionAtLeast)(18, 0)) {
    const previousActEnvironment = (0, _act.getIsReactActEnvironment)();
    (0, _act.setReactActEnvironment)(false);
    try {
      const result = await callback();
      // Flush the microtask queue before restoring the `act` environment
      await (0, _flushMicroTasks.flushMicroTasksLegacy)();
      return result;
    } finally {
      (0, _act.setReactActEnvironment)(previousActEnvironment);
    }
  }
  if (!(0, _reactVersions.checkReactVersionAtLeast)(16, 9)) {
    return callback();
  }

  // Wrapping with act for react version 16.9 to 17.x
  let result;
  await (0, _act.default)(async () => {
    result = await callback();
  });

  // Either we have result or `callback` threw error
  return result;
}
//# sourceMappingURL=wrap-async.js.map