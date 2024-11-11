"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNativeScreens = require("react-native-screens");
var _DelayedFreeze = _interopRequireDefault(require("./helpers/DelayedFreeze"));
var _ScreenStackNativeComponent = _interopRequireDefault(require("../fabric/ScreenStackNativeComponent"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); } // Native components
const NativeScreenStack = _ScreenStackNativeComponent.default;
function ScreenStack(props) {
  const {
    children,
    gestureDetectorBridge,
    ...rest
  } = props;
  const ref = _react.default.useRef(null);
  const size = _react.default.Children.count(children);
  // freezes all screens except the top one
  const childrenWithFreeze = _react.default.Children.map(children, (child, index) => {
    // @ts-expect-error it's either SceneView in v6 or RouteView in v5
    const {
      props,
      key
    } = child;
    const descriptor = props?.descriptor ?? props?.descriptors?.[key];
    const isFreezeEnabled = descriptor?.options?.freezeOnBlur ?? (0, _reactNativeScreens.freezeEnabled)();
    return /*#__PURE__*/_react.default.createElement(_DelayedFreeze.default, {
      freeze: isFreezeEnabled && size - index > 1
    }, child);
  });
  _react.default.useEffect(() => {
    if (gestureDetectorBridge) {
      gestureDetectorBridge.current.stackUseEffectCallback(ref);
    }
  });
  return /*#__PURE__*/_react.default.createElement(NativeScreenStack, _extends({}, rest, {
    ref: ref
  }), childrenWithFreeze);
}
var _default = exports.default = ScreenStack;
//# sourceMappingURL=ScreenStack.js.map