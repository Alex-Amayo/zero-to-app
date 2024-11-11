"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toBeCollapsed = toBeCollapsed;
exports.toBeExpanded = toBeExpanded;
var _jestMatcherUtils = require("jest-matcher-utils");
var _accessibility = require("../helpers/accessibility");
var _utils = require("./utils");
function toBeExpanded(element) {
  (0, _utils.checkHostElement)(element, toBeExpanded, this);
  return {
    pass: (0, _accessibility.computeAriaExpanded)(element) === true,
    message: () => {
      const matcher = (0, _jestMatcherUtils.matcherHint)(`${this.isNot ? '.not' : ''}.toBeExpanded`, 'element', '');
      return [matcher, '', `Received element is ${this.isNot ? '' : 'not '}expanded:`, (0, _utils.formatElement)(element)].join('\n');
    }
  };
}
function toBeCollapsed(element) {
  (0, _utils.checkHostElement)(element, toBeCollapsed, this);
  return {
    pass: (0, _accessibility.computeAriaExpanded)(element) === false,
    message: () => {
      const matcher = (0, _jestMatcherUtils.matcherHint)(`${this.isNot ? '.not' : ''}.toBeCollapsed`, 'element', '');
      return [matcher, '', `Received element is ${this.isNot ? '' : 'not '}collapsed:`, (0, _utils.formatElement)(element)].join('\n');
    }
  };
}
//# sourceMappingURL=to-be-expanded.js.map