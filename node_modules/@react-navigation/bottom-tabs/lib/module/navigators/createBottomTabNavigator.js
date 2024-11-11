function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import { createNavigatorFactory, TabRouter, useNavigationBuilder } from '@react-navigation/native';
import * as React from 'react';
import warnOnce from 'warn-once';
import BottomTabView from '../views/BottomTabView';
function BottomTabNavigator(_ref) {
  let {
    id,
    initialRouteName,
    backBehavior,
    children,
    screenListeners,
    screenOptions,
    sceneContainerStyle,
    ...restWithDeprecated
  } = _ref;
  const {
    // @ts-expect-error: lazy is deprecated
    lazy,
    // @ts-expect-error: tabBarOptions is deprecated
    tabBarOptions,
    ...rest
  } = restWithDeprecated;
  let defaultScreenOptions = {};
  if (tabBarOptions) {
    Object.assign(defaultScreenOptions, {
      tabBarHideOnKeyboard: tabBarOptions.keyboardHidesTabBar,
      tabBarActiveTintColor: tabBarOptions.activeTintColor,
      tabBarInactiveTintColor: tabBarOptions.inactiveTintColor,
      tabBarActiveBackgroundColor: tabBarOptions.activeBackgroundColor,
      tabBarInactiveBackgroundColor: tabBarOptions.inactiveBackgroundColor,
      tabBarAllowFontScaling: tabBarOptions.allowFontScaling,
      tabBarShowLabel: tabBarOptions.showLabel,
      tabBarLabelStyle: tabBarOptions.labelStyle,
      tabBarIconStyle: tabBarOptions.iconStyle,
      tabBarItemStyle: tabBarOptions.tabStyle,
      tabBarLabelPosition: tabBarOptions.labelPosition ?? (tabBarOptions.adaptive === false ? 'below-icon' : undefined),
      tabBarStyle: [{
        display: tabBarOptions.tabBarVisible ? 'none' : 'flex'
      }, defaultScreenOptions.tabBarStyle]
    });
    Object.keys(defaultScreenOptions).forEach(key => {
      if (defaultScreenOptions[key] === undefined) {
        // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
        delete defaultScreenOptions[key];
      }
    });
    warnOnce(tabBarOptions, `Bottom Tab Navigator: 'tabBarOptions' is deprecated. Migrate the options to 'screenOptions' instead.\n\nPlace the following in 'screenOptions' in your code to keep current behavior:\n\n${JSON.stringify(defaultScreenOptions, null, 2)}\n\nSee https://reactnavigation.org/docs/bottom-tab-navigator#options for more details.`);
  }
  if (typeof lazy === 'boolean') {
    defaultScreenOptions.lazy = lazy;
    warnOnce(true, `Bottom Tab Navigator: 'lazy' in props is deprecated. Move it to 'screenOptions' instead.\n\nSee https://reactnavigation.org/docs/bottom-tab-navigator/#lazy for more details.`);
  }
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
  return /*#__PURE__*/React.createElement(NavigationContent, null, /*#__PURE__*/React.createElement(BottomTabView, _extends({}, rest, {
    state: state,
    navigation: navigation,
    descriptors: descriptors,
    sceneContainerStyle: sceneContainerStyle
  })));
}
export default createNavigatorFactory(BottomTabNavigator);
//# sourceMappingURL=createBottomTabNavigator.js.map