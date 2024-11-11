"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bindByLabelTextQueries = void 0;
var _findAll = require("../helpers/find-all");
var _matchLabelText = require("../helpers/matchers/match-label-text");
var _makeQueries = require("./make-queries");
function queryAllByLabelText(instance) {
  return (text, queryOptions) => {
    return (0, _findAll.findAll)(instance, node => (0, _matchLabelText.matchLabelText)(instance, node, text, queryOptions), queryOptions);
  };
}
const getMultipleError = labelText => `Found multiple elements with accessibility label: ${String(labelText)} `;
const getMissingError = labelText => `Unable to find an element with accessibility label: ${String(labelText)}`;
const {
  getBy,
  getAllBy,
  queryBy,
  queryAllBy,
  findBy,
  findAllBy
} = (0, _makeQueries.makeQueries)(queryAllByLabelText, getMissingError, getMultipleError);
const bindByLabelTextQueries = instance => ({
  getByLabelText: getBy(instance),
  getAllByLabelText: getAllBy(instance),
  queryByLabelText: queryBy(instance),
  queryAllByLabelText: queryAllBy(instance),
  findByLabelText: findBy(instance),
  findAllByLabelText: findAllBy(instance)
});
exports.bindByLabelTextQueries = bindByLabelTextQueries;
//# sourceMappingURL=label-text.js.map