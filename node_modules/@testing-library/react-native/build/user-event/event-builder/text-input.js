"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TextInputEventBuilder = void 0;
var _base = require("./base");
const TextInputEventBuilder = exports.TextInputEventBuilder = {
  /**
   * Experimental values:
   * - iOS: `{"eventCount": 4, "target": 75, "text": "Test"}`
   * - Android: `{"eventCount": 6, "target": 53, "text": "Tes"}`
   */
  change: text => {
    return {
      ...(0, _base.baseSyntheticEvent)(),
      nativeEvent: {
        text,
        target: 0,
        eventCount: 0
      }
    };
  },
  /**
   * Experimental values:
   * - iOS: `{"eventCount": 3, "key": "a", "target": 75}`
   * - Android: `{"key": "a"}`
   */
  keyPress: key => {
    return {
      ...(0, _base.baseSyntheticEvent)(),
      nativeEvent: {
        key
      }
    };
  },
  /**
   * Experimental values:
   * - iOS: `{"eventCount": 4, "target": 75, "text": "Test"}`
   * - Android: `{"target": 53, "text": "Test"}`
   */
  submitEditing: text => {
    return {
      ...(0, _base.baseSyntheticEvent)(),
      nativeEvent: {
        text,
        target: 0
      }
    };
  },
  /**
   * Experimental values:
   * - iOS: `{"eventCount": 4, "target": 75, "text": "Test"}`
   * - Android: `{"target": 53, "text": "Test"}`
   */
  endEditing: text => {
    return {
      ...(0, _base.baseSyntheticEvent)(),
      nativeEvent: {
        text,
        target: 0
      }
    };
  },
  /**
   * Experimental values:
   * - iOS: `{"selection": {"end": 4, "start": 4}, "target": 75}`
   * - Android: `{"selection": {"end": 4, "start": 4}}`
   */
  selectionChange: ({
    start,
    end
  }) => {
    return {
      ...(0, _base.baseSyntheticEvent)(),
      nativeEvent: {
        selection: {
          start,
          end
        }
      }
    };
  },
  /**
   * Experimental values:
   * - iOS: `{"contentSize": {"height": 21.666666666666668, "width": 11.666666666666666}, "target": 75}`
   * - Android: `{"contentSize": {"height": 61.45454406738281, "width": 352.7272644042969}, "target": 53}`
   */
  contentSizeChange: ({
    width,
    height
  }) => {
    return {
      ...(0, _base.baseSyntheticEvent)(),
      nativeEvent: {
        contentSize: {
          width,
          height
        },
        target: 0
      }
    };
  }
};
//# sourceMappingURL=text-input.js.map