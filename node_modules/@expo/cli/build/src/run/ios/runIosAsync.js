"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "runIosAsync", {
    enumerable: true,
    get: ()=>runIosAsync
});
function _chalk() {
    const data = /*#__PURE__*/ _interopRequireDefault(require("chalk"));
    _chalk = function() {
        return data;
    };
    return data;
}
const _xcodeBuild = /*#__PURE__*/ _interopRequireWildcard(require("./XcodeBuild"));
const _launchApp = require("./launchApp");
const _resolveOptions = require("./options/resolveOptions");
const _log = /*#__PURE__*/ _interopRequireWildcard(require("../../log"));
const _cocoapods = require("../../utils/cocoapods");
const _nodeEnv = require("../../utils/nodeEnv");
const _port = require("../../utils/port");
const _profile = require("../../utils/profile");
const _scheme = require("../../utils/scheme");
const _ensureNativeProject = require("../ensureNativeProject");
const _hints = require("../hints");
const _startBundler = require("../startBundler");
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
const debug = require("debug")("expo:run:ios");
async function runIosAsync(projectRoot, options) {
    var ref;
    (0, _nodeEnv.setNodeEnv)(options.configuration === "Release" ? "production" : "development");
    require("@expo/env").load(projectRoot);
    assertPlatform();
    const install = !!options.install;
    if (await (0, _ensureNativeProject.ensureNativeProjectAsync)(projectRoot, {
        platform: "ios",
        install
    }) && install) {
        await (0, _cocoapods.maybePromptToSyncPodsAsync)(projectRoot);
    }
    // Resolve the CLI arguments into useable options.
    const props = await (0, _resolveOptions.resolveOptionsAsync)(projectRoot, options);
    // Spawn the `xcodebuild` process to create the app binary.
    const buildOutput = await _xcodeBuild.buildAsync(props);
    // Find the path to the built app binary, this will be used to install the binary
    // on a device.
    const binaryPath = await (0, _profile.profile)(_xcodeBuild.getAppBinaryPath)(buildOutput);
    debug("Binary path:", binaryPath);
    // Ensure the port hasn't become busy during the build.
    if (props.shouldStartBundler && !await (0, _port.ensurePortAvailabilityAsync)(projectRoot, props)) {
        props.shouldStartBundler = false;
    }
    // Start the dev server which creates all of the required info for
    // launching the app on a simulator.
    const manager = await (0, _startBundler.startBundlerAsync)(projectRoot, {
        port: props.port,
        headless: !props.shouldStartBundler,
        // If a scheme is specified then use that instead of the package name.
        scheme: (ref = await (0, _scheme.getSchemesForIosAsync)(projectRoot)) == null ? void 0 : ref[0]
    });
    // Install and launch the app binary on a device.
    await (0, _launchApp.launchAppAsync)(binaryPath, manager, {
        isSimulator: props.isSimulator,
        device: props.device,
        shouldStartBundler: props.shouldStartBundler
    });
    // Log the location of the JS logs for the device.
    if (props.shouldStartBundler) {
        (0, _hints.logProjectLogsLocation)();
    } else {
        await manager.stopAsync();
    }
}
function assertPlatform() {
    if (process.platform !== "darwin") {
        _log.exit((0, _chalk().default)`iOS apps can only be built on macOS devices. Use {cyan eas build -p ios} to build in the cloud.`);
    }
}

//# sourceMappingURL=runIosAsync.js.map