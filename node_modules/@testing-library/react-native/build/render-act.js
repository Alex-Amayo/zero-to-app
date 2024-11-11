"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderWithAct = renderWithAct;
var _reactTestRenderer = _interopRequireDefault(require("react-test-renderer"));
var _act = _interopRequireDefault(require("./act"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function renderWithAct(component, options) {
  let renderer;

  // This will be called synchronously.
  void (0, _act.default)(() => {
    // @ts-expect-error TestRenderer.create is not typed correctly
    renderer = _reactTestRenderer.default.create(component, options);
  });

  // @ts-ignore act is synchronous, so renderer is already initialized here
  return renderer;
}
//# sourceMappingURL=render-act.js.map