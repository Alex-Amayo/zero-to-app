"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ScreenStackHeaderSubview = exports.ScreenStackHeaderSearchBarView = exports.ScreenStackHeaderRightView = exports.ScreenStackHeaderLeftView = exports.ScreenStackHeaderConfig = exports.ScreenStackHeaderCenterView = exports.ScreenStackHeaderBackButtonImage = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _ScreenStackHeaderConfigNativeComponent = _interopRequireDefault(require("../fabric/ScreenStackHeaderConfigNativeComponent"));
var _ScreenStackHeaderSubviewNativeComponent = _interopRequireDefault(require("../fabric/ScreenStackHeaderSubviewNativeComponent"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); } // Native components
const ScreenStackHeaderConfig = exports.ScreenStackHeaderConfig = _ScreenStackHeaderConfigNativeComponent.default;
const ScreenStackHeaderSubview = exports.ScreenStackHeaderSubview = _ScreenStackHeaderSubviewNativeComponent.default;
const ScreenStackHeaderBackButtonImage = props => /*#__PURE__*/_react.default.createElement(ScreenStackHeaderSubview, {
  type: "back",
  style: styles.headerSubview
}, /*#__PURE__*/_react.default.createElement(_reactNative.Image, _extends({
  resizeMode: "center",
  fadeDuration: 0
}, props)));
exports.ScreenStackHeaderBackButtonImage = ScreenStackHeaderBackButtonImage;
const ScreenStackHeaderRightView = props => /*#__PURE__*/_react.default.createElement(ScreenStackHeaderSubview, _extends({}, props, {
  type: "right",
  style: styles.headerSubview
}));
exports.ScreenStackHeaderRightView = ScreenStackHeaderRightView;
const ScreenStackHeaderLeftView = props => /*#__PURE__*/_react.default.createElement(ScreenStackHeaderSubview, _extends({}, props, {
  type: "left",
  style: styles.headerSubview
}));
exports.ScreenStackHeaderLeftView = ScreenStackHeaderLeftView;
const ScreenStackHeaderCenterView = props => /*#__PURE__*/_react.default.createElement(ScreenStackHeaderSubview, _extends({}, props, {
  type: "center",
  style: styles.headerSubview
}));
exports.ScreenStackHeaderCenterView = ScreenStackHeaderCenterView;
const ScreenStackHeaderSearchBarView = props => /*#__PURE__*/_react.default.createElement(ScreenStackHeaderSubview, _extends({}, props, {
  type: "searchBar",
  style: styles.headerSubview
}));
exports.ScreenStackHeaderSearchBarView = ScreenStackHeaderSearchBarView;
const styles = _reactNative.StyleSheet.create({
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