"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "exportWebAsync", {
    enumerable: true,
    get: ()=>exportWebAsync
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
const _log = require("../../log");
const _webSupportProjectPrerequisite = require("../../start/doctor/web/WebSupportProjectPrerequisite");
const _platformBundlers = require("../../start/server/platformBundlers");
const _webpackBundlerDevServer = require("../../start/server/webpack/WebpackBundlerDevServer");
const _errors = require("../../utils/errors");
const _nodeEnv = require("../../utils/nodeEnv");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
async function exportWebAsync(projectRoot, options) {
    // Ensure webpack is available
    await new _webSupportProjectPrerequisite.WebSupportProjectPrerequisite(projectRoot).assertAsync();
    (0, _nodeEnv.setNodeEnv)(options.dev ? "development" : "production");
    require("@expo/env").load(projectRoot);
    const { exp  } = (0, _config().getConfig)(projectRoot);
    const platformBundlers = (0, _platformBundlers.getPlatformBundlers)(projectRoot, exp);
    // Create a bundler interface
    const bundler = new _webpackBundlerDevServer.WebpackBundlerDevServer(projectRoot, platformBundlers);
    // If the user set `web.bundler: 'metro'` then they should use `expo export` instead.
    if (!bundler.isTargetingWeb()) {
        throw new _errors.CommandError((0, _chalk().default)`{bold expo export:web} can only be used with Webpack. Use {bold expo export} for other bundlers.`);
    }
    _log.Log.log(`Exporting with Webpack...`);
    // Bundle the app
    await bundler.bundleAsync({
        mode: options.dev ? "development" : "production",
        clear: options.clear
    });
}

//# sourceMappingURL=exportWebAsync.js.map