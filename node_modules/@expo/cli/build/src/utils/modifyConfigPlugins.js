"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "attemptAddingPluginsAsync", {
    enumerable: true,
    get: ()=>attemptAddingPluginsAsync
});
function _config() {
    const data = require("@expo/config");
    _config = function() {
        return data;
    };
    return data;
}
const _modifyConfigAsync = require("./modifyConfigAsync");
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
async function attemptAddingPluginsAsync(projectRoot, exp, plugins) {
    if (!plugins.length) return;
    const edits = {
        plugins: [
            ...new Set((exp.plugins || []).concat(plugins))
        ]
    };
    const modification = await (0, _config().modifyConfigAsync)(projectRoot, edits, {
        skipSDKVersionRequirement: true,
        skipPlugins: true
    });
    if (modification.type === "success") {
        _log.log(`\u203A Added config plugin${plugins.length === 1 ? "" : "s"}: ${plugins.join(", ")}`);
    } else {
        const exactEdits = {
            plugins
        };
        (0, _modifyConfigAsync.warnAboutConfigAndThrow)(modification.type, modification.message, exactEdits);
    }
}

//# sourceMappingURL=modifyConfigPlugins.js.map