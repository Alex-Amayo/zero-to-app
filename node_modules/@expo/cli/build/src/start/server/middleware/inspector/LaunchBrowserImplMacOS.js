"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, /**
 * Browser implementation for macOS
 */ "default", {
    enumerable: true,
    get: ()=>LaunchBrowserImplMacOS
});
function _osascript() {
    const data = /*#__PURE__*/ _interopRequireWildcard(require("@expo/osascript"));
    _osascript = function() {
        return data;
    };
    return data;
}
function _childProcess() {
    const data = require("child_process");
    _childProcess = function() {
        return data;
    };
    return data;
}
function _glob() {
    const data = require("glob");
    _glob = function() {
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
const _launchBrowserTypes = require("./LaunchBrowser.types");
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
class LaunchBrowserImplMacOS {
    MAP = {
        [_launchBrowserTypes.LaunchBrowserTypesEnum.CHROME]: "google chrome",
        [_launchBrowserTypes.LaunchBrowserTypesEnum.EDGE]: "microsoft edge",
        [_launchBrowserTypes.LaunchBrowserTypesEnum.BRAVE]: "brave browser"
    };
    async isSupportedBrowser(browserType) {
        let result = false;
        try {
            await _osascript().execAsync(`id of application "${this.MAP[browserType]}"`);
            result = true;
        } catch  {
            result = false;
        }
        return result;
    }
    async createTempBrowserDir(baseDirName) {
        return _path().default.join(require("temp-dir"), baseDirName);
    }
    async launchAsync(browserType, args) {
        var ref;
        const appDirectory = await _osascript().execAsync(`POSIX path of (path to application "${this.MAP[browserType]}")`);
        const appPath = (ref = (0, _glob().sync)("Contents/MacOS/*", {
            cwd: appDirectory.trim(),
            absolute: true
        })) == null ? void 0 : ref[0];
        if (!appPath) {
            throw new Error(`Cannot find application path from ${appDirectory}Contents/MacOS`);
        }
        this._process = (0, _childProcess().spawn)(appPath, args, {
            stdio: "ignore"
        });
        return this;
    }
    async close() {
        var ref;
        (ref = this._process) == null ? void 0 : ref.kill();
        this._process = undefined;
    }
}

//# sourceMappingURL=LaunchBrowserImplMacOS.js.map