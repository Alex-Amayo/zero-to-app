"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderHook = renderHook;
var _react = _interopRequireDefault(require("react"));
var _render = require("./render");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function renderHook(renderCallback, options) {
  const initialProps = options?.initialProps;
  const wrapper = options?.wrapper;
  const result = /*#__PURE__*/_react.default.createRef();
  function TestComponent({
    renderCallbackProps
  }) {
    const renderResult = renderCallback(renderCallbackProps);
    _react.default.useEffect(() => {
      result.current = renderResult;
    });
    return null;
  }
  const {
    rerender: baseRerender,
    unmount
  } = (0, _render.renderInternal)(
  /*#__PURE__*/
  // @ts-expect-error since option can be undefined, initialProps can be undefined when it should'nt
  _react.default.createElement(TestComponent, {
    renderCallbackProps: initialProps
  }), {
    wrapper,
    detectHostComponentNames: false
  });
  function rerender(rerenderCallbackProps) {
    return baseRerender(/*#__PURE__*/_react.default.createElement(TestComponent, {
      renderCallbackProps: rerenderCallbackProps
    }));
  }

  // @ts-expect-error result is ill typed because ref is initialized to null
  return {
    result,
    rerender,
    unmount
  };
}
//# sourceMappingURL=render-hook.js.map