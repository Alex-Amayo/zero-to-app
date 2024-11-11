"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "DevServerManagerActions", {
    enumerable: true,
    get: ()=>DevServerManagerActions
});
function _chalk() {
    const data = /*#__PURE__*/ _interopRequireDefault(require("chalk"));
    _chalk = function() {
        return data;
    };
    return data;
}
const _commandsTable = require("./commandsTable");
const _log = /*#__PURE__*/ _interopRequireWildcard(require("../../log"));
const _delay = require("../../utils/delay");
const _env = require("../../utils/env");
const _link = require("../../utils/link");
const _open = require("../../utils/open");
const _prompts = require("../../utils/prompts");
const _reactDevToolsProxy = require("../server/ReactDevToolsProxy");
const _jsInspector = require("../server/middleware/inspector/JsInspector");
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
const debug = require("debug")("expo:start:interface:interactiveActions");
class DevServerManagerActions {
    constructor(devServerManager, options){
        this.devServerManager = devServerManager;
        this.options = options;
    }
    printDevServerInfo(options) {
        var ref;
        // If native dev server is running, print its URL.
        if (this.devServerManager.getNativeDevServerPort()) {
            const devServer = this.devServerManager.getDefaultDevServer();
            try {
                const nativeRuntimeUrl = devServer.getNativeRuntimeUrl();
                const interstitialPageUrl = devServer.getRedirectUrl();
                (0, _commandsTable.printQRCode)(interstitialPageUrl != null ? interstitialPageUrl : nativeRuntimeUrl);
                if (interstitialPageUrl) {
                    _log.log((0, _commandsTable.printItem)((0, _chalk().default)`Choose an app to open your project at {underline ${interstitialPageUrl}}`));
                }
                if (_env.env.__EXPO_E2E_TEST) {
                    // Print the URL to stdout for tests
                    console.info(`[__EXPO_E2E_TEST:server] ${JSON.stringify({
                        url: devServer.getDevServerUrl()
                    })}`);
                }
                _log.log((0, _commandsTable.printItem)((0, _chalk().default)`Metro waiting on {underline ${nativeRuntimeUrl}}`));
                if (options.devClient === false) {
                    // TODO: if development build, change this message!
                    _log.log((0, _commandsTable.printItem)("Scan the QR code above with Expo Go (Android) or the Camera app (iOS)"));
                } else {
                    _log.log((0, _commandsTable.printItem)("Scan the QR code above to open the project in a development build. " + (0, _link.learnMore)("https://expo.fyi/start")));
                }
            } catch (error) {
                console.log("err", error);
                // @ts-ignore: If there is no development build scheme, then skip the QR code.
                if (error.code !== "NO_DEV_CLIENT_SCHEME") {
                    throw error;
                } else {
                    const serverUrl = devServer.getDevServerUrl();
                    _log.log((0, _commandsTable.printItem)((0, _chalk().default)`Metro waiting on {underline ${serverUrl}}`));
                    _log.log((0, _commandsTable.printItem)(`Linking is disabled because the client scheme cannot be resolved.`));
                }
            }
        }
        if ((ref = this.options.platforms) == null ? void 0 : ref.includes("web")) {
            const webDevServer = this.devServerManager.getWebDevServer();
            const webUrl = webDevServer == null ? void 0 : webDevServer.getDevServerUrl({
                hostType: "localhost"
            });
            if (webUrl) {
                _log.log();
                _log.log((0, _commandsTable.printItem)((0, _chalk().default)`Web is waiting on {underline ${webUrl}}`));
            }
        }
        (0, _commandsTable.printUsage)(options, {
            verbose: false
        });
        (0, _commandsTable.printHelp)();
        _log.log();
    }
    async openJsInspectorAsync() {
        const metroServerOrigin = this.devServerManager.getDefaultDevServer().getJsInspectorBaseUrl();
        const apps = await (0, _jsInspector.queryAllInspectorAppsAsync)(metroServerOrigin);
        let app = null;
        if (!apps.length) {
            return _log.warn((0, _chalk().default)`{bold Debug:} No compatible apps connected. JavaScript Debugging can only be used with the Hermes engine. ${(0, _link.learnMore)("https://docs.expo.dev/guides/using-hermes/")}`);
        }
        if (apps.length === 1) {
            app = apps[0];
        } else {
            var _deviceName;
            const choices = apps.map((app)=>({
                    title: (_deviceName = app.deviceName) != null ? _deviceName : "Unknown device",
                    value: app.id,
                    app
                }));
            const value = await (0, _prompts.selectAsync)((0, _chalk().default)`Debug target {dim (Hermes only)}`, choices);
            const menuItem = choices.find((item)=>item.value === value);
            if (!menuItem) {
                return _log.error((0, _chalk().default)`{bold Debug:} No device available for "${value}"`);
            }
            app = menuItem.app;
        }
        if (!app) {
            return _log.error((0, _chalk().default)`{bold Debug:} No device selected`);
        }
        try {
            await (0, _jsInspector.openJsInspector)(metroServerOrigin, app);
        } catch (error) {
            _log.error("Failed to open JavaScript inspector. This is often an issue with Google Chrome.");
            _log.exception(error);
        }
    }
    reloadApp() {
        _log.log(`${_commandsTable.BLT} Reloading apps`);
        // Send reload requests over the dev servers
        this.devServerManager.broadcastMessage("reload");
    }
    async openMoreToolsAsync() {
        // Options match: Chrome > View > Developer
        try {
            const defaultMenuItems = [
                {
                    title: "Inspect elements",
                    value: "toggleElementInspector"
                },
                {
                    title: "Toggle performance monitor",
                    value: "togglePerformanceMonitor"
                },
                {
                    title: "Toggle developer menu",
                    value: "toggleDevMenu"
                },
                {
                    title: "Reload app",
                    value: "reload"
                },
                {
                    title: "Open React devtools",
                    value: "openReactDevTools",
                    action: this.openReactDevToolsAsync.bind(this)
                }
            ];
            const pluginMenuItems = (await this.devServerManager.devtoolsPluginManager.queryPluginsAsync()).map((plugin)=>({
                    title: (0, _chalk().default)`Open {bold ${plugin.packageName}}`,
                    value: `devtoolsPlugin:${plugin.packageName}`,
                    action: async ()=>{
                        const url = new URL(plugin.webpageEndpoint, this.devServerManager.getDefaultDevServer().getUrlCreator().constructUrl({
                            scheme: "http"
                        }));
                        await (0, _open.openBrowserAsync)(url.toString());
                    }
                }));
            const menuItems = [
                ...defaultMenuItems,
                ...pluginMenuItems
            ];
            const value = await (0, _prompts.selectAsync)((0, _chalk().default)`Dev tools {dim (native only)}`, menuItems);
            const menuItem = menuItems.find((item)=>item.value === value);
            if (menuItem == null ? void 0 : menuItem.action) {
                menuItem.action();
            } else if (menuItem == null ? void 0 : menuItem.value) {
                this.devServerManager.broadcastMessage("sendDevCommand", {
                    name: menuItem.value
                });
            }
        } catch (error) {
            debug(error);
        // do nothing
        } finally{
            (0, _commandsTable.printHelp)();
        }
    }
    async openReactDevToolsAsync() {
        await (0, _reactDevToolsProxy.startReactDevToolsProxyAsync)();
        const url = this.devServerManager.getDefaultDevServer().getReactDevToolsUrl();
        await (0, _open.openBrowserAsync)(url);
        (0, _reactDevToolsProxy.addReactDevToolsReloadListener)(()=>{
            this.reconnectReactDevTools();
        });
        this.reconnectReactDevTools();
    }
    async reconnectReactDevTools() {
        // Wait a little time for react-devtools to be initialized in browser
        await (0, _delay.delayAsync)(3000);
        this.devServerManager.broadcastMessage("sendDevCommand", {
            name: "reconnectReactDevTools"
        });
    }
    toggleDevMenu() {
        _log.log(`${_commandsTable.BLT} Toggling dev menu`);
        this.devServerManager.broadcastMessage("devMenu");
    }
}

//# sourceMappingURL=interactiveActions.js.map