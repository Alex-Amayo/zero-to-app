"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getVersionedNativeModulesAsync", {
    enumerable: true,
    get: ()=>getVersionedNativeModulesAsync
});
function _jsonFile() {
    const data = /*#__PURE__*/ _interopRequireDefault(require("@expo/json-file"));
    _jsonFile = function() {
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
function _resolveFrom() {
    const data = /*#__PURE__*/ _interopRequireDefault(require("resolve-from"));
    _resolveFrom = function() {
        return data;
    };
    return data;
}
const _getNativeModuleVersions = require("../../../api/getNativeModuleVersions");
const _log = /*#__PURE__*/ _interopRequireWildcard(require("../../../log"));
const _env = require("../../../utils/env");
const _errors = require("../../../utils/errors");
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
const debug = require("debug")("expo:doctor:dependencies:bundledNativeModules");
async function getVersionedNativeModulesAsync(projectRoot, sdkVersion, options = {}) {
    if (sdkVersion !== "UNVERSIONED" && !_env.env.EXPO_OFFLINE && !options.skipRemoteVersions) {
        try {
            debug("Fetching bundled native modules from the server...");
            return await (0, _getNativeModuleVersions.getNativeModuleVersionsAsync)(sdkVersion);
        } catch (error) {
            if (error instanceof _errors.CommandError && (error.code === "OFFLINE" || error.code === "API")) {
                _log.warn((0, _chalk().default)`Unable to reach well-known versions endpoint. Using local dependency map {bold expo/bundledNativeModules.json} for version validation`);
            } else {
                throw error;
            }
        }
    }
    debug("Fetching bundled native modules from the local JSON file...");
    return await getBundledNativeModulesAsync(projectRoot);
}
/**
 * Get the legacy static `bundledNativeModules.json` file
 * that's shipped with the version of `expo` that the project has installed.
 */ async function getBundledNativeModulesAsync(projectRoot) {
    // TODO: Revisit now that this code is in the `expo` package.
    const bundledNativeModulesPath = _resolveFrom().default.silent(projectRoot, "expo/bundledNativeModules.json");
    if (!bundledNativeModulesPath) {
        _log.log();
        throw new _errors.CommandError((0, _chalk().default)`The dependency map {bold expo/bundledNativeModules.json} cannot be found, please ensure you have the package "{bold expo}" installed in your project.`);
    }
    return await _jsonFile().default.readAsync(bundledNativeModulesPath);
}

//# sourceMappingURL=bundledNativeModules.js.map