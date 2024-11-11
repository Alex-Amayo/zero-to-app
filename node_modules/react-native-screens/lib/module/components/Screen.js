function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
/* eslint-disable @typescript-eslint/no-var-requires */
import React from 'react';
import { Animated, Platform } from 'react-native';
import TransitionProgressContext from '../TransitionProgressContext';
import DelayedFreeze from './helpers/DelayedFreeze';
import { freezeEnabled, isNativePlatformSupported, screensEnabled } from '../core';

// Native components
import ScreenNativeComponent from '../fabric/ScreenNativeComponent';
import ModalScreenNativeComponent from '../fabric/ModalScreenNativeComponent';
export const NativeScreen = ScreenNativeComponent;
const AnimatedNativeScreen = Animated.createAnimatedComponent(NativeScreen);
const AnimatedNativeModalScreen = Animated.createAnimatedComponent(ModalScreenNativeComponent);

// Incomplete type, all accessible properties available at:
// react-native/Libraries/Components/View/ReactNativeViewViewConfig.js
export class InnerScreen extends React.Component {
  ref = null;
  closing = new Animated.Value(0);
  progress = new Animated.Value(0);
  goingForward = new Animated.Value(0);
  setNativeProps(props) {
    this.ref?.setNativeProps(props);
  }
  setRef = ref => {
    this.ref = ref;
    this.props.onComponentRef?.(ref);
  };
  render() {
    const {
      enabled = screensEnabled(),
      freezeOnBlur = freezeEnabled(),
      ...rest
    } = this.props;

    // To maintain default behavior of formSheet stack presentation style and to have reasonable
    // defaults for new medium-detent iOS API we need to set defaults here
    const {
      sheetAllowedDetents = 'large',
      sheetLargestUndimmedDetent = 'all',
      sheetGrabberVisible = false,
      sheetCornerRadius = -1.0,
      sheetExpandsWhenScrolledToEdge = true,
      stackPresentation
    } = rest;
    if (enabled && isNativePlatformSupported) {
      // Due to how Yoga resolves layout, we need to have different components for modal nad non-modal screens
      const AnimatedScreen = Platform.OS === 'android' || stackPresentation === undefined || stackPresentation === 'push' || stackPresentation === 'containedModal' || stackPresentation === 'containedTransparentModal' ? AnimatedNativeScreen : AnimatedNativeModalScreen;
      let {
        // Filter out active prop in this case because it is unused and
        // can cause problems depending on react-native version:
        // https://github.com/react-navigation/react-navigation/issues/4886
        active,
        activityState,
        children,
        isNativeStack,
        gestureResponseDistance,
        onGestureCancel,
        ...props
      } = rest;
      if (active !== undefined && activityState === undefined) {
        console.warn('It appears that you are using old version of react-navigation library. Please update @react-navigation/bottom-tabs, @react-navigation/stack and @react-navigation/drawer to version 5.10.0 or above to take full advantage of new functionality added to react-native-screens');
        activityState = active !== 0 ? 2 : 0; // in the new version, we need one of the screens to have value of 2 after the transition
      }

      const handleRef = ref => {
        if (ref?.viewConfig?.validAttributes?.style) {
          ref.viewConfig.validAttributes.style = {
            ...ref.viewConfig.validAttributes.style,
            display: false
          };
          this.setRef(ref);
        } else if (ref?._viewConfig?.validAttributes?.style) {
          ref._viewConfig.validAttributes.style = {
            ...ref._viewConfig.validAttributes.style,
            display: false
          };
          this.setRef(ref);
        }
      };
      return /*#__PURE__*/React.createElement(DelayedFreeze, {
        freeze: freezeOnBlur && activityState === 0
      }, /*#__PURE__*/React.createElement(AnimatedScreen, _extends({}, props, {
        activityState: activityState,
        sheetAllowedDetents: sheetAllowedDetents,
        sheetLargestUndimmedDetent: sheetLargestUndimmedDetent,
        sheetGrabberVisible: sheetGrabberVisible,
        sheetCornerRadius: sheetCornerRadius,
        sheetExpandsWhenScrolledToEdge: sheetExpandsWhenScrolledToEdge,
        gestureResponseDistance: {
          start: gestureResponseDistance?.start ?? -1,
          end: gestureResponseDistance?.end ?? -1,
          top: gestureResponseDistance?.top ?? -1,
          bottom: gestureResponseDistance?.bottom ?? -1
        }
        // This prevents showing blank screen when navigating between multiple screens with freezing
        // https://github.com/software-mansion/react-native-screens/pull/1208
        ,
        ref: handleRef,
        onTransitionProgress: !isNativeStack ? undefined : Animated.event([{
          nativeEvent: {
            progress: this.progress,
            closing: this.closing,
            goingForward: this.goingForward
          }
        }], {
          useNativeDriver: true
        }),
        onGestureCancel: onGestureCancel ?? (() => {
          // for internal use
        })
      }), !isNativeStack ?
      // see comment of this prop in types.tsx for information why it is needed
      children : /*#__PURE__*/React.createElement(TransitionProgressContext.Provider, {
        value: {
          progress: this.progress,
          closing: this.closing,
          goingForward: this.goingForward
        }
      }, children)));
    } else {
      // same reason as above
      let {
        active,
        activityState,
        style,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        onComponentRef,
        ...props
      } = rest;
      if (active !== undefined && activityState === undefined) {
        activityState = active !== 0 ? 2 : 0;
      }
      return /*#__PURE__*/React.createElement(Animated.View, _extends({
        style: [style, {
          display: activityState !== 0 ? 'flex' : 'none'
        }],
        ref: this.setRef
      }, props));
    }
  }
}

// context to be used when the user wants to use enhanced implementation
// e.g. to use `useReanimatedTransitionProgress` (see `reanimated` folder in repo)
export const ScreenContext = /*#__PURE__*/React.createContext(InnerScreen);
class Screen extends React.Component {
  static contextType = ScreenContext;
  render() {
    const ScreenWrapper = this.context || InnerScreen;
    return /*#__PURE__*/React.createElement(ScreenWrapper, this.props);
  }
}
export default Screen;
//# sourceMappingURL=Screen.js.map