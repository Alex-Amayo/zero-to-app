"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "installExpoPackageAsync", {
    enumerable: true,
    get: ()=>installExpoPackageAsync
});
function _spawnAsync() {
    const data = /*#__PURE__*/ _interopRequireDefault(require("@expo/spawn-async"));
    _spawnAsync = function() {
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
const _log = /*#__PURE__*/ _interopRequireWildcard(require("../log"));
const _getRunningProcess = require("../utils/getRunningProcess");
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
async function installExpoPackageAsync(projectRoot, { packageManager , packageManagerArguments , expoPackageToInstall , followUpCommandArgs  }) {
    // Check if there's potentially a dev server running in the current folder and warn about it
    // (not guaranteed to be Expo CLI, and the CLI isn't always running on 8081, but it's a good guess)
    const isExpoMaybeRunningForProject = !!await (0, _getRunningProcess.getRunningProcess)(8081);
    if (isExpoMaybeRunningForProject) {
        _log.warn("The Expo CLI appears to be running this project in another terminal window. Close and restart any Expo CLI instances after the installation to complete the update.");
    }
    // Safe to use current process to upgrade Expo package- doesn't affect current process
    try {
        await packageManager.addAsync([
            ...packageManagerArguments,
            expoPackageToInstall
        ]);
    } catch (error) {
        _log.error((0, _chalk().default)`Cannot install the latest Expo package. Install {bold expo@latest} with ${packageManager.name} and then run {bold npx expo install} again.`);
        throw error;
    }
    _log.log((0, _chalk().default)`\u203A Running {bold npx expo install} under the updated expo version`);
    let commandSegments = [
        "expo",
        "install",
        ...followUpCommandArgs
    ];
    if (packageManagerArguments.length) {
        commandSegments = [
            ...commandSegments,
            "--",
            ...packageManagerArguments
        ];
    }
    _log.log("> " + commandSegments.join(" "));
    // Spawn a new process to install the rest of the packages, as only then will the latest Expo package be used
    if (followUpCommandArgs.length) {
        await (0, _spawnAsync().default)("npx", commandSegments, {
            stdio: "inherit",
            cwd: projectRoot,
            env: {
                ...process.env
            }
        });
    }
}

//# sourceMappingURL=installExpoPackage.js.map