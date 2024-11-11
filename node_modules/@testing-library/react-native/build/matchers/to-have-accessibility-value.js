"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toHaveAccessibilityValue = toHaveAccessibilityValue;
var _jestMatcherUtils = require("jest-matcher-utils");
var _accessibility = require("../helpers/accessibility");
var _matchAccessibilityValue = require("../helpers/matchers/match-accessibility-value");
var _object = require("../helpers/object");
var _utils = require("./utils");
function toHaveAccessibilityValue(element, expectedValue) {
  (0, _utils.checkHostElement)(element, toHaveAccessibilityValue, this);
  const receivedValue = (0, _accessibility.computeAriaValue)(element);
  return {
    pass: (0, _matchAccessibilityValue.matchAccessibilityValue)(element, expectedValue),
    message: () => {
      const matcher = (0, _jestMatcherUtils.matcherHint)(`${this.isNot ? '.not' : ''}.toHaveAccessibilityValue`, 'element', (0, _jestMatcherUtils.stringify)(expectedValue));
      return (0, _utils.formatMessage)(matcher, `Expected the element ${this.isNot ? 'not to' : 'to'} have accessibility value`, (0, _jestMatcherUtils.stringify)(expectedValue), 'Received element with accessibility value', (0, _jestMatcherUtils.stringify)((0, _object.removeUndefinedKeys)(receivedValue)));
    }
  };
}
//# sourceMappingURL=to-have-accessibility-value.js.map