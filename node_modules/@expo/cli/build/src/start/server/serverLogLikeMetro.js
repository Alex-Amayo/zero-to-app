/**
 * Copyright © 2024 650 Industries.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ "use strict";
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
    logLikeMetro: ()=>logLikeMetro,
    formatStackLikeMetro: ()=>formatStackLikeMetro,
    augmentLogs: ()=>augmentLogs
});
function _metroConfig() {
    const data = require("@expo/metro-config");
    _metroConfig = function() {
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
function _sourceMapSupport() {
    const data = require("source-map-support");
    _sourceMapSupport = function() {
        return data;
    };
    return data;
}
function _stacktraceParser() {
    const data = /*#__PURE__*/ _interopRequireWildcard(require("stacktrace-parser"));
    _stacktraceParser = function() {
        return data;
    };
    return data;
}
const _env = require("../../utils/env");
const _fn = require("../../utils/fn");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function") return null;
    var cacheBabelInterop = new WeakMap();
    var cacheNodeInterop = new WeakMap();
    return (_getRequireWildcardCache = function(nodeInterop) {
        return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
}
function _interopRequireWildcard(obj, nodeInterop) {
    if (!nodeInterop && obj && obj.__esModule) {
        return obj;
    }
    if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
        return {
            default: obj
        };
    }
    var cache = _getRequireWildcardCache(nodeInterop);
    if (cache && cache.has(obj)) {
        return cache.get(obj);
    }
    var newObj = {};
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for(var key in obj){
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
            var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
            if (desc && (desc.get || desc.set)) {
                Object.defineProperty(newObj, key, desc);
            } else {
                newObj[key] = obj[key];
            }
        }
    }
    newObj.default = obj;
    if (cache) {
        cache.set(obj, newObj);
    }
    return newObj;
}
const groupStack = [];
let collapsedGuardTimer;
function logLikeMetro(originalLogFunction, level, platform, ...data) {
    // @ts-expect-error
    const logFunction = console[level] && level !== "trace" ? level : "log";
    const color = level === "error" ? _chalk().default.inverse.red : level === "warn" ? _chalk().default.inverse.yellow : _chalk().default.inverse.white;
    if (level === "group") {
        groupStack.push(level);
    } else if (level === "groupCollapsed") {
        groupStack.push(level);
        clearTimeout(collapsedGuardTimer);
        // Inform users that logs get swallowed if they forget to call `groupEnd`.
        collapsedGuardTimer = setTimeout(()=>{
            if (groupStack.includes("groupCollapsed")) {
                originalLogFunction(_chalk().default.inverse.yellow.bold(" WARN "), "Expected `console.groupEnd` to be called after `console.groupCollapsed`.");
                groupStack.length = 0;
            }
        }, 3000);
        return;
    } else if (level === "groupEnd") {
        groupStack.pop();
        if (!groupStack.length) {
            clearTimeout(collapsedGuardTimer);
        }
        return;
    }
    if (!groupStack.includes("groupCollapsed")) {
        // Remove excess whitespace at the end of a log message, if possible.
        const lastItem = data[data.length - 1];
        if (typeof lastItem === "string") {
            data[data.length - 1] = lastItem.trimEnd();
        }
        const modePrefix = _chalk().default.bold`${platform}`;
        originalLogFunction(modePrefix + " " + color.bold(` ${logFunction.toUpperCase()} `) + "".padEnd(groupStack.length * 2, " "), ...data);
    }
}
const escapedPathSep = _path().default.sep === "\\" ? "\\\\" : _path().default.sep;
const SERVER_STACK_MATCHER = new RegExp(`${escapedPathSep}(react-dom|metro-runtime|expo-router)${escapedPathSep}`);
function augmentLogsInternal(projectRoot) {
    const augmentLog = (name, fn)=>{
        // @ts-expect-error: TypeScript doesn't know about polyfilled functions.
        if (fn.__polyfilled) {
            return fn;
        }
        const originalFn = fn.bind(console);
        function logWithStack(...args) {
            const stack = new Error().stack;
            // Check if the log originates from the server.
            const isServerLog = !!(stack == null ? void 0 : stack.match(SERVER_STACK_MATCHER));
            if (isServerLog) {
                if (name === "error" || name === "warn") {
                    if (args.length === 2 && typeof args[1] === "string" && args[1].trim().startsWith("at ")) {
                        // react-dom custom stacks which are always broken.
                        // A stack string like:
                        //    at div
                        //    at http://localhost:8081/node_modules/expo-router/node/render.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&resolver.environment=node&transform.environment=node:38008:27
                        //    at Background (http://localhost:8081/node_modules/expo-router/node/render.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&resolver.environment=node&transform.environment=node:151009:7)
                        const customStack = args[1];
                        const { parseErrorStack  } = require((0, _resolveFrom().default)(projectRoot, "@expo/metro-runtime/symbolicate"));
                        try {
                            const parsedStack = parseErrorStack(customStack);
                            const symbolicatedStack = parsedStack.map((line)=>{
                                const mapped = (0, _sourceMapSupport().mapSourcePosition)({
                                    source: line.file,
                                    line: line.lineNumber,
                                    column: line.column
                                });
                                var _name;
                                const fallbackName = (_name = mapped.name) != null ? _name : "<unknown>";
                                var _arguments;
                                return {
                                    file: mapped.source,
                                    lineNumber: mapped.line,
                                    column: mapped.column,
                                    // Attempt to preserve the react component name if possible.
                                    methodName: line.methodName ? line.methodName === "<unknown>" ? fallbackName : line.methodName : fallbackName,
                                    arguments: (_arguments = line.arguments) != null ? _arguments : []
                                };
                            });
                            // Replace args[1] with the formatted stack.
                            args[1] = "\n" + formatParsedStackLikeMetro(projectRoot, symbolicatedStack, true);
                        } catch  {
                            // If symbolication fails, log the original stack.
                            args.push("\n" + formatStackLikeMetro(projectRoot, customStack));
                        }
                    } else {
                        args.push("\n" + formatStackLikeMetro(projectRoot, stack));
                    }
                }
                logLikeMetro(originalFn, name, "λ", ...args);
            } else {
                originalFn(...args);
            }
        }
        logWithStack.__polyfilled = true;
        return logWithStack;
    };
    [
        "trace",
        "info",
        "error",
        "warn",
        "log",
        "group",
        "groupCollapsed",
        "groupEnd",
        "debug"
    ].forEach((name)=>{
        // @ts-expect-error
        console[name] = augmentLog(name, console[name]);
    });
}
function formatStackLikeMetro(projectRoot, stack) {
    // Remove `Error: ` from the beginning of the stack trace.
    // Dim traces that match `INTERNAL_CALLSITES_REGEX`
    const stackTrace = _stacktraceParser().parse(stack);
    return formatParsedStackLikeMetro(projectRoot, stackTrace);
}
function formatParsedStackLikeMetro(projectRoot, stackTrace, isComponentStack = false) {
    // Remove `Error: ` from the beginning of the stack trace.
    // Dim traces that match `INTERNAL_CALLSITES_REGEX`
    return stackTrace.filter((line)=>line.file && // Ignore unsymbolicated stack frames. It's not clear how this is possible but it sometimes happens when the graph changes.
        !/^https?:\/\//.test(line.file) && (isComponentStack ? true : line.file !== "<anonymous>")).map((line)=>{
        // Use the same regex we use in Metro config to filter out traces:
        const isCollapsed = _metroConfig().INTERNAL_CALLSITES_REGEX.test(line.file);
        if (!isComponentStack && isCollapsed && !_env.env.EXPO_DEBUG) {
            return null;
        }
        // If a file is collapsed, print it with dim styling.
        const style = isCollapsed ? _chalk().default.dim : _chalk().default.gray;
        // Use the `at` prefix to match Node.js
        let fileName = line.file;
        if (fileName.startsWith(_path().default.sep)) {
            fileName = _path().default.relative(projectRoot, fileName);
        }
        if (line.lineNumber != null) {
            fileName += `:${line.lineNumber}`;
            if (line.column != null) {
                fileName += `:${line.column}`;
            }
        }
        return style(`  ${line.methodName} (${fileName})`);
    }).filter(Boolean).join("\n");
}
const augmentLogs = (0, _fn.memoize)(augmentLogsInternal);

//# sourceMappingURL=serverLogLikeMetro.js.map