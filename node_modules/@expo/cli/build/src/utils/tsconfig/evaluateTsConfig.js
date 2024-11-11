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
    evaluateTsConfig: ()=>evaluateTsConfig,
    importTypeScriptFromProjectOptionally: ()=>importTypeScriptFromProjectOptionally
});
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
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function evaluateTsConfig(ts, tsConfigPath) {
    const formatDiagnosticsHost = {
        getNewLine: ()=>require("os").EOL,
        getCurrentDirectory: ts.sys.getCurrentDirectory,
        getCanonicalFileName: (fileName)=>fileName
    };
    try {
        var ref;
        const { config , error  } = ts.readConfigFile(tsConfigPath, ts.sys.readFile);
        if (error) {
            throw new Error(ts.formatDiagnostic(error, formatDiagnosticsHost));
        }
        const jsonFileContents = ts.parseJsonConfigFileContent(config, {
            ...ts.sys,
            readDirectory: (_, ext)=>[
                    ext ? `file${ext[0]}` : `file.ts`
                ]
        }, _path().default.dirname(tsConfigPath));
        if (jsonFileContents.errors) {
            // filter out "no inputs were found in config file" error
            jsonFileContents.errors = jsonFileContents.errors.filter(({ code  })=>code !== 18003);
        }
        if ((ref = jsonFileContents.errors) == null ? void 0 : ref.length) {
            throw new Error(ts.formatDiagnostic(jsonFileContents.errors[0], formatDiagnosticsHost));
        }
        return {
            compilerOptions: jsonFileContents.options,
            raw: config.raw
        };
    } catch (error1) {
        if ((error1 == null ? void 0 : error1.name) === "SyntaxError") {
            var _message;
            throw new Error("tsconfig.json is invalid:\n" + ((_message = error1.message) != null ? _message : ""));
        }
        throw error1;
    }
}
function importTypeScriptFromProjectOptionally(projectRoot) {
    const resolvedPath = _resolveFrom().default.silent(projectRoot, "typescript");
    if (!resolvedPath) {
        return null;
    }
    return require(resolvedPath);
}

//# sourceMappingURL=evaluateTsConfig.js.map