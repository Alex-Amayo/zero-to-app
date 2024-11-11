"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.getIsReactActEnvironment = getIsReactActEnvironment;
exports.setReactActEnvironment = setIsReactActEnvironment;
var _reactTestRenderer = require("react-test-renderer");
var _reactVersions = require("./react-versions");
// This file and the act() implementation is sourced from react-testing-library
// https://github.com/testing-library/react-testing-library/blob/c80809a956b0b9f3289c4a6fa8b5e8cc72d6ef6d/src/act-compat.js

// See https://github.com/reactwg/react-18/discussions/102 for more context on global.IS_REACT_ACT_ENVIRONMENT

function setIsReactActEnvironment(isReactActEnvironment) {
  globalThis.IS_REACT_ACT_ENVIRONMENT = isReactActEnvironment;
}
function getIsReactActEnvironment() {
  return globalThis.IS_REACT_ACT_ENVIRONMENT;
}
function withGlobalActEnvironment(actImplementation) {
  return callback => {
    const previousActEnvironment = getIsReactActEnvironment();
    setIsReactActEnvironment(true);

    // this code is riddled with eslint disabling comments because this doesn't use real promises but eslint thinks we do
    try {
      // The return value of `act` is always a thenable.
      let callbackNeedsToBeAwaited = false;
      const actResult = actImplementation(() => {
        const result = callback();
        if (result !== null && typeof result === 'object' &&
        // @ts-expect-error this should be a promise or thenable
        // eslint-disable-next-line promise/prefer-await-to-then
        typeof result.then === 'function') {
          callbackNeedsToBeAwaited = true;
        }
        return result;
      });
      if (callbackNeedsToBeAwaited) {
        const thenable = actResult;
        return {
          then: (resolve, reject) => {
            // eslint-disable-next-line
            thenable.then(
            // eslint-disable-next-line promise/always-return
            returnValue => {
              setIsReactActEnvironment(previousActEnvironment);
              resolve(returnValue);
            }, error => {
              setIsReactActEnvironment(previousActEnvironment);
              reject(error);
            });
          }
        };
      } else {
        setIsReactActEnvironment(previousActEnvironment);
        return actResult;
      }
    } catch (error) {
      // Can't be a `finally {}` block since we don't know if we have to immediately restore IS_REACT_ACT_ENVIRONMENT
      // or if we have to await the callback first.
      setIsReactActEnvironment(previousActEnvironment);
      throw error;
    }
  };
}
const act = (0, _reactVersions.checkReactVersionAtLeast)(18, 0) ? withGlobalActEnvironment(_reactTestRenderer.act) : _reactTestRenderer.act;
var _default = exports.default = act;
//# sourceMappingURL=act.js.map