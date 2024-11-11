"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isPointerEventEnabled = void 0;
var _componentTree = require("./component-tree");
/**
 * pointerEvents controls whether the View can be the target of touch events.
 * 'auto': The View and its children can be the target of touch events.
 * 'none': The View is never the target of touch events.
 * 'box-none': The View is never the target of touch events but its subviews can be
 * 'box-only': The view can be the target of touch events but its subviews cannot be
 * see the official react native doc https://reactnative.dev/docs/view#pointerevents */
const isPointerEventEnabled = (element, isParent) => {
  const parentCondition = isParent ? element?.props.pointerEvents === 'box-only' : element?.props.pointerEvents === 'box-none';
  if (element?.props.pointerEvents === 'none' || parentCondition) {
    return false;
  }
  const hostParent = (0, _componentTree.getHostParent)(element);
  if (!hostParent) return true;
  return isPointerEventEnabled(hostParent, true);
};
exports.isPointerEventEnabled = isPointerEventEnabled;
//# sourceMappingURL=pointer-events.js.map