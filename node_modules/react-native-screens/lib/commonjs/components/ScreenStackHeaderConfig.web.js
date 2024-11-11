"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ScreenStackHeaderSubview = exports.ScreenStackHeaderSearchBarView = exports.ScreenStackHeaderRightView = exports.ScreenStackHeaderLeftView = exports.ScreenStackHeaderConfig = exports.ScreenStackHeaderCenterView = exports.ScreenStackHeaderBackButtonImage = void 0;
var _reactNative = require("react-native");
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
const ScreenStackHeaderBackButtonImage = props => /*#__PURE__*/_react.default.createElement(_reactNative.View, null, /*#__PURE__*/_react.default.createElement(_reactNative.Image, _extends({
  resizeMode: "center",
  fadeDuration: 0
}, props)));
exports.ScreenStackHeaderBackButtonImage = ScreenStackHeaderBackButtonImage;
const ScreenStackHeaderRightView = props => /*#__PURE__*/_react.default.createElement(_reactNative.View, props);
exports.ScreenStackHeaderRightView = ScreenStackHeaderRightView;
const ScreenStackHeaderLeftView = props => /*#__PURE__*/_react.default.createElement(_reactNative.View, props);
exports.ScreenStackHeaderLeftView = ScreenStackHeaderLeftView;
const ScreenStackHeaderCenterView = props => /*#__PURE__*/_react.default.createElement(_reactNative.View, props);
exports.ScreenStackHeaderCenterView = ScreenStackHeaderCenterView;
const ScreenStackHeaderSearchBarView = props => /*#__PURE__*/_react.default.createElement(_reactNative.View, props);
exports.ScreenStackHeaderSearchBarView = ScreenStackHeaderSearchBarView;
const ScreenStackHeaderConfig = props => /*#__PURE__*/_react.default.createElement(_reactNative.View, props);
exports.ScreenStackHeaderConfig = ScreenStackHeaderConfig;
const ScreenStackHeaderSubview = exports.ScreenStackHeaderSubview = _reactNative.View;
//# sourceMappingURL=ScreenStackHeaderConfig.web.js.map