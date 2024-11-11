"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "resolveOptionsAsync", {
    enumerable: true,
    get: ()=>resolveOptionsAsync
});
const _resolveDevice = require("./resolveDevice");
const _resolveGradlePropsAsync = require("./resolveGradlePropsAsync");
const _resolveLaunchProps = require("./resolveLaunchProps");
const _resolveBundlerProps = require("../resolveBundlerProps");
async function resolveOptionsAsync(projectRoot, options) {
    // Resolve the device before the gradle props because we need the device to be running to get the ABI.
    const device = await (0, _resolveDevice.resolveDeviceAsync)(options.device);
    var _variant;
    return {
        ...await (0, _resolveBundlerProps.resolveBundlerPropsAsync)(projectRoot, options),
        ...await (0, _resolveGradlePropsAsync.resolveGradlePropsAsync)(projectRoot, options, device.device),
        ...await (0, _resolveLaunchProps.resolveLaunchPropsAsync)(projectRoot),
        variant: (_variant = options.variant) != null ? _variant : "debug",
        // Resolve the device based on the provided device id or prompt
        // from a list of devices (connected or simulated) that are filtered by the scheme.
        device,
        buildCache: !!options.buildCache,
        install: !!options.install
    };
}

//# sourceMappingURL=resolveOptions.js.map