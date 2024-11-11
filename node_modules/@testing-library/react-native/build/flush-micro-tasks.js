"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.flushMicroTasks = flushMicroTasks;
exports.flushMicroTasksLegacy = flushMicroTasksLegacy;
var _timers = require("./helpers/timers");
function flushMicroTasks() {
  return new Promise(resolve => (0, _timers.setImmediate)(resolve));
}

/**
 * @deprecated To be removed in the next major release.
 */

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
function flushMicroTasksLegacy() {
  return {
    // using "thenable" instead of a Promise, because otherwise it breaks when
    // using "modern" fake timers
    then(resolve) {
      (0, _timers.setImmediate)(resolve);
    }
  };
}
//# sourceMappingURL=flush-micro-tasks.js.map