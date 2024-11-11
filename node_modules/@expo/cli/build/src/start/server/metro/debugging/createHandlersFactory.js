"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "createHandlersFactory", {
    enumerable: true,
    get: ()=>createHandlersFactory
});
const _networkResponse = require("./messageHandlers/NetworkResponse");
const _pageReload = require("./messageHandlers/PageReload");
const _vscodeDebuggerGetPossibleBreakpoints = require("./messageHandlers/VscodeDebuggerGetPossibleBreakpoints");
const _vscodeDebuggerSetBreakpointByUrl = require("./messageHandlers/VscodeDebuggerSetBreakpointByUrl");
const _vscodeRuntimeCallFunctionOn = require("./messageHandlers/VscodeRuntimeCallFunctionOn");
const _vscodeRuntimeEvaluate = require("./messageHandlers/VscodeRuntimeEvaluate");
const _vscodeRuntimeGetProperties = require("./messageHandlers/VscodeRuntimeGetProperties");
const _pageIsSupported = require("./pageIsSupported");
const debug = require("debug")("expo:metro:debugging:messageHandlers");
function createHandlersFactory(metroBundler) {
    return (connection)=>{
        debug("Initializing for connection: ", connection.page.title);
        if (!(0, _pageIsSupported.pageIsSupported)(connection.page)) {
            debug("Aborted, unsupported page capabiltiies:", connection.page.capabilities);
            return null;
        }
        const handlers = [
            // Generic handlers
            new _networkResponse.NetworkResponseHandler(connection),
            new _pageReload.PageReloadHandler(connection, metroBundler),
            // Vscode-specific handlers
            new _vscodeDebuggerGetPossibleBreakpoints.VscodeDebuggerGetPossibleBreakpointsHandler(connection),
            new _vscodeDebuggerSetBreakpointByUrl.VscodeDebuggerSetBreakpointByUrlHandler(connection),
            new _vscodeRuntimeGetProperties.VscodeRuntimeGetPropertiesHandler(connection),
            new _vscodeRuntimeCallFunctionOn.VscodeRuntimeCallFunctionOnHandler(connection),
            new _vscodeRuntimeEvaluate.VscodeRuntimeEvaluateHandler(connection), 
        ].filter((middleware)=>middleware.isEnabled());
        if (!handlers.length) {
            debug("Aborted, all handlers are disabled");
            return null;
        }
        debug("Initialized with handlers: ", handlers.map((middleware)=>middleware.constructor.name).join(", "));
        return {
            handleDeviceMessage: (message)=>{
                return withMessageDebug("device", message, handlers.some((middleware)=>{
                    return middleware.handleDeviceMessage == null ? void 0 : middleware.handleDeviceMessage(message);
                }));
            },
            handleDebuggerMessage: (message)=>{
                return withMessageDebug("debugger", message, handlers.some((middleware)=>{
                    return middleware.handleDebuggerMessage == null ? void 0 : middleware.handleDebuggerMessage(message);
                }));
            }
        };
    };
}
function withMessageDebug(type, message, result) {
    const status = result ? "handled" : "ignored";
    const prefix = type === "device" ? "(debugger) <- (device)" : "(debugger) -> (device)";
    try {
        debug(`%s = %s:`, prefix, status, JSON.stringify(message));
    } catch  {
        debug(`%s = %s:`, prefix, status, "message not serializable");
    }
    return result || undefined;
}

//# sourceMappingURL=createHandlersFactory.js.map