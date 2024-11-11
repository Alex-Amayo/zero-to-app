"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = TabBarTop;
var _native = require("@react-navigation/native");
var _color = _interopRequireDefault(require("color"));
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _reactNativeTabView = require("react-native-tab-view");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function TabBarTop(_ref) {
  let {
    state,
    navigation,
    descriptors,
    ...rest
  } = _ref;
  const {
    colors
  } = (0, _native.useTheme)();
  const focusedOptions = descriptors[state.routes[state.index].key].options;
  const activeColor = focusedOptions.tabBarActiveTintColor ?? colors.text;
  const inactiveColor = focusedOptions.tabBarInactiveTintColor ?? (0, _color.default)(activeColor).alpha(0.5).rgb().string();
  return /*#__PURE__*/React.createElement(_reactNativeTabView.TabBar, _extends({}, rest, {
    navigationState: state,
    scrollEnabled: focusedOptions.tabBarScrollEnabled,
    bounces: focusedOptions.tabBarBounces,
    activeColor: activeColor,
    inactiveColor: inactiveColor,
    pressColor: focusedOptions.tabBarPressColor,
    pressOpacity: focusedOptions.tabBarPressOpacity,
    tabStyle: focusedOptions.tabBarItemStyle,
    indicatorStyle: [{
      backgroundColor: colors.primary
    }, focusedOptions.tabBarIndicatorStyle],
    gap: focusedOptions.tabBarGap,
    android_ripple: focusedOptions.tabBarAndroidRipple,
    indicatorContainerStyle: focusedOptions.tabBarIndicatorContainerStyle,
    contentContainerStyle: focusedOptions.tabBarContentContainerStyle,
    style: [{
      backgroundColor: colors.card
    }, focusedOptions.tabBarStyle],
    getAccessibilityLabel: _ref2 => {
      let {
        route
      } = _ref2;
      return descriptors[route.key].options.tabBarAccessibilityLabel;
    },
    getTestID: _ref3 => {
      let {
        route
      } = _ref3;
      return descriptors[route.key].options.tabBarTestID;
    },
    onTabPress: _ref4 => {
      let {
        route,
        preventDefault
      } = _ref4;
      const event = navigation.emit({
        type: 'tabPress',
        target: route.key,
        canPreventDefault: true
      });
      if (event.defaultPrevented) {
        preventDefault();
      }
    },
    onTabLongPress: _ref5 => {
      let {
        route
      } = _ref5;
      return navigation.emit({
        type: 'tabLongPress',
        target: route.key
      });
    },
    renderIcon: _ref6 => {
      let {
        route,
        focused,
        color
      } = _ref6;
      const {
        options
      } = descriptors[route.key];
      if (options.tabBarShowIcon === false) {
        return null;
      }
      if (options.tabBarIcon !== undefined) {
        const icon = options.tabBarIcon({
          focused,
          color
        });
        return /*#__PURE__*/React.createElement(_reactNative.View, {
          style: [styles.icon, options.tabBarIconStyle]
        }, icon);
      }
      return null;
    },
    renderLabel: _ref7 => {
      let {
        route,
        focused,
        color
      } = _ref7;
      const {
        options
      } = descriptors[route.key];
      if (options.tabBarShowLabel === false) {
        return null;
      }
      const label = options.tabBarLabel !== undefined ? options.tabBarLabel : options.title !== undefined ? options.title : route.name;
      if (typeof label === 'string') {
        return /*#__PURE__*/React.createElement(_reactNative.Text, {
          style: [styles.label, {
            color
          }, options.tabBarLabelStyle],
          allowFontScaling: options.tabBarAllowFontScaling
        }, label);
      }
      const children = typeof options.tabBarLabel === 'string' ? options.tabBarLabel : options.title !== undefined ? options.title : route.name;
      return label({
        focused,
        color,
        children
      });
    },
    renderBadge: _ref8 => {
      let {
        route
      } = _ref8;
      const {
        tabBarBadge
      } = descriptors[route.key].options;
      return (tabBarBadge === null || tabBarBadge === void 0 ? void 0 : tabBarBadge()) ?? null;
    },
    renderIndicator: _ref9 => {
      let {
        navigationState: state,
        ...rest
      } = _ref9;
      return focusedOptions.tabBarIndicator ? focusedOptions.tabBarIndicator({
        state: state,
        ...rest
      }) : /*#__PURE__*/React.createElement(_reactNativeTabView.TabBarIndicator, _extends({
        navigationState: state
      }, rest));
    }
  }));
}
const styles = _reactNative.StyleSheet.create({
  icon: {
    height: 24,
    width: 24
  },
  label: {
    textAlign: 'center',
    textTransform: 'uppercase',
    fontSize: 13,
    margin: 4,
    backgroundColor: 'transparent'
  }
});
//# sourceMappingURL=MaterialTopTabBar.js.map