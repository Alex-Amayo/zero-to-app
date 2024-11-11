"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "DetachedClient", {
    enumerable: true,
    get: ()=>DetachedClient
});
function _childProcess() {
    const data = require("child_process");
    _childProcess = function() {
        return data;
    };
    return data;
}
function _fs() {
    const data = /*#__PURE__*/ _interopRequireDefault(require("fs"));
    _fs = function() {
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
function _tempy() {
    const data = /*#__PURE__*/ _interopRequireDefault(require("tempy"));
    _tempy = function() {
        return data;
    };
    return data;
}
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const debug = require("debug")("expo:telemetry:detachedClient");
class DetachedClient {
    records = [];
    get isIdentified() {
        return !!this.actor;
    }
    async identify(actor) {
        if (!actor) return;
        debug("Actor received");
        this.actor = actor;
    }
    async record(record) {
        debug("Event received: %s", record.event);
        this.records.push({
            ...record,
            originalTimestamp: new Date()
        });
    }
    async flush() {
        if (!this.records.length) {
            return debug("No records to flush, skipping...");
        }
        const file = _tempy().default.file({
            name: "expo-telemetry.json"
        });
        const data = {
            actor: this.actor,
            records: this.records
        };
        this.records = [];
        await _fs().default.promises.mkdir(_path().default.dirname(file), {
            recursive: true
        });
        await _fs().default.promises.writeFile(file, JSON.stringify(data));
        const child = (0, _childProcess().spawn)(process.execPath, [
            require.resolve("./flushDetached"),
            file
        ], {
            detached: true,
            windowsHide: true,
            shell: false,
            stdio: "ignore"
        });
        child.unref();
        debug("Detached flush started");
    }
}

//# sourceMappingURL=DetachedClient.js.map