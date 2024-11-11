"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bindByTestIdQueries = void 0;
var _findAll = require("../helpers/find-all");
var _matches = require("../matches");
var _makeQueries = require("./make-queries");
const matchTestId = (node, testId, options = {}) => {
  const {
    exact,
    normalizer
  } = options;
  return (0, _matches.matches)(testId, node.props.testID, normalizer, exact);
};
const queryAllByTestId = instance => function queryAllByTestIdFn(testId, queryOptions) {
  return (0, _findAll.findAll)(instance, node => matchTestId(node, testId, queryOptions), queryOptions);
};
const getMultipleError = testId => `Found multiple elements with testID: ${String(testId)}`;
const getMissingError = testId => `Unable to find an element with testID: ${String(testId)}`;
const {
  getBy,
  getAllBy,
  queryBy,
  queryAllBy,
  findBy,
  findAllBy
} = (0, _makeQueries.makeQueries)(queryAllByTestId, getMissingError, getMultipleError);
const bindByTestIdQueries = instance => ({
  getByTestId: getBy(instance),
  getAllByTestId: getAllBy(instance),
  queryByTestId: queryBy(instance),
  queryAllByTestId: queryAllBy(instance),
  findByTestId: findBy(instance),
  findAllByTestId: findAllBy(instance)
});
exports.bindByTestIdQueries = bindByTestIdQueries;
//# sourceMappingURL=test-id.js.map