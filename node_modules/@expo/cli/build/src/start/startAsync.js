"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "startAsync", {
    enumerable: true,
    get: ()=>startAsync
});
function _config() {
    const data = require("@expo/config");
    _config = function() {
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
const _simulatorAppPrerequisite = require("./doctor/apple/SimulatorAppPrerequisite");
const _xcodePrerequisite = require("./doctor/apple/XcodePrerequisite");
const _validateDependenciesVersions = require("./doctor/dependencies/validateDependenciesVersions");
const _webSupportProjectPrerequisite = require("./doctor/web/WebSupportProjectPrerequisite");
const _startInterface = require("./interface/startInterface");
const _resolveOptions = require("./resolveOptions");
const _devServerManager = require("./server/DevServerManager");
const _openPlatforms = require("./server/openPlatforms");
const _platformBundlers = require("./server/platformBundlers");
const _log = /*#__PURE__*/ _interopRequireWildcard(require("../log"));
const _getDevClientProperties = /*#__PURE__*/ _interopRequireDefault(require("../utils/analytics/getDevClientProperties"));
const _env = require("../utils/env");
const _exit = require("../utils/exit");
const _interactive = require("../utils/interactive");
const _nodeEnv = require("../utils/nodeEnv");
const _profile = require("../utils/profile");
const _telemetry = require("../utils/telemetry");
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
async function getMultiBundlerStartOptions(projectRoot, options, settings, platformBundlers) {
    var _privateKeyPath;
    const commonOptions = {
        mode: options.dev ? "development" : "production",
        devClient: options.devClient,
        privateKeyPath: (_privateKeyPath = options.privateKeyPath) != null ? _privateKeyPath : undefined,
        https: options.https,
        maxWorkers: options.maxWorkers,
        resetDevServer: options.clear,
        minify: options.minify,
        location: {
            hostType: options.host,
            scheme: options.scheme
        }
    };
    const multiBundlerSettings = await (0, _resolveOptions.resolvePortsAsync)(projectRoot, options, settings);
    const optionalBundlers = {
        ...platformBundlers
    };
    // In the default case, we don't want to start multiple bundlers since this is
    // a bit slower. Our priority (for legacy) is native platforms.
    if (!options.web) {
        delete optionalBundlers["web"];
    }
    const bundlers = [
        ...new Set(Object.values(optionalBundlers))
    ];
    const multiBundlerStartOptions = bundlers.map((bundler)=>{
        const port = bundler === "webpack" ? multiBundlerSettings.webpackPort : multiBundlerSettings.metroPort;
        return {
            type: bundler,
            options: {
                ...commonOptions,
                port
            }
        };
    });
    return [
        commonOptions,
        multiBundlerStartOptions
    ];
}
async function startAsync(projectRoot, options, settings) {
    var ref;
    _log.log(_chalk().default.gray(`Starting project at ${projectRoot}`));
    (0, _nodeEnv.setNodeEnv)(options.dev ? "development" : "production");
    require("@expo/env").load(projectRoot);
    const { exp , pkg  } = (0, _profile.profile)(_config().getConfig)(projectRoot);
    if (((ref = exp.platforms) == null ? void 0 : ref.includes("ios")) && process.platform !== "win32") {
        // If Xcode could potentially be used, then we should eagerly perform the
        // assertions since they can take a while on cold boots.
        (0, _xcodePrerequisite.getXcodeVersionAsync)({
            silent: true
        });
        _simulatorAppPrerequisite.SimulatorAppPrerequisite.instance.assertAsync().catch(()=>{
        // noop -- this will be thrown again when the user attempts to open the project.
        });
    }
    const platformBundlers = (0, _platformBundlers.getPlatformBundlers)(projectRoot, exp);
    const [defaultOptions, startOptions] = await getMultiBundlerStartOptions(projectRoot, options, settings, platformBundlers);
    const devServerManager = new _devServerManager.DevServerManager(projectRoot, defaultOptions);
    // Validations
    if (options.web || settings.webOnly) {
        await devServerManager.ensureProjectPrerequisiteAsync(_webSupportProjectPrerequisite.WebSupportProjectPrerequisite);
    }
    // Start the server as soon as possible.
    await (0, _profile.profile)(devServerManager.startAsync.bind(devServerManager))(startOptions);
    if (!settings.webOnly) {
        await devServerManager.watchEnvironmentVariables();
        // After the server starts, we can start attempting to bootstrap TypeScript.
        await devServerManager.bootstrapTypeScriptAsync();
    }
    if (!settings.webOnly && !options.devClient) {
        await (0, _profile.profile)(_validateDependenciesVersions.validateDependenciesVersionsAsync)(projectRoot, exp, pkg);
    }
    // Some tracking thing
    if (options.devClient) {
        await trackAsync(projectRoot, exp);
    }
    // Open project on devices.
    await (0, _profile.profile)(_openPlatforms.openPlatformsAsync)(devServerManager, options);
    // Present the Terminal UI.
    if ((0, _interactive.isInteractive)()) {
        var _platforms;
        await (0, _profile.profile)(_startInterface.startInterfaceAsync)(devServerManager, {
            platforms: (_platforms = exp.platforms) != null ? _platforms : [
                "ios",
                "android",
                "web"
            ]
        });
    } else {
        var ref1;
        // Display the server location in CI...
        const url = (ref1 = devServerManager.getDefaultDevServer()) == null ? void 0 : ref1.getDevServerUrl();
        if (url) {
            if (_env.env.__EXPO_E2E_TEST) {
                // Print the URL to stdout for tests
                console.info(`[__EXPO_E2E_TEST:server] ${JSON.stringify({
                    url
                })}`);
            }
            _log.log((0, _chalk().default)`Waiting on {underline ${url}}`);
        }
    }
    // Final note about closing the server.
    const logLocation = settings.webOnly ? "in the browser console" : "below";
    _log.log((0, _chalk().default)`Logs for your project will appear ${logLocation}.${(0, _interactive.isInteractive)() ? _chalk().default.dim(` Press Ctrl+C to exit.`) : ""}`);
}
async function trackAsync(projectRoot, exp) {
    await (0, _telemetry.logEventAsync)("dev client start command", {
        status: "started",
        ...(0, _getDevClientProperties.default)(projectRoot, exp)
    });
    (0, _exit.installExitHooks)(async ()=>{
        await (0, _telemetry.logEventAsync)("dev client start command", {
            status: "finished",
            ...(0, _getDevClientProperties.default)(projectRoot, exp)
        });
    // UnifiedAnalytics.flush();
    });
}

//# sourceMappingURL=startAsync.js.map