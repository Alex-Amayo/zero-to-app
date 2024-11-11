"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PagerViewAdapter = PagerViewAdapter;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _reactNativePagerView = _interopRequireDefault(require("react-native-pager-view"));
var _useAnimatedValue = require("./useAnimatedValue");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
const AnimatedViewPager = _reactNative.Animated.createAnimatedComponent(_reactNativePagerView.default);
function PagerViewAdapter(_ref) {
  let {
    keyboardDismissMode = 'auto',
    swipeEnabled = true,
    navigationState,
    onIndexChange,
    onSwipeStart,
    onSwipeEnd,
    children,
    style,
    animationEnabled,
    ...rest
  } = _ref;
  const {
    index
  } = navigationState;
  const listenersRef = React.useRef([]);
  const pagerRef = React.useRef();
  const indexRef = React.useRef(index);
  const navigationStateRef = React.useRef(navigationState);
  const position = (0, _useAnimatedValue.useAnimatedValue)(index);
  const offset = (0, _useAnimatedValue.useAnimatedValue)(0);
  React.useEffect(() => {
    navigationStateRef.current = navigationState;
  });
  const jumpTo = React.useCallback(key => {
    const index = navigationStateRef.current.routes.findIndex(route => route.key === key);
    if (animationEnabled) {
      var _pagerRef$current;
      (_pagerRef$current = pagerRef.current) === null || _pagerRef$current === void 0 ? void 0 : _pagerRef$current.setPage(index);
    } else {
      var _pagerRef$current2;
      (_pagerRef$current2 = pagerRef.current) === null || _pagerRef$current2 === void 0 ? void 0 : _pagerRef$current2.setPageWithoutAnimation(index);
      position.setValue(index);
    }
  }, [animationEnabled, position]);
  React.useEffect(() => {
    if (keyboardDismissMode === 'auto') {
      _reactNative.Keyboard.dismiss();
    }
    if (indexRef.current !== index) {
      if (animationEnabled) {
        var _pagerRef$current3;
        (_pagerRef$current3 = pagerRef.current) === null || _pagerRef$current3 === void 0 ? void 0 : _pagerRef$current3.setPage(index);
      } else {
        var _pagerRef$current4;
        (_pagerRef$current4 = pagerRef.current) === null || _pagerRef$current4 === void 0 ? void 0 : _pagerRef$current4.setPageWithoutAnimation(index);
        position.setValue(index);
      }
    }
  }, [keyboardDismissMode, index, animationEnabled, position]);
  const onPageScrollStateChanged = state => {
    const {
      pageScrollState
    } = state.nativeEvent;
    switch (pageScrollState) {
      case 'idle':
        onSwipeEnd === null || onSwipeEnd === void 0 ? void 0 : onSwipeEnd();
        return;
      case 'dragging':
        {
          const subscription = offset.addListener(_ref2 => {
            let {
              value
            } = _ref2;
            const next = index + (value > 0 ? Math.ceil(value) : Math.floor(value));
            if (next !== index) {
              listenersRef.current.forEach(listener => listener(next));
            }
            offset.removeListener(subscription);
          });
          onSwipeStart === null || onSwipeStart === void 0 ? void 0 : onSwipeStart();
          return;
        }
    }
  };
  const addEnterListener = React.useCallback(listener => {
    listenersRef.current.push(listener);
    return () => {
      const index = listenersRef.current.indexOf(listener);
      if (index > -1) {
        listenersRef.current.splice(index, 1);
      }
    };
  }, []);
  const memoizedPosition = React.useMemo(() => _reactNative.Animated.add(position, offset), [offset, position]);
  return children({
    position: memoizedPosition,
    addEnterListener,
    jumpTo,
    render: children => /*#__PURE__*/React.createElement(AnimatedViewPager, _extends({}, rest, {
      ref: pagerRef,
      style: [styles.container, style],
      initialPage: index,
      keyboardDismissMode: keyboardDismissMode === 'auto' ? 'on-drag' : keyboardDismissMode,
      onPageScroll: _reactNative.Animated.event([{
        nativeEvent: {
          position: position,
          offset: offset
        }
      }], {
        useNativeDriver: true
      }),
      onPageSelected: e => {
        const index = e.nativeEvent.position;
        indexRef.current = index;
        onIndexChange(index);
      },
      onPageScrollStateChanged: onPageScrollStateChanged,
      scrollEnabled: swipeEnabled
    }), children)
  });
}
const styles = _reactNative.StyleSheet.create({
  container: {
    flex: 1
  }
});
//# sourceMappingURL=PagerViewAdapter.js.map