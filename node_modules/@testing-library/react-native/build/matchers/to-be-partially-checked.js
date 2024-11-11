"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toBePartiallyChecked = toBePartiallyChecked;
var _jestMatcherUtils = require("jest-matcher-utils");
var _accessibility = require("../helpers/accessibility");
var _errors = require("../helpers/errors");
var _utils = require("./utils");
function toBePartiallyChecked(element) {
  (0, _utils.checkHostElement)(element, toBePartiallyChecked, this);
  if (!hasValidAccessibilityRole(element)) {
    throw new _errors.ErrorWithStack('toBePartiallyChecked() works only on accessibility elements with "checkbox" role.', toBePartiallyChecked);
  }
  return {
    pass: (0, _accessibility.computeAriaChecked)(element) === 'mixed',
    message: () => {
      const is = this.isNot ? 'is' : 'is not';
      return [(0, _jestMatcherUtils.matcherHint)(`${this.isNot ? '.not' : ''}.toBePartiallyChecked`, 'element', ''), '', `Received element ${is} partially checked:`, (0, _utils.formatElement)(element)].join('\n');
    }
  };
}
function hasValidAccessibilityRole(element) {
  const role = (0, _accessibility.getRole)(element);
  return (0, _accessibility.isAccessibilityElement)(element) && role === 'checkbox';
}
//# sourceMappingURL=to-be-partially-checked.js.map