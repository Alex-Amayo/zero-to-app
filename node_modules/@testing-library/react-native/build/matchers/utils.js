"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkHostElement = checkHostElement;
exports.formatElement = formatElement;
exports.formatElementArray = formatElementArray;
exports.formatMessage = formatMessage;
var _jestMatcherUtils = require("jest-matcher-utils");
var _prettyFormat = _interopRequireWildcard(require("pretty-format"));
var _redent = _interopRequireDefault(require("redent"));
var _componentTree = require("../helpers/component-tree");
var _formatDefault = require("../helpers/format-default");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
class HostElementTypeError extends Error {
  constructor(received, matcherFn, context) {
    super();

    /* istanbul ignore next */
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, matcherFn);
    }
    let withType = '';
    try {
      withType = (0, _jestMatcherUtils.printWithType)('Received', received, _jestMatcherUtils.printReceived);
      /* istanbul ignore next */
    } catch {
      // Deliberately empty.
    }
    this.message = [(0, _jestMatcherUtils.matcherHint)(`${context.isNot ? '.not' : ''}.${matcherFn.name}`, 'received', ''), '', `${(0, _jestMatcherUtils.RECEIVED_COLOR)('received')} value must be a host element.`, withType].join('\n');
  }
}

/**
 * Throws HostElementTypeError if passed element is not a host element.
 *
 * @param element ReactTestInstance to check.
 * @param matcherFn Matcher function calling the check used for formatting error.
 * @param context Jest matcher context used for formatting error.
 */
function checkHostElement(element, matcherFn, context) {
  if (!(0, _componentTree.isHostElement)(element)) {
    throw new HostElementTypeError(element, matcherFn, context);
  }
}

/***
 * Format given element as a pretty-printed string.
 *
 * @param element Element to format.
 */
function formatElement(element) {
  if (element == null) {
    return '  null';
  }
  const {
    children,
    ...props
  } = element.props;
  const childrenToDisplay = typeof children === 'string' ? [children] : undefined;
  return (0, _redent.default)((0, _prettyFormat.default)({
    // This prop is needed persuade the prettyFormat that the element is
    // a ReactTestRendererJSON instance, so it is formatted as JSX.
    $$typeof: Symbol.for('react.test.json'),
    type: element.type,
    props: (0, _formatDefault.defaultMapProps)(props),
    children: childrenToDisplay
  }, {
    plugins: [_prettyFormat.plugins.ReactTestComponent, _prettyFormat.plugins.ReactElement],
    printFunctionName: false,
    printBasicPrototype: false,
    highlight: true
  }), 2);
}
function formatElementArray(elements) {
  if (elements.length === 0) {
    return '  (no elements)';
  }
  return (0, _redent.default)(elements.map(formatElement).join('\n'), 2);
}
function formatMessage(matcher, expectedLabel, expectedValue, receivedLabel, receivedValue) {
  return [`${matcher}\n`, `${expectedLabel}:\n${(0, _jestMatcherUtils.EXPECTED_COLOR)((0, _redent.default)(formatValue(expectedValue), 2))}`, `${receivedLabel}:\n${(0, _jestMatcherUtils.RECEIVED_COLOR)((0, _redent.default)(formatValue(receivedValue), 2))}`].join('\n');
}
function formatValue(value) {
  return typeof value === 'string' ? value : (0, _jestMatcherUtils.stringify)(value);
}
//# sourceMappingURL=utils.js.map