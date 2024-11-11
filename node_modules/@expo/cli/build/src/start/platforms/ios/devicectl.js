/**
 * Copyright © 2024 650 Industries.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ "use strict";
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
    devicectlAsync: ()=>devicectlAsync,
    getConnectedAppleDevicesAsync: ()=>getConnectedAppleDevicesAsync,
    launchBinaryOnMacAsync: ()=>launchBinaryOnMacAsync,
    launchAppWithDeviceCtl: ()=>launchAppWithDeviceCtl,
    hasDevicectlEverBeenInstalled: ()=>hasDevicectlEverBeenInstalled,
    installAndLaunchAppAsync: ()=>installAndLaunchAppAsync
});
function _getUserState() {
    const data = require("@expo/config/build/getUserState");
    _getUserState = function() {
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
function _childProcess() {
    const data = require("child_process");
    _childProcess = function() {
        return data;
    };
    return data;
}
function _fs() {
    const data = /*#__PURE__*/ _interopRequireDefault(require("fs"));
    _fs = function() {
        return data;
    };
    return data;
}
function _nodeAssert() {
    const data = /*#__PURE__*/ _interopRequireDefault(require("node:assert"));
    _nodeAssert = function() {
        return data;
    };
    return data;
}
function _os() {
    const data = require("os");
    _os = function() {
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
function _tempy() {
    const data = /*#__PURE__*/ _interopRequireDefault(require("tempy"));
    _tempy = function() {
        return data;
    };
    return data;
}
const _xcrun = require("./xcrun");
const _log = /*#__PURE__*/ _interopRequireWildcard(require("../../../log"));
const _errors = require("../../../utils/errors");
const _exit = require("../../../utils/exit");
const _interactive = require("../../../utils/interactive");
const _ora = require("../../../utils/ora");
const _prompts = require("../../../utils/prompts");
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
const DEVICE_CTL_EXISTS_PATH = _path().default.join((0, _getUserState().getExpoHomeDirectory)(), "devicectl-exists");
const debug = require("debug")("expo:devicectl");
async function devicectlAsync(args, options) {
    try {
        return await (0, _xcrun.xcrunAsync)([
            "devicectl",
            ...args
        ], options);
    } catch (error) {
        if (error instanceof _errors.CommandError) {
            throw error;
        }
        if ("stderr" in error) {
            const errorCodes = getDeviceCtlErrorCodes(error.stderr);
            if (errorCodes.includes("Locked")) {
                throw new _errors.CommandError("APPLE_DEVICE_LOCKED", "Device is locked, unlock and try again.");
            }
        }
        throw error;
    }
}
async function getConnectedAppleDevicesAsync() {
    var ref, ref1;
    if (!hasDevicectlEverBeenInstalled()) {
        debug("devicectl not found, skipping remote Apple devices.");
        return [];
    }
    const tmpPath = _tempy().default.file();
    const devices = await devicectlAsync([
        "list",
        "devices",
        "--json-output",
        tmpPath,
        // Give two seconds before timing out: between 5 and 9223372036854775807
        "--timeout",
        "5", 
    ]);
    debug(devices.stdout);
    const devicesJson = await _jsonFile().default.readAsync(tmpPath);
    if (((ref = devicesJson) == null ? void 0 : (ref1 = ref.info) == null ? void 0 : ref1.jsonVersion) !== 2) {
        _log.warn("Unexpected devicectl JSON version output from devicectl. Connecting to physical Apple devices may not work as expected.");
    }
    assertDevicesJson(devicesJson);
    return devicesJson.result.devices;
}
function assertDevicesJson(results) {
    var ref;
    (0, _nodeAssert().default)(results != null && "result" in results && Array.isArray(results == null ? void 0 : (ref = results.result) == null ? void 0 : ref.devices), "Malformed JSON output from devicectl: " + JSON.stringify(results, null, 2));
}
async function launchBinaryOnMacAsync(bundleId, appBinaryPath) {
    const args = [
        "-b",
        bundleId,
        appBinaryPath
    ];
    try {
        await (0, _spawnAsync().default)("open", args);
    } catch (error) {
        if ("code" in error) {
            if (error.code === 1) {
                throw new _errors.CommandError("MACOS_LAUNCH", "Failed to launch the compatible binary on macOS: open " + args.join(" ") + "\n\n" + error.message);
            }
        }
        throw error;
    }
}
async function installAppWithDeviceCtlAsync(uuid, bundleIdOrAppPath, onProgress) {
    // 𝝠 xcrun devicectl device install app --device 00001110-001111110110101A /Users/evanbacon/Library/Developer/Xcode/DerivedData/Router-hgbqaxzhrhkiftfweydvhgttadvn/Build/Products/Debug-iphoneos/Router.app --verbose
    return new Promise((resolve, reject)=>{
        const args = [
            "devicectl",
            "device",
            "install",
            "app",
            "--device",
            uuid,
            bundleIdOrAppPath, 
        ];
        const childProcess = (0, _childProcess().spawn)("xcrun", args);
        debug("xcrun " + args.join(" "));
        let currentProgress = 0;
        let hasStarted = false;
        function updateProgress(progress) {
            hasStarted = true;
            if (progress <= currentProgress) {
                return;
            }
            currentProgress = progress;
            onProgress({
                progress,
                isComplete: progress === 100,
                status: "Installing"
            });
        }
        childProcess.stdout.on("data", (data)=>{
            // Sometimes more than one chunk comes at a time, here we split by system newline,
            // then trim and filter.
            const strings = data.toString().split(_os().EOL).map((value)=>value.trim());
            strings.forEach((str)=>{
                // Match the progress percentage:
                // - '34%... 35%...' -> 34
                // - '31%...' -> 31
                // - 'Complete!' -> 100
                const match = str.match(/(\d+)%\.\.\./);
                if (match) {
                    updateProgress(parseInt(match[1], 10));
                } else if (hasStarted) {
                    updateProgress(100);
                }
            });
            debug("[stdout]:", strings);
        });
        childProcess.on("close", (code)=>{
            debug("[close]: " + code);
            if (code === 0) {
                resolve();
            } else {
                const stderr = childProcess.stderr.read();
                const err = new Error(stderr);
                err.code = code;
                detach(err);
            }
        });
        const detach = async (err)=>{
            off == null ? void 0 : off();
            if (childProcess) {
                return new Promise((resolve)=>{
                    childProcess == null ? void 0 : childProcess.on("close", resolve);
                    childProcess == null ? void 0 : childProcess.kill();
                    // childProcess = null;
                    reject(err != null ? err : new _errors.CommandError("detached"));
                });
            }
        };
        const off = (0, _exit.installExitHooks)(()=>detach());
    });
}
async function launchAppWithDeviceCtl(deviceId, bundleId) {
    await devicectlAsync([
        "device",
        "process",
        "launch",
        "--device",
        deviceId,
        bundleId
    ]);
}
/** Find all error codes from the output log */ function getDeviceCtlErrorCodes(log) {
    return [
        ...log.matchAll(/BSErrorCodeDescription\s+=\s+(.*)$/gim)
    ].map(([_line, code])=>code);
}
let hasEverBeenInstalled;
function hasDevicectlEverBeenInstalled() {
    if (hasEverBeenInstalled) return hasEverBeenInstalled;
    // It doesn't appear possible for devicectl to ever be uninstalled. We can just check once and store this result forever
    // to prevent cold boots of devicectl from slowing down all invocations of `expo run ios`
    if (_fs().default.existsSync(DEVICE_CTL_EXISTS_PATH)) {
        hasEverBeenInstalled = true;
        return true;
    }
    const isInstalled = isDevicectlInstalled();
    if (isInstalled) {
        _fs().default.writeFileSync(DEVICE_CTL_EXISTS_PATH, "1");
    }
    hasEverBeenInstalled = isInstalled;
    return isInstalled;
}
function isDevicectlInstalled() {
    try {
        (0, _childProcess().execSync)("xcrun devicectl --version", {
            stdio: "ignore"
        });
        return true;
    } catch  {
        return false;
    }
}
async function installAndLaunchAppAsync(props) {
    debug("Running on device:", props);
    const { bundle , bundleIdentifier , udid , deviceName  } = props;
    let indicator;
    try {
        if (!indicator) {
            indicator = (0, _ora.ora)(`Connecting to: ${props.deviceName}`).start();
        }
        await installAppWithDeviceCtlAsync(udid, bundle, ({ status , isComplete , progress  })=>{
            if (!indicator) {
                indicator = (0, _ora.ora)(status).start();
            }
            indicator.text = `${_chalk().default.bold(status)} ${progress}%`;
            if (isComplete) {
                indicator.succeed();
            }
        });
    } catch (error) {
        if (indicator) {
            indicator.fail();
        }
        throw error;
    }
    async function launchAppOptionally() {
        try {
            await launchAppWithDeviceCtl(udid, bundleIdentifier);
        } catch (error) {
            if (indicator) {
                indicator.fail();
            }
            if (error.code === "APPLE_DEVICE_LOCKED") {
                var ref;
                // Get the app name from the binary path.
                const appName = (ref = _path().default.basename(bundle).split(".")[0]) != null ? ref : "app";
                if ((0, _interactive.isInteractive)() && await (0, _prompts.confirmAsync)({
                    message: `Cannot launch ${appName} because the device is locked. Unlock ${deviceName} to continue...`,
                    initial: true
                })) {
                    return launchAppOptionally();
                }
                throw new _errors.CommandError(`Cannot launch ${appName} on ${deviceName} because the device is locked.`);
            }
            throw error;
        }
    }
    await launchAppOptionally();
}

//# sourceMappingURL=devicectl.js.map