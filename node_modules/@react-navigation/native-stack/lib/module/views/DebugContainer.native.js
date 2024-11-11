function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import * as React from 'react';
import { Platform, View } from 'react-native';
// @ts-ignore Getting private component
import AppContainer from 'react-native/Libraries/ReactNative/AppContainer';
/**
 * This view must *not* be flattened.
 * See https://github.com/software-mansion/react-native-screens/pull/1825
 * for detailed explanation.
 */
let DebugContainer = props => {
  return /*#__PURE__*/React.createElement(View, _extends({}, props, {
    collapsable: false
  }));
};
if (process.env.NODE_ENV !== 'production') {
  DebugContainer = props => {
    const {
      stackPresentation,
      ...rest
    } = props;
    if (Platform.OS === 'ios' && stackPresentation !== 'push') {
      // This is necessary for LogBox
      return /*#__PURE__*/React.createElement(AppContainer, null, /*#__PURE__*/React.createElement(View, _extends({}, rest, {
        collapsable: false
      })));
    }
    return /*#__PURE__*/React.createElement(View, _extends({}, rest, {
      collapsable: false
    }));
  };
}
export default DebugContainer;
//# sourceMappingURL=DebugContainer.native.js.map