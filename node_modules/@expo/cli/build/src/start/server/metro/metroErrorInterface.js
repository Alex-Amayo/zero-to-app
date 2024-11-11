/**
 * Copyright © 2022 650 Industries.
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
    logMetroErrorWithStack: ()=>logMetroErrorWithStack,
    logMetroError: ()=>logMetroError,
    logMetroErrorAsync: ()=>logMetroErrorAsync,
    getErrorOverlayHtmlAsync: ()=>getErrorOverlayHtmlAsync
});
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
function _terminalLink() {
    const data = /*#__PURE__*/ _interopRequireDefault(require("terminal-link"));
    _terminalLink = function() {
        return data;
    };
    return data;
}
const _log = require("../../../log");
const _ansi = require("../../../utils/ansi");
const _errors = require("../../../utils/errors");
const _getStaticRenderFunctions = require("../getStaticRenderFunctions");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function fill(width) {
    return Array(width).join(" ");
}
function formatPaths(config) {
    const filePath = _chalk().default.reset(config.filePath);
    return _chalk().default.dim("(") + filePath + _chalk().default.dim(`:${[
        config.line,
        config.col
    ].filter(Boolean).join(":")})`);
}
async function logMetroErrorWithStack(projectRoot, { stack , codeFrame , error  }) {
    if (error instanceof _errors.SilentError) {
        return;
    }
    // process.stdout.write('\u001b[0m'); // Reset attributes
    // process.stdout.write('\u001bc'); // Reset the terminal
    const { getStackFormattedLocation  } = require((0, _resolveFrom().default)(projectRoot, "@expo/metro-runtime/symbolicate"));
    _log.Log.log();
    _log.Log.log(_chalk().default.red("Metro error: ") + error.message);
    _log.Log.log();
    if (error instanceof _errors.CommandError) {
        return;
    }
    if (codeFrame) {
        var ref;
        const maxWarningLineLength = Math.max(200, process.stdout.columns);
        const lineText = codeFrame.content;
        const isPreviewTooLong = codeFrame.content.split("\n").some((line)=>line.length > maxWarningLineLength);
        const column = (ref = codeFrame.location) == null ? void 0 : ref.column;
        // When the preview is too long, we skip reading the file and attempting to apply
        // code coloring, this is because it can get very slow.
        if (isPreviewTooLong) {
            var ref1, ref2;
            let previewLine = "";
            let cursorLine = "";
            const formattedPath = formatPaths({
                filePath: codeFrame.fileName,
                line: (ref1 = codeFrame.location) == null ? void 0 : ref1.row,
                col: (ref2 = codeFrame.location) == null ? void 0 : ref2.column
            });
            // Create a curtailed preview line like:
            // `...transition:'fade'},k._updatePropsStack=function(){clearImmediate(k._updateImmediate),k._updateImmediate...`
            // If there is no text preview or column number, we can't do anything.
            if (lineText && column != null) {
                var ref3;
                var ref4;
                const rangeWindow = Math.round(Math.max((ref4 = (ref3 = codeFrame.fileName) == null ? void 0 : ref3.length) != null ? ref4 : 0, Math.max(80, process.stdout.columns)) / 2);
                let minBounds = Math.max(0, column - rangeWindow);
                const maxBounds = Math.min(minBounds + rangeWindow * 2, lineText.length);
                previewLine = lineText.slice(minBounds, maxBounds);
                // If we splice content off the start, then we should append `...`.
                // This is unlikely to happen since we limit the activation size.
                if (minBounds > 0) {
                    // Adjust the min bounds so the cursor is aligned after we add the "..."
                    minBounds -= 3;
                    previewLine = _chalk().default.dim("...") + previewLine;
                }
                if (maxBounds < lineText.length) {
                    previewLine += _chalk().default.dim("...");
                }
                // If the column property could be found, then use that to fix the cursor location which is often broken in regex.
                cursorLine = (column == null ? "" : fill(column) + _chalk().default.reset("^")).slice(minBounds);
                _log.Log.log([
                    formattedPath,
                    "",
                    previewLine,
                    cursorLine,
                    _chalk().default.dim("(error truncated)")
                ].join("\n"));
            }
        } else {
            _log.Log.log(codeFrame.content);
        }
    }
    if (stack == null ? void 0 : stack.length) {
        _log.Log.log();
        _log.Log.log(_chalk().default.bold`Call Stack`);
        const stackProps = stack.map((frame)=>{
            return {
                title: frame.methodName,
                subtitle: getStackFormattedLocation(projectRoot, frame),
                collapse: frame.collapse
            };
        });
        stackProps.forEach((frame)=>{
            const position = _terminalLink().default.isSupported ? (0, _terminalLink().default)(frame.subtitle, frame.subtitle) : frame.subtitle;
            let lineItem = _chalk().default.gray(`  ${frame.title} (${position})`);
            if (frame.collapse) {
                lineItem = _chalk().default.dim(lineItem);
            }
            _log.Log.log(lineItem);
        });
    } else {
        _log.Log.log(_chalk().default.gray(`  ${error.stack}`));
    }
}
async function logMetroError(projectRoot, { error  }) {
    var ref, ref1;
    if (error instanceof _errors.SilentError) {
        return;
    }
    const { LogBoxLog , parseErrorStack  } = require((0, _resolveFrom().default)(projectRoot, "@expo/metro-runtime/symbolicate"));
    const stack = parseErrorStack(error.stack);
    const log = new LogBoxLog({
        level: "static",
        message: {
            content: error.message,
            substitutions: []
        },
        isComponentError: false,
        stack,
        category: "static",
        componentStack: []
    });
    await new Promise((res)=>log.symbolicate("stack", res));
    var ref2;
    logMetroErrorWithStack(projectRoot, {
        stack: (ref2 = (ref = log.symbolicated) == null ? void 0 : (ref1 = ref.stack) == null ? void 0 : ref1.stack) != null ? ref2 : [],
        codeFrame: log.codeFrame,
        error
    });
}
function isTransformError(error) {
    return error.type === "TransformError";
}
/** @returns the html required to render the static metro error as an SPA. */ function logFromError({ error , projectRoot  }) {
    const { LogBoxLog , parseErrorStack  } = require((0, _resolveFrom().default)(projectRoot, "@expo/metro-runtime/symbolicate"));
    // Remap direct Metro Node.js errors to a format that will appear more client-friendly in the logbox UI.
    let stack;
    if (isTransformError(error)) {
        // Syntax errors in static rendering.
        stack = [
            {
                file: _path().default.join(projectRoot, error.filename),
                methodName: "<unknown>",
                arguments: [],
                // TODO: Import stack
                lineNumber: error.lineNumber,
                column: error.column
            }, 
        ];
    } else if ("originModulePath" in error) {
        // TODO: Use import stack here when the error is resolution based.
        stack = [
            {
                file: error.originModulePath,
                methodName: "<unknown>",
                arguments: [],
                // TODO: Import stack
                lineNumber: 0,
                column: 0
            }, 
        ];
    } else {
        stack = parseErrorStack(error.stack);
    }
    return new LogBoxLog({
        level: "static",
        message: {
            content: error.message,
            substitutions: []
        },
        isComponentError: false,
        stack,
        category: "static",
        componentStack: []
    });
}
async function logMetroErrorAsync({ error , projectRoot  }) {
    var ref, ref1;
    const log = logFromError({
        projectRoot,
        error
    });
    await new Promise((res)=>log.symbolicate("stack", res));
    var ref2;
    logMetroErrorWithStack(projectRoot, {
        stack: (ref2 = (ref = log.symbolicated) == null ? void 0 : (ref1 = ref.stack) == null ? void 0 : ref1.stack) != null ? ref2 : [],
        codeFrame: log.codeFrame,
        error
    });
}
async function getErrorOverlayHtmlAsync({ error , projectRoot , routerRoot  }) {
    var ref, ref1;
    const log = logFromError({
        projectRoot,
        error
    });
    await new Promise((res)=>log.symbolicate("stack", res));
    var ref2;
    logMetroErrorWithStack(projectRoot, {
        stack: (ref2 = (ref = log.symbolicated) == null ? void 0 : (ref1 = ref.stack) == null ? void 0 : ref1.stack) != null ? ref2 : [],
        codeFrame: log.codeFrame,
        error
    });
    // @ts-expect-error
    if ("message" in log && "content" in log.message && typeof log.message.content === "string") {
        log.message.content = (0, _ansi.stripAnsi)(log.message.content);
    }
    const logBoxContext = {
        selectedLogIndex: 0,
        isDisabled: false,
        logs: [
            log
        ]
    };
    const html = `<html><head><style>#root,body,html{height:100%}body{overflow:hidden}#root{display:flex}</style></head><body><div id="root"></div><script id="_expo-static-error" type="application/json">${JSON.stringify(logBoxContext)}</script></body></html>`;
    const errorOverlayEntry = await (0, _getStaticRenderFunctions.createMetroEndpointAsync)(projectRoot, // Keep the URL relative
    "", (0, _resolveFrom().default)(projectRoot, "expo-router/_error"), {
        mode: "development",
        platform: "web",
        minify: false,
        baseUrl: "",
        routerRoot,
        isExporting: false,
        reactCompiler: false
    });
    const htmlWithJs = html.replace("</body>", `<script src=${errorOverlayEntry}></script></body>`);
    return htmlWithJs;
}

//# sourceMappingURL=metroErrorInterface.js.map