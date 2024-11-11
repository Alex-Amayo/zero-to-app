"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.paste = paste;
var _errors = require("../helpers/errors");
var _hostComponentNames = require("../helpers/host-component-names");
var _pointerEvents = require("../helpers/pointer-events");
var _textInput = require("../helpers/text-input");
var _nativeState = require("../native-state");
var _eventBuilder = require("./event-builder");
var _utils = require("./utils");
async function paste(element, text) {
  if (!(0, _hostComponentNames.isHostTextInput)(element)) {
    throw new _errors.ErrorWithStack(`paste() only supports host "TextInput" elements. Passed element has type: "${element.type}".`, paste);
  }
  if (!(0, _textInput.isTextInputEditable)(element) || !(0, _pointerEvents.isPointerEventEnabled)(element)) {
    return;
  }

  // 1. Enter element
  (0, _utils.dispatchEvent)(element, 'focus', _eventBuilder.EventBuilder.Common.focus());

  // 2. Select all
  const textToClear = (0, _textInput.getTextInputValue)(element);
  const rangeToClear = {
    start: 0,
    end: textToClear.length
  };
  (0, _utils.dispatchEvent)(element, 'selectionChange', _eventBuilder.EventBuilder.TextInput.selectionChange(rangeToClear));

  // 3. Paste the text
  _nativeState.nativeState.valueForElement.set(element, text);
  (0, _utils.dispatchEvent)(element, 'change', _eventBuilder.EventBuilder.TextInput.change(text));
  (0, _utils.dispatchEvent)(element, 'changeText', text);
  const rangeAfter = {
    start: text.length,
    end: text.length
  };
  (0, _utils.dispatchEvent)(element, 'selectionChange', _eventBuilder.EventBuilder.TextInput.selectionChange(rangeAfter));

  // According to the docs only multiline TextInput emits contentSizeChange event
  // @see: https://reactnative.dev/docs/textinput#oncontentsizechange
  const isMultiline = element.props.multiline === true;
  if (isMultiline) {
    const contentSize = (0, _utils.getTextContentSize)(text);
    (0, _utils.dispatchEvent)(element, 'contentSizeChange', _eventBuilder.EventBuilder.TextInput.contentSizeChange(contentSize));
  }

  // 4. Exit element
  await (0, _utils.wait)(this.config);
  (0, _utils.dispatchEvent)(element, 'endEditing', _eventBuilder.EventBuilder.TextInput.endEditing(text));
  (0, _utils.dispatchEvent)(element, 'blur', _eventBuilder.EventBuilder.Common.blur());
}
//# sourceMappingURL=paste.js.map