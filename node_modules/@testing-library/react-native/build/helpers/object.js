"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pick = pick;
exports.removeUndefinedKeys = removeUndefinedKeys;
function pick(object, keys) {
  const result = {};
  keys.forEach(key => {
    if (object[key] !== undefined) {
      result[key] = object[key];
    }
  });
  return result;
}
function isObject(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}
function removeUndefinedKeys(prop) {
  if (!isObject(prop)) {
    return prop;
  }
  let hasKeys = false;
  const result = {};
  Object.entries(prop).forEach(([key, value]) => {
    if (value !== undefined) {
      result[key] = value;
      hasKeys = true;
    }
  });
  return hasKeys ? result : undefined;
}
//# sourceMappingURL=object.js.map