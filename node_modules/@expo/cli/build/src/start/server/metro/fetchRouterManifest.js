/**
 * Copyright © 2022 650 Industries.
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
    fetchManifest: ()=>fetchManifest,
    inflateManifest: ()=>inflateManifest
});
function _resolveFrom() {
    const data = /*#__PURE__*/ _interopRequireDefault(require("resolve-from"));
    _resolveFrom = function() {
        return data;
    };
    return data;
}
const _router = require("./router");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function getExpoRouteManifestBuilderAsync(projectRoot) {
    return require((0, _resolveFrom().default)(projectRoot, "expo-router/build/routes-manifest")).createRoutesManifest;
}
async function fetchManifest(projectRoot, options) {
    const getManifest = getExpoRouteManifestBuilderAsync(projectRoot);
    const paths = (0, _router.getRoutePaths)(options.appDir);
    // Get the serialized manifest
    const jsonManifest = getManifest(paths, options);
    if (!jsonManifest) {
        return null;
    }
    if (!jsonManifest.htmlRoutes || !jsonManifest.apiRoutes) {
        throw new Error("Routes manifest is malformed: " + JSON.stringify(jsonManifest, null, 2));
    }
    if (!options.asJson) {
        // @ts-expect-error
        return inflateManifest(jsonManifest);
    }
    // @ts-expect-error
    return jsonManifest;
}
function inflateManifest(json) {
    var ref, ref1, ref2;
    return {
        ...json,
        htmlRoutes: (ref = json.htmlRoutes) == null ? void 0 : ref.map((value)=>{
            return {
                ...value,
                namedRegex: new RegExp(value.namedRegex)
            };
        }),
        apiRoutes: (ref1 = json.apiRoutes) == null ? void 0 : ref1.map((value)=>{
            return {
                ...value,
                namedRegex: new RegExp(value.namedRegex)
            };
        }),
        notFoundRoutes: (ref2 = json.notFoundRoutes) == null ? void 0 : ref2.map((value)=>{
            return {
                ...value,
                namedRegex: new RegExp(value.namedRegex)
            };
        })
    };
}

//# sourceMappingURL=fetchRouterManifest.js.map