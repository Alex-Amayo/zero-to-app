"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "checkPackagesAsync", {
    enumerable: true,
    get: ()=>checkPackagesAsync
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
const _fixPackages = require("./fixPackages");
const _log = /*#__PURE__*/ _interopRequireWildcard(require("../log"));
const _validateDependenciesVersions = require("../start/doctor/dependencies/validateDependenciesVersions");
const _interactive = require("../utils/interactive");
const _link = require("../utils/link");
const _prompts = require("../utils/prompts");
const _strings = require("../utils/strings");
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
const debug = require("debug")("expo:install:check");
async function checkPackagesAsync(projectRoot, { packages , packageManager , options: { fix  } , packageManagerArguments  }) {
    var ref, ref1, ref2;
    // Read the project Expo config without plugins.
    const { exp , pkg  } = (0, _config().getConfig)(projectRoot, {
        // Sometimes users will add a plugin to the config before installing the library,
        // this wouldn't work unless we dangerously disable plugin serialization.
        skipPlugins: true
    });
    if ((ref = pkg.expo) == null ? void 0 : (ref1 = ref.install) == null ? void 0 : (ref2 = ref1.exclude) == null ? void 0 : ref2.length) {
        _log.log((0, _chalk().default)`Skipped ${fix ? "fixing" : "checking"} dependencies: ${(0, _strings.joinWithCommasAnd)(pkg.expo.install.exclude)}. These dependencies are listed in {bold expo.install.exclude} in package.json. ${(0, _link.learnMore)("https://expo.dev/more/expo-cli/#configuring-dependency-validation")}`);
    }
    const dependencies = await (0, _validateDependenciesVersions.getVersionedDependenciesAsync)(projectRoot, exp, pkg, packages);
    if (!dependencies.length) {
        _log.exit(_chalk().default.greenBright("Dependencies are up to date"), 0);
    }
    (0, _validateDependenciesVersions.logIncorrectDependencies)(dependencies);
    const value = // If `--fix` then always fix.
    fix || // Otherwise prompt to fix when not running in CI.
    ((0, _interactive.isInteractive)() && await (0, _prompts.confirmAsync)({
        message: "Fix dependencies?"
    }).catch(()=>false));
    if (value) {
        debug("Installing fixed dependencies:", dependencies);
        // Install the corrected dependencies.
        return (0, _fixPackages.fixPackagesAsync)(projectRoot, {
            packageManager,
            packages: dependencies,
            packageManagerArguments,
            sdkVersion: exp.sdkVersion
        });
    }
    // Exit with non-zero exit code if any of the dependencies are out of date.
    _log.exit(_chalk().default.red("Found outdated dependencies"), 1);
}

//# sourceMappingURL=checkPackages.js.map