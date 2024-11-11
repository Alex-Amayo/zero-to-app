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
    getTelemetry: ()=>getTelemetry,
    logEventAsync: ()=>logEventAsync
});
const _detachedClient = require("./DetachedClient");
const _rudderClient = require("./RudderClient");
const _env = require("../env");
/** The singleton telemetry client to use */ let telemetry = null;
function getTelemetry() {
    if (_env.env.EXPO_NO_TELEMETRY || _env.env.EXPO_OFFLINE) return null;
    if (telemetry) return telemetry;
    const client = _env.env.EXPO_NO_TELEMETRY_DETACH ? new _rudderClient.RudderClient() // Block the CLI process when sending telemetry, useful for testing
     : new _detachedClient.DetachedClient(); // Do not block the CLI process when sending telemetry
    process.once("SIGINT", ()=>client.flush());
    process.once("SIGTERM", ()=>client.flush());
    process.once("beforeExit", ()=>client.flush());
    return telemetry = client;
}
async function logEventAsync(event, properties) {
    var ref;
    await ((ref = getTelemetry()) == null ? void 0 : ref.record({
        event,
        properties
    }));
}

//# sourceMappingURL=index.js.map