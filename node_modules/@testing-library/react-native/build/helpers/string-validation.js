"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateStringsRenderedWithinText = void 0;
const validateStringsRenderedWithinText = rendererJSON => {
  if (!rendererJSON) return;
  if (Array.isArray(rendererJSON)) {
    rendererJSON.forEach(validateStringsRenderedWithinTextForNode);
    return;
  }
  return validateStringsRenderedWithinTextForNode(rendererJSON);
};
exports.validateStringsRenderedWithinText = validateStringsRenderedWithinText;
const validateStringsRenderedWithinTextForNode = node => {
  if (typeof node === 'string') {
    return;
  }
  if (node.type !== 'Text') {
    node.children?.forEach(child => {
      if (typeof child === 'string') {
        throw new Error(`Invariant Violation: Text strings must be rendered within a <Text> component. Detected attempt to render "${child}" string within a <${node.type}> component.`);
      }
    });
  }
  if (node.children) {
    node.children.forEach(validateStringsRenderedWithinTextForNode);
  }
};
//# sourceMappingURL=string-validation.js.map