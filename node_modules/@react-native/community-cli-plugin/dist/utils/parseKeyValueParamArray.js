"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.default = parseKeyValueParamArray;
var _querystring = _interopRequireDefault(require("querystring"));
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}
/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *
 * @format
 * @oncall react_native
 */

function parseKeyValueParamArray(keyValueArray) {
  const result = {};
  for (const item of keyValueArray) {
    if (item.indexOf("=") === -1) {
      throw new Error('Expected parameter to include "=" but found: ' + item);
    }
    if (item.indexOf("&") !== -1) {
      throw new Error('Parameter cannot include "&" but found: ' + item);
    }
    Object.assign(result, _querystring.default.parse(item));
  }
  return result;
}
