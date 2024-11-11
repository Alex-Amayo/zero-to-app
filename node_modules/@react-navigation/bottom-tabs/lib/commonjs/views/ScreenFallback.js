"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MaybeScreen = MaybeScreen;
exports.MaybeScreenContainer = void 0;
var _elements = require("@react-navigation/elements");
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
let Screens;
try {
  Screens = require('react-native-screens');
} catch (e) {
  // Ignore
}
const MaybeScreenContainer = _ref => {
  var _Screens, _Screens$screensEnabl;
  let {
    enabled,
    ...rest
  } = _ref;
  if ((_Screens = Screens) !== null && _Screens !== void 0 && (_Screens$screensEnabl = _Screens.screensEnabled) !== null && _Screens$screensEnabl !== void 0 && _Screens$screensEnabl.call(_Screens)) {
    return /*#__PURE__*/React.createElement(Screens.ScreenContainer, _extends({
      enabled: enabled
    }, rest));
  }
  return /*#__PURE__*/React.createElement(_reactNative.View, rest);
};
exports.MaybeScreenContainer = MaybeScreenContainer;
function MaybeScreen(_ref2) {
  var _Screens2, _Screens2$screensEnab;
  let {
    visible,
    children,
    ...rest
  } = _ref2;
  if ((_Screens2 = Screens) !== null && _Screens2 !== void 0 && (_Screens2$screensEnab = _Screens2.screensEnabled) !== null && _Screens2$screensEnab !== void 0 && _Screens2$screensEnab.call(_Screens2)) {
    return /*#__PURE__*/React.createElement(Screens.Screen, _extends({
      activityState: visible ? 2 : 0
    }, rest), children);
  }
  return /*#__PURE__*/React.createElement(_elements.ResourceSavingView, _extends({
    visible: visible
  }, rest), children);
}
//# sourceMappingURL=ScreenFallback.js.map