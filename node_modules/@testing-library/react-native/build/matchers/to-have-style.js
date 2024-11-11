"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toHaveStyle = toHaveStyle;
var _reactNative = require("react-native");
var _jestMatcherUtils = require("jest-matcher-utils");
var _utils = require("./utils");
function toHaveStyle(element, style) {
  (0, _utils.checkHostElement)(element, toHaveStyle, this);
  const expected = _reactNative.StyleSheet.flatten(style) ?? {};
  const received = _reactNative.StyleSheet.flatten(element.props.style) ?? {};
  const pass = Object.keys(expected).every(key => this.equals(expected[key], received[key]));
  return {
    pass,
    message: () => {
      const to = this.isNot ? 'not to' : 'to';
      const matcher = (0, _jestMatcherUtils.matcherHint)(`${this.isNot ? '.not' : ''}.toHaveStyle`, 'element', '');
      if (pass) {
        return (0, _utils.formatMessage)(matcher, `Expected element ${to} have style`, formatStyles(expected), 'Received', formatStyles(pickReceivedStyles(expected, received)));
      } else {
        return [matcher, '', expectedDiff(expected, received)].join('\n');
      }
    }
  };
}

/**
 * Generate diff between `expected` and `received` styles.
 */
function expectedDiff(expected, received) {
  const receivedNarrow = pickReceivedStyles(expected, received);
  return (0, _jestMatcherUtils.diff)(formatStyles(expected), formatStyles(receivedNarrow));
}

/**
 * Pick from `received` style only the keys present in `expected` style.
 */
function pickReceivedStyles(expected, received) {
  const result = {};
  Object.keys(received).forEach(key => {
    if (expected[key] !== undefined) {
      result[key] = received[key];
    }
  });
  return result;
}
function formatStyles(style) {
  return Object.keys(style).sort().map(prop => Array.isArray(style[prop]) ? `${prop}: ${JSON.stringify(style[prop], null, 2)};` : `${prop}: ${style[prop]};`).join('\n');
}
//# sourceMappingURL=to-have-style.js.map