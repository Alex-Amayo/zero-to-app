"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bindByRoleQueries = void 0;
var _accessibility = require("../helpers/accessibility");
var _findAll = require("../helpers/find-all");
var _matchAccessibilityState = require("../helpers/matchers/match-accessibility-state");
var _matchAccessibilityValue = require("../helpers/matchers/match-accessibility-value");
var _matchStringProp = require("../helpers/matchers/match-string-prop");
var _within = require("../within");
var _makeQueries = require("./make-queries");
const matchAccessibleNameIfNeeded = (node, name) => {
  if (name == null) return true;
  const {
    queryAllByText,
    queryAllByLabelText
  } = (0, _within.getQueriesForElement)(node);
  return queryAllByText(name).length > 0 || queryAllByLabelText(name).length > 0;
};
const matchAccessibleStateIfNeeded = (node, options) => {
  return options != null ? (0, _matchAccessibilityState.matchAccessibilityState)(node, options) : true;
};
const matchAccessibilityValueIfNeeded = (node, value) => {
  return value != null ? (0, _matchAccessibilityValue.matchAccessibilityValue)(node, value) : true;
};
const queryAllByRole = instance => function queryAllByRoleFn(role, options) {
  const normalizedRole = typeof role === 'string' ? (0, _accessibility.normalizeRole)(role) : role;
  return (0, _findAll.findAll)(instance, node =>
  // run the cheapest checks first, and early exit to avoid unneeded computations
  (0, _accessibility.isAccessibilityElement)(node) && (0, _matchStringProp.matchStringProp)((0, _accessibility.getRole)(node), normalizedRole) && matchAccessibleStateIfNeeded(node, options) && matchAccessibilityValueIfNeeded(node, options?.value) && matchAccessibleNameIfNeeded(node, options?.name), options);
};
const formatQueryParams = (role, options = {}) => {
  const params = [`role: ${String(role)}`];
  if (options.name) {
    params.push(`name: ${String(options.name)}`);
  }
  _accessibility.accessibilityStateKeys.forEach(stateKey => {
    if (options[stateKey] !== undefined) {
      params.push(`${stateKey} state: ${options[stateKey]}`);
    }
  });
  _accessibility.accessibilityValueKeys.forEach(valueKey => {
    if (options?.value?.[valueKey] !== undefined) {
      params.push(`${valueKey} value: ${options?.value?.[valueKey]}`);
    }
  });
  return params.join(', ');
};
const getMultipleError = (role, options) => `Found multiple elements with ${formatQueryParams(role, options)}`;
const getMissingError = (role, options) => `Unable to find an element with ${formatQueryParams(role, options)}`;
const {
  getBy,
  getAllBy,
  queryBy,
  queryAllBy,
  findBy,
  findAllBy
} = (0, _makeQueries.makeQueries)(queryAllByRole, getMissingError, getMultipleError);
const bindByRoleQueries = instance => ({
  getByRole: getBy(instance),
  getAllByRole: getAllBy(instance),
  queryByRole: queryBy(instance),
  queryAllByRole: queryAllBy(instance),
  findByRole: findBy(instance),
  findAllByRole: findAllBy(instance)
});
exports.bindByRoleQueries = bindByRoleQueries;
//# sourceMappingURL=role.js.map