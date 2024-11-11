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
    createDebuggerTelemetryMiddleware: ()=>createDebuggerTelemetryMiddleware,
    findDebugTool: ()=>findDebugTool
});
const _getMetroDebugProperties = require("./getMetroDebugProperties");
const _env = require("../env");
const _telemetry = require("../telemetry");
function createDebuggerTelemetryMiddleware(projectRoot, exp) {
    let hasReported = false;
    // This only works for Hermes apps, disable when telemetry is turned off
    if (_env.env.EXPO_NO_TELEMETRY || exp.jsEngine !== "hermes") {
        return (req, res, next)=>{
            if (typeof next === "function") {
                next(undefined);
            }
        };
    }
    return (req, res, next)=>{
        // Only report once
        if (hasReported && typeof next === "function") {
            return next(undefined);
        }
        const debugTool = findDebugTool(req);
        if (debugTool) {
            hasReported = true;
            (0, _telemetry.logEventAsync)("metro debug", (0, _getMetroDebugProperties.getMetroDebugProperties)(projectRoot, exp, debugTool));
        }
        if (typeof next === "function") {
            return next(undefined);
        }
    };
}
function findDebugTool(req) {
    var ref, ref1;
    if ((ref = req.headers["origin"]) == null ? void 0 : ref.includes("chrome-devtools")) {
        return {
            name: "chrome"
        };
    }
    if ((ref1 = req.url) == null ? void 0 : ref1.startsWith("/json")) {
        var ref2;
        const flipperUserAgent = (ref2 = req.headers["user-agent"]) == null ? void 0 : ref2.match(/(Flipper)\/([^\s]+)/);
        if (flipperUserAgent) {
            return {
                name: flipperUserAgent[1].toLowerCase(),
                version: flipperUserAgent[2]
            };
        }
    }
    return null;
}

//# sourceMappingURL=metroDebuggerMiddleware.js.map