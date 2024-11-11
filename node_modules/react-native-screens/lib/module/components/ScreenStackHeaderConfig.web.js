function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import { Image, View } from 'react-native';
import React from 'react';
export const ScreenStackHeaderBackButtonImage = props => /*#__PURE__*/React.createElement(View, null, /*#__PURE__*/React.createElement(Image, _extends({
  resizeMode: "center",
  fadeDuration: 0
}, props)));
export const ScreenStackHeaderRightView = props => /*#__PURE__*/React.createElement(View, props);
export const ScreenStackHeaderLeftView = props => /*#__PURE__*/React.createElement(View, props);
export const ScreenStackHeaderCenterView = props => /*#__PURE__*/React.createElement(View, props);
export const ScreenStackHeaderSearchBarView = props => /*#__PURE__*/React.createElement(View, props);
export const ScreenStackHeaderConfig = props => /*#__PURE__*/React.createElement(View, props);
export const ScreenStackHeaderSubview = View;
//# sourceMappingURL=ScreenStackHeaderConfig.web.js.map