"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ErrorWithStack = void 0;
exports.copyStackTrace = copyStackTrace;
exports.prepareErrorMessage = exports.createQueryByError = void 0;
var _prettyFormat = _interopRequireDefault(require("pretty-format"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class ErrorWithStack extends Error {
  constructor(message, callsite) {
    super(message);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, callsite);
    }
  }
}
exports.ErrorWithStack = ErrorWithStack;
const prepareErrorMessage = (error, name, value) => {
  let errorMessage;
  if (error instanceof Error) {
    // Strip info about custom predicate
    errorMessage = error.message.replace(/ matching custom predicate[^]*/gm, '');
  } else if (error && typeof error === 'object') {
    errorMessage = error.toString();
  } else {
    errorMessage = 'Caught unknown error';
  }
  if (name && value) {
    errorMessage += ` with ${name} ${(0, _prettyFormat.default)(value, {
      min: true
    })}`;
  }
  return errorMessage;
};
exports.prepareErrorMessage = prepareErrorMessage;
const createQueryByError = (error, callsite) => {
  if (error instanceof Error) {
    if (error.message.includes('No instances found')) {
      return null;
    }
    throw new ErrorWithStack(error.message, callsite);
  }
  throw new ErrorWithStack(
  // generic refining of `unknown` is very hard, you cannot do `'toString' in error` or anything like that
  // Converting as any with extra safe optional chaining will do the job just as well
  `Query: caught unknown error type: ${typeof error}, value: ${error?.toString?.()}`, callsite);
};
exports.createQueryByError = createQueryByError;
function copyStackTrace(target, stackTraceSource) {
  if (target instanceof Error && stackTraceSource.stack) {
    target.stack = stackTraceSource.stack.replace(stackTraceSource.message, target.message);
  }
}
//# sourceMappingURL=errors.js.map