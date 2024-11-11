"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.wait = wait;
function wait(config, durationInMs) {
  const delay = durationInMs ?? config.delay;
  if (typeof delay !== 'number') {
    return;
  }
  return Promise.all([new Promise(resolve => globalThis.setTimeout(() => resolve(), delay)), config.advanceTimers(delay)]);
}
//# sourceMappingURL=wait.js.map