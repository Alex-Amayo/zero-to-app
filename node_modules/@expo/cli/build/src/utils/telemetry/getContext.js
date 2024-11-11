"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getContext", {
    enumerable: true,
    get: ()=>getContext
});
function _ciInfo() {
    const data = /*#__PURE__*/ _interopRequireWildcard(require("ci-info"));
    _ciInfo = function() {
        return data;
    };
    return data;
}
function _os() {
    const data = /*#__PURE__*/ _interopRequireDefault(require("os"));
    _os = function() {
        return data;
    };
    return data;
}
const _array = require("../array");
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
function getContext() {
    return {
        os: {
            name: _os().default.platform(),
            version: _os().default.release()
        },
        device: {
            arch: _os().default.arch(),
            version: _os().default.version(),
            memory: summarizeMemory()
        },
        cpu: summarizeCpuInfo(),
        app: {
            name: "expo/cli",
            version: "0.18.30"
        },
        ci: _ciInfo().isCI ? {
            name: _ciInfo().name,
            isPr: _ciInfo().isPR
        } : undefined
    };
}
function summarizeMemory() {
    const gb = _os().default.totalmem() / 1024 / 1024 / 1024;
    return Math.round(gb * 100) / 100;
}
function summarizeCpuInfo() {
    var ref;
    const cpus = (0, _array.groupBy)((ref = _os().default.cpus()) != null ? ref : [], (item)=>item.model);
    const summary = {
        model: "",
        speed: 0,
        count: 0
    };
    for(const key in cpus){
        if (cpus[key].length > summary.count) {
            summary.model = key;
            summary.speed = cpus[key][0].speed;
            summary.count = cpus[key].length;
        }
    }
    return !summary.model || !summary.count ? undefined : summary;
}

//# sourceMappingURL=getContext.js.map