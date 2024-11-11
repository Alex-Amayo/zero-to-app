"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PanResponderAdapter = PanResponderAdapter;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _useAnimatedValue = require("./useAnimatedValue");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
const DEAD_ZONE = 12;
const DefaultTransitionSpec = {
  timing: _reactNative.Animated.spring,
  stiffness: 1000,
  damping: 500,
  mass: 3,
  overshootClamping: true
};
function PanResponderAdapter(_ref) {
  let {
    layout,
    keyboardDismissMode = 'auto',
    swipeEnabled = true,
    navigationState,
    onIndexChange,
    onSwipeStart,
    onSwipeEnd,
    children,
    style,
    animationEnabled = false
  } = _ref;
  const {
    routes,
    index
  } = navigationState;
  const panX = (0, _useAnimatedValue.useAnimatedValue)(0);
  const listenersRef = React.useRef([]);
  const navigationStateRef = React.useRef(navigationState);
  const layoutRef = React.useRef(layout);
  const onIndexChangeRef = React.useRef(onIndexChange);
  const currentIndexRef = React.useRef(index);
  const pendingIndexRef = React.useRef();
  const swipeVelocityThreshold = 0.15;
  const swipeDistanceThreshold = layout.width / 1.75;
  const jumpToIndex = React.useCallback(function (index) {
    let animate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : animationEnabled;
    const offset = -index * layoutRef.current.width;
    const {
      timing,
      ...transitionConfig
    } = DefaultTransitionSpec;
    if (animate) {
      _reactNative.Animated.parallel([timing(panX, {
        ...transitionConfig,
        toValue: offset,
        useNativeDriver: false
      })]).start(_ref2 => {
        let {
          finished
        } = _ref2;
        if (finished) {
          onIndexChangeRef.current(index);
          pendingIndexRef.current = undefined;
        }
      });
      pendingIndexRef.current = index;
    } else {
      panX.setValue(offset);
      onIndexChangeRef.current(index);
      pendingIndexRef.current = undefined;
    }
  }, [animationEnabled, panX]);
  React.useEffect(() => {
    navigationStateRef.current = navigationState;
    layoutRef.current = layout;
    onIndexChangeRef.current = onIndexChange;
  });
  React.useEffect(() => {
    const offset = -navigationStateRef.current.index * layout.width;
    panX.setValue(offset);
  }, [layout.width, panX]);
  React.useEffect(() => {
    if (keyboardDismissMode === 'auto') {
      _reactNative.Keyboard.dismiss();
    }
    if (layout.width && currentIndexRef.current !== index) {
      currentIndexRef.current = index;
      jumpToIndex(index);
    }
  }, [jumpToIndex, keyboardDismissMode, layout.width, index]);
  const isMovingHorizontally = (_, gestureState) => {
    return Math.abs(gestureState.dx) > Math.abs(gestureState.dy * 2) && Math.abs(gestureState.vx) > Math.abs(gestureState.vy * 2);
  };
  const canMoveScreen = (event, gestureState) => {
    if (swipeEnabled === false) {
      return false;
    }
    const diffX = _reactNative.I18nManager.isRTL ? -gestureState.dx : gestureState.dx;
    return isMovingHorizontally(event, gestureState) && (diffX >= DEAD_ZONE && currentIndexRef.current > 0 || diffX <= -DEAD_ZONE && currentIndexRef.current < routes.length - 1);
  };
  const startGesture = () => {
    onSwipeStart === null || onSwipeStart === void 0 ? void 0 : onSwipeStart();
    if (keyboardDismissMode === 'on-drag') {
      _reactNative.Keyboard.dismiss();
    }
    panX.stopAnimation();
    // @ts-expect-error: _value is private, but docs use it as well
    panX.setOffset(panX._value);
  };
  const respondToGesture = (_, gestureState) => {
    const diffX = _reactNative.I18nManager.isRTL ? -gestureState.dx : gestureState.dx;
    if (
    // swiping left
    diffX > 0 && index <= 0 ||
    // swiping right
    diffX < 0 && index >= routes.length - 1) {
      return;
    }
    if (layout.width) {
      // @ts-expect-error: _offset is private, but docs use it as well
      const position = (panX._offset + diffX) / -layout.width;
      const next = position > index ? Math.ceil(position) : Math.floor(position);
      if (next !== index) {
        listenersRef.current.forEach(listener => listener(next));
      }
    }
    panX.setValue(diffX);
  };
  const finishGesture = (_, gestureState) => {
    panX.flattenOffset();
    onSwipeEnd === null || onSwipeEnd === void 0 ? void 0 : onSwipeEnd();
    const currentIndex = typeof pendingIndexRef.current === 'number' ? pendingIndexRef.current : currentIndexRef.current;
    let nextIndex = currentIndex;
    if (Math.abs(gestureState.dx) > Math.abs(gestureState.dy) && Math.abs(gestureState.vx) > Math.abs(gestureState.vy) && (Math.abs(gestureState.dx) > swipeDistanceThreshold || Math.abs(gestureState.vx) > swipeVelocityThreshold)) {
      nextIndex = Math.round(Math.min(Math.max(0, _reactNative.I18nManager.isRTL ? currentIndex + gestureState.dx / Math.abs(gestureState.dx) : currentIndex - gestureState.dx / Math.abs(gestureState.dx)), routes.length - 1));
      currentIndexRef.current = nextIndex;
    }
    if (!isFinite(nextIndex)) {
      nextIndex = currentIndex;
    }
    jumpToIndex(nextIndex, true);
  };

  // TODO: use the listeners
  const addEnterListener = React.useCallback(listener => {
    listenersRef.current.push(listener);
    return () => {
      const index = listenersRef.current.indexOf(listener);
      if (index > -1) {
        listenersRef.current.splice(index, 1);
      }
    };
  }, []);
  const jumpTo = React.useCallback(key => {
    const index = navigationStateRef.current.routes.findIndex(route => route.key === key);
    jumpToIndex(index);
  }, [jumpToIndex]);
  const panResponder = _reactNative.PanResponder.create({
    onMoveShouldSetPanResponder: canMoveScreen,
    onMoveShouldSetPanResponderCapture: canMoveScreen,
    onPanResponderGrant: startGesture,
    onPanResponderMove: respondToGesture,
    onPanResponderTerminate: finishGesture,
    onPanResponderRelease: finishGesture,
    onPanResponderTerminationRequest: () => true
  });
  const maxTranslate = layout.width * (routes.length - 1);
  const translateX = _reactNative.Animated.multiply(panX.interpolate({
    inputRange: [-maxTranslate, 0],
    outputRange: [-maxTranslate, 0],
    extrapolate: 'clamp'
  }), _reactNative.I18nManager.isRTL ? -1 : 1);
  const position = React.useMemo(() => layout.width ? _reactNative.Animated.divide(panX, -layout.width) : null, [layout.width, panX]);
  return children({
    position: position ?? new _reactNative.Animated.Value(index),
    addEnterListener,
    jumpTo,
    render: children => /*#__PURE__*/React.createElement(_reactNative.Animated.View, _extends({
      style: [styles.sheet, layout.width ? {
        width: routes.length * layout.width,
        transform: [{
          translateX
        }]
      } : null, style]
    }, panResponder.panHandlers), React.Children.map(children, (child, i) => {
      const route = routes[i];
      const focused = i === index;
      return /*#__PURE__*/React.createElement(_reactNative.View, {
        key: route.key,
        style: layout.width ? {
          width: layout.width
        } : focused ? _reactNative.StyleSheet.absoluteFill : null
      }, focused || layout.width ? child : null);
    }))
  });
}
const styles = _reactNative.StyleSheet.create({
  sheet: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'stretch'
  }
});
//# sourceMappingURL=PanResponderAdapter.js.map