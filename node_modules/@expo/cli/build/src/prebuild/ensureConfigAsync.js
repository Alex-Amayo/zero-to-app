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
    ensureConfigExistsAsync: ()=>ensureConfigExistsAsync,
    ensureConfigAsync: ()=>ensureConfigAsync
});
function _config() {
    const data = require("@expo/config");
    _config = function() {
        return data;
    };
    return data;
}
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
const _log = /*#__PURE__*/ _interopRequireWildcard(require("../log"));
const _errors = require("../utils/errors");
const _getOrPromptApplicationId = require("../utils/getOrPromptApplicationId");
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
async function ensureConfigExistsAsync(projectRoot) {
    try {
        const config = (0, _config().getConfig)(projectRoot, {
            skipSDKVersionRequirement: false
        });
        // If no config exists in the file system then we should generate one so the process doesn't fail.
        if (!config.dynamicConfigPath && !config.staticConfigPath) {
            // Remove the internal object before writing.
            delete config.exp._internal;
            // Write the generated config.
            await _jsonFile().default.writeAsync(_path().default.join(projectRoot, "app.json"), {
                expo: config.exp
            }, {
                json5: false
            });
        }
    } catch (error) {
        // TODO(Bacon): Currently this is already handled in the command
        _log.log();
        throw new _errors.CommandError(`${error.message}\n`);
    }
}
async function ensureConfigAsync(projectRoot, { platforms  }) {
    await ensureConfigExistsAsync(projectRoot);
    // Prompt for the Android package first because it's more strict than the bundle identifier
    // this means you'll have a better chance at matching the bundle identifier with the package name.
    if (platforms.includes("android")) {
        await (0, _getOrPromptApplicationId.getOrPromptForPackage)(projectRoot);
    }
    if (platforms.includes("ios")) {
        await (0, _getOrPromptApplicationId.getOrPromptForBundleIdentifier)(projectRoot);
    }
    // Read config again because prompting for bundle id or package name may have mutated the results.
    return (0, _config().getConfig)(projectRoot);
}

//# sourceMappingURL=ensureConfigAsync.js.map