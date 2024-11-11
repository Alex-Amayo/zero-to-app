"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "applyPluginsAsync", {
    enumerable: true,
    get: ()=>applyPluginsAsync
});
function _config() {
    const data = require("@expo/config");
    _config = function() {
        return data;
    };
    return data;
}
const _log = /*#__PURE__*/ _interopRequireWildcard(require("../log"));
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
async function applyPluginsAsync(projectRoot, packages) {
    const { autoAddConfigPluginsAsync  } = await Promise.resolve().then(()=>/*#__PURE__*/ _interopRequireWildcard(require("./utils/autoAddConfigPlugins.js")));
    try {
        const { exp  } = (0, _config().getConfig)(projectRoot, {
            skipSDKVersionRequirement: true
        });
        // Only auto add plugins if the plugins array is defined or if the project is using SDK +42.
        await autoAddConfigPluginsAsync(projectRoot, exp, // Split any possible NPM tags. i.e. `expo@latest` -> `expo`
        packages.map((pkg)=>pkg.split("@")[0]).filter(Boolean));
    } catch (error) {
        // If we fail to apply plugins, the log a warning and continue.
        if (error.isPluginError) {
            _log.warn(`Skipping config plugin check: ` + error.message);
            return;
        }
        // Any other error, rethrow.
        throw error;
    }
}

//# sourceMappingURL=applyPlugins.js.map