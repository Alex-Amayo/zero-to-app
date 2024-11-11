function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import React from 'react';
import { ScreenContext } from 'react-native-screens';
import ReanimatedNativeStackScreen from './ReanimatedNativeStackScreen';
import AnimatedScreen from './ReanimatedScreen';
class ReanimatedScreenWrapper extends React.Component {
  ref = null;
  setNativeProps(props) {
    this.ref?.setNativeProps(props);
  }
  setRef = ref => {
    this.ref = ref;
    this.props.onComponentRef?.(ref);
  };
  render() {
    const ReanimatedScreen = this.props.isNativeStack ? ReanimatedNativeStackScreen : AnimatedScreen;
    return /*#__PURE__*/React.createElement(ReanimatedScreen, _extends({}, this.props, {
      // @ts-ignore some problems with ref
      ref: this.setRef
    }));
  }
}
export default function ReanimatedScreenProvider(props) {
  return (
    /*#__PURE__*/
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    React.createElement(ScreenContext.Provider, {
      value: ReanimatedScreenWrapper
    }, props.children)
  );
}
//# sourceMappingURL=ReanimatedScreenProvider.js.map