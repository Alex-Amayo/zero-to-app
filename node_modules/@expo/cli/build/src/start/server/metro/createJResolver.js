/**
 * Copyright © 2023 650 Industries.
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * Fork of the jest resolver but with additional settings for Metro and pnp removed.
 * https://github.com/jestjs/jest/blob/d1a2ed7fea4bdc19836274cd810c8360e3ab62f3/packages/jest-resolve/src/defaultResolver.ts#L1
 */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: ()=>_default
});
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
function _path() {
    const data = require("path");
    _path = function() {
        return data;
    };
    return data;
}
function _resolve() {
    const data = require("resolve");
    _resolve = function() {
        return data;
    };
    return data;
}
function _resolveExports() {
    const data = /*#__PURE__*/ _interopRequireWildcard(require("resolve.exports"));
    _resolveExports = function() {
        return data;
    };
    return data;
}
const _dir = require("../../../utils/dir");
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
const defaultResolver = (path, { enablePackageExports , blockList =[] , ...options })=>{
    // @ts-expect-error
    const resolveOptions = {
        ...options,
        isDirectory (file) {
            if (blockList.some((regex)=>regex.test(file))) {
                return false;
            }
            return (0, _dir.directoryExistsSync)(file);
        },
        isFile (file) {
            if (blockList.some((regex)=>regex.test(file))) {
                return false;
            }
            return (0, _dir.fileExistsSync)(file);
        },
        pathExists (file) {
            if (blockList.some((regex)=>regex.test(file))) {
                return false;
            }
            try {
                _fs().default.accessSync(path, _fs().default.constants.F_OK);
                return true; // File exists
            } catch  {
                return false; // File doesn't exist
            }
        },
        preserveSymlinks: options.preserveSymlinks,
        defaultResolver
    };
    // resolveSync dereferences symlinks to ensure we don't create a separate
    // module instance depending on how it was referenced.
    const result = (0, _resolve().sync)(enablePackageExports ? getPathInModule(path, resolveOptions) : path, {
        ...resolveOptions,
        preserveSymlinks: !options.preserveSymlinks
    });
    return result;
};
const _default = defaultResolver;
/*
 * helper functions
 */ function getPathInModule(path, options) {
    if (shouldIgnoreRequestForExports(path)) {
        return path;
    }
    const segments = path.split("/");
    let moduleName = segments.shift();
    if (!moduleName) {
        return path;
    }
    if (moduleName.startsWith("@")) {
        moduleName = `${moduleName}/${segments.shift()}`;
    }
    // Disable package exports for babel/runtime for https://github.com/facebook/metro/issues/984/
    if (moduleName === "@babel/runtime") {
        return path;
    }
    // self-reference
    const closestPackageJson = findClosestPackageJson(options.basedir, options);
    if (closestPackageJson) {
        const pkg = options.readPackageSync(options.readFileSync, closestPackageJson);
        (0, _assert().default)(pkg, "package.json should be read by `readPackageSync`");
        if (pkg.name === moduleName) {
            const resolved = _resolveExports().exports(pkg, segments.join("/") || ".", createResolveOptions(options.conditions));
            if (resolved) {
                return (0, _path().resolve)((0, _path().dirname)(closestPackageJson), resolved[0]);
            }
            if (pkg.exports) {
                throw new Error("`exports` exists, but no results - this is a bug in Expo CLI's Metro resolver. Please report an issue");
            }
        }
    }
    let packageJsonPath = "";
    try {
        packageJsonPath = (0, _resolve().sync)(`${moduleName}/package.json`, options);
    } catch  {
    // ignore if package.json cannot be found
    }
    if (!packageJsonPath) {
        return path;
    }
    const pkg1 = options.readPackageSync(options.readFileSync, packageJsonPath);
    (0, _assert().default)(pkg1, "package.json should be read by `readPackageSync`");
    const resolved1 = _resolveExports().exports(pkg1, segments.join("/") || ".", createResolveOptions(options.conditions));
    if (resolved1) {
        return (0, _path().resolve)((0, _path().dirname)(packageJsonPath), resolved1[0]);
    }
    if (pkg1.exports) {
        throw new Error("`exports` exists, but no results - this is a bug in Expo CLI's Metro resolver. Please report an issue");
    }
    return path;
}
function createResolveOptions(conditions) {
    return conditions ? {
        conditions,
        unsafe: true
    } : {
        browser: false,
        require: true
    };
}
// if it's a relative import or an absolute path, imports/exports are ignored
const shouldIgnoreRequestForExports = (path)=>path.startsWith(".") || (0, _path().isAbsolute)(path);
// adapted from
// https://github.com/lukeed/escalade/blob/2477005062cdbd8407afc90d3f48f4930354252b/src/sync.js
function findClosestPackageJson(start, options) {
    let dir = (0, _path().resolve)(".", start);
    if (!options.isDirectory(dir)) {
        dir = (0, _path().dirname)(dir);
    }
    while(true){
        const pkgJsonFile = (0, _path().resolve)(dir, "./package.json");
        const hasPackageJson = options.pathExists(pkgJsonFile);
        if (hasPackageJson) {
            return pkgJsonFile;
        }
        const prevDir = dir;
        dir = (0, _path().dirname)(dir);
        if (prevDir === dir) {
            return undefined;
        }
    }
}

//# sourceMappingURL=createJResolver.js.map