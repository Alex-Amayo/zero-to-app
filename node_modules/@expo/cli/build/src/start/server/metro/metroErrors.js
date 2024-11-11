// Used to cast a type to metro errors without depending on specific versions of metro.
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
    isFailedToResolveNameError: ()=>isFailedToResolveNameError,
    isFailedToResolvePathError: ()=>isFailedToResolvePathError
});
function isFailedToResolveNameError(error) {
    return !!error && "extraPaths" in error && error.constructor.name === "FailedToResolveNameError";
}
function isFailedToResolvePathError(error) {
    return !!error && "candidates" in error && error.constructor.name === "FailedToResolvePathError";
}

//# sourceMappingURL=metroErrors.js.map