"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bindByA11yValueQueries = void 0;
var _accessibility = require("../helpers/accessibility");
var _deprecation = require("../helpers/deprecation");
var _findAll = require("../helpers/find-all");
var _matchAccessibilityValue = require("../helpers/matchers/match-accessibility-value");
var _makeQueries = require("./make-queries");
const queryAllByA11yValue = instance => function queryAllByA11yValueFn(value, queryOptions) {
  return (0, _findAll.findAll)(instance, node => (0, _matchAccessibilityValue.matchAccessibilityValue)(node, value), queryOptions);
};
const formatQueryParams = matcher => {
  const params = [];
  _accessibility.accessibilityValueKeys.forEach(valueKey => {
    if (matcher[valueKey] !== undefined) {
      params.push(`${valueKey} value: ${matcher[valueKey]}`);
    }
  });
  return params.join(', ');
};
const getMultipleError = matcher => `Found multiple elements with ${formatQueryParams(matcher)}`;
const getMissingError = matcher => `Unable to find an element with ${formatQueryParams(matcher)}`;
const {
  getBy,
  getAllBy,
  queryBy,
  queryAllBy,
  findBy,
  findAllBy
} = (0, _makeQueries.makeQueries)(queryAllByA11yValue, getMissingError, getMultipleError);
const bindByA11yValueQueries = instance => {
  const getByA11yValue = getBy(instance);
  const getAllByA11yValue = getAllBy(instance);
  const queryByA11yValue = queryBy(instance);
  const queryAllByA11yValue = queryAllBy(instance);
  const findByA11yValue = findBy(instance);
  const findAllByA11yValue = findAllBy(instance);
  return {
    ...(0, _deprecation.deprecateQueries)({
      getByA11yValue,
      getAllByA11yValue,
      queryByA11yValue,
      queryAllByA11yValue,
      findByA11yValue,
      findAllByA11yValue,
      getByAccessibilityValue: getByA11yValue,
      getAllByAccessibilityValue: getAllByA11yValue,
      queryByAccessibilityValue: queryByA11yValue,
      queryAllByAccessibilityValue: queryAllByA11yValue,
      findByAccessibilityValue: findByA11yValue,
      findAllByAccessibilityValue: findAllByA11yValue
    }, 'Use toHaveAccessibilityValue(...) built-in Jest matcher or {queryPrefix}ByRole(role, { value: ... }) query instead.')
  };
};
exports.bindByA11yValueQueries = bindByA11yValueQueries;
//# sourceMappingURL=accessibility-value.js.map