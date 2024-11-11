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
    loadTsConfigPathsAsync: ()=>loadTsConfigPathsAsync,
    readTsconfigAsync: ()=>readTsconfigAsync
});
function _jsonFile() {
    const data = /*#__PURE__*/ _interopRequireDefault(require("@expo/json-file"));
    _jsonFile = function() {
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
const _evaluateTsConfig = require("./evaluateTsConfig");
const _dir = require("../dir");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const debug = require("debug")("expo:utils:tsconfig:load");
async function loadTsConfigPathsAsync(dir) {
    var ref;
    const options = (ref = await readTsconfigAsync(dir)) != null ? ref : await readJsconfigAsync(dir);
    if (options) {
        var ref1, ref2;
        const [, config] = options;
        return {
            paths: (ref1 = config.compilerOptions) == null ? void 0 : ref1.paths,
            baseUrl: ((ref2 = config.compilerOptions) == null ? void 0 : ref2.baseUrl) ? _path().default.resolve(dir, config.compilerOptions.baseUrl) : undefined
        };
    }
    return null;
}
async function readJsconfigAsync(projectRoot) {
    const configPath = _path().default.join(projectRoot, "jsconfig.json");
    if (await (0, _dir.fileExistsAsync)(configPath)) {
        const config = await _jsonFile().default.readAsync(configPath, {
            json5: true
        });
        if (config) {
            return [
                configPath,
                config
            ];
        }
    }
    return null;
}
async function readTsconfigAsync(projectRoot) {
    const configPath = _path().default.join(projectRoot, "tsconfig.json");
    if (await (0, _dir.fileExistsAsync)(configPath)) {
        // We need to fully evaluate the tsconfig to get the baseUrl and paths in case they were applied in `extends`.
        const ts = (0, _evaluateTsConfig.importTypeScriptFromProjectOptionally)(projectRoot);
        if (ts) {
            return [
                configPath,
                (0, _evaluateTsConfig.evaluateTsConfig)(ts, configPath)
            ];
        }
        debug(`typescript module not found in: ${projectRoot}`);
    }
    return null;
}

//# sourceMappingURL=loadTsConfigPaths.js.map