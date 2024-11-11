"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _fs() {
    const data = /*#__PURE__*/ _interopRequireDefault(require("fs"));
    _fs = function() {
        return data;
    };
    return data;
}
const _rudderClient = require("./RudderClient");
const _user = require("../../api/user/user");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const telemetryFile = process.argv[2];
flush().catch(()=>_fs().default.promises.unlink(telemetryFile)).finally(()=>process.exit(0));
async function flush() {
    if (!telemetryFile) return;
    let json;
    let data;
    try {
        json = await _fs().default.promises.readFile(telemetryFile, "utf8");
        data = JSON.parse(json);
    } catch (error) {
        if (error.code === "ENOENT") return;
        throw error;
    }
    if (!data.records.length) {
        return;
    }
    const client = new _rudderClient.RudderClient(undefined, "detached");
    await client.identify(data.actor || await (0, _user.getUserAsync)());
    for (const record of data.records){
        await client.record(record);
    }
    await client.flush();
    await _fs().default.promises.unlink(telemetryFile);
}

//# sourceMappingURL=flushDetached.js.map