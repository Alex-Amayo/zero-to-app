"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getHostChildren = getHostChildren;
exports.getHostParent = getHostParent;
exports.getHostSelves = getHostSelves;
exports.getHostSiblings = getHostSiblings;
exports.getUnsafeRootElement = getUnsafeRootElement;
exports.isElementMounted = isElementMounted;
exports.isHostElement = isHostElement;
var _screen = require("../screen");
/**
 * ReactTestInstance referring to host element.
 */

/**
 * Checks if the given element is a host element.
 * @param element The element to check.
 */
function isHostElement(element) {
  return typeof element?.type === 'string';
}
function isElementMounted(element) {
  return getUnsafeRootElement(element) === _screen.screen.UNSAFE_root;
}

/**
 * Returns first host ancestor for given element.
 * @param element The element start traversing from.
 */
function getHostParent(element) {
  if (element == null) {
    return null;
  }
  let current = element.parent;
  while (current) {
    if (isHostElement(current)) {
      return current;
    }
    current = current.parent;
  }
  return null;
}

/**
 * Returns host children for given element.
 * @param element The element start traversing from.
 */
function getHostChildren(element) {
  if (element == null) {
    return [];
  }
  const hostChildren = [];
  element.children.forEach(child => {
    if (typeof child !== 'object') {
      return;
    }
    if (isHostElement(child)) {
      hostChildren.push(child);
    } else {
      hostChildren.push(...getHostChildren(child));
    }
  });
  return hostChildren;
}

/**
 * Return the array of host elements that represent the passed element.
 *
 * @param element The element start traversing from.
 * @returns If the passed element is a host element, it will return an array containing only that element,
 * if the passed element is a composite element, it will return an array containing its host children (zero, one or many).
 */
function getHostSelves(element) {
  return isHostElement(element) ? [element] : getHostChildren(element);
}

/**
 * Returns host siblings for given element.
 * @param element The element start traversing from.
 */
function getHostSiblings(element) {
  const hostParent = getHostParent(element);
  const hostSelves = getHostSelves(element);
  return getHostChildren(hostParent).filter(sibling => !hostSelves.includes(sibling));
}

/**
 * Returns the unsafe root element of the tree (probably composite).
 *
 * @param element The element start traversing from.
 * @returns The root element of the tree (host or composite).
 */
function getUnsafeRootElement(element) {
  if (element == null) {
    return null;
  }
  let current = element;
  while (current.parent) {
    current = current.parent;
  }
  return current;
}
//# sourceMappingURL=component-tree.js.map