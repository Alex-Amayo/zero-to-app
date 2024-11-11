"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = findAllPodfilePaths;
function _fastGlob() {
  const data = _interopRequireDefault(require("fast-glob"));
  _fastGlob = function () {
    return data;
  };
  return data;
}
function _cliTools() {
  const data = require("@react-native-community/cli-tools");
  _cliTools = function () {
    return data;
  };
  return data;
}
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

// These folders will be excluded from search to speed it up
const GLOB_EXCLUDE_PATTERN = ['**/@(Pods|node_modules|Carthage|vendor)/**'];
function findAllPodfilePaths(cwd) {
  return _fastGlob().default.sync('**/Podfile', {
    cwd: (0, _cliTools().unixifyPaths)(cwd),
    ignore: GLOB_EXCLUDE_PATTERN
  });
}

//# sourceMappingURL=findAllPodfilePaths.ts.map