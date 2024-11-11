"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dispatchEvent = dispatchEvent;
var _act = _interopRequireDefault(require("../../act"));
var _componentTree = require("../../helpers/component-tree");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/**
 * Basic dispatch event function used by User Event module.
 *
 * @param element element trigger event on
 * @param eventName name of the event
 * @param event event payload(s)
 */
function dispatchEvent(element, eventName, ...event) {
  if (!(0, _componentTree.isElementMounted)(element)) {
    return;
  }
  const handler = getEventHandler(element, eventName);
  if (!handler) {
    return;
  }

  // This will be called synchronously.
  void (0, _act.default)(() => {
    handler(...event);
  });
}
function getEventHandler(element, eventName) {
  const handleName = getEventHandlerName(eventName);
  const handle = element.props[handleName];
  if (typeof handle !== 'function') {
    return undefined;
  }
  return handle;
}
function getEventHandlerName(eventName) {
  return `on${eventName.charAt(0).toUpperCase()}${eventName.slice(1)}`;
}
//# sourceMappingURL=dispatch-event.js.map