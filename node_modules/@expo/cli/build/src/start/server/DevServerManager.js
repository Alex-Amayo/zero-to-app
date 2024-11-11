"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "DevServerManager", {
    enumerable: true,
    get: ()=>DevServerManager
});
function _config() {
    const data = require("@expo/config");
    _config = function() {
        return data;
    };
    return data;
}
function _assert() {
    const data = /*#__PURE__*/ _interopRequireDefault(require("assert"));
    _assert = function() {
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
const _devToolsPluginManager = /*#__PURE__*/ _interopRequireDefault(require("./DevToolsPluginManager"));
const _platformBundlers = require("./platformBundlers");
const _log = require("../../log");
const _fileNotifier = require("../../utils/FileNotifier");
const _env = require("../../utils/env");
const _telemetry = require("../../utils/telemetry");
const _typeScriptProjectPrerequisite = require("../doctor/typescript/TypeScriptProjectPrerequisite");
const _commandsTable = require("../interface/commandsTable");
const _adb = /*#__PURE__*/ _interopRequireWildcard(require("../platforms/android/adb"));
const _resolveOptions = require("../resolveOptions");
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
var _urlCreator;
const debug = require("debug")("expo:start:server:devServerManager");
const devServers = [];
const BUNDLERS = {
    webpack: ()=>require("./webpack/WebpackBundlerDevServer").WebpackBundlerDevServer,
    metro: ()=>require("./metro/MetroBundlerDevServer").MetroBundlerDevServer
};
class DevServerManager {
    static async startMetroAsync(projectRoot, startOptions) {
        const devServerManager = new DevServerManager(projectRoot, startOptions);
        await devServerManager.startAsync([
            {
                type: "metro",
                options: startOptions
            }, 
        ]);
        return devServerManager;
    }
    constructor(projectRoot, options){
        this.projectRoot = projectRoot;
        this.options = options;
        this.projectPrerequisites = [];
        this.notifier = null;
        if (!options.isExporting) {
            this.notifier = this.watchBabelConfig();
        }
        this.devtoolsPluginManager = new _devToolsPluginManager.default(projectRoot);
    }
    watchBabelConfig() {
        const notifier = new _fileNotifier.FileNotifier(this.projectRoot, [
            "./babel.config.js",
            "./babel.config.json",
            "./.babelrc.json",
            "./.babelrc",
            "./.babelrc.js", 
        ], {
            additionalWarning: (0, _chalk().default)` You may need to clear the bundler cache with the {bold --clear} flag for your changes to take effect.`
        });
        notifier.startObserving();
        return notifier;
    }
    /** Lazily load and assert a project-level prerequisite. */ async ensureProjectPrerequisiteAsync(PrerequisiteClass) {
        let prerequisite = this.projectPrerequisites.find((prerequisite)=>prerequisite instanceof PrerequisiteClass);
        if (!prerequisite) {
            prerequisite = new PrerequisiteClass(this.projectRoot);
            this.projectPrerequisites.push(prerequisite);
        }
        return await prerequisite.assertAsync();
    }
    /**
   * Sends a message over web sockets to all connected devices,
   * does nothing when the dev server is not running.
   *
   * @param method name of the command. In RN projects `reload`, and `devMenu` are available. In Expo Go, `sendDevCommand` is available.
   * @param params extra event info to send over the socket.
   */ broadcastMessage(method, params) {
        devServers.forEach((server)=>{
            server.broadcastMessage(method, params);
        });
    }
    /** Get the port for the dev server (either Webpack or Metro) that is hosting code for React Native runtimes. */ getNativeDevServerPort() {
        var ref;
        const server = devServers.find((server)=>server.isTargetingNative());
        var _port;
        return (_port = (ref = server == null ? void 0 : server.getInstance()) == null ? void 0 : ref.location.port) != null ? _port : null;
    }
    /** Get the first server that targets web. */ getWebDevServer() {
        const server = devServers.find((server)=>server.isTargetingWeb());
        return server != null ? server : null;
    }
    getDefaultDevServer() {
        // Return the first native dev server otherwise return the first dev server.
        const server = devServers.find((server)=>server.isTargetingNative());
        const defaultServer = server != null ? server : devServers[0];
        (0, _assert().default)(defaultServer, "No dev servers are running");
        return defaultServer;
    }
    async ensureWebDevServerRunningAsync() {
        const [server] = devServers.filter((server)=>server.isTargetingWeb());
        if (server) {
            return;
        }
        const { exp  } = (0, _config().getConfig)(this.projectRoot, {
            skipPlugins: true,
            skipSDKVersionRequirement: true
        });
        const bundler = (0, _platformBundlers.getPlatformBundlers)(this.projectRoot, exp).web;
        debug(`Starting ${bundler} dev server for web`);
        return this.startAsync([
            {
                type: bundler,
                options: this.options
            }, 
        ]);
    }
    /** Switch between Expo Go and Expo Dev Clients. */ async toggleRuntimeMode(isUsingDevClient = !this.options.devClient) {
        const nextMode = isUsingDevClient ? "--dev-client" : "--go";
        _log.Log.log((0, _commandsTable.printItem)((0, _chalk().default)`Switching to {bold ${nextMode}}`));
        const nextScheme = await (0, _resolveOptions.resolveSchemeAsync)(this.projectRoot, {
            devClient: isUsingDevClient
        });
        this.options.location.scheme = nextScheme;
        this.options.devClient = isUsingDevClient;
        for (const devServer of devServers){
            devServer.isDevClient = isUsingDevClient;
            const urlCreator = devServer.getUrlCreator();
            var _defaults;
            (_defaults = (_urlCreator = urlCreator).defaults) != null ? _defaults : _urlCreator.defaults = {};
            urlCreator.defaults.scheme = nextScheme;
        }
        debug(`New runtime options (runtime: ${nextMode}):`, this.options);
        return true;
    }
    /** Start all dev servers. */ async startAsync(startOptions) {
        const { exp  } = (0, _config().getConfig)(this.projectRoot, {
            skipSDKVersionRequirement: true
        });
        var _sdkVersion;
        await (0, _telemetry.logEventAsync)("Start Project", {
            sdkVersion: (_sdkVersion = exp.sdkVersion) != null ? _sdkVersion : null
        });
        const platformBundlers = (0, _platformBundlers.getPlatformBundlers)(this.projectRoot, exp);
        // Start all dev servers...
        for (const { type , options  } of startOptions){
            const BundlerDevServerClass = await BUNDLERS[type]();
            const server = new BundlerDevServerClass(this.projectRoot, platformBundlers, {
                devToolsPluginManager: this.devtoolsPluginManager,
                isDevClient: !!(options == null ? void 0 : options.devClient)
            });
            await server.startAsync(options != null ? options : this.options);
            devServers.push(server);
        }
        return exp;
    }
    async bootstrapTypeScriptAsync() {
        const typescriptPrerequisite = await this.ensureProjectPrerequisiteAsync(_typeScriptProjectPrerequisite.TypeScriptProjectPrerequisite);
        if (_env.env.EXPO_NO_TYPESCRIPT_SETUP) {
            return;
        }
        // Optionally, wait for the user to add TypeScript during the
        // development cycle.
        const server = devServers.find((server)=>server.name === "metro");
        if (!server) {
            return;
        }
        // The dev server shouldn't wait for the typescript services
        if (!typescriptPrerequisite) {
            server.waitForTypeScriptAsync().then(async (success)=>{
                if (success) {
                    server.startTypeScriptServices();
                }
            });
        } else {
            server.startTypeScriptServices();
        }
    }
    async watchEnvironmentVariables() {
        var ref;
        await ((ref = devServers.find((server)=>server.name === "metro")) == null ? void 0 : ref.watchEnvironmentVariables());
    }
    /** Stop all servers including ADB. */ async stopAsync() {
        var ref;
        await Promise.allSettled([
            (ref = this.notifier) == null ? void 0 : ref.stopObserving(),
            // Stop ADB
            _adb.getServer().stopAsync(),
            // Stop all dev servers
            ...devServers.map((server)=>server.stopAsync().catch((error)=>{
                    _log.Log.error(`Failed to stop dev server (bundler: ${server.name})`);
                    _log.Log.exception(error);
                })), 
        ]);
    }
}

//# sourceMappingURL=DevServerManager.js.map