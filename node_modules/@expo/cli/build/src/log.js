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
    time: ()=>time,
    timeEnd: ()=>timeEnd,
    error: ()=>error,
    exception: ()=>exception,
    warn: ()=>warn,
    log: ()=>log,
    debug: ()=>debug,
    clear: ()=>clear,
    exit: ()=>exit,
    Log: ()=>Log
});
function _chalk() {
    const data = /*#__PURE__*/ _interopRequireDefault(require("chalk"));
    _chalk = function() {
        return data;
    };
    return data;
}
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function time(label) {
    console.time(label);
}
function timeEnd(label) {
    console.timeEnd(label);
}
function error(...message) {
    console.error(...message);
}
function exception(e) {
    const { env  } = require("./utils/env");
    error(_chalk().default.red(e.toString()) + (env.EXPO_DEBUG ? "\n" + _chalk().default.gray(e.stack) : ""));
}
function warn(...message) {
    console.warn(...message.map((value)=>_chalk().default.yellow(value)));
}
function log(...message) {
    console.log(...message);
}
function debug(...message) {
    if (require("./utils/env").env.EXPO_DEBUG) console.log(...message);
}
function clear() {
    process.stdout.write(process.platform === "win32" ? "\x1b[2J\x1b[0f" : "\x1b[2J\x1b[3J\x1b[H");
}
function exit(message, code = 1) {
    if (message instanceof Error) {
        exception(message);
        process.exit(code);
    }
    if (message) {
        if (code === 0) {
            log(message);
        } else {
            error(message);
        }
    }
    process.exit(code);
}
const Log = {
    time,
    timeEnd,
    error,
    exception,
    warn,
    log,
    debug,
    clear,
    exit
};

//# sourceMappingURL=log.js.map