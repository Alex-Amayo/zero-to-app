"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTextContent = getTextContent;
function getTextContent(element) {
  if (!element) {
    return '';
  }
  if (typeof element === 'string') {
    return element;
  }
  const result = [];
  element.children?.forEach(child => {
    result.push(getTextContent(child));
  });
  return result.join('');
}
//# sourceMappingURL=text-content.js.map