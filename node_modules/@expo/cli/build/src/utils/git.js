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
    maybeBailOnGitStatusAsync: ()=>maybeBailOnGitStatusAsync,
    validateGitStatusAsync: ()=>validateGitStatusAsync
});
function _spawnAsync() {
    const data = /*#__PURE__*/ _interopRequireDefault(require("@expo/spawn-async"));
    _spawnAsync = function() {
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
const _env = require("./env");
const _interactive = require("./interactive");
const _prompts = require("./prompts");
const _log = /*#__PURE__*/ _interopRequireWildcard(require("../log"));
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
async function maybeBailOnGitStatusAsync() {
    if (_env.env.EXPO_NO_GIT_STATUS) {
        _log.warn("Git status is dirty but the command will continue because EXPO_NO_GIT_STATUS is enabled...");
        return false;
    }
    const isGitStatusClean = await validateGitStatusAsync();
    // Give people a chance to bail out if git working tree is dirty
    if (!isGitStatusClean) {
        if (!(0, _interactive.isInteractive)()) {
            _log.warn(`Git status is dirty but the command will continue because the terminal is not interactive.`);
            return false;
        }
        _log.log();
        const answer = await (0, _prompts.confirmAsync)({
            message: `Would you like to proceed?`
        });
        if (!answer) {
            return true;
        }
        _log.log();
    }
    return false;
}
async function validateGitStatusAsync() {
    let workingTreeStatus = "unknown";
    try {
        const result = await (0, _spawnAsync().default)("git", [
            "status",
            "--porcelain"
        ]);
        workingTreeStatus = result.stdout === "" ? "clean" : "dirty";
    } catch  {
    // Maybe git is not installed?
    // Maybe this project is not using git?
    }
    if (workingTreeStatus === "clean") {
        _log.log(`Your git working tree is ${_chalk().default.green("clean")}`);
        _log.log("To revert the changes after this command completes, you can run the following:");
        _log.log("  git clean --force && git reset --hard");
        return true;
    } else if (workingTreeStatus === "dirty") {
        _log.log(`${_chalk().default.bold("Warning!")} Your git working tree is ${_chalk().default.red("dirty")}.`);
        _log.log(`It's recommended to ${_chalk().default.bold("commit all your changes before proceeding")}, so you can revert the changes made by this command if necessary.`);
    } else {
        _log.log("We couldn't find a git repository in your project directory.");
        _log.log("It's recommended to back up your project before proceeding.");
    }
    return false;
}

//# sourceMappingURL=git.js.map