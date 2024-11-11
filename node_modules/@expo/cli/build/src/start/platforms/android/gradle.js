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
    formatGradleArguments: ()=>formatGradleArguments,
    assembleAsync: ()=>assembleAsync,
    installAsync: ()=>installAsync,
    spawnGradleAsync: ()=>spawnGradleAsync
});
function _spawnAsync() {
    const data = /*#__PURE__*/ _interopRequireDefault(require("@expo/spawn-async"));
    _spawnAsync = function() {
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
const _env = require("../../../utils/env");
const _errors = require("../../../utils/errors");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const debug = require("debug")("expo:start:platforms:android:gradle");
function upperFirst(name) {
    return name.charAt(0).toUpperCase() + name.slice(1);
}
function formatGradleArguments(cmd, { appName , variant , tasks =[
    cmd + upperFirst(variant)
]  }) {
    return appName ? tasks.map((task)=>`${appName}:${task}`) : tasks;
}
function resolveGradleWPath(androidProjectPath) {
    return _path().default.join(androidProjectPath, process.platform === "win32" ? "gradlew.bat" : "gradlew");
}
function getPortArg(port) {
    return `-PreactNativeDevServerPort=${port}`;
}
function getActiveArchArg(architectures) {
    return `-PreactNativeArchitectures=${architectures}`;
}
async function assembleAsync(androidProjectPath, { variant , port , appName , buildCache , architectures  }) {
    const task = formatGradleArguments("assemble", {
        variant,
        appName
    });
    const args = [
        ...task,
        // ignore linting errors
        "-x",
        "lint",
        // ignore tests
        "-x",
        "test",
        "--configure-on-demand", 
    ];
    if (buildCache) args.push("--build-cache");
    // Generate a profile under `/android/app/build/reports/profile`
    if (_env.env.EXPO_PROFILE) args.push("--profile");
    return await spawnGradleAsync(androidProjectPath, {
        port,
        architectures,
        args
    });
}
async function installAsync(androidProjectPath, { variant , appName , port  }) {
    const args = formatGradleArguments("install", {
        variant,
        appName
    });
    return await spawnGradleAsync(androidProjectPath, {
        port,
        args
    });
}
async function spawnGradleAsync(projectRoot, { port , architectures , args  }) {
    const gradlew = resolveGradleWPath(projectRoot);
    if (port != null) args.push(getPortArg(port));
    if (architectures) args.push(getActiveArchArg(architectures));
    debug(`  ${gradlew} ${args.join(" ")}`);
    try {
        return await (0, _spawnAsync().default)(gradlew, args, {
            cwd: projectRoot,
            stdio: "inherit"
        });
    } catch (error) {
        // User aborted the command with ctrl-c
        if (error.status === 130) {
            // Fail silently
            throw new _errors.AbortCommandError();
        }
        throw error;
    }
}

//# sourceMappingURL=gradle.js.map