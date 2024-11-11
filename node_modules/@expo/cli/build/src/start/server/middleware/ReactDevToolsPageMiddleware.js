"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    ReactDevToolsEndpoint: ()=>ReactDevToolsEndpoint,
    ReactDevToolsPageMiddleware: ()=>ReactDevToolsPageMiddleware
});
function _assert() {
    const data = /*#__PURE__*/ _interopRequireDefault(require("assert"));
    _assert = function() {
        return data;
    };
    return data;
}
function _path() {
    const data = /*#__PURE__*/ _interopRequireDefault(require("path"));
    _path = function() {
        return data;
    };
    return data;
}
function _resolveFrom() {
    const data = /*#__PURE__*/ _interopRequireDefault(require("resolve-from"));
    _resolveFrom = function() {
        return data;
    };
    return data;
}
function _send() {
    const data = /*#__PURE__*/ _interopRequireDefault(require("send"));
    _send = function() {
        return data;
    };
    return data;
}
const _expoMiddleware = require("./ExpoMiddleware");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const ReactDevToolsEndpoint = "/_expo/react-devtools";
class ReactDevToolsPageMiddleware extends _expoMiddleware.ExpoMiddleware {
    constructor(projectRoot){
        super(projectRoot, [
            ReactDevToolsEndpoint
        ]);
    }
    shouldHandleRequest(req) {
        var ref;
        if (!((ref = req.url) == null ? void 0 : ref.startsWith(ReactDevToolsEndpoint))) {
            return false;
        }
        return true;
    }
    async handleRequestAsync(req, res) {
        (0, _assert().default)(req.headers.host, "Request headers must include host");
        var _url;
        const { pathname  } = new URL((_url = req.url) != null ? _url : "/", `http://${req.headers.host}`);
        const requestPath = pathname.substring(ReactDevToolsEndpoint.length) || "/";
        var // Production: This will resolve when installed in the project.
        ref;
        const entryPath = (ref = _resolveFrom().default.silent(this.projectRoot, "expo/static/react-devtools-page/index.html")) != null ? ref : // Development: This will resolve when testing locally.
        _path().default.resolve(__dirname, "../../../../../static/react-devtools-page/index.html");
        const staticRoot = _path().default.dirname(entryPath);
        (0, _send().default)(req, requestPath, {
            root: staticRoot
        }).pipe(res);
    }
}

//# sourceMappingURL=ReactDevToolsPageMiddleware.js.map