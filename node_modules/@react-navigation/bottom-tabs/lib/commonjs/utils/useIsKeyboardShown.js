"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useIsKeyboardShown;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function useIsKeyboardShown() {
  const [isKeyboardShown, setIsKeyboardShown] = React.useState(false);
  React.useEffect(() => {
    const handleKeyboardShow = () => setIsKeyboardShown(true);
    const handleKeyboardHide = () => setIsKeyboardShown(false);
    let subscriptions;
    if (_reactNative.Platform.OS === 'ios') {
      subscriptions = [_reactNative.Keyboard.addListener('keyboardWillShow', handleKeyboardShow), _reactNative.Keyboard.addListener('keyboardWillHide', handleKeyboardHide)];
    } else {
      subscriptions = [_reactNative.Keyboard.addListener('keyboardDidShow', handleKeyboardShow), _reactNative.Keyboard.addListener('keyboardDidHide', handleKeyboardHide)];
    }
    return () => {
      subscriptions.forEach(s => s.remove());
    };
  }, []);
  return isKeyboardShown;
}
//# sourceMappingURL=useIsKeyboardShown.js.map