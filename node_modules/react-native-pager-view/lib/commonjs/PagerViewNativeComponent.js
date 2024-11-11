"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Commands = void 0;
var _codegenNativeCommands = _interopRequireDefault(require("react-native/Libraries/Utilities/codegenNativeCommands"));
var _codegenNativeComponent = _interopRequireDefault(require("react-native/Libraries/Utilities/codegenNativeComponent"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const Commands = (0, _codegenNativeCommands.default)({
  supportedCommands: ['setPage', 'setPageWithoutAnimation', 'setScrollEnabledImperatively']
});
exports.Commands = Commands;
var _default = (0, _codegenNativeComponent.default)('RNCViewPager');
exports.default = _default;
//# sourceMappingURL=PagerViewNativeComponent.js.map