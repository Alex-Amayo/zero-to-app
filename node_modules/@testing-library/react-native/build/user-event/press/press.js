"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DEFAULT_MIN_PRESS_DURATION = exports.DEFAULT_LONG_PRESS_DELAY_MS = void 0;
exports.longPress = longPress;
exports.press = press;
var _act = _interopRequireDefault(require("../../act"));
var _componentTree = require("../../helpers/component-tree");
var _textInput = require("../../helpers/text-input");
var _pointerEvents = require("../../helpers/pointer-events");
var _hostComponentNames = require("../../helpers/host-component-names");
var _eventBuilder = require("../event-builder");
var _utils = require("../utils");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// These are constants defined in the React Native repo
// See: https://github.com/facebook/react-native/blob/50e38cc9f1e6713228a91ad50f426c4f65e65e1a/packages/react-native/Libraries/Pressability/Pressability.js#L264
const DEFAULT_MIN_PRESS_DURATION = exports.DEFAULT_MIN_PRESS_DURATION = 130;
const DEFAULT_LONG_PRESS_DELAY_MS = exports.DEFAULT_LONG_PRESS_DELAY_MS = 500;
async function press(element) {
  await basePress(this.config, element, {
    type: 'press'
  });
}
async function longPress(element, options) {
  await basePress(this.config, element, {
    type: 'longPress',
    duration: options?.duration ?? DEFAULT_LONG_PRESS_DELAY_MS
  });
}
const basePress = async (config, element, options) => {
  if (isPressableText(element)) {
    await emitTextPressEvents(config, element, options);
    return;
  }
  if ((0, _hostComponentNames.isHostTextInput)(element) && (0, _textInput.isTextInputEditable)(element) && (0, _pointerEvents.isPointerEventEnabled)(element)) {
    await emitTextInputPressEvents(config, element, options);
    return;
  }
  if (isEnabledTouchResponder(element)) {
    await emitPressablePressEvents(config, element, options);
    return;
  }
  const hostParentElement = (0, _componentTree.getHostParent)(element);
  if (!hostParentElement) {
    return;
  }
  await basePress(config, hostParentElement, options);
};
const emitPressablePressEvents = async (config, element, options) => {
  await (0, _utils.wait)(config);
  (0, _utils.dispatchEvent)(element, 'responderGrant', _eventBuilder.EventBuilder.Common.responderGrant());
  const duration = options.duration ?? DEFAULT_MIN_PRESS_DURATION;
  await (0, _utils.wait)(config, duration);
  (0, _utils.dispatchEvent)(element, 'responderRelease', _eventBuilder.EventBuilder.Common.responderRelease());

  // React Native will wait for minimal delay of DEFAULT_MIN_PRESS_DURATION
  // before emitting the `pressOut` event. We need to wait here, so that
  // `press()` function does not return before that.
  if (DEFAULT_MIN_PRESS_DURATION - duration > 0) {
    await (0, _act.default)(async () => {
      await (0, _utils.wait)(config, DEFAULT_MIN_PRESS_DURATION - duration);
    });
  }
};
const isEnabledTouchResponder = element => {
  return (0, _pointerEvents.isPointerEventEnabled)(element) && element.props.onStartShouldSetResponder?.();
};
const isPressableText = element => {
  const hasPressEventHandler = Boolean(element.props.onPress || element.props.onLongPress || element.props.onPressIn || element.props.onPressOut);
  return (0, _hostComponentNames.isHostText)(element) && (0, _pointerEvents.isPointerEventEnabled)(element) && !element.props.disabled && hasPressEventHandler;
};

/**
 * Dispatches a press event sequence for Text.
 */
async function emitTextPressEvents(config, element, options) {
  await (0, _utils.wait)(config);
  (0, _utils.dispatchEvent)(element, 'pressIn', _eventBuilder.EventBuilder.Common.touch());
  await (0, _utils.wait)(config, options.duration);

  // Long press events are emitted before `pressOut`.
  if (options.type === 'longPress') {
    (0, _utils.dispatchEvent)(element, 'longPress', _eventBuilder.EventBuilder.Common.touch());
  }
  (0, _utils.dispatchEvent)(element, 'pressOut', _eventBuilder.EventBuilder.Common.touch());

  // Regular press events are emitted after `pressOut` according to the React Native docs.
  // See: https://reactnative.dev/docs/pressable#onpress
  // Experimentally for very short presses (< 130ms) `press` events are actually emitted before `onPressOut`, but
  // we will ignore that as in reality most pressed would be above the 130ms threshold.
  if (options.type === 'press') {
    (0, _utils.dispatchEvent)(element, 'press', _eventBuilder.EventBuilder.Common.touch());
  }
}

/**
 * Dispatches a press event sequence for TextInput.
 */
async function emitTextInputPressEvents(config, element, options) {
  await (0, _utils.wait)(config);
  (0, _utils.dispatchEvent)(element, 'pressIn', _eventBuilder.EventBuilder.Common.touch());

  // Note: TextInput does not have `onPress`/`onLongPress` props.

  await (0, _utils.wait)(config, options.duration);
  (0, _utils.dispatchEvent)(element, 'pressOut', _eventBuilder.EventBuilder.Common.touch());
}
//# sourceMappingURL=press.js.map