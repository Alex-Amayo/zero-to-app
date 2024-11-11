"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toBeDisabled = toBeDisabled;
exports.toBeEnabled = toBeEnabled;
var _jestMatcherUtils = require("jest-matcher-utils");
var _accessibility = require("../helpers/accessibility");
var _componentTree = require("../helpers/component-tree");
var _utils = require("./utils");
function toBeDisabled(element) {
  (0, _utils.checkHostElement)(element, toBeDisabled, this);
  const isDisabled = (0, _accessibility.computeAriaDisabled)(element) || isAncestorDisabled(element);
  return {
    pass: isDisabled,
    message: () => {
      const is = this.isNot ? 'is' : 'is not';
      return [(0, _jestMatcherUtils.matcherHint)(`${this.isNot ? '.not' : ''}.toBeDisabled`, 'element', ''), '', `Received element ${is} disabled:`, (0, _utils.formatElement)(element)].join('\n');
    }
  };
}
function toBeEnabled(element) {
  (0, _utils.checkHostElement)(element, toBeEnabled, this);
  const isEnabled = !(0, _accessibility.computeAriaDisabled)(element) && !isAncestorDisabled(element);
  return {
    pass: isEnabled,
    message: () => {
      const is = this.isNot ? 'is' : 'is not';
      return [(0, _jestMatcherUtils.matcherHint)(`${this.isNot ? '.not' : ''}.toBeEnabled`, 'element', ''), '', `Received element ${is} enabled:`, (0, _utils.formatElement)(element)].join('\n');
    }
  };
}
function isAncestorDisabled(element) {
  const parent = (0, _componentTree.getHostParent)(element);
  if (parent == null) {
    return false;
  }
  return (0, _accessibility.computeAriaDisabled)(parent) || isAncestorDisabled(parent);
}
//# sourceMappingURL=to-be-disabled.js.map