"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = waitForElementToBeRemoved;
var _waitFor = _interopRequireDefault(require("./wait-for"));
var _errors = require("./helpers/errors");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function isRemoved(result) {
  return !result || Array.isArray(result) && !result.length;
}
async function waitForElementToBeRemoved(expectation, options) {
  // Created here so we get a nice stacktrace
  const timeoutError = new _errors.ErrorWithStack('Timed out in waitForElementToBeRemoved.', waitForElementToBeRemoved);

  // Elements have to be present initally and then removed.
  const initialElements = expectation();
  if (isRemoved(initialElements)) {
    throw new _errors.ErrorWithStack('The element(s) given to waitForElementToBeRemoved are already removed. waitForElementToBeRemoved requires that the element(s) exist(s) before waiting for removal.', waitForElementToBeRemoved);
  }
  return await (0, _waitFor.default)(() => {
    let result;
    try {
      result = expectation();
    } catch {
      return initialElements;
    }
    if (!isRemoved(result)) {
      throw timeoutError;
    }
    return initialElements;
  }, options);
}
//# sourceMappingURL=wait-for-element-to-be-removed.js.map