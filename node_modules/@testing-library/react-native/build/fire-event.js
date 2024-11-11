"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.isEventEnabled = isEventEnabled;
exports.isTouchResponder = isTouchResponder;
var _act = _interopRequireDefault(require("./act"));
var _componentTree = require("./helpers/component-tree");
var _hostComponentNames = require("./helpers/host-component-names");
var _pointerEvents = require("./helpers/pointer-events");
var _textInput = require("./helpers/text-input");
var _nativeState = require("./native-state");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function isTouchResponder(element) {
  if (!(0, _componentTree.isHostElement)(element)) {
    return false;
  }
  return Boolean(element.props.onStartShouldSetResponder) || (0, _hostComponentNames.isHostTextInput)(element);
}

/**
 * List of events affected by `pointerEvents` prop.
 *
 * Note: `fireEvent` is accepting both `press` and `onPress` for event names,
 * so we need cover both forms.
 */
const eventsAffectedByPointerEventsProp = new Set(['press', 'onPress']);

/**
 * List of `TextInput` events not affected by `editable` prop.
 *
 * Note: `fireEvent` is accepting both `press` and `onPress` for event names,
 * so we need cover both forms.
 */
const textInputEventsIgnoringEditableProp = new Set(['contentSizeChange', 'onContentSizeChange', 'layout', 'onLayout', 'scroll', 'onScroll']);
function isEventEnabled(element, eventName, nearestTouchResponder) {
  if ((0, _hostComponentNames.isHostTextInput)(nearestTouchResponder)) {
    return (0, _textInput.isTextInputEditable)(nearestTouchResponder) || textInputEventsIgnoringEditableProp.has(eventName);
  }
  if (eventsAffectedByPointerEventsProp.has(eventName) && !(0, _pointerEvents.isPointerEventEnabled)(element)) {
    return false;
  }
  const touchStart = nearestTouchResponder?.props.onStartShouldSetResponder?.();
  const touchMove = nearestTouchResponder?.props.onMoveShouldSetResponder?.();
  if (touchStart || touchMove) {
    return true;
  }
  return touchStart === undefined && touchMove === undefined;
}
function findEventHandler(element, eventName, nearestTouchResponder) {
  const touchResponder = isTouchResponder(element) ? element : nearestTouchResponder;
  const handler = getEventHandler(element, eventName);
  if (handler && isEventEnabled(element, eventName, touchResponder)) return handler;

  // eslint-disable-next-line @typescript-eslint/prefer-optional-chain
  if (element.parent === null || element.parent.parent === null) {
    return null;
  }
  return findEventHandler(element.parent, eventName, touchResponder);
}
function getEventHandler(element, eventName) {
  const eventHandlerName = getEventHandlerName(eventName);
  if (typeof element.props[eventHandlerName] === 'function') {
    return element.props[eventHandlerName];
  }
  if (typeof element.props[eventName] === 'function') {
    return element.props[eventName];
  }
  return undefined;
}
function getEventHandlerName(eventName) {
  return `on${eventName.charAt(0).toUpperCase()}${eventName.slice(1)}`;
}

// String union type of keys of T that start with on, stripped of 'on'

function fireEvent(element, eventName, ...data) {
  if (!(0, _componentTree.isElementMounted)(element)) {
    return;
  }
  setNativeStateIfNeeded(element, eventName, data[0]);
  const handler = findEventHandler(element, eventName);
  if (!handler) {
    return;
  }
  let returnValue;
  void (0, _act.default)(() => {
    returnValue = handler(...data);
  });
  return returnValue;
}
fireEvent.press = (element, ...data) => fireEvent(element, 'press', ...data);
fireEvent.changeText = (element, ...data) => fireEvent(element, 'changeText', ...data);
fireEvent.scroll = (element, ...data) => fireEvent(element, 'scroll', ...data);
var _default = exports.default = fireEvent;
const scrollEventNames = new Set(['scroll', 'scrollBeginDrag', 'scrollEndDrag', 'momentumScrollBegin', 'momentumScrollEnd']);
function setNativeStateIfNeeded(element, eventName, value) {
  if (eventName === 'changeText' && typeof value === 'string' && (0, _hostComponentNames.isHostTextInput)(element) && (0, _textInput.isTextInputEditable)(element)) {
    _nativeState.nativeState.valueForElement.set(element, value);
  }
  if (scrollEventNames.has(eventName) && (0, _hostComponentNames.isHostScrollView)(element)) {
    const contentOffset = tryGetContentOffset(value);
    if (contentOffset) {
      _nativeState.nativeState.contentOffsetForElement.set(element, contentOffset);
    }
  }
}
function tryGetContentOffset(event) {
  try {
    // @ts-expect-error: try to extract contentOffset from the event value
    const contentOffset = event?.nativeEvent?.contentOffset;
    const x = contentOffset?.x;
    const y = contentOffset?.y;
    if (typeof x === 'number' || typeof y === 'number') {
      return {
        x: Number.isFinite(x) ? x : 0,
        y: Number.isFinite(y) ? y : 0
      };
    }
  } catch {
    // Do nothing
  }
  return null;
}
//# sourceMappingURL=fire-event.js.map