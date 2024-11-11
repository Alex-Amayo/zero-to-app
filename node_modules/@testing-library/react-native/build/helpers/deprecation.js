"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deprecateQueries = deprecateQueries;
exports.printDeprecationWarning = printDeprecationWarning;
var _queryName = require("./query-name");
function deprecateQueries(queriesObject, recommendation) {
  const result = {};
  Object.keys(queriesObject).forEach(queryName => {
    const queryFn = queriesObject[queryName];
    // @ts-expect-error: generic typing is hard
    result[queryName] = deprecateQuery(queryFn, queryName, recommendation);
  });
  return result;
}
function deprecateQuery(queryFn, queryName, recommendation) {
  const formattedRecommendation = recommendation.replace(/{queryPrefix}/g, (0, _queryName.getQueryPrefix)(queryName));

  // @ts-expect-error: generic typing is hard
  const wrapper = (...args) => {
    const errorMessage = `${queryName}(...) is deprecated and will be removed in the future.\n\n${formattedRecommendation}`;
    // eslint-disable-next-line no-console
    console.warn(errorMessage);
    return queryFn(...args);
  };
  return wrapper;
}
const warned = {};

/* istanbul ignore next: occasionally used */
function printDeprecationWarning(functionName) {
  if (warned[functionName]) {
    return;
  }

  // eslint-disable-next-line no-console
  console.warn(`
  Deprecation Warning:
  Use of ${functionName} is not recommended and will be deleted in future versions of @testing-library/react-native.
  `);
  warned[functionName] = true;
}
//# sourceMappingURL=deprecation.js.map