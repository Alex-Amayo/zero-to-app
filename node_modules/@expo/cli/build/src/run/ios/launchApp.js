"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "launchAppAsync", {
    enumerable: true,
    get: ()=>launchAppAsync
});
function _chalk() {
    const data = /*#__PURE__*/ _interopRequireDefault(require("chalk"));
    _chalk = function() {
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
const _xcodeBuild = /*#__PURE__*/ _interopRequireWildcard(require("./XcodeBuild"));
const _installOnDeviceAsync = require("./appleDevice/installOnDeviceAsync");
const _appleDeviceManager = require("../../start/platforms/ios/AppleDeviceManager");
const _devicectl = require("../../start/platforms/ios/devicectl");
const _simctlLogging = require("../../start/platforms/ios/simctlLogging");
const _plist = require("../../utils/plist");
const _profile = require("../../utils/profile");
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
async function launchAppAsync(binaryPath, manager, props) {
    const appId = await (0, _profile.profile)(getBundleIdentifierForBinaryAsync)(binaryPath);
    if (!props.isSimulator) {
        if (props.device.osType === "macOS") {
            await (0, _devicectl.launchBinaryOnMacAsync)(appId, binaryPath);
        } else {
            await (0, _profile.profile)(_installOnDeviceAsync.installOnDeviceAsync)({
                bundleIdentifier: appId,
                bundle: binaryPath,
                appDeltaDirectory: (0, _installOnDeviceAsync.getAppDeltaDirectory)(appId),
                udid: props.device.udid,
                deviceName: props.device.name
            });
        }
        return;
    }
    _xcodeBuild.logPrettyItem((0, _chalk().default)`{bold Installing} on ${props.device.name}`);
    const device = await _appleDeviceManager.AppleDeviceManager.resolveAsync({
        device: props.device
    });
    await device.installAppAsync(binaryPath);
    _xcodeBuild.logPrettyItem((0, _chalk().default)`{bold Opening} on ${device.name} {dim (${appId})}`);
    if (props.shouldStartBundler) {
        await _simctlLogging.SimulatorLogStreamer.getStreamer(device.device, {
            appId
        }).attachAsync();
    }
    await manager.getDefaultDevServer().openCustomRuntimeAsync("simulator", {
        applicationId: appId
    }, {
        device
    });
}
async function getBundleIdentifierForBinaryAsync(binaryPath) {
    const builtInfoPlistPath = _path().default.join(binaryPath, "Info.plist");
    const { CFBundleIdentifier  } = await (0, _plist.parsePlistAsync)(builtInfoPlistPath);
    return CFBundleIdentifier;
}

//# sourceMappingURL=launchApp.js.map