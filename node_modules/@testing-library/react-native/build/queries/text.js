"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bindByTextQueries = void 0;
var _findAll = require("../helpers/find-all");
var _hostComponentNames = require("../helpers/host-component-names");
var _matchTextContent = require("../helpers/matchers/match-text-content");
var _makeQueries = require("./make-queries");
const queryAllByText = instance => function queryAllByTextFn(text, options = {}) {
  return (0, _findAll.findAll)(instance, node => (0, _hostComponentNames.isHostText)(node) && (0, _matchTextContent.matchTextContent)(node, text, options), {
    ...options,
    matchDeepestOnly: true
  });
};
const getMultipleError = text => `Found multiple elements with text: ${String(text)}`;
const getMissingError = text => `Unable to find an element with text: ${String(text)}`;
const {
  getBy,
  getAllBy,
  queryBy,
  queryAllBy,
  findBy,
  findAllBy
} = (0, _makeQueries.makeQueries)(queryAllByText, getMissingError, getMultipleError);
const bindByTextQueries = instance => ({
  getByText: getBy(instance),
  getAllByText: getAllBy(instance),
  queryByText: queryBy(instance),
  queryAllByText: queryAllBy(instance),
  findByText: findBy(instance),
  findAllByText: findAllBy(instance)
});
exports.bindByTextQueries = bindByTextQueries;
//# sourceMappingURL=text.js.map