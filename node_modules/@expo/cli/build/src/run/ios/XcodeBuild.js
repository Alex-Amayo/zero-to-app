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
    logPrettyItem: ()=>logPrettyItem,
    getAppBinaryPath: ()=>getAppBinaryPath,
    getEscapedPath: ()=>getEscapedPath,
    extractEnvVariableFromBuild: ()=>extractEnvVariableFromBuild,
    getProcessOptions: ()=>getProcessOptions,
    getXcodeBuildArgsAsync: ()=>getXcodeBuildArgsAsync,
    buildAsync: ()=>buildAsync,
    "_assertXcodeBuildResults": ()=>_assertXcodeBuildResults
});
function _xcpretty() {
    const data = require("@expo/xcpretty");
    _xcpretty = function() {
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
function _childProcess() {
    const data = require("child_process");
    _childProcess = function() {
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
function _os() {
    const data = /*#__PURE__*/ _interopRequireDefault(require("os"));
    _os = function() {
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
const _configureCodeSigning = require("./codeSigning/configureCodeSigning");
const _simulatorCodeSigning = require("./codeSigning/simulatorCodeSigning");
const _log = /*#__PURE__*/ _interopRequireWildcard(require("../../log"));
const _dir = require("../../utils/dir");
const _env = require("../../utils/env");
const _errors = require("../../utils/errors");
const _terminal = require("../../utils/terminal");
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
function logPrettyItem(message) {
    _log.log((0, _chalk().default)`{whiteBright \u203A} ${message}`);
}
function getAppBinaryPath(buildOutput) {
    // Matches what's used in "Bundle React Native code and images" script.
    // Requires that `-hideShellScriptEnvironment` is not included in the build command (extra logs).
    // Like `\=/Users/evanbacon/Library/Developer/Xcode/DerivedData/Exponent-anpuosnglkxokahjhfszejloqfvo/Build/Products/Debug-iphonesimulator`
    const CONFIGURATION_BUILD_DIR = extractEnvVariableFromBuild(buildOutput, "CONFIGURATION_BUILD_DIR").sort(// Longer name means more suffixes, we want the shortest possible one to be first.
    // Massive projects (like Expo Go) can sometimes print multiple different sets of environment variables.
    // This can become an issue with some
    (a, b)=>a.length - b.length);
    // Like `Exponent.app`
    const UNLOCALIZED_RESOURCES_FOLDER_PATH = extractEnvVariableFromBuild(buildOutput, "UNLOCALIZED_RESOURCES_FOLDER_PATH");
    const binaryPath = _path().default.join(// Use the shortest defined env variable (usually there's just one).
    CONFIGURATION_BUILD_DIR[0], // Use the last defined env variable.
    UNLOCALIZED_RESOURCES_FOLDER_PATH[UNLOCALIZED_RESOURCES_FOLDER_PATH.length - 1]);
    // If the app has a space in the name it'll fail because it isn't escaped properly by Xcode.
    return getEscapedPath(binaryPath);
}
function getEscapedPath(filePath) {
    if (_fs().default.existsSync(filePath)) {
        return filePath;
    }
    const unescapedPath = filePath.split(/\\ /).join(" ");
    if (_fs().default.existsSync(unescapedPath)) {
        return unescapedPath;
    }
    throw new _errors.CommandError("XCODE_BUILD", `Unexpected: Generated app at path "${filePath}" cannot be read, the app cannot be installed. Please report this and build onto a simulator.`);
}
function extractEnvVariableFromBuild(buildOutput, variableName) {
    // Xcode can sometimes escape `=` with a backslash or put the value in quotes
    const reg = new RegExp(`export ${variableName}\\\\?=(.*)$`, "mg");
    const matched = [
        ...buildOutput.matchAll(reg)
    ];
    if (!matched || !matched.length) {
        throw new _errors.CommandError("XCODE_BUILD", `Malformed xcodebuild results: "${variableName}" variable was not generated in build output. Please report this issue and run your project with Xcode instead.`);
    }
    return matched.map((value)=>value[1]).filter(Boolean);
}
function getProcessOptions({ packager , shouldSkipInitialBundling , terminal , port  }) {
    const SKIP_BUNDLING = shouldSkipInitialBundling ? "1" : undefined;
    if (packager) {
        return {
            env: {
                ...process.env,
                RCT_TERMINAL: terminal,
                SKIP_BUNDLING,
                RCT_METRO_PORT: port.toString()
            }
        };
    }
    return {
        env: {
            ...process.env,
            RCT_TERMINAL: terminal,
            SKIP_BUNDLING,
            // Always skip launching the packager from a build script.
            // The script is used for people building their project directly from Xcode.
            // This essentially means "› Running script 'Start Packager'" does nothing.
            RCT_NO_LAUNCH_PACKAGER: "true"
        }
    };
}
async function getXcodeBuildArgsAsync(props) {
    const args = [
        props.xcodeProject.isWorkspace ? "-workspace" : "-project",
        props.xcodeProject.name,
        "-configuration",
        props.configuration,
        "-scheme",
        props.scheme,
        "-destination",
        `id=${props.device.udid}`, 
    ];
    if (!props.isSimulator || (0, _simulatorCodeSigning.simulatorBuildRequiresCodeSigning)(props.projectRoot)) {
        const developmentTeamId = await (0, _configureCodeSigning.ensureDeviceIsCodeSignedForDeploymentAsync)(props.projectRoot);
        if (developmentTeamId) {
            args.push(`DEVELOPMENT_TEAM=${developmentTeamId}`, "-allowProvisioningUpdates", "-allowProvisioningDeviceRegistration");
        }
    }
    // Add last
    if (props.buildCache === false) {
        args.push(// Will first clean the derived data folder.
        "clean", // Then build step must be added otherwise the process will simply clean and exit.
        "build");
    }
    return args;
}
function spawnXcodeBuild(args, options, { onData  }) {
    const buildProcess = (0, _childProcess().spawn)("xcodebuild", args, options);
    let results = "";
    let error = "";
    buildProcess.stdout.on("data", (data)=>{
        const stringData = data.toString();
        results += stringData;
        onData(stringData);
    });
    buildProcess.stderr.on("data", (data)=>{
        const stringData = data instanceof Buffer ? data.toString() : data;
        error += stringData;
    });
    return new Promise(async (resolve, reject)=>{
        buildProcess.on("close", (code)=>{
            resolve({
                code,
                results,
                error
            });
        });
    });
}
async function spawnXcodeBuildWithFlush(args, options, { onFlush  }) {
    let currentBuffer = "";
    // Data can be sent in chunks that would have no relevance to our regex
    // this can cause massive slowdowns, so we need to ensure the data is complete before attempting to parse it.
    function flushBuffer() {
        if (!currentBuffer) {
            return;
        }
        const data = currentBuffer;
        // Reset buffer.
        currentBuffer = "";
        // Process data.
        onFlush(data);
    }
    const data = await spawnXcodeBuild(args, options, {
        onData (stringData) {
            currentBuffer += stringData;
            // Only flush the data if we have a full line.
            if (currentBuffer.endsWith(_os().default.EOL)) {
                flushBuffer();
            }
        }
    });
    // Flush log data at the end just in case we missed something.
    flushBuffer();
    return data;
}
async function spawnXcodeBuildWithFormat(args, options, { projectRoot , xcodeProject  }) {
    _log.debug(`  xcodebuild ${args.join(" ")}`);
    logPrettyItem(_chalk().default.bold`Planning build`);
    const formatter = _xcpretty().ExpoRunFormatter.create(projectRoot, {
        xcodeProject,
        isDebug: _env.env.EXPO_DEBUG
    });
    const results = await spawnXcodeBuildWithFlush(args, options, {
        onFlush (data) {
            // Process data.
            for (const line of formatter.pipe(data)){
                // Log parsed results.
                _log.log(line);
            }
        }
    });
    _log.debug(`Exited with code: ${results.code}`);
    if (// User cancelled with ctrl-c
    results.code === null || // Build interrupted
    results.code === 75) {
        throw new _errors.AbortCommandError();
    }
    _log.log(formatter.getBuildSummary());
    return {
        ...results,
        formatter
    };
}
async function buildAsync(props) {
    const args = await getXcodeBuildArgsAsync(props);
    const { projectRoot , xcodeProject , shouldSkipInitialBundling , port  } = props;
    const { code , results , formatter , error  } = await spawnXcodeBuildWithFormat(args, getProcessOptions({
        packager: false,
        terminal: (0, _terminal.getUserTerminal)(),
        shouldSkipInitialBundling,
        port
    }), {
        projectRoot,
        xcodeProject
    });
    const logFilePath = writeBuildLogs(projectRoot, results, error);
    if (code !== 0) {
        // Determine if the logger found any errors;
        const wasErrorPresented = !!formatter.errors.length;
        if (wasErrorPresented) {
            // This has a flaw, if the user is missing a file, and there is a script error, only the missing file error will be shown.
            // They will only see the script error if they fix the missing file and rerun.
            // The flaw can be fixed by catching script errors in the custom logger.
            throw new _errors.CommandError(`Failed to build iOS project. "xcodebuild" exited with error code ${code}.`);
        }
        _assertXcodeBuildResults(code, results, error, xcodeProject, logFilePath);
    }
    return results;
}
function _assertXcodeBuildResults(code, results, error, xcodeProject, logFilePath) {
    var ref;
    const errorTitle = `Failed to build iOS project. "xcodebuild" exited with error code ${code}.`;
    const throwWithMessage = (message)=>{
        throw new _errors.CommandError(`${errorTitle}\nTo view more error logs, try building the app with Xcode directly, by opening ${xcodeProject.name}.\n\n` + message + `Build logs written to ${_chalk().default.underline(logFilePath)}`);
    };
    const localizedError = (ref = error.match(/NSLocalizedFailure = "(.*)"/)) == null ? void 0 : ref[1];
    if (localizedError) {
        throwWithMessage(_chalk().default.bold(localizedError) + "\n\n");
    }
    // Show all the log info because often times the error is coming from a shell script,
    // that invoked a node script, that started metro, which threw an error.
    throwWithMessage(results + "\n\n" + error);
}
function writeBuildLogs(projectRoot, buildOutput, errorOutput) {
    const [logFilePath, errorFilePath] = getErrorLogFilePath(projectRoot);
    _fs().default.writeFileSync(logFilePath, buildOutput);
    _fs().default.writeFileSync(errorFilePath, errorOutput);
    return logFilePath;
}
function getErrorLogFilePath(projectRoot) {
    const folder = _path().default.join(projectRoot, ".expo");
    (0, _dir.ensureDirectory)(folder);
    return [
        _path().default.join(folder, "xcodebuild.log"),
        _path().default.join(folder, "xcodebuild-error.log")
    ];
}

//# sourceMappingURL=XcodeBuild.js.map