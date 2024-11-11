"use strict";

var _toBeOnTheScreen = require("./to-be-on-the-screen");
var _toBeChecked = require("./to-be-checked");
var _toBeDisabled = require("./to-be-disabled");
var _toBeBusy = require("./to-be-busy");
var _toBeEmptyElement = require("./to-be-empty-element");
var _toBeExpanded = require("./to-be-expanded");
var _toBePartiallyChecked = require("./to-be-partially-checked");
var _toBeSelected = require("./to-be-selected");
var _toBeVisible = require("./to-be-visible");
var _toContainElement = require("./to-contain-element");
var _toHaveAccessibilityValue = require("./to-have-accessibility-value");
var _toHaveAccessibleName = require("./to-have-accessible-name");
var _toHaveDisplayValue = require("./to-have-display-value");
var _toHaveProp = require("./to-have-prop");
var _toHaveStyle = require("./to-have-style");
var _toHaveTextContent = require("./to-have-text-content");
expect.extend({
  toBeOnTheScreen: _toBeOnTheScreen.toBeOnTheScreen,
  toBeChecked: _toBeChecked.toBeChecked,
  toBeCollapsed: _toBeExpanded.toBeCollapsed,
  toBeDisabled: _toBeDisabled.toBeDisabled,
  toBeBusy: _toBeBusy.toBeBusy,
  toBeEmptyElement: _toBeEmptyElement.toBeEmptyElement,
  toBeEnabled: _toBeDisabled.toBeEnabled,
  toBeExpanded: _toBeExpanded.toBeExpanded,
  toBePartiallyChecked: _toBePartiallyChecked.toBePartiallyChecked,
  toBeSelected: _toBeSelected.toBeSelected,
  toBeVisible: _toBeVisible.toBeVisible,
  toContainElement: _toContainElement.toContainElement,
  toHaveAccessibilityValue: _toHaveAccessibilityValue.toHaveAccessibilityValue,
  toHaveAccessibleName: _toHaveAccessibleName.toHaveAccessibleName,
  toHaveDisplayValue: _toHaveDisplayValue.toHaveDisplayValue,
  toHaveProp: _toHaveProp.toHaveProp,
  toHaveStyle: _toHaveStyle.toHaveStyle,
  toHaveTextContent: _toHaveTextContent.toHaveTextContent
});
//# sourceMappingURL=extend-expect.js.map