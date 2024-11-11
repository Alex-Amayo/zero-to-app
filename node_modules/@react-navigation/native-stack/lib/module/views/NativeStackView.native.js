function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import { getDefaultHeaderHeight, getHeaderTitle, HeaderBackContext, HeaderHeightContext, HeaderShownContext, SafeAreaProviderCompat } from '@react-navigation/elements';
import { NavigationContext, NavigationRouteContext, StackActions, usePreventRemoveContext, useTheme } from '@react-navigation/native';
import * as React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { useSafeAreaFrame, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Screen, ScreenStack } from 'react-native-screens';
import warnOnce from 'warn-once';
import useDismissedRouteError from '../utils/useDismissedRouteError';
import useInvalidPreventRemoveError from '../utils/useInvalidPreventRemoveError';
import DebugContainer from './DebugContainer';
import HeaderConfig from './HeaderConfig';
const isAndroid = Platform.OS === 'android';
const MaybeNestedStack = _ref => {
  let {
    options,
    route,
    presentation,
    headerHeight,
    headerTopInsetEnabled,
    children
  } = _ref;
  const {
    colors
  } = useTheme();
  const {
    header,
    headerShown = true,
    contentStyle
  } = options;
  const isHeaderInModal = isAndroid ? false : presentation !== 'card' && headerShown === true && header === undefined;
  const headerShownPreviousRef = React.useRef(headerShown);
  React.useEffect(() => {
    warnOnce(!isAndroid && presentation !== 'card' && headerShownPreviousRef.current !== headerShown, `Dynamically changing 'headerShown' in modals will result in remounting the screen and losing all local state. See options for the screen '${route.name}'.`);
    headerShownPreviousRef.current = headerShown;
  }, [headerShown, presentation, route.name]);
  const content = /*#__PURE__*/React.createElement(DebugContainer, {
    style: [styles.container, presentation !== 'transparentModal' && presentation !== 'containedTransparentModal' && {
      backgroundColor: colors.background
    }, contentStyle],
    stackPresentation: presentation === 'card' ? 'push' : presentation
  }, children);
  if (isHeaderInModal) {
    return /*#__PURE__*/React.createElement(ScreenStack, {
      style: styles.container
    }, /*#__PURE__*/React.createElement(Screen, {
      enabled: true,
      style: StyleSheet.absoluteFill
    }, content, /*#__PURE__*/React.createElement(HeaderConfig, _extends({}, options, {
      route: route,
      headerHeight: headerHeight,
      headerTopInsetEnabled: headerTopInsetEnabled,
      canGoBack: true
    }))));
  }
  return content;
};
const SceneView = _ref2 => {
  var _preventedRoutes$rout;
  let {
    index,
    focused,
    descriptor,
    previousDescriptor,
    nextDescriptor,
    onWillDisappear,
    onAppear,
    onDisappear,
    onDismissed,
    onHeaderBackButtonClicked,
    onNativeDismissCancelled
  } = _ref2;
  const {
    route,
    navigation,
    options,
    render
  } = descriptor;
  const {
    animationDuration,
    animationTypeForReplace = 'push',
    gestureEnabled,
    header,
    headerBackButtonMenuEnabled,
    headerShown,
    headerBackground,
    headerTransparent,
    autoHideHomeIndicator,
    navigationBarColor,
    navigationBarHidden,
    orientation,
    statusBarAnimation,
    statusBarHidden,
    statusBarStyle,
    statusBarTranslucent,
    statusBarColor,
    freezeOnBlur
  } = options;
  let {
    animation,
    customAnimationOnGesture,
    fullScreenGestureEnabled,
    presentation = 'card',
    gestureDirection = presentation === 'card' ? 'horizontal' : 'vertical'
  } = options;
  if (gestureDirection === 'vertical' && Platform.OS === 'ios') {
    // for `vertical` direction to work, we need to set `fullScreenGestureEnabled` to `true`
    // so the screen can be dismissed from any point on screen.
    // `customAnimationOnGesture` needs to be set to `true` so the `animation` set by user can be used,
    // otherwise `simple_push` will be used.
    // Also, the default animation for this direction seems to be `slide_from_bottom`.
    if (fullScreenGestureEnabled === undefined) {
      fullScreenGestureEnabled = true;
    }
    if (customAnimationOnGesture === undefined) {
      customAnimationOnGesture = true;
    }
    if (animation === undefined) {
      animation = 'slide_from_bottom';
    }
  }

  // workaround for rn-screens where gestureDirection has to be set on both
  // current and previous screen - software-mansion/react-native-screens/pull/1509
  const nextGestureDirection = nextDescriptor === null || nextDescriptor === void 0 ? void 0 : nextDescriptor.options.gestureDirection;
  const gestureDirectionOverride = nextGestureDirection != null ? nextGestureDirection : gestureDirection;
  if (index === 0) {
    // first screen should always be treated as `card`, it resolves problems with no header animation
    // for navigator with first screen as `modal` and the next as `card`
    presentation = 'card';
  }
  const insets = useSafeAreaInsets();
  const frame = useSafeAreaFrame();

  // `modal` and `formSheet` presentations do not take whole screen, so should not take the inset.
  const isModal = presentation === 'modal' || presentation === 'formSheet';

  // Modals are fullscreen in landscape only on iPhone
  const isIPhone = Platform.OS === 'ios' && !(Platform.isPad || Platform.isTV);
  const isLandscape = frame.width > frame.height;
  const isParentHeaderShown = React.useContext(HeaderShownContext);
  const parentHeaderHeight = React.useContext(HeaderHeightContext);
  const parentHeaderBack = React.useContext(HeaderBackContext);
  const topInset = isParentHeaderShown || Platform.OS === 'ios' && isModal || isIPhone && isLandscape ? 0 : insets.top;

  // On models with Dynamic Island the status bar height is smaller than the safe area top inset.
  const hasDynamicIsland = Platform.OS === 'ios' && topInset > 50;
  const statusBarHeight = hasDynamicIsland ? topInset - 5 : topInset;
  const {
    preventedRoutes
  } = usePreventRemoveContext();
  const defaultHeaderHeight = getDefaultHeaderHeight(frame, isModal, statusBarHeight);
  const [customHeaderHeight, setCustomHeaderHeight] = React.useState(defaultHeaderHeight);
  const headerTopInsetEnabled = topInset !== 0;
  const headerHeight = header ? customHeaderHeight : defaultHeaderHeight;
  const headerBack = previousDescriptor ? {
    title: getHeaderTitle(previousDescriptor.options, previousDescriptor.route.name)
  } : parentHeaderBack;
  const isRemovePrevented = (_preventedRoutes$rout = preventedRoutes[route.key]) === null || _preventedRoutes$rout === void 0 ? void 0 : _preventedRoutes$rout.preventRemove;
  return /*#__PURE__*/React.createElement(Screen, {
    key: route.key,
    enabled: true,
    style: StyleSheet.absoluteFill,
    customAnimationOnSwipe: customAnimationOnGesture,
    fullScreenSwipeEnabled: fullScreenGestureEnabled,
    gestureEnabled: isAndroid ?
    // This prop enables handling of system back gestures on Android
    // Since we handle them in JS side, we disable this
    false : gestureEnabled,
    homeIndicatorHidden: autoHideHomeIndicator,
    navigationBarColor: navigationBarColor,
    navigationBarHidden: navigationBarHidden,
    replaceAnimation: animationTypeForReplace,
    stackPresentation: presentation === 'card' ? 'push' : presentation,
    stackAnimation: animation,
    screenOrientation: orientation,
    statusBarAnimation: statusBarAnimation,
    statusBarHidden: statusBarHidden,
    statusBarStyle: statusBarStyle,
    statusBarColor: statusBarColor,
    statusBarTranslucent: statusBarTranslucent,
    swipeDirection: gestureDirectionOverride,
    transitionDuration: animationDuration,
    onWillDisappear: onWillDisappear,
    onAppear: onAppear,
    onDisappear: onDisappear,
    onDismissed: onDismissed,
    isNativeStack: true,
    nativeBackButtonDismissalEnabled: false // on Android
    ,
    onHeaderBackButtonClicked: onHeaderBackButtonClicked
    // @ts-ignore props not exported from rn-screens
    ,
    preventNativeDismiss: isRemovePrevented // on iOS
    ,
    onNativeDismissCancelled: onNativeDismissCancelled
    // this prop is available since rn-screens 3.16
    ,
    freezeOnBlur: freezeOnBlur
  }, /*#__PURE__*/React.createElement(NavigationContext.Provider, {
    value: navigation
  }, /*#__PURE__*/React.createElement(NavigationRouteContext.Provider, {
    value: route
  }, /*#__PURE__*/React.createElement(HeaderShownContext.Provider, {
    value: isParentHeaderShown || headerShown !== false
  }, /*#__PURE__*/React.createElement(HeaderHeightContext.Provider, {
    value: headerShown !== false ? headerHeight : parentHeaderHeight ?? 0
  }, headerBackground != null ?
  /*#__PURE__*/
  /**
   * To show a custom header background, we render it at the top of the screen below the header
   * The header also needs to be positioned absolutely (with `translucent` style)
   */
  React.createElement(View, {
    style: [styles.background, headerTransparent ? styles.translucent : null, {
      height: headerHeight
    }]
  }, headerBackground()) : null, /*#__PURE__*/React.createElement(View, {
    accessibilityElementsHidden: !focused,
    importantForAccessibility: focused ? 'auto' : 'no-hide-descendants',
    style: styles.scene
  }, /*#__PURE__*/React.createElement(MaybeNestedStack, {
    options: options,
    route: route,
    presentation: presentation,
    headerHeight: headerHeight,
    headerTopInsetEnabled: headerTopInsetEnabled
  }, /*#__PURE__*/React.createElement(HeaderBackContext.Provider, {
    value: headerBack
  }, render())), header !== undefined && headerShown !== false ? /*#__PURE__*/React.createElement(View, {
    onLayout: e => {
      setCustomHeaderHeight(e.nativeEvent.layout.height);
    },
    style: headerTransparent ? styles.absolute : null
  }, header({
    back: headerBack,
    options,
    route,
    navigation
  })) : null), /*#__PURE__*/React.createElement(HeaderConfig, _extends({}, options, {
    route: route,
    headerBackButtonMenuEnabled: isRemovePrevented !== undefined ? !isRemovePrevented : headerBackButtonMenuEnabled,
    headerShown: header !== undefined ? false : headerShown,
    headerHeight: headerHeight,
    headerBackTitle: options.headerBackTitle !== undefined ? options.headerBackTitle : undefined,
    headerTopInsetEnabled: headerTopInsetEnabled,
    canGoBack: headerBack !== undefined
  })))))));
};
function NativeStackViewInner(_ref3) {
  let {
    state,
    navigation,
    descriptors
  } = _ref3;
  const {
    setNextDismissedKey
  } = useDismissedRouteError(state);
  useInvalidPreventRemoveError(descriptors);
  return /*#__PURE__*/React.createElement(ScreenStack, {
    style: styles.container
  }, state.routes.map((route, index) => {
    var _state$routes, _state$routes2;
    const descriptor = descriptors[route.key];
    const isFocused = state.index === index;
    const previousKey = (_state$routes = state.routes[index - 1]) === null || _state$routes === void 0 ? void 0 : _state$routes.key;
    const nextKey = (_state$routes2 = state.routes[index + 1]) === null || _state$routes2 === void 0 ? void 0 : _state$routes2.key;
    const previousDescriptor = previousKey ? descriptors[previousKey] : undefined;
    const nextDescriptor = nextKey ? descriptors[nextKey] : undefined;
    return /*#__PURE__*/React.createElement(SceneView, {
      key: route.key,
      index: index,
      focused: isFocused,
      descriptor: descriptor,
      previousDescriptor: previousDescriptor,
      nextDescriptor: nextDescriptor,
      onWillDisappear: () => {
        navigation.emit({
          type: 'transitionStart',
          data: {
            closing: true
          },
          target: route.key
        });
      },
      onAppear: () => {
        navigation.emit({
          type: 'transitionEnd',
          data: {
            closing: false
          },
          target: route.key
        });
      },
      onDisappear: () => {
        navigation.emit({
          type: 'transitionEnd',
          data: {
            closing: true
          },
          target: route.key
        });
      },
      onDismissed: event => {
        navigation.dispatch({
          ...StackActions.pop(event.nativeEvent.dismissCount),
          source: route.key,
          target: state.key
        });
        setNextDismissedKey(route.key);
      },
      onHeaderBackButtonClicked: () => {
        navigation.dispatch({
          ...StackActions.pop(),
          source: route.key,
          target: state.key
        });
      },
      onNativeDismissCancelled: event => {
        navigation.dispatch({
          ...StackActions.pop(event.nativeEvent.dismissCount),
          source: route.key,
          target: state.key
        });
      }
    });
  }));
}
export default function NativeStackView(props) {
  return /*#__PURE__*/React.createElement(SafeAreaProviderCompat, null, /*#__PURE__*/React.createElement(NativeStackViewInner, props));
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scene: {
    flex: 1,
    flexDirection: 'column-reverse'
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0
  },
  translucent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    elevation: 1
  },
  background: {
    overflow: 'hidden'
  }
});
//# sourceMappingURL=NativeStackView.native.js.map