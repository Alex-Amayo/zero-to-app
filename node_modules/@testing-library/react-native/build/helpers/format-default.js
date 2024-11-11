"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultMapProps = defaultMapProps;
var _reactNative = require("react-native");
var _object = require("./object");
const propsToDisplay = ['accessible', 'accessibilityElementsHidden', 'accessibilityHint', 'accessibilityLabel', 'accessibilityLabelledBy', 'accessibilityRole', 'accessibilityViewIsModal', 'alt', 'aria-busy', 'aria-checked', 'aria-disabled', 'aria-expanded', 'aria-hidden', 'aria-label', 'aria-labelledby', 'aria-modal', 'aria-selected', 'aria-valuemax', 'aria-valuemin', 'aria-valuenow', 'aria-valuetext', 'defaultValue', 'importantForAccessibility', 'nativeID', 'placeholder', 'role', 'testID', 'title', 'value'];

/**
 * Preserve props that are helpful in diagnosing test failures, while stripping rest
 */
function defaultMapProps(props) {
  const result = {};
  const styles = _reactNative.StyleSheet.flatten(props.style);
  const styleToDisplay = extractStyle(styles);
  if (styleToDisplay !== undefined) {
    result.style = styleToDisplay;
  }
  const accessibilityState = (0, _object.removeUndefinedKeys)(props.accessibilityState);
  if (accessibilityState !== undefined) {
    result.accessibilityState = accessibilityState;
  }
  const accessibilityValue = (0, _object.removeUndefinedKeys)(props.accessibilityValue);
  if (accessibilityValue !== undefined) {
    result.accessibilityValue = accessibilityValue;
  }
  propsToDisplay.forEach(propName => {
    if (propName in props) {
      result[propName] = props[propName];
    }
  });
  return result;
}
function extractStyle(style) {
  if (style == null) {
    return undefined;
  }
  const result = {};
  if (style.display === 'none') {
    result.display = 'none';
  }
  if (style.opacity === 0) {
    result.opacity = 0;
  }
  const hasAnyKeys = Object.keys(result).length > 0;
  return hasAnyKeys ? result : undefined;
}
//# sourceMappingURL=format-default.js.map