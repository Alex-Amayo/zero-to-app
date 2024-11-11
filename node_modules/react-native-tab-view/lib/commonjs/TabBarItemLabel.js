"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TabBarItemLabel = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const TabBarItemLabel = /*#__PURE__*/_react.default.memo(_ref => {
  let {
    color,
    label,
    labelStyle,
    icon
  } = _ref;
  if (!label) {
    return null;
  }
  return /*#__PURE__*/_react.default.createElement(_reactNative.Animated.Text, {
    style: [styles.label, icon ? {
      marginTop: 0
    } : null, labelStyle, {
      color: color
    }]
  }, label);
});
exports.TabBarItemLabel = TabBarItemLabel;
const styles = _reactNative.StyleSheet.create({
  label: {
    margin: 4,
    backgroundColor: 'transparent',
    textTransform: 'uppercase'
  }
});
//# sourceMappingURL=TabBarItemLabel.js.map