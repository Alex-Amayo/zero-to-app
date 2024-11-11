"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "FileNotifier", {
    enumerable: true,
    get: ()=>FileNotifier
});
function _chalk() {
    const data = /*#__PURE__*/ _interopRequireDefault(require("chalk"));
    _chalk = function() {
        return data;
    };
    return data;
}
function _fs() {
    const data = require("fs");
    _fs = function() {
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
const _fn = require("./fn");
const _log = /*#__PURE__*/ _interopRequireWildcard(require("../log"));
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
const debug = require("debug")("expo:utils:fileNotifier");
class FileNotifier {
    static instances = [];
    static stopAll() {
        for (const instance of FileNotifier.instances){
            instance.stopObserving();
        }
    }
    constructor(projectRoot, moduleIds, settings = {}){
        this.projectRoot = projectRoot;
        this.moduleIds = moduleIds;
        this.settings = settings;
        this.unsubscribe = null;
        this.watchFile = (0, _fn.memoize)(this.startWatchingFile.bind(this));
        FileNotifier.instances.push(this);
    }
    /** Get the file in the project. */ resolveFilePath() {
        for (const moduleId of this.moduleIds){
            const filePath = _resolveFrom().default.silent(this.projectRoot, moduleId);
            if (filePath) {
                return filePath;
            }
        }
        return null;
    }
    startObserving(callback) {
        const configPath = this.resolveFilePath();
        if (configPath) {
            debug(`Observing ${configPath}`);
            return this.watchFile(configPath, callback);
        }
        return configPath;
    }
    stopObserving() {
        var _obj, ref;
        (ref = (_obj = this).unsubscribe) == null ? void 0 : ref.call(_obj);
    }
    startWatchingFile(filePath, callback) {
        const configName = _path().default.relative(this.projectRoot, filePath);
        const listener = (cur, prev)=>{
            if (prev.size || cur.size) {
                _log.log(`\u203A Detected a change in ${_chalk().default.bold(configName)}. Restart the server to see the new results.` + (this.settings.additionalWarning || ""));
            }
        };
        const watcher = (0, _fs().watchFile)(filePath, callback != null ? callback : listener);
        this.unsubscribe = ()=>{
            watcher.unref();
        };
        return filePath;
    }
}

//# sourceMappingURL=FileNotifier.js.map