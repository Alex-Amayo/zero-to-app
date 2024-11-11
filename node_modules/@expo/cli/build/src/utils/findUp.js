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
    findUpProjectRootOrAssert: ()=>findUpProjectRootOrAssert,
    findFileInParents: ()=>findFileInParents
});
function _path() {
    const data = /*#__PURE__*/ _interopRequireDefault(require("path"));
    _path = function() {
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
const _errors = require("../utils/errors");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function findUpProjectRootOrAssert(cwd) {
    const projectRoot = findUpProjectRoot(cwd);
    if (!projectRoot) {
        throw new _errors.CommandError(`Project root directory not found (working directory: ${cwd})`);
    }
    return projectRoot;
}
function findUpProjectRoot(cwd) {
    const found = _resolveFrom().default.silent(cwd, "./package.json");
    if (found) return _path().default.dirname(found);
    const parent = _path().default.dirname(cwd);
    if (parent === cwd) return null;
    return findUpProjectRoot(parent);
}
function findFileInParents(cwd, fileName) {
    const found = _resolveFrom().default.silent(cwd, `./${fileName}`);
    if (found) return found;
    const parent = _path().default.dirname(cwd);
    if (parent === cwd) return null;
    return findFileInParents(parent, fileName);
}

//# sourceMappingURL=findUp.js.map