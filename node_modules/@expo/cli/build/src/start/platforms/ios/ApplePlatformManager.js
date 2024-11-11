"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ApplePlatformManager", {
    enumerable: true,
    get: ()=>ApplePlatformManager
});
const _appleAppIdResolver = require("./AppleAppIdResolver");
const _appleDeviceManager = require("./AppleDeviceManager");
const _platformManager = require("../PlatformManager");
class ApplePlatformManager extends _platformManager.PlatformManager {
    constructor(projectRoot, port, options){
        super(projectRoot, {
            platform: "ios",
            ...options,
            resolveDeviceAsync: _appleDeviceManager.AppleDeviceManager.resolveAsync
        });
        this.projectRoot = projectRoot;
        this.port = port;
    }
    async openAsync(options, resolveSettings) {
        await _appleDeviceManager.AppleDeviceManager.assertSystemRequirementsAsync();
        return super.openAsync(options, resolveSettings);
    }
    _getAppIdResolver() {
        return new _appleAppIdResolver.AppleAppIdResolver(this.projectRoot);
    }
    _resolveAlternativeLaunchUrl(applicationId, props) {
        return applicationId;
    }
}

//# sourceMappingURL=ApplePlatformManager.js.map