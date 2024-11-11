"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.matchAccessibilityValue = matchAccessibilityValue;
var _accessibility = require("../accessibility");
var _matchStringProp = require("./match-string-prop");
function matchAccessibilityValue(node, matcher) {
  const value = (0, _accessibility.computeAriaValue)(node);
  return (matcher.min === undefined || matcher.min === value?.min) && (matcher.max === undefined || matcher.max === value?.max) && (matcher.now === undefined || matcher.now === value?.now) && (matcher.text === undefined || (0, _matchStringProp.matchStringProp)(value?.text, matcher.text));
}
//# sourceMappingURL=match-accessibility-value.js.map