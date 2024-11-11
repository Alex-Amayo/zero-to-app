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
    forceUpdateTSConfig: ()=>forceUpdateTSConfig,
    getTSConfigUpdates: ()=>getTSConfigUpdates,
    forceRemovalTSConfig: ()=>forceRemovalTSConfig,
    getTSConfigRemoveUpdates: ()=>getTSConfigRemoveUpdates
});
function _jsonFile() {
    const data = /*#__PURE__*/ _interopRequireDefault(require("@expo/json-file"));
    _jsonFile = function() {
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
const _log = require("../../../log");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
async function forceUpdateTSConfig(projectRoot) {
    // This runs after the TypeScript prerequisite, so we know the tsconfig.json exists
    const tsConfigPath = _path().default.join(projectRoot, "tsconfig.json");
    const { tsConfig , updates  } = getTSConfigUpdates(_jsonFile().default.read(tsConfigPath, {
        json5: true
    }));
    await writeUpdates(tsConfigPath, tsConfig, updates);
}
function getTSConfigUpdates(tsConfig) {
    const updates = new Set();
    if (!tsConfig.include) {
        tsConfig.include = [
            "**/*.ts",
            "**/*.tsx",
            ".expo/types/**/*.ts",
            "expo-env.d.ts"
        ];
        updates.add("include");
    } else if (Array.isArray(tsConfig.include)) {
        if (!tsConfig.include.includes(".expo/types/**/*.ts")) {
            tsConfig.include = [
                ...tsConfig.include,
                ".expo/types/**/*.ts"
            ];
            updates.add("include");
        }
        if (!tsConfig.include.includes("expo-env.d.ts")) {
            tsConfig.include = [
                ...tsConfig.include,
                "expo-env.d.ts"
            ];
            updates.add("include");
        }
    }
    return {
        tsConfig,
        updates
    };
}
async function forceRemovalTSConfig(projectRoot) {
    // This runs after the TypeScript prerequisite, so we know the tsconfig.json exists
    const tsConfigPath = _path().default.join(projectRoot, "tsconfig.json");
    const { tsConfig , updates  } = getTSConfigRemoveUpdates(_jsonFile().default.read(tsConfigPath, {
        json5: true
    }));
    await writeUpdates(tsConfigPath, tsConfig, updates);
}
function getTSConfigRemoveUpdates(tsConfig) {
    const updates = new Set();
    if (Array.isArray(tsConfig.include)) {
        const filtered = tsConfig.include.filter((i)=>i !== "expo-env.d.ts" && i !== ".expo/types/**/*.ts");
        if (filtered.length !== tsConfig.include.length) {
            updates.add("include");
        }
        tsConfig.include = filtered;
    }
    return {
        tsConfig,
        updates
    };
}
async function writeUpdates(tsConfigPath, tsConfig, updates) {
    if (updates.size) {
        await _jsonFile().default.writeAsync(tsConfigPath, tsConfig);
        for (const update of updates){
            _log.Log.log((0, _chalk().default)`{bold TypeScript}: The {cyan tsconfig.json#${update}} property has been updated`);
        }
    }
}

//# sourceMappingURL=tsconfig.js.map