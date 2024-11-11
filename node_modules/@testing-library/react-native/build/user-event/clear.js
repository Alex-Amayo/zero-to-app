"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.clear = clear;
var _errors = require("../helpers/errors");
var _hostComponentNames = require("../helpers/host-component-names");
var _textInput = require("../helpers/text-input");
var _pointerEvents = require("../helpers/pointer-events");
var _eventBuilder = require("./event-builder");
var _utils = require("./utils");
var _type = require("./type/type");
async function clear(element) {
  if (!(0, _hostComponentNames.isHostTextInput)(element)) {
    throw new _errors.ErrorWithStack(`clear() only supports host "TextInput" elements. Passed element has type: "${element.type}".`, clear);
  }
  if (!(0, _textInput.isTextInputEditable)(element) || !(0, _pointerEvents.isPointerEventEnabled)(element)) {
    return;
  }

  // 1. Enter element
  (0, _utils.dispatchEvent)(element, 'focus', _eventBuilder.EventBuilder.Common.focus());

  // 2. Select all
  const textToClear = (0, _textInput.getTextInputValue)(element);
  const selectionRange = {
    start: 0,
    end: textToClear.length
  };
  (0, _utils.dispatchEvent)(element, 'selectionChange', _eventBuilder.EventBuilder.TextInput.selectionChange(selectionRange));

  // 3. Press backspace with selected text
  const emptyText = '';
  await (0, _type.emitTypingEvents)(element, {
    config: this.config,
    key: 'Backspace',
    text: emptyText
  });

  // 4. Exit element
  await (0, _utils.wait)(this.config);
  (0, _utils.dispatchEvent)(element, 'endEditing', _eventBuilder.EventBuilder.TextInput.endEditing(emptyText));
  (0, _utils.dispatchEvent)(element, 'blur', _eventBuilder.EventBuilder.Common.blur());
}
//# sourceMappingURL=clear.js.map