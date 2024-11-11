"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toHaveProp = toHaveProp;
var _jestMatcherUtils = require("jest-matcher-utils");
var _utils = require("./utils");
function toHaveProp(element, name, expectedValue) {
  (0, _utils.checkHostElement)(element, toHaveProp, this);
  const isExpectedValueDefined = expectedValue !== undefined;
  const hasProp = name in element.props;
  const receivedValue = element.props[name];
  const pass = isExpectedValueDefined ? hasProp && this.equals(expectedValue, receivedValue) : hasProp;
  return {
    pass,
    message: () => {
      const to = this.isNot ? 'not to' : 'to';
      const matcher = (0, _jestMatcherUtils.matcherHint)(`${this.isNot ? '.not' : ''}.toHaveProp`, 'element', (0, _jestMatcherUtils.printExpected)(name), {
        secondArgument: isExpectedValueDefined ? (0, _jestMatcherUtils.printExpected)(expectedValue) : undefined
      });
      return (0, _utils.formatMessage)(matcher, `Expected element ${to} have prop`, formatProp(name, expectedValue), 'Received', hasProp ? formatProp(name, receivedValue) : undefined);
    }
  };
}
function formatProp(name, value) {
  if (value === undefined) {
    return name;
  }
  if (typeof value === 'string') {
    return `${name}="${value}"`;
  }
  return `${name}={${(0, _jestMatcherUtils.stringify)(value)}}`;
}
//# sourceMappingURL=to-have-prop.js.map