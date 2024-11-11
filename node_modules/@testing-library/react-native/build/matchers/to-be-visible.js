"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toBeVisible = toBeVisible;
var _jestMatcherUtils = require("jest-matcher-utils");
var _reactNative = require("react-native");
var _accessibility = require("../helpers/accessibility");
var _componentTree = require("../helpers/component-tree");
var _hostComponentNames = require("../helpers/host-component-names");
var _utils = require("./utils");
function toBeVisible(element) {
  if (element !== null || !this.isNot) {
    (0, _utils.checkHostElement)(element, toBeVisible, this);
  }
  return {
    pass: isElementVisible(element),
    message: () => {
      const is = this.isNot ? 'is' : 'is not';
      return [(0, _jestMatcherUtils.matcherHint)(`${this.isNot ? '.not' : ''}.toBeVisible`, 'element', ''), '', `Received element ${is} visible:`, (0, _utils.formatElement)(element)].join('\n');
    }
  };
}
function isElementVisible(element, accessibilityCache) {
  // Use cache to speed up repeated searches by `isHiddenFromAccessibility`.
  const cache = accessibilityCache ?? new WeakMap();
  if ((0, _accessibility.isHiddenFromAccessibility)(element, {
    cache
  })) {
    return false;
  }
  if (isHiddenForStyles(element)) {
    return false;
  }

  // Note: this seems to be a bug in React Native.
  // PR with fix: https://github.com/facebook/react-native/pull/39157
  if ((0, _hostComponentNames.isHostModal)(element) && element.props.visible === false) {
    return false;
  }
  const hostParent = (0, _componentTree.getHostParent)(element);
  if (hostParent === null) {
    return true;
  }
  return isElementVisible(hostParent, cache);
}
function isHiddenForStyles(element) {
  const flatStyle = _reactNative.StyleSheet.flatten(element.props.style);
  return flatStyle?.display === 'none' || flatStyle?.opacity === 0;
}
//# sourceMappingURL=to-be-visible.js.map