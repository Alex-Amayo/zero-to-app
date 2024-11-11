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
    CommandError: ()=>CommandError,
    AbortCommandError: ()=>AbortCommandError,
    SilentError: ()=>SilentError,
    logCmdError: ()=>logCmdError,
    UnimplementedError: ()=>UnimplementedError
});
function _assert() {
    const data = require("assert");
    _assert = function() {
        return data;
    };
    return data;
}
function _chalk() {
    const data = /*#__PURE__*/ _interopRequireDefault(require("chalk"));
    _chalk = function() {
        return data;
    };
    return data;
}
const _log = require("../log");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const ERROR_PREFIX = "Error: ";
class CommandError extends Error {
    constructor(code, message = ""){
        super("");
        this.code = code;
        this.name = "CommandError";
        this.isCommandError = true;
        // If e.toString() was called to get `message` we don't want it to look
        // like "Error: Error:".
        if (message.startsWith(ERROR_PREFIX)) {
            message = message.substring(ERROR_PREFIX.length);
        }
        this.message = message || code;
    }
}
class AbortCommandError extends CommandError {
    constructor(){
        super("ABORTED", "Interactive prompt was cancelled.");
    }
}
class SilentError extends CommandError {
    constructor(messageOrError){
        var ref;
        const message = (ref = typeof messageOrError === "string" ? messageOrError : messageOrError == null ? void 0 : messageOrError.message) != null ? ref : "This error should fail silently in the CLI";
        super("SILENT", message);
        if (typeof messageOrError !== "string") {
            var ref1;
            // forward the props of the incoming error for tests or processes outside of expo-cli that use expo cli internals.
            this.stack = (ref1 = messageOrError == null ? void 0 : messageOrError.stack) != null ? ref1 : this.stack;
            var ref2;
            this.name = (ref2 = messageOrError == null ? void 0 : messageOrError.name) != null ? ref2 : this.name;
        }
    }
}
function logCmdError(error) {
    if (!(error instanceof Error)) {
        throw error;
    }
    if (error instanceof AbortCommandError || error instanceof SilentError) {
        // Do nothing, this is used for prompts or other cases that were custom logged.
        process.exit(0);
    } else if (error instanceof CommandError || error instanceof _assert().AssertionError || error.name === "ApiV2Error" || error.name === "ConfigError") {
        // Print the stack trace in debug mode only.
        (0, _log.exit)(error);
    }
    const errorDetails = error.stack ? "\n" + _chalk().default.gray(error.stack) : "";
    (0, _log.exit)(_chalk().default.red(error.toString()) + errorDetails);
}
class UnimplementedError extends Error {
    constructor(){
        super("Unimplemented");
        this.name = "UnimplementedError";
    }
}

//# sourceMappingURL=errors.js.map