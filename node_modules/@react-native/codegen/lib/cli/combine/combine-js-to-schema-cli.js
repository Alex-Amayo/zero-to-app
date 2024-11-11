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

'use strict';

function _toArray(arr) {
  return (
    _arrayWithHoles(arr) ||
    _iterableToArray(arr) ||
    _unsupportedIterableToArray(arr) ||
    _nonIterableRest()
  );
}
function _nonIterableRest() {
  throw new TypeError(
    'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
  );
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === 'string') return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === 'Object' && o.constructor) n = o.constructor.name;
  if (n === 'Map' || n === 'Set') return Array.from(o);
  if (n === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
    return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _iterableToArray(iter) {
  if (
    (typeof Symbol !== 'undefined' && iter[Symbol.iterator] != null) ||
    iter['@@iterator'] != null
  )
    return Array.from(iter);
}
function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}
const _require = require('./combine-js-to-schema'),
  combineSchemasInFileListAndWriteToFile =
    _require.combineSchemasInFileListAndWriteToFile;
const yargs = require('yargs');
const argv = yargs
  .option('p', {
    alias: 'platform',
  })
  .option('e', {
    alias: 'exclude',
  })
  .parseSync();
const _argv$_ = _toArray(argv._),
  outfile = _argv$_[0],
  fileList = _argv$_.slice(1);
const platform = argv.platform;
const exclude = argv.exclude;
const excludeRegExp =
  exclude != null && exclude !== '' ? new RegExp(exclude) : null;
combineSchemasInFileListAndWriteToFile(
  fileList,
  platform != null ? platform.toLowerCase() : platform,
  outfile,
  excludeRegExp,
);
