"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.matchAccessibilityState = matchAccessibilityState;
var _accessibility = require("../accessibility");
// This type is the same as AccessibilityState from `react-native` package
// It is re-declared here due to issues with migration from `@types/react-native` to
// built in `react-native` types.
// See: https://github.com/callstack/react-native-testing-library/issues/1351

function matchAccessibilityState(node, matcher) {
  if (matcher.busy !== undefined && matcher.busy !== (0, _accessibility.computeAriaBusy)(node)) {
    return false;
  }
  if (matcher.checked !== undefined && matcher.checked !== (0, _accessibility.computeAriaChecked)(node)) {
    return false;
  }
  if (matcher.disabled !== undefined && matcher.disabled !== (0, _accessibility.computeAriaDisabled)(node)) {
    return false;
  }
  if (matcher.expanded !== undefined && matcher.expanded !== (0, _accessibility.computeAriaExpanded)(node)) {
    return false;
  }
  if (matcher.selected !== undefined && matcher.selected !== (0, _accessibility.computeAriaSelected)(node)) {
    return false;
  }
  return true;
}
//# sourceMappingURL=match-accessibility-state.js.map