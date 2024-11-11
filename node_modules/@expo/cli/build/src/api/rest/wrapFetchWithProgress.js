"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "wrapFetchWithProgress", {
    enumerable: true,
    get: ()=>wrapFetchWithProgress
});
const _log = /*#__PURE__*/ _interopRequireWildcard(require("../../log"));
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
const debug = require("debug")("expo:api:fetch:progress");
function wrapFetchWithProgress(fetch) {
    return (url, init)=>{
        return fetch(url, init).then((res)=>{
            if (res.ok && (init == null ? void 0 : init.onProgress)) {
                const totalDownloadSize = res.headers.get("Content-Length");
                const total = Number(totalDownloadSize);
                debug(`Download size: ${totalDownloadSize}`);
                if (!totalDownloadSize || isNaN(total) || total < 0) {
                    _log.warn('Progress callback not supported for network request because "Content-Length" header missing or invalid in response from URL:', url.toString());
                    return res;
                }
                let length = 0;
                debug(`Starting progress animation for ${url}`);
                res.body.on("data", (chunk)=>{
                    length += Buffer.byteLength(chunk);
                    onProgress();
                });
                res.body.on("end", ()=>{
                    debug(`Finished progress animation for ${url}`);
                    onProgress();
                });
                const onProgress = ()=>{
                    const progress = length / total || 0;
                    init.onProgress == null ? void 0 : init.onProgress({
                        progress,
                        total,
                        loaded: length
                    });
                };
            }
            return res;
        });
    };
}

//# sourceMappingURL=wrapFetchWithProgress.js.map