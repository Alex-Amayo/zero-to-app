function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import * as React from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import useLatestCallback from 'use-latest-callback';
import { PlatformPressable } from './PlatformPressable';
import { TabBarItemLabel } from './TabBarItemLabel';
const DEFAULT_ACTIVE_COLOR = 'rgba(255, 255, 255, 1)';
const DEFAULT_INACTIVE_COLOR = 'rgba(255, 255, 255, 0.7)';
const getActiveOpacity = (position, routesLength, tabIndex) => {
  if (routesLength > 1) {
    const inputRange = Array.from({
      length: routesLength
    }, (_, i) => i);
    return position.interpolate({
      inputRange,
      outputRange: inputRange.map(i => i === tabIndex ? 1 : 0)
    });
  } else {
    return 1;
  }
};
const getInactiveOpacity = (position, routesLength, tabIndex) => {
  if (routesLength > 1) {
    const inputRange = Array.from({
      length: routesLength
    }, (_, i) => i);
    return position.interpolate({
      inputRange,
      outputRange: inputRange.map(i => i === tabIndex ? 0 : 1)
    });
  } else {
    return 0;
  }
};
const TabBarItemInternal = _ref => {
  let {
    accessibilityLabel,
    accessible,
    label: labelText,
    testID,
    onLongPress,
    onPress,
    isFocused,
    position,
    route,
    style,
    inactiveColor: inactiveColorCustom,
    activeColor: activeColorCustom,
    labelStyle,
    onLayout,
    index: tabIndex,
    pressColor,
    pressOpacity,
    renderBadge,
    renderIcon,
    defaultTabWidth,
    routesLength,
    renderLabel: renderLabelCustom,
    android_ripple = {
      borderless: true
    }
  } = _ref;
  const labelColorFromStyle = StyleSheet.flatten(labelStyle || {}).color;
  const activeColor = activeColorCustom !== undefined ? activeColorCustom : typeof labelColorFromStyle === 'string' ? labelColorFromStyle : DEFAULT_ACTIVE_COLOR;
  const inactiveColor = inactiveColorCustom !== undefined ? inactiveColorCustom : typeof labelColorFromStyle === 'string' ? labelColorFromStyle : DEFAULT_INACTIVE_COLOR;
  const activeOpacity = getActiveOpacity(position, routesLength, tabIndex);
  const inactiveOpacity = getInactiveOpacity(position, routesLength, tabIndex);
  let icon = null;
  let label = null;
  if (renderIcon) {
    const activeIcon = renderIcon({
      route,
      focused: true,
      color: activeColor
    });
    const inactiveIcon = renderIcon({
      route,
      focused: false,
      color: inactiveColor
    });
    if (inactiveIcon != null && activeIcon != null) {
      icon = /*#__PURE__*/React.createElement(View, {
        style: styles.icon
      }, /*#__PURE__*/React.createElement(Animated.View, {
        style: {
          opacity: inactiveOpacity
        }
      }, inactiveIcon), /*#__PURE__*/React.createElement(Animated.View, {
        style: [StyleSheet.absoluteFill, {
          opacity: activeOpacity
        }]
      }, activeIcon));
    }
  }
  const renderLabel = renderLabelCustom ? renderLabelCustom : labelProps => /*#__PURE__*/React.createElement(TabBarItemLabel, _extends({}, labelProps, {
    icon: icon,
    label: labelText,
    labelStyle: labelStyle
  }));
  if (renderLabel) {
    const activeLabel = renderLabel({
      route,
      focused: true,
      color: activeColor
    });
    const inactiveLabel = renderLabel({
      route,
      focused: false,
      color: inactiveColor
    });
    label = /*#__PURE__*/React.createElement(View, null, /*#__PURE__*/React.createElement(Animated.View, {
      style: {
        opacity: inactiveOpacity
      }
    }, inactiveLabel), /*#__PURE__*/React.createElement(Animated.View, {
      style: [StyleSheet.absoluteFill, {
        opacity: activeOpacity
      }]
    }, activeLabel));
  }
  const tabStyle = StyleSheet.flatten(style);
  const isWidthSet = (tabStyle === null || tabStyle === void 0 ? void 0 : tabStyle.width) !== undefined;
  const tabContainerStyle = isWidthSet ? null : {
    width: defaultTabWidth
  };
  const scene = {
    route
  };
  accessibilityLabel = typeof accessibilityLabel !== 'undefined' ? accessibilityLabel : labelText;
  const badge = renderBadge ? renderBadge(scene) : null;
  return /*#__PURE__*/React.createElement(PlatformPressable, {
    android_ripple: android_ripple,
    testID: testID,
    accessible: accessible,
    accessibilityLabel: accessibilityLabel,
    accessibilityRole: "tab",
    accessibilityState: {
      selected: isFocused
    }
    // @ts-ignore: this is to support older React Native versions
    ,
    accessibilityStates: isFocused ? ['selected'] : [],
    pressColor: pressColor,
    pressOpacity: pressOpacity,
    delayPressIn: 0,
    onLayout: onLayout,
    onPress: onPress,
    onLongPress: onLongPress,
    style: [styles.pressable, tabContainerStyle]
  }, /*#__PURE__*/React.createElement(View, {
    pointerEvents: "none",
    style: [styles.item, tabStyle]
  }, icon, label, badge != null ? /*#__PURE__*/React.createElement(View, {
    style: styles.badge
  }, badge) : null));
};
const MemoizedTabBarItemInternal = /*#__PURE__*/React.memo(TabBarItemInternal);
export function TabBarItem(props) {
  const {
    onPress,
    onLongPress,
    onLayout,
    navigationState,
    route,
    getAccessibilityLabel,
    getLabelText,
    getTestID,
    getAccessible,
    ...rest
  } = props;
  const onPressLatest = useLatestCallback(onPress);
  const onLongPressLatest = useLatestCallback(onLongPress);
  const onLayoutLatest = useLatestCallback(onLayout ? onLayout : () => {});
  const tabIndex = navigationState.routes.indexOf(route);
  const scene = {
    route
  };
  const accessibilityLabel = getAccessibilityLabel(scene);
  const label = getLabelText(scene);
  const testID = getTestID(scene);
  const accessible = getAccessible(scene);
  return /*#__PURE__*/React.createElement(MemoizedTabBarItemInternal, _extends({}, rest, {
    onPress: onPressLatest,
    onLayout: onLayoutLatest,
    onLongPress: onLongPressLatest,
    isFocused: navigationState.index === tabIndex,
    route: route,
    index: tabIndex,
    routesLength: navigationState.routes.length,
    accessibilityLabel: accessibilityLabel,
    label: label,
    testID: testID,
    accessible: accessible
  }));
}
const styles = StyleSheet.create({
  icon: {
    margin: 2
  },
  item: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    minHeight: 48
  },
  badge: {
    position: 'absolute',
    top: 0,
    right: 0
  },
  pressable: {
    // The label is not pressable on Windows
    // Adding backgroundColor: 'transparent' seems to fix it
    backgroundColor: 'transparent'
  }
});
//# sourceMappingURL=TabBarItem.js.map