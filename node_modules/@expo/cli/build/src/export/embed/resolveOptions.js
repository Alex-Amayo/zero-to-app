"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "resolveOptions", {
    enumerable: true,
    get: ()=>resolveOptions
});
function _path() {
    const data = /*#__PURE__*/ _interopRequireDefault(require("path"));
    _path = function() {
        return data;
    };
    return data;
}
const _env = require("../../utils/env");
const _errors = require("../../utils/errors");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function assertIsBoolean(val) {
    if (typeof val !== "boolean") {
        throw new _errors.CommandError(`Expected boolean, got ${typeof val}`);
    }
}
function resolveOptions(args, parsed) {
    var ref;
    const dev = (ref = parsed.args["--dev"]) != null ? ref : true;
    assertIsBoolean(dev);
    var ref1;
    const minify = (ref1 = parsed.args["--minify"]) != null ? ref1 : !dev;
    assertIsBoolean(minify);
    const entryFile = args["--entry-file"];
    if (!entryFile) {
        throw new _errors.CommandError(`Missing required argument: --entry-file`);
    }
    const bundleOutput = args["--bundle-output"];
    if (!bundleOutput) {
        throw new _errors.CommandError(`Missing required argument: --bundle-output`);
    }
    var ref2, ref3, ref4;
    return {
        entryFile,
        assetCatalogDest: args["--asset-catalog-dest"],
        platform: (ref2 = args["--platform"]) != null ? ref2 : "ios",
        transformer: args["--transformer"],
        // TODO: Support `--dev false`
        //   dev: false,
        bundleOutput,
        bundleEncoding: (ref3 = args["--bundle-encoding"]) != null ? ref3 : "utf8",
        maxWorkers: args["--max-workers"],
        sourcemapOutput: args["--sourcemap-output"],
        sourcemapSourcesRoot: args["--sourcemap-sources-root"],
        sourcemapUseAbsolutePath: !!parsed.args["--sourcemap-use-absolute-path"],
        assetsDest: args["--assets-dest"],
        unstableTransformProfile: args["--unstable-transform-profile"],
        resetCache: !!parsed.args["--reset-cache"],
        verbose: (ref4 = args["--verbose"]) != null ? ref4 : _env.env.EXPO_DEBUG,
        config: args["--config"] ? _path().default.resolve(args["--config"]) : undefined,
        dev,
        minify
    };
}

//# sourceMappingURL=resolveOptions.js.map