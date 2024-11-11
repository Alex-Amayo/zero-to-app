"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bindByDisplayValueQueries = void 0;
var _findAll = require("../helpers/find-all");
var _hostComponentNames = require("../helpers/host-component-names");
var _textInput = require("../helpers/text-input");
var _matches = require("../matches");
var _makeQueries = require("./make-queries");
const matchDisplayValue = (node, expectedValue, options = {}) => {
  const {
    exact,
    normalizer
  } = options;
  const nodeValue = (0, _textInput.getTextInputValue)(node);
  return (0, _matches.matches)(expectedValue, nodeValue, normalizer, exact);
};
const queryAllByDisplayValue = instance => function queryAllByDisplayValueFn(displayValue, queryOptions) {
  return (0, _findAll.findAll)(instance, node => (0, _hostComponentNames.isHostTextInput)(node) && matchDisplayValue(node, displayValue, queryOptions), queryOptions);
};
const getMultipleError = displayValue => `Found multiple elements with display value: ${String(displayValue)} `;
const getMissingError = displayValue => `Unable to find an element with displayValue: ${String(displayValue)}`;
const {
  getBy,
  getAllBy,
  queryBy,
  queryAllBy,
  findBy,
  findAllBy
} = (0, _makeQueries.makeQueries)(queryAllByDisplayValue, getMissingError, getMultipleError);
const bindByDisplayValueQueries = instance => ({
  getByDisplayValue: getBy(instance),
  getAllByDisplayValue: getAllBy(instance),
  queryByDisplayValue: queryBy(instance),
  queryAllByDisplayValue: queryAllBy(instance),
  findByDisplayValue: findBy(instance),
  findAllByDisplayValue: findAllBy(instance)
});
exports.bindByDisplayValueQueries = bindByDisplayValueQueries;
//# sourceMappingURL=display-value.js.map