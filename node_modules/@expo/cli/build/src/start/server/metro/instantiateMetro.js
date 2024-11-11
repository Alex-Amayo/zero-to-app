"use strict";
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
    loadMetroConfigAsync: ()=>loadMetroConfigAsync,
    instantiateMetroAsync: ()=>instantiateMetroAsync,
    isWatchEnabled: ()=>isWatchEnabled
});
function _config() {
    const data = require("@expo/config");
    _config = function() {
        return data;
    };
    return data;
}
function _metroConfig() {
    const data = require("@expo/metro-config");
    _metroConfig = function() {
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
function _metroConfig1() {
    const data = require("metro-config");
    _metroConfig1 = function() {
        return data;
    };
    return data;
}
function _metroCore() {
    const data = require("metro-core");
    _metroCore = function() {
        return data;
    };
    return data;
}
function _nodeUtil() {
    const data = /*#__PURE__*/ _interopRequireDefault(require("node:util"));
    _nodeUtil = function() {
        return data;
    };
    return data;
}
function _semver() {
    const data = /*#__PURE__*/ _interopRequireDefault(require("semver"));
    _semver = function() {
        return data;
    };
    return data;
}
function _url() {
    const data = require("url");
    _url = function() {
        return data;
    };
    return data;
}
const _devToolsPluginWebsocketEndpoint = require("./DevToolsPluginWebsocketEndpoint");
const _metroTerminalReporter = require("./MetroTerminalReporter");
const _attachAtlas = require("./debugging/attachAtlas");
const _createDebugMiddleware = require("./debugging/createDebugMiddleware");
const _runServerFork = require("./runServer-fork");
const _withMetroMultiPlatform = require("./withMetroMultiPlatform");
const _log = require("../../../log");
const _getMetroProperties = require("../../../utils/analytics/getMetroProperties");
const _metroDebuggerMiddleware = require("../../../utils/analytics/metroDebuggerMiddleware");
const _env = require("../../../utils/env");
const _telemetry = require("../../../utils/telemetry");
const _corsMiddleware = require("../middleware/CorsMiddleware");
const _manifestMiddleware = require("../middleware/ManifestMiddleware");
const _createJsInspectorMiddleware = require("../middleware/inspector/createJsInspectorMiddleware");
const _mutations = require("../middleware/mutations");
const _suppressErrorMiddleware = require("../middleware/suppressErrorMiddleware");
const _platformBundlers = require("../platformBundlers");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function gteSdkVersion(exp, sdkVersion) {
    if (!exp.sdkVersion) {
        return false;
    }
    if (exp.sdkVersion === "UNVERSIONED") {
        return true;
    }
    try {
        return _semver().default.gte(exp.sdkVersion, sdkVersion);
    } catch  {
        throw new Error(`${exp.sdkVersion} is not a valid version. Must be in the form of x.y.z`);
    }
}
// Wrap terminal and polyfill console.log so we can log during bundling without breaking the indicator.
class LogRespectingTerminal extends _metroCore().Terminal {
    constructor(stream){
        super(stream);
        const sendLog = (...args)=>{
            // @ts-expect-error
            this._logLines.push(// format args like console.log
            _nodeUtil().default.format(...args));
            // @ts-expect-error
            this._scheduleUpdate();
            // Flush the logs to the terminal immediately so logs at the end of the process are not lost.
            this.flush();
        };
        console.log = sendLog;
        console.info = sendLog;
    }
}
// Share one instance of Terminal for all instances of Metro.
const terminal = new LogRespectingTerminal(process.stdout);
async function loadMetroConfigAsync(projectRoot, options, { exp , isExporting , getMetroBundler  }) {
    var ref, ref1, ref2, ref3;
    let reportEvent;
    const serverRoot = (0, _manifestMiddleware.getMetroServerRoot)(projectRoot);
    const terminalReporter = new _metroTerminalReporter.MetroTerminalReporter(serverRoot, terminal);
    const hasConfig = await (0, _metroConfig1().resolveConfig)(options.config, projectRoot);
    let config = {
        ...await (0, _metroConfig1().loadConfig)({
            cwd: projectRoot,
            projectRoot,
            ...options
        }, // If the project does not have a metro.config.js, then we use the default config.
        hasConfig.isEmpty ? (0, _metroConfig().getDefaultConfig)(projectRoot) : undefined),
        reporter: {
            update (event) {
                terminalReporter.update(event);
                if (reportEvent) {
                    reportEvent(event);
                }
            }
        }
    };
    if (// Requires SDK 50 for expo-assets hashAssetPlugin change.
    !exp.sdkVersion || gteSdkVersion(exp, "50.0.0")) {
        if (isExporting) {
            var ref4;
            var ref5;
            // This token will be used in the asset plugin to ensure the path is correct for writing locally.
            // @ts-expect-error: typed as readonly.
            config.transformer.publicPath = `/assets?export_path=${((ref5 = (ref4 = exp.experiments) == null ? void 0 : ref4.baseUrl) != null ? ref5 : "") + "/assets"}`;
        } else {
            // @ts-expect-error: typed as readonly
            config.transformer.publicPath = "/assets/?unstable_path=.";
        }
    } else {
        var ref6;
        if (isExporting && ((ref6 = exp.experiments) == null ? void 0 : ref6.baseUrl)) {
            var ref7;
            // This token will be used in the asset plugin to ensure the path is correct for writing locally.
            // @ts-expect-error: typed as readonly.
            config.transformer.publicPath = (ref7 = exp.experiments) == null ? void 0 : ref7.baseUrl;
        }
    }
    const platformBundlers = (0, _platformBundlers.getPlatformBundlers)(projectRoot, exp);
    if ((ref = exp.experiments) == null ? void 0 : ref.reactCompiler) {
        _log.Log.warn(`Experimental React Compiler is enabled.`);
    }
    var ref8, ref9, ref10;
    config = await (0, _withMetroMultiPlatform.withMetroMultiPlatformAsync)(projectRoot, {
        config,
        exp,
        platformBundlers,
        isTsconfigPathsEnabled: (ref8 = (ref1 = exp.experiments) == null ? void 0 : ref1.tsconfigPaths) != null ? ref8 : true,
        webOutput: (ref9 = (ref2 = exp.web) == null ? void 0 : ref2.output) != null ? ref9 : "single",
        isFastResolverEnabled: _env.env.EXPO_USE_FAST_RESOLVER,
        isExporting,
        isReactCanaryEnabled: (ref10 = (ref3 = exp.experiments) == null ? void 0 : ref3.reactCanary) != null ? ref10 : false,
        getMetroBundler
    });
    if (process.env.NODE_ENV !== "test") {
        (0, _telemetry.logEventAsync)("metro config", (0, _getMetroProperties.getMetroProperties)(projectRoot, exp, config));
    }
    return {
        config,
        setEventReporter: (logger)=>reportEvent = logger,
        reporter: terminalReporter
    };
}
async function instantiateMetroAsync(metroBundler, options, { isExporting , exp =(0, _config().getConfig)(metroBundler.projectRoot, {
    skipSDKVersionRequirement: true
}).exp  }) {
    const projectRoot = metroBundler.projectRoot;
    const { config: metroConfig , setEventReporter  } = await loadMetroConfigAsync(projectRoot, options, {
        exp,
        isExporting,
        getMetroBundler () {
            return metro.getBundler().getBundler();
        }
    });
    const { createDevServerMiddleware , securityHeadersMiddleware  } = require("@react-native-community/cli-server-api");
    const { middleware , messageSocketEndpoint , eventsSocketEndpoint , websocketEndpoints  } = createDevServerMiddleware({
        port: metroConfig.server.port,
        watchFolders: metroConfig.watchFolders
    });
    let debugWebsocketEndpoints = {};
    if (!isExporting) {
        // The `securityHeadersMiddleware` does not support cross-origin requests, we replace with the enhanced version.
        (0, _mutations.replaceMiddlewareWith)(middleware, securityHeadersMiddleware, (0, _corsMiddleware.createCorsMiddleware)(exp));
        (0, _mutations.prependMiddleware)(middleware, _suppressErrorMiddleware.suppressRemoteDebuggingErrorMiddleware);
        // TODO: We can probably drop this now.
        const customEnhanceMiddleware = metroConfig.server.enhanceMiddleware;
        // @ts-expect-error: can't mutate readonly config
        metroConfig.server.enhanceMiddleware = (metroMiddleware, server)=>{
            if (customEnhanceMiddleware) {
                metroMiddleware = customEnhanceMiddleware(metroMiddleware, server);
            }
            return middleware.use(metroMiddleware);
        };
        middleware.use((0, _metroDebuggerMiddleware.createDebuggerTelemetryMiddleware)(projectRoot, exp));
        // Initialize all React Native debug features
        const { debugMiddleware , ...options1 } = (0, _createDebugMiddleware.createDebugMiddleware)(metroBundler);
        debugWebsocketEndpoints = options1.debugWebsocketEndpoints;
        (0, _mutations.prependMiddleware)(middleware, debugMiddleware);
        middleware.use("/_expo/debugger", (0, _createJsInspectorMiddleware.createJsInspectorMiddleware)());
    }
    // Attach Expo Atlas if enabled
    const atlas = await (0, _attachAtlas.attachAtlasAsync)({
        isExporting,
        exp,
        projectRoot,
        middleware,
        metroConfig,
        // NOTE(cedric): reset the Atlas file once, and reuse it for static exports
        resetAtlasFile: isExporting
    });
    const { server , metro  } = await (0, _runServerFork.runServer)(metroBundler, metroConfig, {
        // @ts-expect-error: Inconsistent `websocketEndpoints` type between metro and @react-native-community/cli-server-api
        websocketEndpoints: {
            ...websocketEndpoints,
            ...debugWebsocketEndpoints,
            ...(0, _devToolsPluginWebsocketEndpoint.createDevToolsPluginWebsocketEndpoint)()
        },
        watch: !isExporting && isWatchEnabled()
    }, {
        mockServer: isExporting
    });
    // If Atlas is enabled, and can register to Metro, attach it to listen for changes
    atlas == null ? void 0 : atlas.registerMetro(metro);
    (0, _mutations.prependMiddleware)(middleware, (req, res, next)=>{
        // If the URL is a Metro asset request, then we need to skip all other middleware to prevent
        // the community CLI's serve-static from hosting `/assets/index.html` in place of all assets if it exists.
        // /assets/?unstable_path=.
        if (req.url) {
            const url = new (_url()).URL(req.url, "http://localhost:8000");
            if (url.pathname.match(/^\/assets\/?/) && url.searchParams.get("unstable_path") != null) {
                return metro.processRequest(req, res, next);
            }
        }
        return next();
    });
    setEventReporter(eventsSocketEndpoint.reportEvent);
    return {
        metro,
        server,
        middleware,
        messageSocket: messageSocketEndpoint
    };
}
function isWatchEnabled() {
    if (_env.env.CI) {
        _log.Log.log((0, _chalk().default)`Metro is running in CI mode, reloads are disabled. Remove {bold CI=true} to enable watch mode.`);
    }
    return !_env.env.CI;
}

//# sourceMappingURL=instantiateMetro.js.map