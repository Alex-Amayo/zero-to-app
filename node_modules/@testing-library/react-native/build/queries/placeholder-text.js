"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bindByPlaceholderTextQueries = void 0;
var _findAll = require("../helpers/find-all");
var _matches = require("../matches");
var _hostComponentNames = require("../helpers/host-component-names");
var _makeQueries = require("./make-queries");
const matchPlaceholderText = (node, placeholder, options = {}) => {
  const {
    exact,
    normalizer
  } = options;
  return (0, _matches.matches)(placeholder, node.props.placeholder, normalizer, exact);
};
const queryAllByPlaceholderText = instance => function queryAllByPlaceholderFn(placeholder, queryOptions) {
  return (0, _findAll.findAll)(instance, node => (0, _hostComponentNames.isHostTextInput)(node) && matchPlaceholderText(node, placeholder, queryOptions), queryOptions);
};
const getMultipleError = placeholder => `Found multiple elements with placeholder: ${String(placeholder)} `;
const getMissingError = placeholder => `Unable to find an element with placeholder: ${String(placeholder)}`;
const {
  getBy,
  getAllBy,
  queryBy,
  queryAllBy,
  findBy,
  findAllBy
} = (0, _makeQueries.makeQueries)(queryAllByPlaceholderText, getMissingError, getMultipleError);
const bindByPlaceholderTextQueries = instance => ({
  getByPlaceholderText: getBy(instance),
  getAllByPlaceholderText: getAllBy(instance),
  queryByPlaceholderText: queryBy(instance),
  queryAllByPlaceholderText: queryAllBy(instance),
  findByPlaceholderText: findBy(instance),
  findAllByPlaceholderText: findAllBy(instance)
});
exports.bindByPlaceholderTextQueries = bindByPlaceholderTextQueries;
//# sourceMappingURL=placeholder-text.js.map