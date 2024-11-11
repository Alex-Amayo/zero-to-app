"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.matchLabelText = matchLabelText;
var _matches = require("../../matches");
var _accessibility = require("../accessibility");
var _findAll = require("../find-all");
var _matchTextContent = require("./match-text-content");
function matchLabelText(root, element, expectedText, options = {}) {
  return matchAccessibilityLabel(element, expectedText, options) || matchAccessibilityLabelledBy(root, (0, _accessibility.computeAriaLabelledBy)(element), expectedText, options);
}
function matchAccessibilityLabel(element, expectedLabel, options) {
  return (0, _matches.matches)(expectedLabel, (0, _accessibility.computeAriaLabel)(element), options.normalizer, options.exact);
}
function matchAccessibilityLabelledBy(root, nativeId, text, options) {
  if (!nativeId) {
    return false;
  }
  return (0, _findAll.findAll)(root, node => node.props.nativeID === nativeId && (0, _matchTextContent.matchTextContent)(node, text, options)).length > 0;
}
//# sourceMappingURL=match-label-text.js.map