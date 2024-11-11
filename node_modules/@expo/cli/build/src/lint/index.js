"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "expoLint", {
    enumerable: true,
    get: ()=>expoLint
});
const _args = require("../utils/args");
const _errors = require("../utils/errors");
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
const expoLint = async (argv)=>{
    const args = (0, _args.assertArgs)({
        // Types
        "--help": Boolean,
        // Aliases
        "-h": "--help"
    }, argv);
    if (args["--help"]) {
        (0, _args.printHelp)("Utility to run ESLint. Prompts to install and configure if not yet set up.", "npx expo lint", "-h, --help    Usage info");
    }
    // Load modules after the help prompt so `npx expo lint -h` shows as fast as possible.
    const { lintAsync  } = await Promise.resolve().then(()=>/*#__PURE__*/ _interopRequireWildcard(require("./lintAsync.js")));
    const projectRoot = (0, _args.getProjectRoot)(args);
    return lintAsync(projectRoot).catch(_errors.logCmdError);
};

//# sourceMappingURL=index.js.map