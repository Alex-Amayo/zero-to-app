"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "resolveWithTsConfigPaths", {
    enumerable: true,
    get: ()=>resolveWithTsConfigPaths
});
function _path() {
    const data = /*#__PURE__*/ _interopRequireDefault(require("path"));
    _path = function() {
        return data;
    };
    return data;
}
const _matchTsConfigPathAlias = require("./matchTsConfigPathAlias");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const debug = require("debug")("expo:metro:tsconfig-paths");
const isAbsolute = process.platform === "win32" ? _path().default.win32.isAbsolute : _path().default.posix.isAbsolute;
function resolveWithTsConfigPaths(config, request, resolve) {
    const aliases = Object.keys(config.paths);
    if (// If no aliases are added bail out
    (!aliases.length && !config.hasBaseUrl) || // Library authors cannot utilize this feature in userspace.
    /node_modules/.test(request.originModulePath) || // Absolute paths are not supported
    isAbsolute(request.moduleName) || // Relative paths are not supported
    /^\.\.?($|[\\/])/.test(request.moduleName)) {
        return null;
    }
    const matched = (0, _matchTsConfigPathAlias.matchTsConfigPathAlias)(aliases, request.moduleName);
    if (matched) {
        for (const alias of config.paths[matched.text]){
            const nextModuleName = matched.star ? alias.replace("*", matched.star) : alias;
            if (/\.d\.ts$/.test(nextModuleName)) continue;
            const possibleResult = _path().default.join(config.baseUrl, nextModuleName);
            const result = resolve(possibleResult);
            if (result) {
                debug(`${request.moduleName} -> ${possibleResult}`);
                return result;
            }
        }
    } else {
        // Only resolve against baseUrl if no `paths` groups were matched.
        // Base URL is resolved after paths, and before node_modules.
        if (config.hasBaseUrl) {
            const possibleResult1 = _path().default.join(config.baseUrl, request.moduleName);
            const result1 = resolve(possibleResult1);
            if (result1) {
                debug(`baseUrl: ${request.moduleName} -> ${possibleResult1}`);
                return result1;
            }
        }
    }
    return null;
}

//# sourceMappingURL=resolveWithTsConfigPaths.js.map