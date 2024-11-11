"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseKeys = parseKeys;
const knownKeys = new Set(['Enter', 'Backspace']);
function parseKeys(text) {
  const result = [];
  let remainingText = text;
  while (remainingText) {
    const [token, rest] = getNextToken(remainingText);
    if (token.length > 1 && !knownKeys.has(token)) {
      throw new Error(`Unknown key "${token}" in "${text}"`);
    }
    result.push(token);
    remainingText = rest;
  }
  return result;
}
function getNextToken(text) {
  // Detect `{{` => escaped `{`
  if (text[0] === '{' && text[1] === '{') {
    return ['{', text.slice(2)];
  }

  // Detect `{key}` => special key
  if (text[0] === '{') {
    const endIndex = text.indexOf('}');
    if (endIndex === -1) {
      throw new Error(`Invalid key sequence "${text}"`);
    }
    return [text.slice(1, endIndex), text.slice(endIndex + 1)];
  }
  if (text[0] === '\n') {
    return ['Enter', text.slice(1)];
  }
  return [text[0], text.slice(1)];
}
//# sourceMappingURL=parse-keys.js.map