"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "resolveDeviceAsync", {
    enumerable: true,
    get: ()=>resolveDeviceAsync
});
const _androidDeviceManager = require("../../start/platforms/android/AndroidDeviceManager");
const _hints = require("../hints");
const debug = require("debug")("expo:android:resolveDevice");
async function resolveDeviceAsync(device) {
    if (!device) {
        const manager = await _androidDeviceManager.AndroidDeviceManager.resolveAsync();
        debug(`Resolved default device (name: ${manager.device.name}, pid: ${manager.device.pid})`);
        return manager;
    }
    debug(`Resolving device from argument: ${device}`);
    const manager1 = device === true ? await _androidDeviceManager.AndroidDeviceManager.resolveAsync({
        shouldPrompt: true
    }) : await _androidDeviceManager.AndroidDeviceManager.resolveFromNameAsync(device);
    (0, _hints.logDeviceArgument)(manager1.device.name);
    return manager1;
}

//# sourceMappingURL=resolveDevice.js.map