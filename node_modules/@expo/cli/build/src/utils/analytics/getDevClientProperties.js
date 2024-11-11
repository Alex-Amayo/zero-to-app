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
    hasDirectDevClientDependency: ()=>hasDirectDevClientDependency,
    default: ()=>getDevClientProperties
});
function _config() {
    const data = require("@expo/config");
    _config = function() {
        return data;
    };
    return data;
}
function _jsonFile() {
    const data = /*#__PURE__*/ _interopRequireDefault(require("@expo/json-file"));
    _jsonFile = function() {
        return data;
    };
    return data;
}
function _resolveFrom() {
    const data = /*#__PURE__*/ _interopRequireDefault(require("resolve-from"));
    _resolveFrom = function() {
        return data;
    };
    return data;
}
const _fn = require("../fn");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const getAccountName = (0, _fn.memoize)((exp)=>{
    return (0, _config().getAccountUsername)(exp);
});
function hasDirectDevClientDependency(projectRoot) {
    var ref, ref1;
    const pkg = (0, _config().getPackageJson)(projectRoot);
    return !!((ref = pkg.dependencies) == null ? void 0 : ref["expo-dev-client"]) || !!((ref1 = pkg.devDependencies) == null ? void 0 : ref1["expo-dev-client"]);
}
const getDevClientVersion = (0, _fn.memoize)((projectRoot)=>{
    try {
        const devClientPackage = _resolveFrom().default.silent(projectRoot, "expo-dev-client/package.json");
        if (devClientPackage) {
            return _jsonFile().default.read(devClientPackage).version;
        }
    } catch  {}
    return undefined;
});
const getProjectType = (0, _fn.memoize)((projectRoot)=>{
    return (0, _config().getDefaultTarget)(projectRoot) === "managed" ? "managed" : "generic";
});
function getDevClientProperties(projectRoot, exp) {
    return {
        account_name: getAccountName({
            owner: exp.owner
        }),
        dev_client_version: getDevClientVersion(projectRoot),
        project_type: getProjectType(projectRoot),
        uptime_ms: process.uptime() * 1000
    };
}

//# sourceMappingURL=getDevClientProperties.js.map