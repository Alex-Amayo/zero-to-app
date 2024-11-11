"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Commands = void 0;
var _codegenNativeComponent = _interopRequireDefault(require("react-native/Libraries/Utilities/codegenNativeComponent"));
var _codegenNativeCommands = _interopRequireDefault(require("react-native/Libraries/Utilities/codegenNativeCommands"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const Commands = (0, _codegenNativeCommands.default)({
  supportedCommands: ['play', 'reset', 'pause', 'resume']
});
exports.Commands = Commands;
var _default = (0, _codegenNativeComponent.default)('LottieAnimationView');
exports.default = _default;
//# sourceMappingURL=LottieAnimationViewNativeComponent.js.map