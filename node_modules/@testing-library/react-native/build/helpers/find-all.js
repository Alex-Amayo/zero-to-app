"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findAll = findAll;
var _config = require("../config");
var _accessibility = require("./accessibility");
var _componentTree = require("./component-tree");
function findAll(root, predicate, options) {
  const results = findAllInternal(root, predicate, options);
  const includeHiddenElements = options?.includeHiddenElements ?? options?.hidden ?? (0, _config.getConfig)()?.defaultIncludeHiddenElements;
  if (includeHiddenElements) {
    return results;
  }
  const cache = new WeakMap();
  return results.filter(element => !(0, _accessibility.isHiddenFromAccessibility)(element, {
    cache
  }));
}

// Extracted from React Test Renderer
// src: https://github.com/facebook/react/blob/8e2bde6f2751aa6335f3cef488c05c3ea08e074a/packages/react-test-renderer/src/ReactTestRenderer.js#L402
function findAllInternal(root, predicate, options) {
  const results = [];

  // Match descendants first but do not add them to results yet.
  const matchingDescendants = [];
  root.children.forEach(child => {
    if (typeof child === 'string') {
      return;
    }
    matchingDescendants.push(...findAllInternal(child, predicate, options));
  });
  if (
  // When matchDeepestOnly = true: add current element only if no descendants match
  (!options?.matchDeepestOnly || matchingDescendants.length === 0) && (0, _componentTree.isHostElement)(root) && predicate(root)) {
    results.push(root);
  }

  // Add matching descendants after element to preserve original tree walk order.
  results.push(...matchingDescendants);
  return results;
}
//# sourceMappingURL=find-all.js.map