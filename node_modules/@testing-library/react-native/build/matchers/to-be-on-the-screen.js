"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toBeOnTheScreen = toBeOnTheScreen;
var _jestMatcherUtils = require("jest-matcher-utils");
var _componentTree = require("../helpers/component-tree");
var _screen = require("../screen");
var _utils = require("./utils");
function toBeOnTheScreen(element) {
  if (element !== null || !this.isNot) {
    (0, _utils.checkHostElement)(element, toBeOnTheScreen, this);
  }
  const pass = element === null ? false : _screen.screen.UNSAFE_root === (0, _componentTree.getUnsafeRootElement)(element);
  const errorFound = () => {
    return `expected element tree not to contain element, but found\n${(0, _utils.formatElement)(element)}`;
  };
  const errorNotFound = () => {
    return `element could not be found in the element tree`;
  };
  return {
    pass,
    message: () => {
      return [(0, _jestMatcherUtils.matcherHint)(`${this.isNot ? '.not' : ''}.toBeOnTheScreen`, 'element', ''), '', (0, _jestMatcherUtils.RECEIVED_COLOR)(this.isNot ? errorFound() : errorNotFound())].join('\n');
    }
  };
}
//# sourceMappingURL=to-be-on-the-screen.js.map