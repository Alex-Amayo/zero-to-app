import { MissingIcon } from '@react-navigation/elements';
import { CommonActions, NavigationContext, NavigationRouteContext, useLinkBuilder, useTheme } from '@react-navigation/native';
import React from 'react';
import { Animated, Platform, StyleSheet, View } from 'react-native';
import { useSafeAreaFrame } from 'react-native-safe-area-context';
import BottomTabBarHeightCallbackContext from '../utils/BottomTabBarHeightCallbackContext';
import useIsKeyboardShown from '../utils/useIsKeyboardShown';
import BottomTabItem from './BottomTabItem';
const DEFAULT_TABBAR_HEIGHT = 49;
const COMPACT_TABBAR_HEIGHT = 32;
const DEFAULT_MAX_TAB_ITEM_WIDTH = 125;
const useNativeDriver = Platform.OS !== 'web';
const shouldUseHorizontalLabels = _ref => {
  let {
    state,
    descriptors,
    layout,
    dimensions
  } = _ref;
  const {
    tabBarLabelPosition
  } = descriptors[state.routes[state.index].key].options;
  if (tabBarLabelPosition) {
    switch (tabBarLabelPosition) {
      case 'beside-icon':
        return true;
      case 'below-icon':
        return false;
    }
  }
  if (layout.width >= 768) {
    // Screen size matches a tablet
    const maxTabWidth = state.routes.reduce((acc, route) => {
      const {
        tabBarItemStyle
      } = descriptors[route.key].options;
      const flattenedStyle = StyleSheet.flatten(tabBarItemStyle);
      if (flattenedStyle) {
        if (typeof flattenedStyle.width === 'number') {
          return acc + flattenedStyle.width;
        } else if (typeof flattenedStyle.maxWidth === 'number') {
          return acc + flattenedStyle.maxWidth;
        }
      }
      return acc + DEFAULT_MAX_TAB_ITEM_WIDTH;
    }, 0);
    return maxTabWidth <= layout.width;
  } else {
    return dimensions.width > dimensions.height;
  }
};
const getPaddingBottom = insets => Math.max(insets.bottom - Platform.select({
  ios: 4,
  default: 0
}), 0);
export const getTabBarHeight = _ref2 => {
  var _StyleSheet$flatten;
  let {
    state,
    descriptors,
    dimensions,
    insets,
    style,
    ...rest
  } = _ref2;
  // @ts-ignore
  const customHeight = (_StyleSheet$flatten = StyleSheet.flatten(style)) === null || _StyleSheet$flatten === void 0 ? void 0 : _StyleSheet$flatten.height;
  if (typeof customHeight === 'number') {
    return customHeight;
  }
  const isLandscape = dimensions.width > dimensions.height;
  const horizontalLabels = shouldUseHorizontalLabels({
    state,
    descriptors,
    dimensions,
    ...rest
  });
  const paddingBottom = getPaddingBottom(insets);
  if (Platform.OS === 'ios' && !Platform.isPad && isLandscape && horizontalLabels) {
    return COMPACT_TABBAR_HEIGHT + paddingBottom;
  }
  return DEFAULT_TABBAR_HEIGHT + paddingBottom;
};
export default function BottomTabBar(_ref3) {
  let {
    state,
    navigation,
    descriptors,
    insets,
    style
  } = _ref3;
  const {
    colors
  } = useTheme();
  const buildLink = useLinkBuilder();
  const focusedRoute = state.routes[state.index];
  const focusedDescriptor = descriptors[focusedRoute.key];
  const focusedOptions = focusedDescriptor.options;
  const {
    tabBarShowLabel,
    tabBarHideOnKeyboard = false,
    tabBarVisibilityAnimationConfig,
    tabBarStyle,
    tabBarBackground,
    tabBarActiveTintColor,
    tabBarInactiveTintColor,
    tabBarActiveBackgroundColor,
    tabBarInactiveBackgroundColor
  } = focusedOptions;
  const dimensions = useSafeAreaFrame();
  const isKeyboardShown = useIsKeyboardShown();
  const onHeightChange = React.useContext(BottomTabBarHeightCallbackContext);
  const shouldShowTabBar = !(tabBarHideOnKeyboard && isKeyboardShown);
  const visibilityAnimationConfigRef = React.useRef(tabBarVisibilityAnimationConfig);
  React.useEffect(() => {
    visibilityAnimationConfigRef.current = tabBarVisibilityAnimationConfig;
  });
  const [isTabBarHidden, setIsTabBarHidden] = React.useState(!shouldShowTabBar);
  const [visible] = React.useState(() => new Animated.Value(shouldShowTabBar ? 1 : 0));
  React.useEffect(() => {
    const visibilityAnimationConfig = visibilityAnimationConfigRef.current;
    if (shouldShowTabBar) {
      var _visibilityAnimationC, _visibilityAnimationC2;
      const animation = (visibilityAnimationConfig === null || visibilityAnimationConfig === void 0 ? void 0 : (_visibilityAnimationC = visibilityAnimationConfig.show) === null || _visibilityAnimationC === void 0 ? void 0 : _visibilityAnimationC.animation) === 'spring' ? Animated.spring : Animated.timing;
      animation(visible, {
        toValue: 1,
        useNativeDriver,
        duration: 250,
        ...(visibilityAnimationConfig === null || visibilityAnimationConfig === void 0 ? void 0 : (_visibilityAnimationC2 = visibilityAnimationConfig.show) === null || _visibilityAnimationC2 === void 0 ? void 0 : _visibilityAnimationC2.config)
      }).start(_ref4 => {
        let {
          finished
        } = _ref4;
        if (finished) {
          setIsTabBarHidden(false);
        }
      });
    } else {
      var _visibilityAnimationC3, _visibilityAnimationC4;
      setIsTabBarHidden(true);
      const animation = (visibilityAnimationConfig === null || visibilityAnimationConfig === void 0 ? void 0 : (_visibilityAnimationC3 = visibilityAnimationConfig.hide) === null || _visibilityAnimationC3 === void 0 ? void 0 : _visibilityAnimationC3.animation) === 'spring' ? Animated.spring : Animated.timing;
      animation(visible, {
        toValue: 0,
        useNativeDriver,
        duration: 200,
        ...(visibilityAnimationConfig === null || visibilityAnimationConfig === void 0 ? void 0 : (_visibilityAnimationC4 = visibilityAnimationConfig.hide) === null || _visibilityAnimationC4 === void 0 ? void 0 : _visibilityAnimationC4.config)
      }).start();
    }
    return () => visible.stopAnimation();
  }, [visible, shouldShowTabBar]);
  const [layout, setLayout] = React.useState({
    height: 0,
    width: dimensions.width
  });
  const handleLayout = e => {
    const {
      height,
      width
    } = e.nativeEvent.layout;
    onHeightChange === null || onHeightChange === void 0 ? void 0 : onHeightChange(height);
    setLayout(layout => {
      if (height === layout.height && width === layout.width) {
        return layout;
      } else {
        return {
          height,
          width
        };
      }
    });
  };
  const {
    routes
  } = state;
  const paddingBottom = getPaddingBottom(insets);
  const tabBarHeight = getTabBarHeight({
    state,
    descriptors,
    insets,
    dimensions,
    layout,
    style: [tabBarStyle, style]
  });
  const hasHorizontalLabels = shouldUseHorizontalLabels({
    state,
    descriptors,
    dimensions,
    layout
  });
  const tabBarBackgroundElement = tabBarBackground === null || tabBarBackground === void 0 ? void 0 : tabBarBackground();
  return /*#__PURE__*/React.createElement(Animated.View, {
    style: [styles.tabBar, {
      backgroundColor: tabBarBackgroundElement != null ? 'transparent' : colors.card,
      borderTopColor: colors.border
    }, {
      transform: [{
        translateY: visible.interpolate({
          inputRange: [0, 1],
          outputRange: [layout.height + paddingBottom + StyleSheet.hairlineWidth, 0]
        })
      }],
      // Absolutely position the tab bar so that the content is below it
      // This is needed to avoid gap at bottom when the tab bar is hidden
      position: isTabBarHidden ? 'absolute' : null
    }, {
      height: tabBarHeight,
      paddingBottom,
      paddingHorizontal: Math.max(insets.left, insets.right)
    }, tabBarStyle],
    pointerEvents: isTabBarHidden ? 'none' : 'auto',
    onLayout: handleLayout
  }, /*#__PURE__*/React.createElement(View, {
    pointerEvents: "none",
    style: StyleSheet.absoluteFill
  }, tabBarBackgroundElement), /*#__PURE__*/React.createElement(View, {
    accessibilityRole: "tablist",
    style: styles.content
  }, routes.map((route, index) => {
    const focused = index === state.index;
    const {
      options
    } = descriptors[route.key];
    const onPress = () => {
      const event = navigation.emit({
        type: 'tabPress',
        target: route.key,
        canPreventDefault: true
      });
      if (!focused && !event.defaultPrevented) {
        navigation.dispatch({
          ...CommonActions.navigate({
            name: route.name,
            merge: true
          }),
          target: state.key
        });
      }
    };
    const onLongPress = () => {
      navigation.emit({
        type: 'tabLongPress',
        target: route.key
      });
    };
    const label = options.tabBarLabel !== undefined ? options.tabBarLabel : options.title !== undefined ? options.title : route.name;
    const accessibilityLabel = options.tabBarAccessibilityLabel !== undefined ? options.tabBarAccessibilityLabel : typeof label === 'string' && Platform.OS === 'ios' ? `${label}, tab, ${index + 1} of ${routes.length}` : undefined;
    return /*#__PURE__*/React.createElement(NavigationContext.Provider, {
      key: route.key,
      value: descriptors[route.key].navigation
    }, /*#__PURE__*/React.createElement(NavigationRouteContext.Provider, {
      value: route
    }, /*#__PURE__*/React.createElement(BottomTabItem, {
      route: route,
      descriptor: descriptors[route.key],
      focused: focused,
      horizontal: hasHorizontalLabels,
      onPress: onPress,
      onLongPress: onLongPress,
      accessibilityLabel: accessibilityLabel,
      to: buildLink(route.name, route.params),
      testID: options.tabBarTestID,
      allowFontScaling: options.tabBarAllowFontScaling,
      activeTintColor: tabBarActiveTintColor,
      inactiveTintColor: tabBarInactiveTintColor,
      activeBackgroundColor: tabBarActiveBackgroundColor,
      inactiveBackgroundColor: tabBarInactiveBackgroundColor,
      button: options.tabBarButton,
      icon: options.tabBarIcon ?? (_ref5 => {
        let {
          color,
          size
        } = _ref5;
        return /*#__PURE__*/React.createElement(MissingIcon, {
          color: color,
          size: size
        });
      }),
      badge: options.tabBarBadge,
      badgeStyle: options.tabBarBadgeStyle,
      label: label,
      showLabel: tabBarShowLabel,
      labelStyle: options.tabBarLabelStyle,
      iconStyle: options.tabBarIconStyle,
      style: options.tabBarItemStyle
    })));
  })));
}
const styles = StyleSheet.create({
  tabBar: {
    left: 0,
    right: 0,
    bottom: 0,
    borderTopWidth: StyleSheet.hairlineWidth,
    elevation: 8
  },
  content: {
    flex: 1,
    flexDirection: 'row'
  }
});
//# sourceMappingURL=BottomTabBar.js.map