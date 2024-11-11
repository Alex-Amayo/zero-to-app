"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AndroidAppIdResolver", {
    enumerable: true,
    get: ()=>AndroidAppIdResolver
});
function _configPlugins() {
    const data = require("@expo/config-plugins");
    _configPlugins = function() {
        return data;
    };
    return data;
}
const _appIdResolver = require("../AppIdResolver");
const debug = require("debug")("expo:start:platforms:android:AndroidAppIdResolver");
class AndroidAppIdResolver extends _appIdResolver.AppIdResolver {
    constructor(projectRoot){
        super(projectRoot, "android", "android.package");
    }
    async hasNativeProjectAsync() {
        try {
            await _configPlugins().AndroidConfig.Paths.getProjectPathOrThrowAsync(this.projectRoot);
            return true;
        } catch (error) {
            debug("Expected error checking for native project:", error.message);
            return false;
        }
    }
    async resolveAppIdFromNativeAsync() {
        const applicationIdFromGradle = await _configPlugins().AndroidConfig.Package.getApplicationIdAsync(this.projectRoot).catch(()=>null);
        if (applicationIdFromGradle) {
            return applicationIdFromGradle;
        }
        try {
            var ref, ref1;
            const filePath = await _configPlugins().AndroidConfig.Paths.getAndroidManifestAsync(this.projectRoot);
            const androidManifest = await _configPlugins().AndroidConfig.Manifest.readAndroidManifestAsync(filePath);
            // Assert MainActivity defined.
            await _configPlugins().AndroidConfig.Manifest.getMainActivityOrThrow(androidManifest);
            if ((ref = androidManifest.manifest) == null ? void 0 : (ref1 = ref.$) == null ? void 0 : ref1.package) {
                return androidManifest.manifest.$.package;
            }
        } catch (error) {
            debug("Expected error resolving the package name from the AndroidManifest.xml:", error);
        }
        return null;
    }
}

//# sourceMappingURL=AndroidAppIdResolver.js.map