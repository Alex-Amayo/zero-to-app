"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "exportAppAsync", {
    enumerable: true,
    get: ()=>exportAppAsync
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
function _path() {
    const data = /*#__PURE__*/ _interopRequireDefault(require("path"));
    _path = function() {
        return data;
    };
    return data;
}
const _createMetadataJson = require("./createMetadataJson");
const _exportAssets = require("./exportAssets");
const _exportHermes = require("./exportHermes");
const _exportStaticAsync = require("./exportStaticAsync");
const _favicon = require("./favicon");
const _getPublicExpoManifest = require("./getPublicExpoManifest");
const _publicFolder = require("./publicFolder");
const _saveAssets = require("./saveAssets");
const _writeContents = require("./writeContents");
const _log = /*#__PURE__*/ _interopRequireWildcard(require("../log"));
const _webSupportProjectPrerequisite = require("../start/doctor/web/WebSupportProjectPrerequisite");
const _devServerManager = require("../start/server/DevServerManager");
const _metroBundlerDevServer = require("../start/server/metro/MetroBundlerDevServer");
const _router = require("../start/server/metro/router");
const _serializeHtml = require("../start/server/metro/serializeHtml");
const _manifestMiddleware = require("../start/server/middleware/ManifestMiddleware");
const _metroOptions = require("../start/server/middleware/metroOptions");
const _webTemplate = require("../start/server/webTemplate");
const _env = require("../utils/env");
const _nodeEnv = require("../utils/nodeEnv");
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
async function exportAppAsync(projectRoot, { platforms , outputDir , clear , dev , dumpAssetmap , sourceMaps , minify , bytecode , maxWorkers  }) {
    var ref;
    (0, _nodeEnv.setNodeEnv)(dev ? "development" : "production");
    require("@expo/env").load(projectRoot);
    const projectConfig = (0, _config().getConfig)(projectRoot);
    const exp = await (0, _getPublicExpoManifest.getPublicExpoManifestAsync)(projectRoot, {
        // Web doesn't require validation.
        skipValidation: platforms.length === 1 && platforms[0] === "web"
    });
    if (platforms.includes("web")) {
        await new _webSupportProjectPrerequisite.WebSupportProjectPrerequisite(projectRoot).assertAsync();
    }
    var ref1;
    const useServerRendering = [
        "static",
        "server"
    ].includes((ref1 = (ref = exp.web) == null ? void 0 : ref.output) != null ? ref1 : "");
    const baseUrl = (0, _metroOptions.getBaseUrlFromExpoConfig)(exp);
    if (!bytecode && (platforms.includes("ios") || platforms.includes("android"))) {
        _log.warn(`Bytecode makes the app startup faster, disabling bytecode is highly discouraged and should only be used for debugging purposes.`);
    }
    // Print out logs
    if (baseUrl) {
        _log.log();
        _log.log(_chalk().default.gray`Using (experimental) base path: ${baseUrl}`);
        // Warn if not using an absolute path.
        if (!baseUrl.startsWith("/")) {
            _log.log(_chalk().default.yellow`  Base path does not start with a slash. Requests will not be absolute.`);
        }
    }
    const mode = dev ? "development" : "production";
    const publicPath = _path().default.resolve(projectRoot, _env.env.EXPO_PUBLIC_FOLDER);
    const outputPath = _path().default.resolve(projectRoot, outputDir);
    // Write the JS bundles to disk, and get the bundle file names (this could change with async chunk loading support).
    const files = new Map();
    const devServerManager = await _devServerManager.DevServerManager.startMetroAsync(projectRoot, {
        minify,
        mode,
        port: 8081,
        isExporting: true,
        location: {},
        resetDevServer: clear,
        maxWorkers
    });
    const devServer = devServerManager.getDefaultDevServer();
    (0, _assert().default)(devServer instanceof _metroBundlerDevServer.MetroBundlerDevServer);
    const bundles = {};
    const spaPlatforms = useServerRendering ? platforms.filter((platform)=>platform !== "web") : platforms;
    try {
        // NOTE(kitten): The public folder is currently always copied, regardless of targetDomain
        // split. Hence, there's another separate `copyPublicFolderAsync` call below for `web`
        await (0, _publicFolder.copyPublicFolderAsync)(publicPath, outputPath);
        // Can be empty during web-only SSG.
        if (spaPlatforms.length) {
            await Promise.all(spaPlatforms.map(async (platform)=>{
                var ref;
                // Assert early so the user doesn't have to wait until bundling is complete to find out that
                // Hermes won't be available.
                const isHermes = (0, _exportHermes.isEnableHermesManaged)(exp, platform);
                if (isHermes) {
                    await (0, _exportHermes.assertEngineMismatchAsync)(projectRoot, exp, platform);
                }
                // Run metro bundler and create the JS bundles/source maps.
                const bundle = await devServer.legacySinglePageExportBundleAsync({
                    platform,
                    splitChunks: !_env.env.EXPO_NO_BUNDLE_SPLITTING && platform === "web",
                    mainModuleName: (0, _manifestMiddleware.getEntryWithServerRoot)(projectRoot, {
                        platform,
                        pkg: projectConfig.pkg
                    }),
                    mode: dev ? "development" : "production",
                    engine: isHermes ? "hermes" : undefined,
                    serializerIncludeMaps: sourceMaps,
                    bytecode: bytecode && isHermes,
                    reactCompiler: !!((ref = exp.experiments) == null ? void 0 : ref.reactCompiler)
                });
                bundles[platform] = bundle;
                (0, _saveAssets.getFilesFromSerialAssets)(bundle.artifacts, {
                    includeSourceMaps: sourceMaps,
                    files
                });
                if (platform === "web") {
                    // TODO: Unify with exportStaticAsync
                    // TODO: Maybe move to the serializer.
                    let html = await (0, _serializeHtml.serializeHtmlWithAssets)({
                        isExporting: true,
                        resources: bundle.artifacts,
                        template: await (0, _webTemplate.createTemplateHtmlFromExpoConfigAsync)(projectRoot, {
                            scripts: [],
                            cssLinks: [],
                            exp: projectConfig.exp
                        }),
                        baseUrl
                    });
                    // Add the favicon assets to the HTML.
                    const modifyHtml = await (0, _favicon.getVirtualFaviconAssetsAsync)(projectRoot, {
                        outputDir,
                        baseUrl,
                        files,
                        exp: projectConfig.exp
                    });
                    if (modifyHtml) {
                        html = modifyHtml(html);
                    }
                    // Generate SPA-styled HTML file.
                    // If web exists, then write the template HTML file.
                    files.set("index.html", {
                        contents: html,
                        targetDomain: "client"
                    });
                }
            }));
            // TODO: Use same asset system across platforms again.
            const { assets , embeddedHashSet  } = await (0, _exportAssets.exportAssetsAsync)(projectRoot, {
                files,
                exp,
                outputDir: outputPath,
                bundles,
                baseUrl
            });
            if (dumpAssetmap) {
                _log.log("Creating asset map");
                files.set("assetmap.json", {
                    contents: JSON.stringify((0, _writeContents.createAssetMap)({
                        assets
                    }))
                });
            }
            const fileNames = Object.fromEntries(Object.entries(bundles).map(([platform, bundle])=>[
                    platform,
                    bundle.artifacts.filter((asset)=>asset.type === "js").map((asset)=>asset.filename), 
                ]));
            // build source maps
            if (sourceMaps) {
                _log.log("Preparing additional debugging files");
                // If we output source maps, then add a debug HTML file which the user can open in
                // the web browser to inspect the output like web.
                files.set("debug.html", {
                    contents: (0, _writeContents.createSourceMapDebugHtml)({
                        fileNames: Object.values(fileNames).flat()
                    })
                });
            }
            // Generate a `metadata.json` for EAS Update.
            const contents = (0, _createMetadataJson.createMetadataJson)({
                bundles,
                fileNames,
                embeddedHashSet
            });
            files.set("metadata.json", {
                contents: JSON.stringify(contents)
            });
        }
        // Additional web-only steps...
        if (platforms.includes("web") && useServerRendering) {
            var ref2, ref3;
            const exportServer = ((ref2 = exp.web) == null ? void 0 : ref2.output) === "server";
            if (exportServer) {
                // TODO: Remove when this is abstracted into the files map
                await (0, _publicFolder.copyPublicFolderAsync)(publicPath, _path().default.resolve(outputPath, "client"));
            }
            await (0, _exportStaticAsync.exportFromServerAsync)(projectRoot, devServer, {
                mode,
                files,
                clear: !!clear,
                outputDir: outputPath,
                minify,
                baseUrl,
                includeSourceMaps: sourceMaps,
                routerRoot: (0, _router.getRouterDirectoryModuleIdWithManifest)(projectRoot, exp),
                reactCompiler: !!((ref3 = exp.experiments) == null ? void 0 : ref3.reactCompiler),
                exportServer,
                maxWorkers,
                isExporting: true,
                exp: projectConfig.exp
            });
        }
    } finally{
        await devServerManager.stopAsync();
    }
    // Write all files at the end for unified logging.
    await (0, _saveAssets.persistMetroFilesAsync)(files, outputPath);
}

//# sourceMappingURL=exportApp.js.map