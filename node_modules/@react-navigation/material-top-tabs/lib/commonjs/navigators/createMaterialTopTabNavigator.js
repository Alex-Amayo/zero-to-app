"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _native = require("@react-navigation/native");
var React = _interopRequireWildcard(require("react"));
var _warnOnce = _interopRequireDefault(require("warn-once"));
var _MaterialTopTabView = _interopRequireDefault(require("../views/MaterialTopTabView"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function MaterialTopTabNavigator(_ref) {
  let {
    id,
    initialRouteName,
    backBehavior,
    children,
    screenListeners,
    screenOptions,
    ...restWithDeprecated
  } = _ref;
  const {
    // @ts-expect-error: swipeEnabled is deprecated
    swipeEnabled,
    // @ts-expect-error: lazy is deprecated
    lazy,
    // @ts-expect-error: lazyPlaceholder is deprecated
    lazyPlaceholder,
    // @ts-expect-error: lazyPreloadDistance is deprecated
    lazyPreloadDistance,
    // @ts-expect-error: tabBarOptions is deprecated
    tabBarOptions,
    ...rest
  } = restWithDeprecated;
  let defaultScreenOptions = {};
  if (tabBarOptions) {
    Object.assign(defaultScreenOptions, {
      tabBarActiveTintColor: tabBarOptions.activeTintColor,
      tabBarInactiveTintColor: tabBarOptions.inactiveTintColor,
      tabBarPressColor: tabBarOptions.pressColor,
      tabBarPressOpacity: tabBarOptions.pressOpacity,
      tabBarShowLabel: tabBarOptions.showLabel,
      tabBarShowIcon: tabBarOptions.showIcon,
      tabBarAllowFontScaling: tabBarOptions.allowFontScaling,
      tabBarBounces: tabBarOptions.bounces,
      tabBarScrollEnabled: tabBarOptions.scrollEnabled,
      tabBarIconStyle: tabBarOptions.iconStyle,
      tabBarLabelStyle: tabBarOptions.labelStyle,
      tabBarItemStyle: tabBarOptions.tabStyle,
      tabBarBadge: tabBarOptions.renderBadge,
      tabBarIndicator: tabBarOptions.renderIndicator,
      tabBarIndicatorStyle: tabBarOptions.indicatorStyle,
      tabBarIndicatorContainerStyle: tabBarOptions.indicatorContainerStyle,
      tabBarContentContainerStyle: tabBarOptions.contentContainerStyle,
      tabBarStyle: tabBarOptions.style
    });
    Object.keys(defaultScreenOptions).forEach(key => {
      if (defaultScreenOptions[key] === undefined) {
        // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
        delete defaultScreenOptions[key];
      }
    });
    (0, _warnOnce.default)(tabBarOptions, `Material Top Tab Navigator: 'tabBarOptions' is deprecated. Migrate the options to 'screenOptions' instead.\n\nPlace the following in 'screenOptions' in your code to keep current behavior:\n\n${JSON.stringify(defaultScreenOptions, null, 2)}\n\nSee https://reactnavigation.org/docs/material-top-tab-navigator#options for more details.`);
  }
  const deprecatedProps = {
    swipeEnabled,
    lazy,
    lazyPlaceholder,
    lazyPreloadDistance
  };
  Object.entries(deprecatedProps).forEach(_ref2 => {
    let [propName, propValue] = _ref2;
    if (propValue !== undefined) {
      // @ts-expect-error: Object.entries doesn't return strict types
      defaultScreenOptions[propName] = propValue;
      (0, _warnOnce.default)(true, `Material Top Tab Navigator: '${propName}' in props is deprecated. Move it to 'screenOptions' instead.\n\nSee https://reactnavigation.org/docs/material-top-tab-navigator#${propName.toLowerCase()} for more details.`);
    }
  });
  const {
    state,
    descriptors,
    navigation,
    NavigationContent
  } = (0, _native.useNavigationBuilder)(_native.TabRouter, {
    id,
    initialRouteName,
    backBehavior,
    children,
    screenListeners,
    screenOptions,
    defaultScreenOptions
  });
  return /*#__PURE__*/React.createElement(NavigationContent, null, /*#__PURE__*/React.createElement(_MaterialTopTabView.default, _extends({}, rest, {
    state: state,
    navigation: navigation,
    descriptors: descriptors
  })));
}
var _default = (0, _native.createNavigatorFactory)(MaterialTopTabNavigator);
exports.default = _default;
//# sourceMappingURL=createMaterialTopTabNavigator.js.map