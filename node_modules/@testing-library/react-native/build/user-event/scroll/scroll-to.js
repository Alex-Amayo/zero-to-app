"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.scrollTo = scrollTo;
var _jestMatcherUtils = require("jest-matcher-utils");
var _eventBuilder = require("../event-builder");
var _errors = require("../../helpers/errors");
var _hostComponentNames = require("../../helpers/host-component-names");
var _object = require("../../helpers/object");
var _nativeState = require("../../native-state");
var _utils = require("../utils");
var _utils2 = require("./utils");
async function scrollTo(element, options) {
  if (!(0, _hostComponentNames.isHostScrollView)(element)) {
    throw new _errors.ErrorWithStack(`scrollTo() works only with host "ScrollView" elements. Passed element has type "${element.type}".`, scrollTo);
  }
  ensureScrollViewDirection(element, options);
  (0, _utils.dispatchEvent)(element, 'contentSizeChange', options.contentSize?.width ?? 0, options.contentSize?.height ?? 0);
  const initialOffset = _nativeState.nativeState.contentOffsetForElement.get(element) ?? {
    x: 0,
    y: 0
  };
  const dragSteps = (0, _utils2.createScrollSteps)({
    y: options.y,
    x: options.x
  }, initialOffset, _utils2.linearInterpolator);
  await emitDragScrollEvents(this.config, element, dragSteps, options);
  const momentumStart = dragSteps.at(-1) ?? initialOffset;
  const momentumSteps = (0, _utils2.createScrollSteps)({
    y: options.momentumY,
    x: options.momentumX
  }, momentumStart, _utils2.inertialInterpolator);
  await emitMomentumScrollEvents(this.config, element, momentumSteps, options);
  const finalOffset = momentumSteps.at(-1) ?? dragSteps.at(-1) ?? initialOffset;
  _nativeState.nativeState.contentOffsetForElement.set(element, finalOffset);
}
async function emitDragScrollEvents(config, element, scrollSteps, scrollOptions) {
  if (scrollSteps.length === 0) {
    return;
  }
  await (0, _utils.wait)(config);
  (0, _utils.dispatchEvent)(element, 'scrollBeginDrag', _eventBuilder.EventBuilder.ScrollView.scroll(scrollSteps[0], scrollOptions));

  // Note: experimentally, in case of drag scroll the last scroll step
  // will not trigger `scroll` event.
  // See: https://github.com/callstack/react-native-testing-library/wiki/ScrollView-Events
  for (let i = 1; i < scrollSteps.length - 1; i += 1) {
    await (0, _utils.wait)(config);
    (0, _utils.dispatchEvent)(element, 'scroll', _eventBuilder.EventBuilder.ScrollView.scroll(scrollSteps[i], scrollOptions));
  }
  await (0, _utils.wait)(config);
  const lastStep = scrollSteps.at(-1);
  (0, _utils.dispatchEvent)(element, 'scrollEndDrag', _eventBuilder.EventBuilder.ScrollView.scroll(lastStep, scrollOptions));
}
async function emitMomentumScrollEvents(config, element, scrollSteps, scrollOptions) {
  if (scrollSteps.length === 0) {
    return;
  }
  await (0, _utils.wait)(config);
  (0, _utils.dispatchEvent)(element, 'momentumScrollBegin', _eventBuilder.EventBuilder.ScrollView.scroll(scrollSteps[0], scrollOptions));

  // Note: experimentally, in case of momentum scroll the last scroll step
  // will trigger `scroll` event.
  // See: https://github.com/callstack/react-native-testing-library/wiki/ScrollView-Events
  for (let i = 1; i < scrollSteps.length; i += 1) {
    await (0, _utils.wait)(config);
    (0, _utils.dispatchEvent)(element, 'scroll', _eventBuilder.EventBuilder.ScrollView.scroll(scrollSteps[i], scrollOptions));
  }
  await (0, _utils.wait)(config);
  const lastStep = scrollSteps.at(-1);
  (0, _utils.dispatchEvent)(element, 'momentumScrollEnd', _eventBuilder.EventBuilder.ScrollView.scroll(lastStep, scrollOptions));
}
function ensureScrollViewDirection(element, options) {
  const isVerticalScrollView = element.props.horizontal !== true;
  const hasHorizontalScrollOptions = options.x !== undefined || options.momentumX !== undefined;
  if (isVerticalScrollView && hasHorizontalScrollOptions) {
    throw new _errors.ErrorWithStack(`scrollTo() expected only vertical scroll options: "y" and "momentumY" for vertical "ScrollView" element but received ${(0, _jestMatcherUtils.stringify)((0, _object.pick)(options, ['x', 'momentumX']))}`, scrollTo);
  }
  const hasVerticalScrollOptions = options.y !== undefined || options.momentumY !== undefined;
  if (!isVerticalScrollView && hasVerticalScrollOptions) {
    throw new _errors.ErrorWithStack(`scrollTo() expected only horizontal scroll options: "x" and "momentumX" for horizontal "ScrollView" element but received ${(0, _jestMatcherUtils.stringify)((0, _object.pick)(options, ['y', 'momentumY']))}`, scrollTo);
  }
}
//# sourceMappingURL=scroll-to.js.map