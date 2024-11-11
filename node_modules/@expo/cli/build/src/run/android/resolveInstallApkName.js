"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "resolveInstallApkNameAsync", {
    enumerable: true,
    get: ()=>resolveInstallApkNameAsync
});
function _fs() {
    const data = /*#__PURE__*/ _interopRequireDefault(require("fs"));
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
const _adb = require("../../start/platforms/android/adb");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const debug = require("debug")("expo:run:android:resolveInstallApkName");
async function resolveInstallApkNameAsync(device, { appName , buildType , flavors , apkVariantDirectory  }) {
    const availableCPUs = await (0, _adb.getDeviceABIsAsync)(device);
    availableCPUs.push(_adb.DeviceABI.universal);
    debug("Supported ABIs: " + availableCPUs.join(", "));
    debug("Searching for APK: " + apkVariantDirectory);
    // Check for cpu specific builds first
    for (const availableCPU of availableCPUs){
        const apkName = getApkFileName(appName, buildType, flavors, availableCPU);
        const apkPath = _path().default.join(apkVariantDirectory, apkName);
        debug("Checking for APK at:", apkPath);
        if (_fs().default.existsSync(apkPath)) {
            return apkName;
        }
    }
    // Otherwise use the default apk named after the variant: app-debug.apk
    const apkName1 = getApkFileName(appName, buildType, flavors);
    const apkPath1 = _path().default.join(apkVariantDirectory, apkName1);
    debug("Checking for fallback APK at:", apkPath1);
    if (_fs().default.existsSync(apkPath1)) {
        return apkName1;
    }
    return null;
}
function getApkFileName(appName, buildType, flavors, cpuArch) {
    let apkName = `${appName}-`;
    if (flavors) {
        apkName += flavors.reduce((rest, flavor)=>`${rest}${flavor}-`, "");
    }
    if (cpuArch) {
        apkName += `${cpuArch}-`;
    }
    apkName += `${buildType}.apk`;
    return apkName;
}

//# sourceMappingURL=resolveInstallApkName.js.map