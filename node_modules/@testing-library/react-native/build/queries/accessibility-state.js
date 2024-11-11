"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bindByA11yStateQueries = void 0;
var _accessibility = require("../helpers/accessibility");
var _deprecation = require("../helpers/deprecation");
var _findAll = require("../helpers/find-all");
var _matchAccessibilityState = require("../helpers/matchers/match-accessibility-state");
var _makeQueries = require("./make-queries");
const queryAllByA11yState = instance => function queryAllByA11yStateFn(matcher, queryOptions) {
  return (0, _findAll.findAll)(instance, node => (0, _matchAccessibilityState.matchAccessibilityState)(node, matcher), queryOptions);
};
const buildErrorMessage = (state = {}) => {
  const errors = [];
  _accessibility.accessibilityStateKeys.forEach(stateKey => {
    if (state[stateKey] !== undefined) {
      errors.push(`${stateKey} state: ${state[stateKey]}`);
    }
  });
  return errors.join(', ');
};
const getMultipleError = state => `Found multiple elements with ${buildErrorMessage(state)}`;
const getMissingError = state => `Unable to find an element with ${buildErrorMessage(state)}`;
const {
  getBy,
  getAllBy,
  queryBy,
  queryAllBy,
  findBy,
  findAllBy
} = (0, _makeQueries.makeQueries)(queryAllByA11yState, getMissingError, getMultipleError);
const bindByA11yStateQueries = instance => {
  const getByA11yState = getBy(instance);
  const getAllByA11yState = getAllBy(instance);
  const queryByA11yState = queryBy(instance);
  const queryAllByA11yState = queryAllBy(instance);
  const findByA11yState = findBy(instance);
  const findAllByA11yState = findAllBy(instance);
  return {
    ...(0, _deprecation.deprecateQueries)({
      getByA11yState,
      getAllByA11yState,
      queryByA11yState,
      queryAllByA11yState,
      findByA11yState,
      findAllByA11yState,
      getByAccessibilityState: getByA11yState,
      getAllByAccessibilityState: getAllByA11yState,
      queryByAccessibilityState: queryByA11yState,
      queryAllByAccessibilityState: queryAllByA11yState,
      findByAccessibilityState: findByA11yState,
      findAllByAccessibilityState: findAllByA11yState
    }, 'Use {queryPrefix}ByRole(role, { disabled, selected, checked, busy, expanded }) query or built-in Jest matchers: toBeDisabled(), toBeSelected(), toBeChecked(), toBeBusy(), and toBeExpanded() instead.')
  };
};
exports.bindByA11yStateQueries = bindByA11yStateQueries;
//# sourceMappingURL=accessibility-state.js.map