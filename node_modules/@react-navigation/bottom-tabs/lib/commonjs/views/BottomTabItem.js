"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = BottomTabBarItem;
var _native = require("@react-navigation/native");
var _color = _interopRequireDefault(require("color"));
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _TabBarIcon = _interopRequireDefault(require("./TabBarIcon"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function BottomTabBarItem(_ref) {
  let {
    focused,
    route,
    descriptor,
    label,
    icon,
    badge,
    badgeStyle,
    to,
    button = _ref2 => {
      let {
        children,
        style,
        onPress,
        to,
        accessibilityRole,
        ...rest
      } = _ref2;
      if (_reactNative.Platform.OS === 'web' && to) {
        // React Native Web doesn't forward `onClick` if we use `TouchableWithoutFeedback`.
        // We need to use `onClick` to be able to prevent default browser handling of links.
        return /*#__PURE__*/_react.default.createElement(_native.Link, _extends({}, rest, {
          to: to,
          style: [styles.button, style],
          onPress: e => {
            if (!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) && (
            // ignore clicks with modifier keys
            e.button == null || e.button === 0) // ignore everything but left clicks
            ) {
              e.preventDefault();
              onPress === null || onPress === void 0 ? void 0 : onPress(e);
            }
          }
        }), children);
      } else {
        return /*#__PURE__*/_react.default.createElement(_reactNative.Pressable, _extends({}, rest, {
          accessibilityRole: accessibilityRole,
          onPress: onPress,
          style: style
        }), children);
      }
    },
    accessibilityLabel,
    testID,
    onPress,
    onLongPress,
    horizontal,
    activeTintColor: customActiveTintColor,
    inactiveTintColor: customInactiveTintColor,
    activeBackgroundColor = 'transparent',
    inactiveBackgroundColor = 'transparent',
    showLabel = true,
    allowFontScaling,
    labelStyle,
    iconStyle,
    style
  } = _ref;
  const {
    colors
  } = (0, _native.useTheme)();
  const activeTintColor = customActiveTintColor === undefined ? colors.primary : customActiveTintColor;
  const inactiveTintColor = customInactiveTintColor === undefined ? (0, _color.default)(colors.text).mix((0, _color.default)(colors.card), 0.5).hex() : customInactiveTintColor;
  const renderLabel = _ref3 => {
    let {
      focused
    } = _ref3;
    if (showLabel === false) {
      return null;
    }
    const color = focused ? activeTintColor : inactiveTintColor;
    if (typeof label === 'string') {
      return /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
        numberOfLines: 1,
        style: [styles.label, {
          color
        }, horizontal ? styles.labelBeside : styles.labelBeneath, labelStyle],
        allowFontScaling: allowFontScaling
      }, label);
    }
    const {
      options
    } = descriptor;
    const children = typeof options.tabBarLabel === 'string' ? options.tabBarLabel : options.title !== undefined ? options.title : route.name;
    return label({
      focused,
      color,
      position: horizontal ? 'beside-icon' : 'below-icon',
      children
    });
  };
  const renderIcon = _ref4 => {
    let {
      focused
    } = _ref4;
    if (icon === undefined) {
      return null;
    }
    const activeOpacity = focused ? 1 : 0;
    const inactiveOpacity = focused ? 0 : 1;
    return /*#__PURE__*/_react.default.createElement(_TabBarIcon.default, {
      route: route,
      horizontal: horizontal,
      badge: badge,
      badgeStyle: badgeStyle,
      activeOpacity: activeOpacity,
      inactiveOpacity: inactiveOpacity,
      activeTintColor: activeTintColor,
      inactiveTintColor: inactiveTintColor,
      renderIcon: icon,
      style: iconStyle
    });
  };
  const scene = {
    route,
    focused
  };
  const backgroundColor = focused ? activeBackgroundColor : inactiveBackgroundColor;
  return button({
    to,
    onPress,
    onLongPress,
    testID,
    accessibilityLabel,
    // FIXME: accessibilityRole: 'tab' doesn't seem to work as expected on iOS
    accessibilityRole: _reactNative.Platform.select({
      ios: 'button',
      default: 'tab'
    }),
    accessibilityState: {
      selected: focused
    },
    // @ts-expect-error: keep for compatibility with older React Native versions
    accessibilityStates: focused ? ['selected'] : [],
    style: [styles.tab, {
      backgroundColor
    }, horizontal ? styles.tabLandscape : styles.tabPortrait, style],
    children: /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, renderIcon(scene), renderLabel(scene))
  });
}
const styles = _reactNative.StyleSheet.create({
  tab: {
    flex: 1,
    alignItems: 'center'
  },
  tabPortrait: {
    justifyContent: 'flex-end',
    flexDirection: 'column'
  },
  tabLandscape: {
    justifyContent: 'center',
    flexDirection: 'row'
  },
  label: {
    textAlign: 'center',
    backgroundColor: 'transparent'
  },
  labelBeneath: {
    fontSize: 10
  },
  labelBeside: {
    fontSize: 13,
    marginLeft: 20,
    marginTop: 3
  },
  button: {
    display: 'flex'
  }
});
//# sourceMappingURL=BottomTabItem.js.map