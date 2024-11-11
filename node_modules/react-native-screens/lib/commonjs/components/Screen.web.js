"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ScreenContext = exports.NativeScreen = exports.InnerScreen = void 0;
var _reactNative = require("react-native");
var _react = _interopRequireDefault(require("react"));
var _core = require("../core");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
const InnerScreen = exports.InnerScreen = _reactNative.View;

// We're using class component here because of the error from reanimated:
// createAnimatedComponent` does not support stateless functional components; use a class component instead.
class NativeScreen extends _react.default.Component {
  render() {
    let {
      active,
      activityState,
      style,
      enabled = (0, _core.screensEnabled)(),
      ...rest
    } = this.props;
    if (enabled) {
      if (active !== undefined && activityState === undefined) {
        activityState = active !== 0 ? 2 : 0; // change taken from index.native.tsx
      }

      return /*#__PURE__*/_react.default.createElement(_reactNative.View
      // @ts-expect-error: hidden exists on web, but not in React Native
      , _extends({
        hidden: activityState === 0,
        style: [style, {
          display: activityState !== 0 ? 'flex' : 'none'
        }]
      }, rest));
    }
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, rest);
  }
}
exports.NativeScreen = NativeScreen;
const Screen = _reactNative.Animated.createAnimatedComponent(NativeScreen);
const ScreenContext = exports.ScreenContext = /*#__PURE__*/_react.default.createContext(Screen);
var _default = exports.default = Screen;
//# sourceMappingURL=Screen.web.js.map