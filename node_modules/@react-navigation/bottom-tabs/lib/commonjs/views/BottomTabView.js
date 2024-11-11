"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = BottomTabView;
var _elements = require("@react-navigation/elements");
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _reactNativeSafeAreaContext = require("react-native-safe-area-context");
var _BottomTabBarHeightCallbackContext = _interopRequireDefault(require("../utils/BottomTabBarHeightCallbackContext"));
var _BottomTabBarHeightContext = _interopRequireDefault(require("../utils/BottomTabBarHeightContext"));
var _BottomTabBar = _interopRequireWildcard(require("./BottomTabBar"));
var _ScreenFallback = require("./ScreenFallback");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function BottomTabView(props) {
  const {
    tabBar = props => /*#__PURE__*/React.createElement(_BottomTabBar.default, props),
    state,
    navigation,
    descriptors,
    safeAreaInsets,
    detachInactiveScreens = _reactNative.Platform.OS === 'web' || _reactNative.Platform.OS === 'android' || _reactNative.Platform.OS === 'ios',
    sceneContainerStyle
  } = props;
  const focusedRouteKey = state.routes[state.index].key;
  const [loaded, setLoaded] = React.useState([focusedRouteKey]);
  if (!loaded.includes(focusedRouteKey)) {
    setLoaded([...loaded, focusedRouteKey]);
  }
  const dimensions = _elements.SafeAreaProviderCompat.initialMetrics.frame;
  const [tabBarHeight, setTabBarHeight] = React.useState(() => (0, _BottomTabBar.getTabBarHeight)({
    state,
    descriptors,
    dimensions,
    layout: {
      width: dimensions.width,
      height: 0
    },
    insets: {
      ..._elements.SafeAreaProviderCompat.initialMetrics.insets,
      ...props.safeAreaInsets
    },
    style: descriptors[state.routes[state.index].key].options.tabBarStyle
  }));
  const renderTabBar = () => {
    return /*#__PURE__*/React.createElement(_reactNativeSafeAreaContext.SafeAreaInsetsContext.Consumer, null, insets => tabBar({
      state: state,
      descriptors: descriptors,
      navigation: navigation,
      insets: {
        top: (safeAreaInsets === null || safeAreaInsets === void 0 ? void 0 : safeAreaInsets.top) ?? (insets === null || insets === void 0 ? void 0 : insets.top) ?? 0,
        right: (safeAreaInsets === null || safeAreaInsets === void 0 ? void 0 : safeAreaInsets.right) ?? (insets === null || insets === void 0 ? void 0 : insets.right) ?? 0,
        bottom: (safeAreaInsets === null || safeAreaInsets === void 0 ? void 0 : safeAreaInsets.bottom) ?? (insets === null || insets === void 0 ? void 0 : insets.bottom) ?? 0,
        left: (safeAreaInsets === null || safeAreaInsets === void 0 ? void 0 : safeAreaInsets.left) ?? (insets === null || insets === void 0 ? void 0 : insets.left) ?? 0
      }
    }));
  };
  const {
    routes
  } = state;
  return /*#__PURE__*/React.createElement(_elements.SafeAreaProviderCompat, null, /*#__PURE__*/React.createElement(_ScreenFallback.MaybeScreenContainer, {
    enabled: detachInactiveScreens,
    hasTwoStates: true,
    style: styles.container
  }, routes.map((route, index) => {
    const descriptor = descriptors[route.key];
    const {
      lazy = true,
      unmountOnBlur
    } = descriptor.options;
    const isFocused = state.index === index;
    if (unmountOnBlur && !isFocused) {
      return null;
    }
    if (lazy && !loaded.includes(route.key) && !isFocused) {
      // Don't render a lazy screen if we've never navigated to it
      return null;
    }
    const {
      freezeOnBlur,
      header = _ref => {
        let {
          layout,
          options
        } = _ref;
        return /*#__PURE__*/React.createElement(_elements.Header, _extends({}, options, {
          layout: layout,
          title: (0, _elements.getHeaderTitle)(options, route.name)
        }));
      },
      headerShown,
      headerStatusBarHeight,
      headerTransparent
    } = descriptor.options;
    return /*#__PURE__*/React.createElement(_ScreenFallback.MaybeScreen, {
      key: route.key,
      style: [_reactNative.StyleSheet.absoluteFill, {
        zIndex: isFocused ? 0 : -1
      }],
      visible: isFocused,
      enabled: detachInactiveScreens,
      freezeOnBlur: freezeOnBlur
    }, /*#__PURE__*/React.createElement(_BottomTabBarHeightContext.default.Provider, {
      value: tabBarHeight
    }, /*#__PURE__*/React.createElement(_elements.Screen, {
      focused: isFocused,
      route: descriptor.route,
      navigation: descriptor.navigation,
      headerShown: headerShown,
      headerStatusBarHeight: headerStatusBarHeight,
      headerTransparent: headerTransparent,
      header: header({
        layout: dimensions,
        route: descriptor.route,
        navigation: descriptor.navigation,
        options: descriptor.options
      }),
      style: sceneContainerStyle
    }, descriptor.render())));
  })), /*#__PURE__*/React.createElement(_BottomTabBarHeightCallbackContext.default.Provider, {
    value: setTabBarHeight
  }, renderTabBar()));
}
const styles = _reactNative.StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden'
  }
});
//# sourceMappingURL=BottomTabView.js.map