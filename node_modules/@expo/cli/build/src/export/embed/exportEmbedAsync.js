/**
 * Copyright © 2023 650 Industries.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ "use strict";
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
    exportEmbedAsync: ()=>exportEmbedAsync,
    exportEmbedBundleAndAssetsAsync: ()=>exportEmbedBundleAndAssetsAsync,
    createMetroServerAndBundleRequestAsync: ()=>createMetroServerAndBundleRequestAsync,
    exportEmbedAssetsAsync: ()=>exportEmbedAssetsAsync
});
function _config() {
    const data = require("@expo/config");
    _config = function() {
        return data;
    };
    return data;
}
function _getAssets() {
    const data = /*#__PURE__*/ _interopRequireDefault(require("@expo/metro-config/build/transform-worker/getAssets"));
    _getAssets = function() {
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
function _fs() {
    const data = /*#__PURE__*/ _interopRequireDefault(require("fs"));
    _fs = function() {
        return data;
    };
    return data;
}
function _glob() {
    const data = require("glob");
    _glob = function() {
        return data;
    };
    return data;
}
function _server() {
    const data = /*#__PURE__*/ _interopRequireDefault(require("metro/src/Server"));
    _server = function() {
        return data;
    };
    return data;
}
function _splitBundleOptions() {
    const data = /*#__PURE__*/ _interopRequireDefault(require("metro/src/lib/splitBundleOptions"));
    _splitBundleOptions = function() {
        return data;
    };
    return data;
}
function _bundle() {
    const data = /*#__PURE__*/ _interopRequireDefault(require("metro/src/shared/output/bundle"));
    _bundle = function() {
        return data;
    };
    return data;
}
function _path() {
    const data = /*#__PURE__*/ _interopRequireDefault(require("path"));
    _path = function() {
        return data;
    };
    return data;
}
const _xcodeCompilerLogger = require("./xcodeCompilerLogger");
const _log = require("../../log");
const _devServerManager = require("../../start/server/DevServerManager");
const _metroBundlerDevServer = require("../../start/server/metro/MetroBundlerDevServer");
const _instantiateMetro = require("../../start/server/metro/instantiateMetro");
const _metroPrivateServer = require("../../start/server/metro/metroPrivateServer");
const _metroOptions = require("../../start/server/middleware/metroOptions");
const _ansi = require("../../utils/ansi");
const _dir = require("../../utils/dir");
const _nodeEnv = require("../../utils/nodeEnv");
const _exportHermes = require("../exportHermes");
const _persistMetroAssets = require("../persistMetroAssets");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const debug = require("debug")("expo:export:embed");
function guessCopiedAppleBundlePath(bundleOutput) {
    // Ensure the path is familiar before guessing.
    if (!bundleOutput.match(/\/Xcode\/DerivedData\/.*\/Build\/Products\//)) {
        debug("Bundling to non-standard location:", bundleOutput);
        return false;
    }
    const bundleName = _path().default.basename(bundleOutput);
    const bundleParent = _path().default.dirname(bundleOutput);
    const possiblePath = (0, _glob().sync)(_path().default.join(bundleParent, `*.app/${bundleName}`), {
        // bundle identifiers can start with dots.
        dot: true
    })[0];
    debug("Possible path for previous bundle:", possiblePath);
    return possiblePath;
}
async function exportEmbedAsync(projectRoot, options) {
    (0, _nodeEnv.setNodeEnv)(options.dev ? "development" : "production");
    require("@expo/env").load(projectRoot);
    // Ensure we delete the old bundle to trigger a failure if the bundle cannot be created.
    await (0, _dir.removeAsync)(options.bundleOutput);
    // The iOS bundle is copied in to the Xcode project, so we need to remove the old one
    // to prevent Xcode from loading the old one after a build failure.
    if (options.platform === "ios") {
        const previousPath = guessCopiedAppleBundlePath(options.bundleOutput);
        if (previousPath && _fs().default.existsSync(previousPath)) {
            debug("Removing previous iOS bundle:", previousPath);
            await (0, _dir.removeAsync)(previousPath);
        }
    }
    const { bundle , assets  } = await exportEmbedBundleAndAssetsAsync(projectRoot, options);
    _fs().default.mkdirSync(_path().default.dirname(options.bundleOutput), {
        recursive: true,
        mode: 493
    });
    // Persist bundle and source maps.
    await Promise.all([
        _bundle().default.save(bundle, options, _log.Log.log),
        // NOTE(EvanBacon): This may need to be adjusted in the future if want to support baseUrl on native
        // platforms when doing production embeds (unlikely).
        options.assetsDest ? (0, _persistMetroAssets.persistMetroAssetsAsync)(assets, {
            platform: options.platform,
            outputDirectory: options.assetsDest,
            iosAssetCatalogDirectory: options.assetCatalogDest
        }) : null, 
    ]);
}
async function exportEmbedBundleAndAssetsAsync(projectRoot, options) {
    const devServerManager = await _devServerManager.DevServerManager.startMetroAsync(projectRoot, {
        minify: options.minify,
        mode: options.dev ? "development" : "production",
        port: 8081,
        isExporting: true,
        location: {},
        resetDevServer: options.resetCache,
        maxWorkers: options.maxWorkers
    });
    const devServer = devServerManager.getDefaultDevServer();
    (0, _assert().default)(devServer instanceof _metroBundlerDevServer.MetroBundlerDevServer);
    const exp = (0, _config().getConfig)(projectRoot, {
        skipSDKVersionRequirement: true
    }).exp;
    const isHermes = (0, _exportHermes.isEnableHermesManaged)(exp, options.platform);
    let sourceMapUrl = options.sourcemapOutput;
    if (sourceMapUrl && !options.sourcemapUseAbsolutePath) {
        sourceMapUrl = _path().default.basename(sourceMapUrl);
    }
    try {
        var ref, ref1;
        const bundles = await devServer.legacySinglePageExportBundleAsync({
            splitChunks: false,
            mainModuleName: resolveRealEntryFilePath(projectRoot, options.entryFile),
            platform: options.platform,
            minify: options.minify,
            mode: options.dev ? "development" : "production",
            engine: isHermes ? "hermes" : undefined,
            serializerIncludeMaps: !!sourceMapUrl,
            // Never output bytecode in the exported bundle since that is hardcoded in the native run script.
            bytecode: false,
            // source map inline
            reactCompiler: !!((ref = exp.experiments) == null ? void 0 : ref.reactCompiler)
        }, {
            sourceMapUrl,
            unstable_transformProfile: options.unstableTransformProfile || (isHermes ? "hermes-stable" : "default")
        });
        return {
            bundle: {
                code: bundles.artifacts.filter((a)=>a.type === "js")[0].source.toString(),
                // Can be optional when source maps aren't enabled.
                map: (ref1 = bundles.artifacts.filter((a)=>a.type === "map")[0]) == null ? void 0 : ref1.source.toString()
            },
            assets: bundles.assets
        };
    } catch (error) {
        if (isError(error)) {
            // Log using Xcode error format so the errors are picked up by xcodebuild.
            // https://developer.apple.com/documentation/xcode/running-custom-scripts-during-a-build#Log-errors-and-warnings-from-your-script
            if (options.platform === "ios") {
                // If the error is about to be presented in Xcode, strip the ansi characters from the message.
                if ("message" in error && (0, _xcodeCompilerLogger.isExecutingFromXcodebuild)()) {
                    error.message = (0, _ansi.stripAnsi)(error.message);
                }
                (0, _xcodeCompilerLogger.logMetroErrorInXcode)(projectRoot, error);
            }
        }
        throw error;
    } finally{
        devServerManager.stopAsync();
    }
}
async function createMetroServerAndBundleRequestAsync(projectRoot, options) {
    const exp = (0, _config().getConfig)(projectRoot, {
        skipSDKVersionRequirement: true
    }).exp;
    // TODO: This is slow ~40ms
    const { config  } = await (0, _instantiateMetro.loadMetroConfigAsync)(projectRoot, {
        // TODO: This is always enabled in the native script and there's no way to disable it.
        resetCache: options.resetCache,
        maxWorkers: options.maxWorkers,
        config: options.config
    }, {
        exp,
        isExporting: true,
        getMetroBundler () {
            return server.getBundler().getBundler();
        }
    });
    const isHermes = (0, _exportHermes.isEnableHermesManaged)(exp, options.platform);
    let sourceMapUrl = options.sourcemapOutput;
    if (sourceMapUrl && !options.sourcemapUseAbsolutePath) {
        sourceMapUrl = _path().default.basename(sourceMapUrl);
    }
    const bundleRequest = {
        ..._server().default.DEFAULT_BUNDLE_OPTIONS,
        ...(0, _metroOptions.getMetroDirectBundleOptionsForExpoConfig)(projectRoot, exp, {
            splitChunks: false,
            mainModuleName: resolveRealEntryFilePath(projectRoot, options.entryFile),
            platform: options.platform,
            minify: options.minify,
            mode: options.dev ? "development" : "production",
            engine: isHermes ? "hermes" : undefined,
            isExporting: true,
            // Never output bytecode in the exported bundle since that is hardcoded in the native run script.
            bytecode: false
        }),
        sourceMapUrl,
        unstable_transformProfile: options.unstableTransformProfile || (isHermes ? "hermes-stable" : "default")
    };
    const server = new (_server()).default(config, {
        watch: false
    });
    return {
        server,
        bundleRequest
    };
}
async function exportEmbedAssetsAsync(server, bundleRequest, projectRoot, options) {
    try {
        const { entryFile , onProgress , resolverOptions , transformOptions  } = (0, _splitBundleOptions().default)({
            ...bundleRequest,
            bundleType: "todo"
        });
        (0, _metroPrivateServer.assertMetroPrivateServer)(server);
        const dependencies = await server._bundler.getDependencies([
            entryFile
        ], transformOptions, resolverOptions, {
            onProgress,
            shallow: false,
            lazy: false
        });
        const config = server._config;
        return (0, _getAssets().default)(dependencies, {
            processModuleFilter: config.serializer.processModuleFilter,
            assetPlugins: config.transformer.assetPlugins,
            platform: transformOptions.platform,
            // Forked out of Metro because the `this._getServerRootDir()` doesn't match the development
            // behavior.
            projectRoot: config.projectRoot,
            publicPath: config.transformer.publicPath
        });
    } catch (error) {
        if (isError(error)) {
            // Log using Xcode error format so the errors are picked up by xcodebuild.
            // https://developer.apple.com/documentation/xcode/running-custom-scripts-during-a-build#Log-errors-and-warnings-from-your-script
            if (options.platform === "ios") {
                // If the error is about to be presented in Xcode, strip the ansi characters from the message.
                if ("message" in error && (0, _xcodeCompilerLogger.isExecutingFromXcodebuild)()) {
                    error.message = (0, _ansi.stripAnsi)(error.message);
                }
                (0, _xcodeCompilerLogger.logMetroErrorInXcode)(projectRoot, error);
            }
        }
        throw error;
    }
}
function isError(error) {
    return error instanceof Error;
}
/**
 * This is a workaround for Metro not resolving entry file paths to their real location.
 * When running exports through `eas build --local` on macOS, the `/var/folders` path is used instead of `/private/var/folders`.
 *
 * See: https://github.com/expo/expo/issues/28890
 */ function resolveRealEntryFilePath(projectRoot, entryFile) {
    if (projectRoot.startsWith("/private/var") && entryFile.startsWith("/var")) {
        return _fs().default.realpathSync(entryFile);
    }
    return entryFile;
}

//# sourceMappingURL=exportEmbedAsync.js.map