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
    shouldEnableAsyncImports: ()=>shouldEnableAsyncImports,
    isServerEnvironment: ()=>isServerEnvironment,
    getBaseUrlFromExpoConfig: ()=>getBaseUrlFromExpoConfig,
    getAsyncRoutesFromExpoConfig: ()=>getAsyncRoutesFromExpoConfig,
    getMetroDirectBundleOptionsForExpoConfig: ()=>getMetroDirectBundleOptionsForExpoConfig,
    getMetroDirectBundleOptions: ()=>getMetroDirectBundleOptions,
    createBundleUrlPathFromExpoConfig: ()=>createBundleUrlPathFromExpoConfig,
    createBundleUrlPath: ()=>createBundleUrlPath,
    convertPathToModuleSpecifier: ()=>convertPathToModuleSpecifier
});
function _resolveFrom() {
    const data = /*#__PURE__*/ _interopRequireDefault(require("resolve-from"));
    _resolveFrom = function() {
        return data;
    };
    return data;
}
const _env = require("../../../utils/env");
const _errors = require("../../../utils/errors");
const _router = require("../metro/router");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const debug = require("debug")("expo:metro:options");
function shouldEnableAsyncImports(projectRoot) {
    if (_env.env.EXPO_NO_METRO_LAZY) {
        return false;
    }
    // `@expo/metro-runtime` includes support for the fetch + eval runtime code required
    // to support async imports. If it's not installed, we can't support async imports.
    // If it is installed, the user MUST import it somewhere in their project.
    // Expo Router automatically pulls this in, so we can check for it.
    return _resolveFrom().default.silent(projectRoot, "@expo/metro-runtime") != null;
}
function isServerEnvironment(environment) {
    return environment === "node" || environment === "react-server";
}
function withDefaults({ mode ="development" , minify =mode === "production" , preserveEnvVars =_env.env.EXPO_NO_CLIENT_ENV_VARS , lazy , ...props }) {
    if (props.bytecode) {
        if (props.platform === "web") {
            throw new _errors.CommandError("Cannot use bytecode with the web platform");
        }
        if (props.engine !== "hermes") {
            throw new _errors.CommandError("Bytecode is only supported with the Hermes engine");
        }
    }
    return {
        mode,
        minify,
        preserveEnvVars,
        lazy: !props.isExporting && lazy,
        ...props
    };
}
function getBaseUrlFromExpoConfig(exp) {
    var ref, ref1;
    var ref2;
    return (ref2 = (ref = exp.experiments) == null ? void 0 : (ref1 = ref.baseUrl) == null ? void 0 : ref1.trim().replace(/\/+$/, "")) != null ? ref2 : "";
}
function getAsyncRoutesFromExpoConfig(exp, mode, platform) {
    var ref, ref1;
    let asyncRoutesSetting;
    if ((ref = exp.extra) == null ? void 0 : (ref1 = ref.router) == null ? void 0 : ref1.asyncRoutes) {
        var ref2, ref3;
        const asyncRoutes = (ref2 = exp.extra) == null ? void 0 : (ref3 = ref2.router) == null ? void 0 : ref3.asyncRoutes;
        if ([
            "boolean",
            "string"
        ].includes(typeof asyncRoutes)) {
            asyncRoutesSetting = asyncRoutes;
        } else if (typeof asyncRoutes === "object") {
            var _platform;
            asyncRoutesSetting = (_platform = asyncRoutes[platform]) != null ? _platform : asyncRoutes.default;
        }
    }
    return [
        mode,
        true
    ].includes(asyncRoutesSetting);
}
function getMetroDirectBundleOptionsForExpoConfig(projectRoot, exp, options) {
    var ref;
    return getMetroDirectBundleOptions({
        ...options,
        reactCompiler: !!((ref = exp.experiments) == null ? void 0 : ref.reactCompiler),
        baseUrl: getBaseUrlFromExpoConfig(exp),
        routerRoot: (0, _router.getRouterDirectoryModuleIdWithManifest)(projectRoot, exp),
        asyncRoutes: getAsyncRoutesFromExpoConfig(exp, options.mode, options.platform)
    });
}
function getMetroDirectBundleOptions(options) {
    const { mainModuleName , platform , mode , minify , environment , serializerOutput , serializerIncludeMaps , bytecode , lazy , engine , preserveEnvVars , asyncRoutes , baseUrl , routerRoot , isExporting , inlineSourceMap , splitChunks , reactCompiler ,  } = withDefaults(options);
    const dev = mode !== "production";
    const isHermes = engine === "hermes";
    if (isExporting) {
        debug("Disabling lazy bundling for export build");
        options.lazy = false;
    }
    let fakeSourceUrl;
    let fakeSourceMapUrl;
    // TODO: Upstream support to Metro for passing custom serializer options.
    if (serializerIncludeMaps != null || serializerOutput != null) {
        fakeSourceUrl = new URL(createBundleUrlPath(options).replace(/^\//, ""), "http://localhost:8081").toString();
        if (serializerIncludeMaps) {
            fakeSourceMapUrl = fakeSourceUrl.replace(".bundle?", ".map?");
        }
    }
    const bundleOptions = {
        platform,
        entryFile: mainModuleName,
        dev,
        minify: minify != null ? minify : !dev,
        inlineSourceMap: inlineSourceMap != null ? inlineSourceMap : false,
        lazy,
        unstable_transformProfile: isHermes ? "hermes-stable" : "default",
        customTransformOptions: {
            __proto__: null,
            engine,
            preserveEnvVars,
            asyncRoutes,
            environment,
            baseUrl,
            routerRoot,
            bytecode,
            reactCompiler
        },
        customResolverOptions: {
            __proto__: null,
            environment
        },
        sourceMapUrl: fakeSourceMapUrl,
        sourceUrl: fakeSourceUrl,
        serializerOptions: {
            splitChunks,
            output: serializerOutput,
            includeSourceMaps: serializerIncludeMaps
        }
    };
    return bundleOptions;
}
function createBundleUrlPathFromExpoConfig(projectRoot, exp, options) {
    var ref;
    return createBundleUrlPath({
        ...options,
        reactCompiler: !!((ref = exp.experiments) == null ? void 0 : ref.reactCompiler),
        baseUrl: getBaseUrlFromExpoConfig(exp),
        routerRoot: (0, _router.getRouterDirectoryModuleIdWithManifest)(projectRoot, exp)
    });
}
function createBundleUrlPath(options) {
    const { platform , mainModuleName , mode , minify , environment , serializerOutput , serializerIncludeMaps , lazy , bytecode , engine , preserveEnvVars , asyncRoutes , baseUrl , routerRoot , reactCompiler , inlineSourceMap , isExporting , splitChunks ,  } = withDefaults(options);
    const dev = String(mode !== "production");
    const queryParams = new URLSearchParams({
        platform: encodeURIComponent(platform),
        dev,
        // TODO: Is this still needed?
        hot: String(false)
    });
    // Lazy bundling must be disabled for bundle splitting to work.
    if (!isExporting && lazy) {
        queryParams.append("lazy", String(lazy));
    }
    if (inlineSourceMap) {
        queryParams.append("inlineSourceMap", String(inlineSourceMap));
    }
    if (minify) {
        queryParams.append("minify", String(minify));
    }
    // We split bytecode from the engine since you could technically use Hermes without bytecode.
    // Hermes indicates the type of language features you want to transform out of the JS, whereas bytecode
    // indicates whether you want to use the Hermes bytecode format.
    if (engine) {
        queryParams.append("transform.engine", engine);
    }
    if (bytecode) {
        queryParams.append("transform.bytecode", String(bytecode));
    }
    if (asyncRoutes) {
        queryParams.append("transform.asyncRoutes", String(asyncRoutes));
    }
    if (preserveEnvVars) {
        queryParams.append("transform.preserveEnvVars", String(preserveEnvVars));
    }
    if (baseUrl) {
        queryParams.append("transform.baseUrl", baseUrl);
    }
    if (routerRoot != null) {
        queryParams.append("transform.routerRoot", routerRoot);
    }
    if (reactCompiler) {
        queryParams.append("transform.reactCompiler", String(reactCompiler));
    }
    if (environment) {
        queryParams.append("resolver.environment", environment);
        queryParams.append("transform.environment", environment);
    }
    if (splitChunks) {
        queryParams.append("serializer.splitChunks", String(splitChunks));
    }
    if (serializerOutput) {
        queryParams.append("serializer.output", serializerOutput);
    }
    if (serializerIncludeMaps) {
        queryParams.append("serializer.map", String(serializerIncludeMaps));
    }
    return `/${encodeURI(mainModuleName)}.bundle?${queryParams.toString()}`;
}
function convertPathToModuleSpecifier(pathLike) {
    return pathLike.replaceAll("\\", "/");
}

//# sourceMappingURL=metroOptions.js.map