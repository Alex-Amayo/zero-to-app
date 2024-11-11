"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AndroidPlatformManager", {
    enumerable: true,
    get: ()=>AndroidPlatformManager
});
const _androidAppIdResolver = require("./AndroidAppIdResolver");
const _androidDeviceManager = require("./AndroidDeviceManager");
const _adbReverse = require("./adbReverse");
const _platformManager = require("../PlatformManager");
class AndroidPlatformManager extends _platformManager.PlatformManager {
    constructor(projectRoot, port, options){
        super(projectRoot, {
            platform: "android",
            ...options,
            resolveDeviceAsync: _androidDeviceManager.AndroidDeviceManager.resolveAsync
        });
        this.projectRoot = projectRoot;
        this.port = port;
    }
    async openAsync(options, resolveSettings) {
        await (0, _adbReverse.startAdbReverseAsync)([
            this.port
        ]);
        return super.openAsync(options, resolveSettings);
    }
    _getAppIdResolver() {
        return new _androidAppIdResolver.AndroidAppIdResolver(this.projectRoot);
    }
    _resolveAlternativeLaunchUrl(applicationId, props) {
        var ref;
        return (ref = props == null ? void 0 : props.launchActivity) != null ? ref : `${applicationId}/.MainActivity`;
    }
}

//# sourceMappingURL=AndroidPlatformManager.js.map