"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getQueriesForElement = void 0;
exports.within = within;
var _text = require("./queries/text");
var _testId = require("./queries/test-id");
var _displayValue = require("./queries/display-value");
var _placeholderText = require("./queries/placeholder-text");
var _labelText = require("./queries/label-text");
var _hintText = require("./queries/hint-text");
var _role = require("./queries/role");
var _accessibilityState = require("./queries/accessibility-state");
var _accessibilityValue = require("./queries/accessibility-value");
var _unsafeType = require("./queries/unsafe-type");
var _unsafeProps = require("./queries/unsafe-props");
function within(instance) {
  return {
    ...(0, _text.bindByTextQueries)(instance),
    ...(0, _testId.bindByTestIdQueries)(instance),
    ...(0, _displayValue.bindByDisplayValueQueries)(instance),
    ...(0, _placeholderText.bindByPlaceholderTextQueries)(instance),
    ...(0, _labelText.bindByLabelTextQueries)(instance),
    ...(0, _hintText.bindByHintTextQueries)(instance),
    ...(0, _role.bindByRoleQueries)(instance),
    ...(0, _accessibilityState.bindByA11yStateQueries)(instance),
    ...(0, _accessibilityValue.bindByA11yValueQueries)(instance),
    ...(0, _unsafeType.bindUnsafeByTypeQueries)(instance),
    ...(0, _unsafeProps.bindUnsafeByPropsQueries)(instance)
  };
}
const getQueriesForElement = exports.getQueriesForElement = within;
//# sourceMappingURL=within.js.map