/**
 * @license Copyright 2017 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
 */
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLocalAppDataPath = exports.toWinDirFormat = exports.makeTmpDir = exports.getPlatform = exports.EdgeNotInstalledError = exports.UnsupportedPlatformError = exports.InvalidUserDataDirectoryError = exports.EdgePathNotSetError = exports.LauncherError = exports.delay = exports.defaults = exports.LaunchErrorCodes = void 0;
const child_process_1 = require("child_process");
const mkdirp = __importStar(require("mkdirp"));
const path_1 = require("path");
const isWsl = require("is-wsl");
// eslint-disable-next-line @rnx-kit/no-const-enum
var LaunchErrorCodes;
(function (LaunchErrorCodes) {
    LaunchErrorCodes["ERR_LAUNCHER_PATH_NOT_SET"] = "ERR_LAUNCHER_PATH_NOT_SET";
    LaunchErrorCodes["ERR_LAUNCHER_INVALID_USER_DATA_DIRECTORY"] = "ERR_LAUNCHER_INVALID_USER_DATA_DIRECTORY";
    LaunchErrorCodes["ERR_LAUNCHER_UNSUPPORTED_PLATFORM"] = "ERR_LAUNCHER_UNSUPPORTED_PLATFORM";
    LaunchErrorCodes["ERR_LAUNCHER_NOT_INSTALLED"] = "ERR_LAUNCHER_NOT_INSTALLED";
})(LaunchErrorCodes || (exports.LaunchErrorCodes = LaunchErrorCodes = {}));
function defaults(val, def) {
    return typeof val === "undefined" ? def : val;
}
exports.defaults = defaults;
async function delay(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}
exports.delay = delay;
class LauncherError extends Error {
    constructor(message = "Unexpected error", code) {
        super();
        this.message = message;
        this.code = code;
        this.stack = new Error().stack;
        return this;
    }
}
exports.LauncherError = LauncherError;
class EdgePathNotSetError extends LauncherError {
    constructor() {
        super(...arguments);
        this.message = "The EDGE_PATH environment variable must be set to a Edge/Chromium executable no older than Edge stable.";
        this.code = LaunchErrorCodes.ERR_LAUNCHER_PATH_NOT_SET;
    }
}
exports.EdgePathNotSetError = EdgePathNotSetError;
class InvalidUserDataDirectoryError extends LauncherError {
    constructor() {
        super(...arguments);
        this.message = "userDataDir must be false or a path.";
        this.code = LaunchErrorCodes.ERR_LAUNCHER_INVALID_USER_DATA_DIRECTORY;
    }
}
exports.InvalidUserDataDirectoryError = InvalidUserDataDirectoryError;
class UnsupportedPlatformError extends LauncherError {
    constructor() {
        super(...arguments);
        this.message = `Platform ${getPlatform()} is not supported.`;
        this.code = LaunchErrorCodes.ERR_LAUNCHER_UNSUPPORTED_PLATFORM;
    }
}
exports.UnsupportedPlatformError = UnsupportedPlatformError;
class EdgeNotInstalledError extends LauncherError {
    constructor() {
        super(...arguments);
        this.message = "No Edge installations found.";
        this.code = LaunchErrorCodes.ERR_LAUNCHER_NOT_INSTALLED;
    }
}
exports.EdgeNotInstalledError = EdgeNotInstalledError;
function getPlatform() {
    return isWsl ? "wsl" : process.platform;
}
exports.getPlatform = getPlatform;
function makeTmpDir() {
    switch (getPlatform()) {
        case "darwin":
        case "linux":
            return makeUnixTmpDir();
        // @ts-expect-error - Fallthrough case in switch.
        case "wsl":
            // We populate the user's Windows temp dir so the folder is correctly created later
            process.env.TEMP = getLocalAppDataPath(`${process.env.PATH}`);
        // falls through
        case "win32":
            return makeWin32TmpDir();
        default:
            throw new UnsupportedPlatformError();
    }
}
exports.makeTmpDir = makeTmpDir;
function toWinDirFormat(dir = "") {
    const results = /\/mnt\/([a-z])\//.exec(dir);
    if (!results) {
        return dir;
    }
    const driveLetter = results[1];
    return dir
        .replace(`/mnt/${driveLetter}/`, `${driveLetter.toUpperCase()}:\\`)
        .replace(/\//g, "\\");
}
exports.toWinDirFormat = toWinDirFormat;
function getLocalAppDataPath(path) {
    const userRegExp = /\/mnt\/([a-z])\/Users\/([^/:]+)\/AppData\//;
    const results = userRegExp.exec(path) || [];
    return `/mnt/${results[1]}/Users/${results[2]}/AppData/Local`;
}
exports.getLocalAppDataPath = getLocalAppDataPath;
function makeUnixTmpDir() {
    return (0, child_process_1.execSync)("mktemp -d -t lighthouse.XXXXXXX").toString().trim();
}
function makeWin32TmpDir() {
    const winTmpPath = process.env.TEMP ||
        process.env.TMP ||
        (process.env.SystemRoot || process.env.windir) + "\\temp";
    const randomNumber = Math.floor(Math.random() * 9e7 + 1e7);
    const tmpdir = (0, path_1.join)(winTmpPath, "lighthouse." + randomNumber);
    mkdirp.sync(tmpdir);
    return tmpdir;
}
//# sourceMappingURL=utils.js.map