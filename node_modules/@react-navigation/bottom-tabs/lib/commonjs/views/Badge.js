"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Badge;
var _native = require("@react-navigation/native");
var _color = _interopRequireDefault(require("color"));
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function Badge(_ref) {
  let {
    children,
    style,
    visible = true,
    size = 18,
    ...rest
  } = _ref;
  const [opacity] = React.useState(() => new _reactNative.Animated.Value(visible ? 1 : 0));
  const [rendered, setRendered] = React.useState(visible);
  const theme = (0, _native.useTheme)();
  React.useEffect(() => {
    if (!rendered) {
      return;
    }
    _reactNative.Animated.timing(opacity, {
      toValue: visible ? 1 : 0,
      duration: 150,
      useNativeDriver: true
    }).start(_ref2 => {
      let {
        finished
      } = _ref2;
      if (finished && !visible) {
        setRendered(false);
      }
    });
    return () => opacity.stopAnimation();
  }, [opacity, rendered, visible]);
  if (!rendered) {
    if (visible) {
      setRendered(true);
    } else {
      return null;
    }
  }

  // @ts-expect-error: backgroundColor definitely exists
  const {
    backgroundColor = theme.colors.notification,
    ...restStyle
  } = _reactNative.StyleSheet.flatten(style) || {};
  const textColor = (0, _color.default)(backgroundColor).isLight() ? 'black' : 'white';
  const borderRadius = size / 2;
  const fontSize = Math.floor(size * 3 / 4);
  return /*#__PURE__*/React.createElement(_reactNative.Animated.Text, _extends({
    numberOfLines: 1,
    style: [{
      transform: [{
        scale: opacity.interpolate({
          inputRange: [0, 1],
          outputRange: [0.5, 1]
        })
      }],
      color: textColor,
      lineHeight: size - 1,
      height: size,
      minWidth: size,
      opacity,
      backgroundColor,
      fontSize,
      borderRadius
    }, styles.container, restStyle]
  }, rest), children);
}
const styles = _reactNative.StyleSheet.create({
  container: {
    alignSelf: 'flex-end',
    textAlign: 'center',
    paddingHorizontal: 4,
    overflow: 'hidden'
  }
});
//# sourceMappingURL=Badge.js.map