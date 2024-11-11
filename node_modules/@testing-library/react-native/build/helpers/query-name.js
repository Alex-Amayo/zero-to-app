"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getQueryPrefix = getQueryPrefix;
function getQueryPrefix(queryName) {
  const parts = queryName.split('By');
  return parts[0];
}
//# sourceMappingURL=query-name.js.map