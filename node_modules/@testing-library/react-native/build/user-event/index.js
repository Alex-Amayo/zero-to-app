"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "UserEventConfig", {
  enumerable: true,
  get: function () {
    return _setup.UserEventConfig;
  }
});
exports.userEvent = void 0;
var _setup = require("./setup");
const userEvent = exports.userEvent = {
  setup: _setup.setup,
  // Direct access for User Event v13 compatibility
  press: element => (0, _setup.setup)().press(element),
  longPress: (element, options) => (0, _setup.setup)().longPress(element, options),
  type: (element, text, options) => (0, _setup.setup)().type(element, text, options),
  clear: element => (0, _setup.setup)().clear(element),
  paste: (element, text) => (0, _setup.setup)().paste(element, text),
  scrollTo: (element, options) => (0, _setup.setup)().scrollTo(element, options)
};
//# sourceMappingURL=index.js.map