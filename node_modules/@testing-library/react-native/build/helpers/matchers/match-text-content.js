"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.matchTextContent = matchTextContent;
var _matches = require("../../matches");
var _textContent = require("../text-content");
/**
 * Matches the given node's text content against string or regex matcher.
 *
 * @param node - Node which text content will be matched
 * @param text - The string or regex to match.
 * @returns - Whether the node's text content matches the given string or regex.
 */
function matchTextContent(node, text, options = {}) {
  const textContent = (0, _textContent.getTextContent)(node);
  const {
    exact,
    normalizer
  } = options;
  return (0, _matches.matches)(text, textContent, normalizer, exact);
}
//# sourceMappingURL=match-text-content.js.map