"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = GestureDetectorProvider;
var _react = _interopRequireDefault(require("react"));
var _reactNativeScreens = require("react-native-screens");
var _ScreenGestureDetector = _interopRequireDefault(require("./ScreenGestureDetector"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function GHWrapper(props) {
  return /*#__PURE__*/_react.default.createElement(_ScreenGestureDetector.default, props);
}
function GestureDetectorProvider(props) {
  return /*#__PURE__*/_react.default.createElement(_reactNativeScreens.GHContext.Provider, {
    value: GHWrapper
  }, props.children);
}
//# sourceMappingURL=GestureDetectorProvider.js.map