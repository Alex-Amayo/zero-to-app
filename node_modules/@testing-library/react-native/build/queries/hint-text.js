"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bindByHintTextQueries = void 0;
var _findAll = require("../helpers/find-all");
var _matches = require("../matches");
var _makeQueries = require("./make-queries");
const getNodeByHintText = (node, text, options = {}) => {
  const {
    exact,
    normalizer
  } = options;
  return (0, _matches.matches)(text, node.props.accessibilityHint, normalizer, exact);
};
const queryAllByHintText = instance => function queryAllByA11yHintFn(hint, queryOptions) {
  return (0, _findAll.findAll)(instance, node => getNodeByHintText(node, hint, queryOptions), queryOptions);
};
const getMultipleError = hint => `Found multiple elements with accessibility hint: ${String(hint)} `;
const getMissingError = hint => `Unable to find an element with accessibility hint: ${String(hint)}`;
const {
  getBy,
  getAllBy,
  queryBy,
  queryAllBy,
  findBy,
  findAllBy
} = (0, _makeQueries.makeQueries)(queryAllByHintText, getMissingError, getMultipleError);
const bindByHintTextQueries = instance => {
  const getByHintText = getBy(instance);
  const getAllByHintText = getAllBy(instance);
  const queryByHintText = queryBy(instance);
  const queryAllByHintText = queryAllBy(instance);
  const findByHintText = findBy(instance);
  const findAllByHintText = findAllBy(instance);
  return {
    getByHintText,
    getAllByHintText,
    queryByHintText,
    queryAllByHintText,
    findByHintText,
    findAllByHintText,
    // a11yHint aliases
    getByA11yHint: getByHintText,
    getAllByA11yHint: getAllByHintText,
    queryByA11yHint: queryByHintText,
    queryAllByA11yHint: queryAllByHintText,
    findByA11yHint: findByHintText,
    findAllByA11yHint: findAllByHintText,
    // accessibilityHint aliases
    getByAccessibilityHint: getByHintText,
    getAllByAccessibilityHint: getAllByHintText,
    queryByAccessibilityHint: queryByHintText,
    queryAllByAccessibilityHint: queryAllByHintText,
    findByAccessibilityHint: findByHintText,
    findAllByAccessibilityHint: findAllByHintText
  };
};
exports.bindByHintTextQueries = bindByHintTextQueries;
//# sourceMappingURL=hint-text.js.map