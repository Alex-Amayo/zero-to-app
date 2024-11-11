"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _pure = require("./pure");
Object.keys(_pure).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _pure[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _pure[key];
    }
  });
});
var _flushMicroTasks = require("./flush-micro-tasks");
var _act = require("./act");
if (!process?.env?.RNTL_SKIP_AUTO_CLEANUP) {
  // If we're running in a test runner that supports afterEach
  // then we'll automatically run cleanup afterEach test
  // this ensures that tests run in isolation from each other
  // if you don't like this then either import the `pure` module
  // or set the RNTL_SKIP_AUTO_CLEANUP env variable to 'true'.
  if (typeof afterEach === 'function') {
    // eslint-disable-next-line no-undef
    afterEach(async () => {
      await (0, _flushMicroTasks.flushMicroTasksLegacy)();
      (0, _pure.cleanup)();
    });
  }
  if (typeof beforeAll === 'function' && typeof afterAll === 'function') {
    // This matches the behavior of React < 18.
    let previousIsReactActEnvironment = (0, _act.getIsReactActEnvironment)();
    beforeAll(() => {
      previousIsReactActEnvironment = (0, _act.getIsReactActEnvironment)();
      (0, _act.setReactActEnvironment)(true);
    });
    afterAll(() => {
      (0, _act.setReactActEnvironment)(previousIsReactActEnvironment);
    });
  }
}
//# sourceMappingURL=index.js.map