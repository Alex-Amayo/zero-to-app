function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import React from 'react';
import { freezeEnabled } from 'react-native-screens';
import DelayedFreeze from './helpers/DelayedFreeze';

// Native components
import ScreenStackNativeComponent from '../fabric/ScreenStackNativeComponent';
const NativeScreenStack = ScreenStackNativeComponent;
function ScreenStack(props) {
  const {
    children,
    gestureDetectorBridge,
    ...rest
  } = props;
  const ref = React.useRef(null);
  const size = React.Children.count(children);
  // freezes all screens except the top one
  const childrenWithFreeze = React.Children.map(children, (child, index) => {
    // @ts-expect-error it's either SceneView in v6 or RouteView in v5
    const {
      props,
      key
    } = child;
    const descriptor = props?.descriptor ?? props?.descriptors?.[key];
    const isFreezeEnabled = descriptor?.options?.freezeOnBlur ?? freezeEnabled();
    return /*#__PURE__*/React.createElement(DelayedFreeze, {
      freeze: isFreezeEnabled && size - index > 1
    }, child);
  });
  React.useEffect(() => {
    if (gestureDetectorBridge) {
      gestureDetectorBridge.current.stackUseEffectCallback(ref);
    }
  });
  return /*#__PURE__*/React.createElement(NativeScreenStack, _extends({}, rest, {
    ref: ref
  }), childrenWithFreeze);
}
export default ScreenStack;
//# sourceMappingURL=ScreenStack.js.map