"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toHaveTextContent = toHaveTextContent;
var _jestMatcherUtils = require("jest-matcher-utils");
var _textContent = require("../helpers/text-content");
var _matches = require("../matches");
var _utils = require("./utils");
function toHaveTextContent(element, expectedText, options) {
  (0, _utils.checkHostElement)(element, toHaveTextContent, this);
  const text = (0, _textContent.getTextContent)(element);
  return {
    pass: (0, _matches.matches)(expectedText, text, options?.normalizer, options?.exact),
    message: () => {
      return [(0, _utils.formatMessage)((0, _jestMatcherUtils.matcherHint)(`${this.isNot ? '.not' : ''}.toHaveTextContent`, 'element', ''), `Expected element ${this.isNot ? 'not to' : 'to'} have text content`, expectedText, 'Received', text)].join('\n');
    }
  };
}
//# sourceMappingURL=to-have-text-content.js.map