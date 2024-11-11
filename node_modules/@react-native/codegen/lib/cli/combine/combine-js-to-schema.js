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

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly &&
      (symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      })),
      keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2
      ? ownKeys(Object(source), !0).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        })
      : Object.getOwnPropertyDescriptors
      ? Object.defineProperties(
          target,
          Object.getOwnPropertyDescriptors(source),
        )
      : ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(
            target,
            key,
            Object.getOwnPropertyDescriptor(source, key),
          );
        });
  }
  return target;
}
function _defineProperty(obj, key, value) {
  key = _toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true,
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, 'string');
  return typeof key === 'symbol' ? key : String(key);
}
function _toPrimitive(input, hint) {
  if (typeof input !== 'object' || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || 'default');
    if (typeof res !== 'object') return res;
    throw new TypeError('@@toPrimitive must return a primitive value.');
  }
  return (hint === 'string' ? String : Number)(input);
}
const _require = require('../../parsers/flow/parser'),
  FlowParser = _require.FlowParser;
const _require2 = require('../../parsers/typescript/parser'),
  TypeScriptParser = _require2.TypeScriptParser;
const _require3 = require('./combine-utils'),
  filterJSFile = _require3.filterJSFile;
const fs = require('fs');
const glob = require('glob');
const path = require('path');
const flowParser = new FlowParser();
const typescriptParser = new TypeScriptParser();
function combineSchemas(files) {
  return files.reduce(
    (merged, filename) => {
      const contents = fs.readFileSync(filename, 'utf8');
      if (
        contents &&
        (/export\s+default\s+\(?codegenNativeComponent</.test(contents) ||
          /extends TurboModule/.test(contents))
      ) {
        const isTypeScript =
          path.extname(filename) === '.ts' || path.extname(filename) === '.tsx';
        const parser = isTypeScript ? typescriptParser : flowParser;
        const schema = parser.parseFile(filename);
        if (schema && schema.modules) {
          merged.modules = _objectSpread(
            _objectSpread({}, merged.modules),
            schema.modules,
          );
        }
      }
      return merged;
    },
    {
      modules: {},
    },
  );
}
function expandDirectoriesIntoFiles(fileList, platform, exclude) {
  return fileList
    .flatMap(file => {
      if (!fs.lstatSync(file).isDirectory()) {
        return [file];
      }
      const filePattern = path.sep === '\\' ? file.replace(/\\/g, '/') : file;
      return glob.sync(`${filePattern}/**/*.{js,ts,tsx}`, {
        nodir: true,
        // TODO: This will remove the need of slash substitution above for Windows,
        // but it requires glob@v9+; with the package currenlty relying on
        // glob@7.1.1; and flow-typed repo not having definitions for glob@9+.
        // windowsPathsNoEscape: true,
      });
    })
    .filter(element => filterJSFile(element, platform, exclude));
}
function combineSchemasInFileList(fileList, platform, exclude) {
  const expandedFileList = expandDirectoriesIntoFiles(
    fileList,
    platform,
    exclude,
  );
  const combined = combineSchemas(expandedFileList);
  if (Object.keys(combined.modules).length === 0) {
    console.error(
      'No modules to process in combine-js-to-schema-cli. If this is unexpected, please check if you set up your NativeComponent correctly. See combine-js-to-schema.js for how codegen finds modules.',
    );
  }
  return combined;
}
function combineSchemasInFileListAndWriteToFile(
  fileList,
  platform,
  outfile,
  exclude,
) {
  const combined = combineSchemasInFileList(fileList, platform, exclude);
  const formattedSchema = JSON.stringify(combined, null, 2);
  fs.writeFileSync(outfile, formattedSchema);
}
module.exports = {
  combineSchemas,
  combineSchemasInFileList,
  combineSchemasInFileListAndWriteToFile,
};
