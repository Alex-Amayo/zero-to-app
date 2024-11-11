function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import React from 'react';
import { Image, StyleSheet } from 'react-native';

// Native components
import ScreenStackHeaderConfigNativeComponent from '../fabric/ScreenStackHeaderConfigNativeComponent';
import ScreenStackHeaderSubviewNativeComponent from '../fabric/ScreenStackHeaderSubviewNativeComponent';
export const ScreenStackHeaderConfig = ScreenStackHeaderConfigNativeComponent;
export const ScreenStackHeaderSubview = ScreenStackHeaderSubviewNativeComponent;
export const ScreenStackHeaderBackButtonImage = props => /*#__PURE__*/React.createElement(ScreenStackHeaderSubview, {
  type: "back",
  style: styles.headerSubview
}, /*#__PURE__*/React.createElement(Image, _extends({
  resizeMode: "center",
  fadeDuration: 0
}, props)));
export const ScreenStackHeaderRightView = props => /*#__PURE__*/React.createElement(ScreenStackHeaderSubview, _extends({}, props, {
  type: "right",
  style: styles.headerSubview
}));
export const ScreenStackHeaderLeftView = props => /*#__PURE__*/React.createElement(ScreenStackHeaderSubview, _extends({}, props, {
  type: "left",
  style: styles.headerSubview
}));
export const ScreenStackHeaderCenterView = props => /*#__PURE__*/React.createElement(ScreenStackHeaderSubview, _extends({}, props, {
  type: "center",
  style: styles.headerSubview
}));
export const ScreenStackHeaderSearchBarView = props => /*#__PURE__*/React.createElement(ScreenStackHeaderSubview, _extends({}, props, {
  type: "searchBar",
  style: styles.headerSubview
}));
const styles = StyleSheet.create({
  headerSubview: {
    position: 'absolute',
    top: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
//# sourceMappingURL=ScreenStackHeaderConfig.js.map