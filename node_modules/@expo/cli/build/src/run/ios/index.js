#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "expoRunIos", {
    enumerable: true,
    get: ()=>expoRunIos
});
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
const _args = require("../../utils/args");
const _errors = require("../../utils/errors");
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
const expoRunIos = async (argv)=>{
    const rawArgsMap = {
        // Types
        "--help": Boolean,
        "--no-build-cache": Boolean,
        "--no-install": Boolean,
        "--no-bundler": Boolean,
        "--configuration": String,
        "--port": Number,
        // Aliases
        "-p": "--port",
        "-h": "--help"
    };
    const args = (0, _args.assertWithOptionsArgs)(rawArgsMap, {
        argv,
        permissive: true
    });
    // '-d' -> '--device': Boolean,
    // '--scheme': String,
    if (args["--help"]) {
        (0, _args.printHelp)(`Run the iOS app binary locally`, `npx expo run:ios`, [
            `--no-build-cache                 Clear the native derived data before building`,
            `--no-install                     Skip installing dependencies`,
            `--no-bundler                     Skip starting the Metro bundler`,
            `--scheme [scheme]                Scheme to build`,
            (0, _chalk().default)`--configuration <configuration>  Xcode configuration to use. Debug or Release. {dim Default: Debug}`,
            `-d, --device [device]            Device name or UDID to build the app on`,
            (0, _chalk().default)`-p, --port <port>                Port to start the Metro bundler on. {dim Default: 8081}`,
            `-h, --help                       Usage info`, 
        ].join("\n"), [
            "",
            (0, _chalk().default)`  Build for production (unsigned) with the {bold Release} configuration:`,
            (0, _chalk().default)`    {dim $} npx expo run:ios --configuration Release`,
            "", 
        ].join("\n"));
    }
    const { resolveStringOrBooleanArgsAsync  } = await Promise.resolve().then(()=>/*#__PURE__*/ _interopRequireWildcard(require("../../utils/resolveArgs.js")));
    const parsed = await resolveStringOrBooleanArgsAsync(argv != null ? argv : [], rawArgsMap, {
        "--scheme": Boolean,
        "--device": Boolean,
        "-d": "--device"
    }).catch(_errors.logCmdError);
    const { runIosAsync  } = await Promise.resolve().then(()=>/*#__PURE__*/ _interopRequireWildcard(require("./runIosAsync.js")));
    return runIosAsync(_path().default.resolve(parsed.projectRoot), {
        // Parsed options
        buildCache: !args["--no-build-cache"],
        install: !args["--no-install"],
        bundler: !args["--no-bundler"],
        port: args["--port"],
        // Custom parsed args
        device: parsed.args["--device"],
        scheme: parsed.args["--scheme"],
        configuration: parsed.args["--configuration"]
    }).catch(_errors.logCmdError);
};

//# sourceMappingURL=index.js.map