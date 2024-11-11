"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "createDebugMiddleware", {
    enumerable: true,
    get: ()=>createDebugMiddleware
});
function _chalk() {
    const data = /*#__PURE__*/ _interopRequireDefault(require("chalk"));
    _chalk = function() {
        return data;
    };
    return data;
}
const _createHandlersFactory = require("./createHandlersFactory");
const _log = require("../../../../log");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function createDebugMiddleware(metroBundler) {
    // Load the React Native debugging tools from project
    // TODO: check if this works with isolated modules
    const { createDevMiddleware  } = require("@react-native/dev-middleware");
    const { middleware , websocketEndpoints  } = createDevMiddleware({
        projectRoot: metroBundler.projectRoot,
        serverBaseUrl: metroBundler.getUrlCreator().constructUrl({
            scheme: "http",
            hostType: "lan"
        }),
        logger: createLogger(_chalk().default.bold("Debug:")),
        unstable_customInspectorMessageHandler: (0, _createHandlersFactory.createHandlersFactory)(metroBundler),
        unstable_experiments: {
            enableNewDebugger: true
        }
    });
    return {
        debugMiddleware: middleware,
        debugWebsocketEndpoints: websocketEndpoints
    };
}
function createLogger(logPrefix) {
    return {
        info: (...args)=>_log.Log.log(logPrefix, ...args),
        warn: (...args)=>_log.Log.warn(logPrefix, ...args),
        error: (...args)=>_log.Log.error(logPrefix, ...args)
    };
}

//# sourceMappingURL=createDebugMiddleware.js.map