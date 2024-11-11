"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "exportAsync", {
    enumerable: true,
    get: ()=>exportAsync
});
function _path() {
    const data = /*#__PURE__*/ _interopRequireDefault(require("path"));
    _path = function() {
        return data;
    };
    return data;
}
const _exportApp = require("./exportApp");
const _log = /*#__PURE__*/ _interopRequireWildcard(require("../log"));
const _attachAtlas = require("../start/server/metro/debugging/attachAtlas");
const _fileNotifier = require("../utils/FileNotifier");
const _dir = require("../utils/dir");
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
async function exportAsync(projectRoot, options) {
    // Ensure the output directory is created
    const outputPath = _path().default.resolve(projectRoot, options.outputDir);
    // Delete the output directory if it exists
    await (0, _dir.removeAsync)(outputPath);
    // Create the output directory
    await (0, _dir.ensureDirectoryAsync)(outputPath);
    // Export the app
    await (0, _exportApp.exportAppAsync)(projectRoot, options);
    // Stop any file watchers to prevent the CLI from hanging.
    _fileNotifier.FileNotifier.stopAll();
    // Wait until Atlas is ready, when enabled
    // NOTE(cedric): this is a workaround, remove when `process.exit` is removed
    await (0, _attachAtlas.waitUntilAtlasExportIsReadyAsync)(projectRoot);
    // Final notes
    _log.log(`App exported to: ${options.outputDir}`);
    // Exit the process to stop any hanging processes from reading the app.config.js or server rendering.
    process.exit(0);
}

//# sourceMappingURL=exportAsync.js.map