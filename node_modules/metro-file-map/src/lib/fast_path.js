"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.relative = relative;
exports.resolve = resolve;
var path = _interopRequireWildcard(require("path"));
function _getRequireWildcardCache(nodeInterop) {
  if (typeof WeakMap !== "function") return null;
  var cacheBabelInterop = new WeakMap();
  var cacheNodeInterop = new WeakMap();
  return (_getRequireWildcardCache = function (nodeInterop) {
    return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
  })(nodeInterop);
}
function _interopRequireWildcard(obj, nodeInterop) {
  if (!nodeInterop && obj && obj.__esModule) {
    return obj;
  }
  if (obj === null || (typeof obj !== "object" && typeof obj !== "function")) {
    return { default: obj };
  }
  var cache = _getRequireWildcardCache(nodeInterop);
  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }
  var newObj = {};
  var hasPropertyDescriptor =
    Object.defineProperty && Object.getOwnPropertyDescriptor;
  for (var key in obj) {
    if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor
        ? Object.getOwnPropertyDescriptor(obj, key)
        : null;
      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = obj[key];
      }
    }
  }
  newObj.default = obj;
  if (cache) {
    cache.set(obj, newObj);
  }
  return newObj;
}
function relative(rootDir, filename) {
  if (filename.indexOf(rootDir + path.sep) === 0) {
    const relativePath = filename.substr(rootDir.length + 1);
    for (let i = 0; ; i += UP_FRAGMENT_LENGTH) {
      const nextIndirection = relativePath.indexOf(CURRENT_FRAGMENT, i);
      if (nextIndirection === -1) {
        return relativePath;
      }
      if (nextIndirection !== i + 1 || relativePath[i] !== ".") {
        return path.relative(rootDir, filename);
      }
    }
  }
  return path.relative(rootDir, filename);
}
const UP_FRAGMENT = ".." + path.sep;
const UP_FRAGMENT_LENGTH = UP_FRAGMENT.length;
const CURRENT_FRAGMENT = "." + path.sep;
let cachedDirName = null;
let dirnameCache = [];
function resolve(rootDir, normalPath) {
  let left = rootDir;
  let i = 0;
  let pos = 0;
  while (
    normalPath.startsWith(UP_FRAGMENT, pos) ||
    (normalPath.endsWith("..") && normalPath.length === 2 + pos)
  ) {
    if (i === 0 && cachedDirName !== rootDir) {
      dirnameCache = [];
      cachedDirName = rootDir;
    }
    if (dirnameCache.length === i) {
      dirnameCache.push(path.dirname(left));
    }
    left = dirnameCache[i++];
    pos += UP_FRAGMENT_LENGTH;
  }
  const right = pos === 0 ? normalPath : normalPath.slice(pos);
  if (right.length === 0) {
    return left;
  }
  if (left.endsWith(path.sep)) {
    return left + right;
  }
  return left + path.sep + right;
}
