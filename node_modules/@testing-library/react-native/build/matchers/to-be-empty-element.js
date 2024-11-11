"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toBeEmptyElement = toBeEmptyElement;
var _jestMatcherUtils = require("jest-matcher-utils");
var _componentTree = require("../helpers/component-tree");
var _utils = require("./utils");
function toBeEmptyElement(element) {
  (0, _utils.checkHostElement)(element, toBeEmptyElement, this);
  const hostChildren = (0, _componentTree.getHostChildren)(element);
  return {
    pass: hostChildren.length === 0,
    message: () => {
      return [(0, _jestMatcherUtils.matcherHint)(`${this.isNot ? '.not' : ''}.toBeEmptyElement`, 'element', ''), '', 'Received:', `${(0, _jestMatcherUtils.RECEIVED_COLOR)((0, _utils.formatElementArray)(hostChildren))}`].join('\n');
    }
  };
}
//# sourceMappingURL=to-be-empty-element.js.map