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
    resolvePlatformOption: ()=>resolvePlatformOption,
    resolveOptionsAsync: ()=>resolveOptionsAsync
});
function _config() {
    const data = require("@expo/config");
    _config = function() {
        return data;
    };
    return data;
}
const _platformBundlers = require("../start/server/platformBundlers");
const _errors = require("../utils/errors");
function resolvePlatformOption(exp, platformBundlers, platform = [
    "all"
]) {
    const platformsAvailable = Object.fromEntries(Object.entries(platformBundlers).filter(([platform, bundler])=>{
        var ref;
        return bundler === "metro" && ((ref = exp.platforms) == null ? void 0 : ref.includes(platform));
    }));
    if (!Object.keys(platformsAvailable).length) {
        throw new _errors.CommandError(`No platforms are configured to use the Metro bundler in the project Expo config.`);
    }
    const assertPlatformBundler = (platform)=>{
        if (!platformsAvailable[platform]) {
            var ref, ref1;
            if (!((ref = exp.platforms) == null ? void 0 : ref.includes(platform)) && platform === "web") {
                // Pass through so the more robust error message is shown.
                return platform;
            }
            throw new _errors.CommandError("BAD_ARGS", `Platform "${platform}" is not configured to use the Metro bundler in the project Expo config, or is missing from the supported platforms in the platforms array: [${(ref1 = exp.platforms) == null ? void 0 : ref1.join(", ")}].`);
        }
        return platform;
    };
    const knownPlatforms = [
        "android",
        "ios",
        "web"
    ];
    const assertPlatformIsKnown = (platform)=>{
        if (!knownPlatforms.includes(platform)) {
            throw new _errors.CommandError(`Unsupported platform "${platform}". Options are: ${knownPlatforms.join(",")},all`);
        }
        return platform;
    };
    return platform// Expand `all` to all available platforms.
    .map((platform)=>platform === "all" ? Object.keys(platformsAvailable) : platform).flat()// Remove duplicated platforms
    .filter((platform, index, list)=>list.indexOf(platform) === index)// Assert platforms are valid
    .map((platform)=>assertPlatformIsKnown(platform)).map((platform)=>assertPlatformBundler(platform));
}
async function resolveOptionsAsync(projectRoot, args) {
    const { exp  } = (0, _config().getConfig)(projectRoot, {
        skipPlugins: true,
        skipSDKVersionRequirement: true
    });
    const platformBundlers = (0, _platformBundlers.getPlatformBundlers)(projectRoot, exp);
    var ref;
    return {
        platforms: resolvePlatformOption(exp, platformBundlers, args["--platform"]),
        outputDir: (ref = args["--output-dir"]) != null ? ref : "dist",
        minify: !args["--no-minify"],
        bytecode: !args["--no-bytecode"],
        clear: !!args["--clear"],
        dev: !!args["--dev"],
        maxWorkers: args["--max-workers"],
        dumpAssetmap: !!args["--dump-assetmap"],
        sourceMaps: !!args["--source-maps"]
    };
}

//# sourceMappingURL=resolveOptions.js.map