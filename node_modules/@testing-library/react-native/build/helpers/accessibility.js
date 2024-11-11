"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.accessibilityValueKeys = exports.accessibilityStateKeys = void 0;
exports.computeAccessibleName = computeAccessibleName;
exports.computeAriaBusy = computeAriaBusy;
exports.computeAriaChecked = computeAriaChecked;
exports.computeAriaDisabled = computeAriaDisabled;
exports.computeAriaExpanded = computeAriaExpanded;
exports.computeAriaLabel = computeAriaLabel;
exports.computeAriaLabelledBy = computeAriaLabelledBy;
exports.computeAriaModal = computeAriaModal;
exports.computeAriaSelected = computeAriaSelected;
exports.computeAriaValue = computeAriaValue;
exports.getRole = getRole;
exports.isAccessibilityElement = isAccessibilityElement;
exports.isHiddenFromAccessibility = isHiddenFromAccessibility;
exports.isInaccessible = void 0;
exports.normalizeRole = normalizeRole;
exports.rolesSupportingCheckedState = void 0;
var _reactNative = require("react-native");
var _componentTree = require("./component-tree");
var _hostComponentNames = require("./host-component-names");
var _textContent = require("./text-content");
var _textInput = require("./text-input");
const accessibilityStateKeys = exports.accessibilityStateKeys = ['disabled', 'selected', 'checked', 'busy', 'expanded'];
const accessibilityValueKeys = exports.accessibilityValueKeys = ['min', 'max', 'now', 'text'];
function isHiddenFromAccessibility(element, {
  cache
} = {}) {
  if (element == null) {
    return true;
  }
  let current = element;
  while (current) {
    let isCurrentSubtreeInaccessible = cache?.get(current);
    if (isCurrentSubtreeInaccessible === undefined) {
      isCurrentSubtreeInaccessible = isSubtreeInaccessible(current);
      cache?.set(current, isCurrentSubtreeInaccessible);
    }
    if (isCurrentSubtreeInaccessible) {
      return true;
    }
    current = current.parent;
  }
  return false;
}

/** RTL-compatibility alias for `isHiddenFromAccessibility` */
const isInaccessible = exports.isInaccessible = isHiddenFromAccessibility;
function isSubtreeInaccessible(element) {
  // Null props can happen for React.Fragments
  if (element.props == null) {
    return false;
  }

  // See: https://reactnative.dev/docs/accessibility#aria-hidden
  if (element.props['aria-hidden']) {
    return true;
  }

  // iOS: accessibilityElementsHidden
  // See: https://reactnative.dev/docs/accessibility#accessibilityelementshidden-ios
  if (element.props.accessibilityElementsHidden) {
    return true;
  }

  // Android: importantForAccessibility
  // See: https://reactnative.dev/docs/accessibility#importantforaccessibility-android
  if (element.props.importantForAccessibility === 'no-hide-descendants') {
    return true;
  }

  // Note that `opacity: 0` is not treated as inaccessible on iOS
  const flatStyle = _reactNative.StyleSheet.flatten(element.props.style) ?? {};
  if (flatStyle.display === 'none') return true;

  // iOS: accessibilityViewIsModal or aria-modal
  // See: https://reactnative.dev/docs/accessibility#accessibilityviewismodal-ios
  const hostSiblings = (0, _componentTree.getHostSiblings)(element);
  if (hostSiblings.some(sibling => computeAriaModal(sibling))) {
    return true;
  }
  return false;
}
function isAccessibilityElement(element) {
  if (element == null) {
    return false;
  }

  // https://github.com/facebook/react-native/blob/8dabed60f456e76a9e53273b601446f34de41fb5/packages/react-native/Libraries/Image/Image.ios.js#L172
  if ((0, _hostComponentNames.isHostImage)(element) && element.props.alt !== undefined) {
    return true;
  }
  if (element.props.accessible !== undefined) {
    return element.props.accessible;
  }
  const hostComponentNames = (0, _hostComponentNames.getHostComponentNames)();
  return element?.type === hostComponentNames?.text || element?.type === hostComponentNames?.textInput || element?.type === hostComponentNames?.switch;
}

/**
 * Returns the accessibility role for given element. It will return explicit
 * role from either `role` or `accessibilityRole` props if set.
 *
 * If explicit role is not available, it would try to return default element
 * role:
 * - `text` for `Text` elements
 *
 * In all other cases this functions returns `none`.
 *
 * @param element
 * @returns
 */
function getRole(element) {
  const explicitRole = element.props.role ?? element.props.accessibilityRole;
  if (explicitRole) {
    return normalizeRole(explicitRole);
  }
  if ((0, _hostComponentNames.isHostText)(element)) {
    return 'text';
  }

  // Note: host Image elements report "image" role in screen reader only on Android, but not on iOS.
  // It's better to require explicit role for Image elements.

  return 'none';
}

/**
 * There are some duplications between (ARIA) `Role` and `AccessibilityRole` types.
 * Resolve them by using ARIA `Role` type where possible.
 *
 * @param role Role to normalize
 * @returns Normalized role
 */
function normalizeRole(role) {
  if (role === 'image') {
    return 'img';
  }
  return role;
}
function computeAriaModal(element) {
  return element.props['aria-modal'] ?? element.props.accessibilityViewIsModal;
}
function computeAriaLabel(element) {
  const explicitLabel = element.props['aria-label'] ?? element.props.accessibilityLabel;
  if (explicitLabel) {
    return explicitLabel;
  }

  //https://github.com/facebook/react-native/blob/8dabed60f456e76a9e53273b601446f34de41fb5/packages/react-native/Libraries/Image/Image.ios.js#L173
  if ((0, _hostComponentNames.isHostImage)(element) && element.props.alt) {
    return element.props.alt;
  }
  return undefined;
}
function computeAriaLabelledBy(element) {
  return element.props['aria-labelledby'] ?? element.props.accessibilityLabelledBy;
}

// See: https://github.com/callstack/react-native-testing-library/wiki/Accessibility:-State#busy-state
function computeAriaBusy({
  props
}) {
  return props['aria-busy'] ?? props.accessibilityState?.busy ?? false;
}

// See: https://github.com/callstack/react-native-testing-library/wiki/Accessibility:-State#checked-state
function computeAriaChecked(element) {
  const {
    props
  } = element;
  if ((0, _hostComponentNames.isHostSwitch)(element)) {
    return props.value;
  }
  const role = getRole(element);
  if (!rolesSupportingCheckedState[role]) {
    return undefined;
  }
  return props['aria-checked'] ?? props.accessibilityState?.checked;
}

// See: https://github.com/callstack/react-native-testing-library/wiki/Accessibility:-State#disabled-state
function computeAriaDisabled(element) {
  if ((0, _hostComponentNames.isHostTextInput)(element) && !(0, _textInput.isTextInputEditable)(element)) {
    return true;
  }
  const {
    props
  } = element;
  return props['aria-disabled'] ?? props.accessibilityState?.disabled ?? false;
}

// See: https://github.com/callstack/react-native-testing-library/wiki/Accessibility:-State#expanded-state
function computeAriaExpanded({
  props
}) {
  return props['aria-expanded'] ?? props.accessibilityState?.expanded;
}

// See: https://github.com/callstack/react-native-testing-library/wiki/Accessibility:-State#selected-state
function computeAriaSelected({
  props
}) {
  return props['aria-selected'] ?? props.accessibilityState?.selected ?? false;
}
function computeAriaValue(element) {
  const {
    accessibilityValue,
    'aria-valuemax': ariaValueMax,
    'aria-valuemin': ariaValueMin,
    'aria-valuenow': ariaValueNow,
    'aria-valuetext': ariaValueText
  } = element.props;
  return {
    max: ariaValueMax ?? accessibilityValue?.max,
    min: ariaValueMin ?? accessibilityValue?.min,
    now: ariaValueNow ?? accessibilityValue?.now,
    text: ariaValueText ?? accessibilityValue?.text
  };
}
function computeAccessibleName(element) {
  const label = computeAriaLabel(element);
  if (label) {
    return label;
  }
  const labelElementId = computeAriaLabelledBy(element);
  if (labelElementId) {
    const rootElement = (0, _componentTree.getUnsafeRootElement)(element);
    const labelElement = rootElement?.findByProps({
      nativeID: labelElementId
    });
    if (labelElement) {
      return (0, _textContent.getTextContent)(labelElement);
    }
  }
  return (0, _textContent.getTextContent)(element);
}
const rolesSupportingCheckedState = exports.rolesSupportingCheckedState = {
  checkbox: true,
  radio: true,
  switch: true
};
//# sourceMappingURL=accessibility.js.map