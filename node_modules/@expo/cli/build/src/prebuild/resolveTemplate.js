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
    cloneTemplateAsync: ()=>cloneTemplateAsync,
    resolveTemplateArgAsync: ()=>resolveTemplateArgAsync
});
function _assert() {
    const data = /*#__PURE__*/ _interopRequireDefault(require("assert"));
    _assert = function() {
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
function _fs() {
    const data = /*#__PURE__*/ _interopRequireDefault(require("fs"));
    _fs = function() {
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
function _semver() {
    const data = /*#__PURE__*/ _interopRequireDefault(require("semver"));
    _semver = function() {
        return data;
    };
    return data;
}
const _client = require("../api/rest/client");
const _log = /*#__PURE__*/ _interopRequireWildcard(require("../log"));
const _createFileTransform = require("../utils/createFileTransform");
const _errors = require("../utils/errors");
const _npm = require("../utils/npm");
const _url = require("../utils/url");
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
const debug = require("debug")("expo:prebuild:resolveTemplate");
async function cloneTemplateAsync({ templateDirectory , template , exp , ora  }) {
    if (template) {
        return await resolveTemplateArgAsync(templateDirectory, ora, exp.name, template);
    } else {
        const templatePackageName = await getTemplateNpmPackageName(exp.sdkVersion);
        return await (0, _npm.downloadAndExtractNpmModuleAsync)(templatePackageName, {
            cwd: templateDirectory,
            name: exp.name
        });
    }
}
/** Given an `sdkVersion` like `44.0.0` return a fully qualified NPM package name like: `expo-template-bare-minimum@sdk-44` */ function getTemplateNpmPackageName(sdkVersion) {
    // When undefined or UNVERSIONED, we use the latest version.
    if (!sdkVersion || sdkVersion === "UNVERSIONED") {
        _log.log("Using an unspecified Expo SDK version. The latest template will be used.");
        return `expo-template-bare-minimum@latest`;
    }
    return `expo-template-bare-minimum@sdk-${_semver().default.major(sdkVersion)}`;
}
async function getRepoInfo(url, examplePath) {
    const [, username, name, t, _branch, ...file] = url.pathname.split("/");
    const filePath = examplePath ? examplePath.replace(/^\//, "") : file.join("/");
    // Support repos whose entire purpose is to be an example, e.g.
    // https://github.com/:username/:my-cool-example-repo-name.
    if (t === undefined) {
        const infoResponse = await (0, _client.fetchAsync)(`https://api.github.com/repos/${username}/${name}`);
        if (infoResponse.status !== 200) {
            return;
        }
        const info = await infoResponse.json();
        return {
            username,
            name,
            branch: info["default_branch"],
            filePath
        };
    }
    // If examplePath is available, the branch name takes the entire path
    const branch = examplePath ? `${_branch}/${file.join("/")}`.replace(new RegExp(`/${filePath}|/$`), "") : _branch;
    if (username && name && branch && t === "tree") {
        return {
            username,
            name,
            branch,
            filePath
        };
    }
    return undefined;
}
function hasRepo({ username , name , branch , filePath  }) {
    const contentsUrl = `https://api.github.com/repos/${username}/${name}/contents`;
    const packagePath = `${filePath ? `/${filePath}` : ""}/package.json`;
    return (0, _url.isUrlOk)(contentsUrl + packagePath + `?ref=${branch}`);
}
async function downloadAndExtractRepoAsync({ username , name , branch , filePath  }, props) {
    const url = `https://codeload.github.com/${username}/${name}/tar.gz/${branch}`;
    debug("Downloading tarball from:", url);
    // Extract the (sub)directory into non-empty path segments
    const directory = filePath.replace(/^\//, "").split("/").filter(Boolean);
    // Remove the (sub)directory paths, and the root folder added by GitHub
    const strip = directory.length + 1;
    // Only extract the relevant (sub)directories, ignoring irrelevant files
    // The filder auto-ignores dotfiles, unless explicitly included
    const filter = (0, _createFileTransform.createGlobFilter)(!directory.length ? [
        "*/**",
        "*/ios/.xcode.env"
    ] : [
        `*/${directory.join("/")}/**`,
        `*/${directory.join("/")}/ios/.xcode.env`
    ], {
        // Always ignore the `.xcworkspace` folder
        ignore: [
            "**/ios/*.xcworkspace/**"
        ]
    });
    return await (0, _npm.extractNpmTarballFromUrlAsync)(url, {
        ...props,
        strip,
        filter
    });
}
async function resolveTemplateArgAsync(templateDirectory, oraInstance, appName, template, templatePath) {
    (0, _assert().default)(template, "template is required");
    let repoUrl;
    try {
        repoUrl = new URL(template);
    } catch (error) {
        if (error.code !== "ERR_INVALID_URL") {
            oraInstance.fail(error);
            throw error;
        }
    }
    // On Windows, we can actually create a URL from a local path
    // Double-check if the created URL is not a path to avoid mixing up URLs and paths
    if (process.platform === "win32" && repoUrl && _path().default.isAbsolute(repoUrl.toString())) {
        repoUrl = undefined;
    }
    if (!repoUrl) {
        const templatePath1 = _path().default.resolve(template);
        if (!_fs().default.existsSync(templatePath1)) {
            throw new _errors.CommandError(`template file does not exist: ${templatePath1}`);
        }
        return await (0, _npm.extractLocalNpmTarballAsync)(templatePath1, {
            cwd: templateDirectory,
            name: appName
        });
    }
    if (repoUrl.origin !== "https://github.com") {
        oraInstance.fail(`Invalid URL: ${_chalk().default.red(`"${template}"`)}. Only GitHub repositories are supported. Please use a GitHub URL and try again.`);
        throw new _errors.AbortCommandError();
    }
    const repoInfo = await getRepoInfo(repoUrl, templatePath);
    if (!repoInfo) {
        oraInstance.fail(`Found invalid GitHub URL: ${_chalk().default.red(`"${template}"`)}. Please fix the URL and try again.`);
        throw new _errors.AbortCommandError();
    }
    const found = await hasRepo(repoInfo);
    if (!found) {
        oraInstance.fail(`Could not locate the repository for ${_chalk().default.red(`"${template}"`)}. Please check that the repository exists and try again.`);
        throw new _errors.AbortCommandError();
    }
    oraInstance.text = _chalk().default.bold(`Downloading files from repo ${_chalk().default.cyan(template)}. This might take a moment.`);
    return await downloadAndExtractRepoAsync(repoInfo, {
        cwd: templateDirectory,
        name: appName
    });
}

//# sourceMappingURL=resolveTemplate.js.map