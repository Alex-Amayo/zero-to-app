/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *
 * @format
 */

'use strict';

function _slicedToArray(arr, i) {
  return (
    _arrayWithHoles(arr) ||
    _iterableToArrayLimit(arr, i) ||
    _unsupportedIterableToArray(arr, i) ||
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
function _iterableToArrayLimit(arr, i) {
  var _i =
    null == arr
      ? null
      : ('undefined' != typeof Symbol && arr[Symbol.iterator]) ||
        arr['@@iterator'];
  if (null != _i) {
    var _s,
      _e,
      _x,
      _r,
      _arr = [],
      _n = !0,
      _d = !1;
    try {
      if (((_x = (_i = _i.call(arr)).next), 0 === i)) {
        if (Object(_i) !== _i) return;
        _n = !1;
      } else
        for (
          ;
          !(_n = (_s = _x.call(_i)).done) &&
          (_arr.push(_s.value), _arr.length !== i);
          _n = !0
        );
    } catch (err) {
      (_d = !0), (_e = err);
    } finally {
      try {
        if (!_n && null != _i.return && ((_r = _i.return()), Object(_r) !== _r))
          return;
      } finally {
        if (_d) throw _e;
      }
    }
    return _arr;
  }
}
function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}
const _require = require('../../parsers/parsers-commons'),
  unwrapNullable = _require.unwrapNullable;
const invariant = require('invariant');
function createAliasResolver(aliasMap) {
  return aliasName => {
    const alias = aliasMap[aliasName];
    invariant(alias != null, `Unable to resolve type alias '${aliasName}'.`);
    return alias;
  };
}
function getModules(schema) {
  return Object.keys(schema.modules).reduce((modules, hasteModuleName) => {
    const module = schema.modules[hasteModuleName];
    if (module == null || module.type === 'Component') {
      return modules;
    }
    modules[hasteModuleName] = module;
    return modules;
  }, {});
}
function isDirectRecursiveMember(
  parentObjectAliasName,
  nullableTypeAnnotation,
) {
  const _unwrapNullable = unwrapNullable(nullableTypeAnnotation),
    _unwrapNullable2 = _slicedToArray(_unwrapNullable, 1),
    typeAnnotation = _unwrapNullable2[0];
  return (
    parentObjectAliasName !== undefined &&
    typeAnnotation.name === parentObjectAliasName
  );
}
function isArrayRecursiveMember(parentObjectAliasName, nullableTypeAnnotation) {
  var _typeAnnotation$eleme;
  const _unwrapNullable3 = unwrapNullable(nullableTypeAnnotation),
    _unwrapNullable4 = _slicedToArray(_unwrapNullable3, 1),
    typeAnnotation = _unwrapNullable4[0];
  return (
    parentObjectAliasName !== undefined &&
    typeAnnotation.type === 'ArrayTypeAnnotation' &&
    ((_typeAnnotation$eleme = typeAnnotation.elementType) === null ||
    _typeAnnotation$eleme === void 0
      ? void 0
      : _typeAnnotation$eleme.name) === parentObjectAliasName
  );
}
function getAreEnumMembersInteger(members) {
  return !members.some(m => `${m.value}`.includes('.'));
}
module.exports = {
  createAliasResolver,
  getModules,
  getAreEnumMembersInteger,
  isDirectRecursiveMember,
  isArrayRecursiveMember,
};
