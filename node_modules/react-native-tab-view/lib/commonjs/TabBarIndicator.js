"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TabBarIndicator = TabBarIndicator;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _useAnimatedValue = require("./useAnimatedValue");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const getTranslateX = (position, routes, getTabWidth, gap) => {
  const inputRange = routes.map((_, i) => i);

  // every index contains widths at all previous indices
  const outputRange = routes.reduce((acc, _, i) => {
    if (i === 0) return [0];
    return [...acc, acc[i - 1] + getTabWidth(i - 1) + (gap ?? 0)];
  }, []);
  const translateX = position.interpolate({
    inputRange,
    outputRange,
    extrapolate: 'clamp'
  });
  return _reactNative.Animated.multiply(translateX, _reactNative.I18nManager.isRTL ? -1 : 1);
};
function TabBarIndicator(_ref) {
  let {
    getTabWidth,
    layout,
    navigationState,
    position,
    width,
    gap,
    style
  } = _ref;
  const isIndicatorShown = React.useRef(false);
  const isWidthDynamic = width === 'auto';
  const opacity = (0, _useAnimatedValue.useAnimatedValue)(isWidthDynamic ? 0 : 1);
  const indicatorVisible = isWidthDynamic ? layout.width && navigationState.routes.slice(0, navigationState.index).every((_, r) => getTabWidth(r)) : true;
  React.useEffect(() => {
    const fadeInIndicator = () => {
      if (!isIndicatorShown.current && isWidthDynamic &&
      // We should fade-in the indicator when we have widths for all the tab items
      indicatorVisible) {
        isIndicatorShown.current = true;
        _reactNative.Animated.timing(opacity, {
          toValue: 1,
          duration: 150,
          easing: _reactNative.Easing.in(_reactNative.Easing.linear),
          useNativeDriver: true
        }).start();
      }
    };
    fadeInIndicator();
    return () => opacity.stopAnimation();
  }, [indicatorVisible, isWidthDynamic, opacity]);
  const {
    routes
  } = navigationState;
  const transform = [];
  if (layout.width) {
    const translateX = routes.length > 1 ? getTranslateX(position, routes, getTabWidth, gap) : 0;
    transform.push({
      translateX
    });
  }
  if (width === 'auto') {
    const inputRange = routes.map((_, i) => i);
    const outputRange = inputRange.map(getTabWidth);
    transform.push({
      scaleX: routes.length > 1 ? position.interpolate({
        inputRange,
        outputRange,
        extrapolate: 'clamp'
      }) : outputRange[0]
    }, {
      translateX: 0.5
    });
  }
  return /*#__PURE__*/React.createElement(_reactNative.Animated.View, {
    style: [styles.indicator, {
      width: width === 'auto' ? 1 : width
    },
    // If layout is not available, use `left` property for positioning the indicator
    // This avoids rendering delay until we are able to calculate translateX
    // If platform is macos use `left` property as `transform` is broken at the moment.
    // See: https://github.com/microsoft/react-native-macos/issues/280
    layout.width && _reactNative.Platform.OS !== 'macos' ? {
      left: 0
    } : {
      left: `${100 / routes.length * navigationState.index}%`
    }, {
      transform
    }, width === 'auto' ? {
      opacity: opacity
    } : null, style]
  });
}
const styles = _reactNative.StyleSheet.create({
  indicator: {
    backgroundColor: '#ffeb3b',
    position: 'absolute',
    left: 0,
    bottom: 0,
    right: 0,
    height: 2
  }
});
//# sourceMappingURL=TabBarIndicator.js.map