"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toBeBusy = toBeBusy;
var _jestMatcherUtils = require("jest-matcher-utils");
var _accessibility = require("../helpers/accessibility");
var _utils = require("./utils");
function toBeBusy(element) {
  (0, _utils.checkHostElement)(element, toBeBusy, this);
  return {
    pass: (0, _accessibility.computeAriaBusy)(element),
    message: () => {
      const matcher = (0, _jestMatcherUtils.matcherHint)(`${this.isNot ? '.not' : ''}.toBeBusy`, 'element', '');
      return [matcher, '', `Received element is ${this.isNot ? '' : 'not '}busy:`, (0, _utils.formatElement)(element)].join('\n');
    }
  };
}
//# sourceMappingURL=to-be-busy.js.map