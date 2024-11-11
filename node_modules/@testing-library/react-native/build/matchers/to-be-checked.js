"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toBeChecked = toBeChecked;
var _jestMatcherUtils = require("jest-matcher-utils");
var _accessibility = require("../helpers/accessibility");
var _errors = require("../helpers/errors");
var _hostComponentNames = require("../helpers/host-component-names");
var _utils = require("./utils");
function toBeChecked(element) {
  (0, _utils.checkHostElement)(element, toBeChecked, this);
  if (!(0, _hostComponentNames.isHostSwitch)(element) && !isSupportedAccessibilityElement(element)) {
    throw new _errors.ErrorWithStack(`toBeChecked() works only on host "Switch" elements or accessibility elements with "checkbox", "radio" or "switch" role.`, toBeChecked);
  }
  return {
    pass: (0, _accessibility.computeAriaChecked)(element) === true,
    message: () => {
      const is = this.isNot ? 'is' : 'is not';
      return [(0, _jestMatcherUtils.matcherHint)(`${this.isNot ? '.not' : ''}.toBeChecked`, 'element', ''), '', `Received element ${is} checked:`, (0, _utils.formatElement)(element)].join('\n');
    }
  };
}
function isSupportedAccessibilityElement(element) {
  if (!(0, _accessibility.isAccessibilityElement)(element)) {
    return false;
  }
  const role = (0, _accessibility.getRole)(element);
  return _accessibility.rolesSupportingCheckedState[role];
}
//# sourceMappingURL=to-be-checked.js.map