"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = render;
exports.renderInternal = renderInternal;
var _react = _interopRequireWildcard(require("react"));
var React = _react;
var _act = _interopRequireDefault(require("./act"));
var _cleanup = require("./cleanup");
var _config = require("./config");
var _componentTree = require("./helpers/component-tree");
var _debugDeep = _interopRequireDefault(require("./helpers/debug-deep"));
var _debugShallow = _interopRequireDefault(require("./helpers/debug-shallow"));
var _hostComponentNames = require("./helpers/host-component-names");
var _stringValidation = require("./helpers/string-validation");
var _renderAct = require("./render-act");
var _screen = require("./screen");
var _within = require("./within");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
/**
 * Renders test component deeply using React Test Renderer and exposes helpers
 * to assert on the output.
 */
function render(component, options = {}) {
  return renderInternal(component, options);
}
function renderInternal(component, options) {
  const {
    wrapper: Wrapper,
    concurrentRoot,
    detectHostComponentNames = true,
    unstable_validateStringsRenderedWithinText,
    ...rest
  } = options || {};
  const testRendererOptions = {
    ...rest,
    // @ts-expect-error incomplete typing on RTR package
    unstable_isConcurrent: concurrentRoot ?? (0, _config.getConfig)().concurrentRoot
  };
  if (detectHostComponentNames) {
    (0, _hostComponentNames.configureHostComponentNamesIfNeeded)();
  }
  if (unstable_validateStringsRenderedWithinText) {
    return renderWithStringValidation(component, {
      wrapper: Wrapper,
      ...testRendererOptions
    });
  }
  const wrap = element => Wrapper ? /*#__PURE__*/React.createElement(Wrapper, null, element) : element;
  const renderer = (0, _renderAct.renderWithAct)(wrap(component), testRendererOptions);
  return buildRenderResult(renderer, wrap);
}
function renderWithStringValidation(component, options = {}) {
  let renderer;
  const {
    wrapper: Wrapper,
    ...testRendererOptions
  } = options ?? {};
  const handleRender = (_, phase) => {
    if (renderer && phase === 'update') {
      (0, _stringValidation.validateStringsRenderedWithinText)(renderer.toJSON());
    }
  };
  const wrap = element => /*#__PURE__*/React.createElement(_react.Profiler, {
    id: "renderProfiler",
    onRender: handleRender
  }, Wrapper ? /*#__PURE__*/React.createElement(Wrapper, null, element) : element);
  renderer = (0, _renderAct.renderWithAct)(wrap(component), testRendererOptions);
  (0, _stringValidation.validateStringsRenderedWithinText)(renderer.toJSON());
  return buildRenderResult(renderer, wrap);
}
function buildRenderResult(renderer, wrap) {
  const update = updateWithAct(renderer, wrap);
  const instance = renderer.root;
  const unmount = () => {
    void (0, _act.default)(() => {
      renderer.unmount();
    });
  };
  (0, _cleanup.addToCleanupQueue)(unmount);
  const result = {
    ...(0, _within.getQueriesForElement)(instance),
    update,
    unmount,
    rerender: update,
    // alias for `update`
    toJSON: renderer.toJSON,
    debug: debug(instance, renderer),
    get root() {
      return (0, _componentTree.getHostChildren)(instance)[0];
    },
    UNSAFE_root: instance
  };

  // Add as non-enumerable property, so that it's safe to enumerate
  // `render` result, e.g. using destructuring rest syntax.
  Object.defineProperty(result, 'container', {
    enumerable: false,
    get() {
      throw new Error("'container' property has been renamed to 'UNSAFE_root'.\n\n" + "Consider using 'root' property which returns root host element.");
    }
  });
  (0, _screen.setRenderResult)(result);
  return result;
}
function updateWithAct(renderer, wrap) {
  return function (component) {
    void (0, _act.default)(() => {
      renderer.update(wrap(component));
    });
  };
}
function debug(instance, renderer) {
  function debugImpl(options) {
    const {
      defaultDebugOptions
    } = (0, _config.getConfig)();
    const debugOptions = typeof options === 'string' ? {
      ...defaultDebugOptions,
      message: options
    } : {
      ...defaultDebugOptions,
      ...options
    };
    if (typeof options === 'string') {
      // eslint-disable-next-line no-console
      console.warn('Using debug("message") is deprecated and will be removed in future release, please use debug({ message; "message" }) instead.');
    }
    const json = renderer.toJSON();
    if (json) {
      return (0, _debugDeep.default)(json, debugOptions);
    }
  }
  debugImpl.shallow = message => (0, _debugShallow.default)(instance, message);
  return debugImpl;
}
//# sourceMappingURL=render.js.map