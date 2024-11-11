function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import { createNavigatorFactory, TabRouter, useNavigationBuilder } from '@react-navigation/native';
import * as React from 'react';
import warnOnce from 'warn-once';
import MaterialTopTabView from '../views/MaterialTopTabView';
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
    warnOnce(tabBarOptions, `Material Top Tab Navigator: 'tabBarOptions' is deprecated. Migrate the options to 'screenOptions' instead.\n\nPlace the following in 'screenOptions' in your code to keep current behavior:\n\n${JSON.stringify(defaultScreenOptions, null, 2)}\n\nSee https://reactnavigation.org/docs/material-top-tab-navigator#options for more details.`);
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
      warnOnce(true, `Material Top Tab Navigator: '${propName}' in props is deprecated. Move it to 'screenOptions' instead.\n\nSee https://reactnavigation.org/docs/material-top-tab-navigator#${propName.toLowerCase()} for more details.`);
    }
  });
  const {
    state,
    descriptors,
    navigation,
    NavigationContent
  } = useNavigationBuilder(TabRouter, {
    id,
    initialRouteName,
    backBehavior,
    children,
    screenListeners,
    screenOptions,
    defaultScreenOptions
  });
  return /*#__PURE__*/React.createElement(NavigationContent, null, /*#__PURE__*/React.createElement(MaterialTopTabView, _extends({}, rest, {
    state: state,
    navigation: navigation,
    descriptors: descriptors
  })));
}
export default createNavigatorFactory(MaterialTopTabNavigator);
//# sourceMappingURL=createMaterialTopTabNavigator.js.map