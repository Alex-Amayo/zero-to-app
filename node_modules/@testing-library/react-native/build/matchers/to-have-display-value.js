"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toHaveDisplayValue = toHaveDisplayValue;
var _jestMatcherUtils = require("jest-matcher-utils");
var _hostComponentNames = require("../helpers/host-component-names");
var _errors = require("../helpers/errors");
var _textInput = require("../helpers/text-input");
var _matches = require("../matches");
var _utils = require("./utils");
function toHaveDisplayValue(element, expectedValue, options) {
  (0, _utils.checkHostElement)(element, toHaveDisplayValue, this);
  if (!(0, _hostComponentNames.isHostTextInput)(element)) {
    throw new _errors.ErrorWithStack(`toHaveDisplayValue() works only with host "TextInput" elements. Passed element has type "${element.type}".`, toHaveDisplayValue);
  }
  const receivedValue = (0, _textInput.getTextInputValue)(element);
  return {
    pass: (0, _matches.matches)(expectedValue, receivedValue, options?.normalizer, options?.exact),
    message: () => {
      return [(0, _utils.formatMessage)((0, _jestMatcherUtils.matcherHint)(`${this.isNot ? '.not' : ''}.toHaveDisplayValue`, 'element', ''), `Expected element ${this.isNot ? 'not to' : 'to'} have display value`, expectedValue, 'Received', receivedValue)].join('\n');
    }
  };
}
//# sourceMappingURL=to-have-display-value.js.map