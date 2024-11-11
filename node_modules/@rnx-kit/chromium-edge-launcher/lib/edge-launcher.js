/**
 * @license Copyright 2016 Google Inc. All Rights Reserved.
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
exports.launch = exports.killAll = exports.Launcher = void 0;
const childProcess = __importStar(require("child_process"));
const fs = __importStar(require("fs"));
const net = __importStar(require("net"));
const rimraf = __importStar(require("rimraf"));
const edgeFinder = __importStar(require("./edge-finder"));
const flags_1 = require("./flags");
const random_port_1 = require("./random-port");
const utils_1 = require("./utils");
const log = require("lighthouse-logger");
const spawn = childProcess.spawn;
const execSync = childProcess.execSync;
const isWsl = (0, utils_1.getPlatform)() === "wsl";
const isWindows = (0, utils_1.getPlatform)() === "win32";
const _SIGINT = "SIGINT";
const _SIGINT_EXIT_CODE = 130;
const _SUPPORTED_PLATFORMS = new Set(["darwin", "linux", "win32", "wsl"]);
const instances = new Set();
const sigintListener = async () => {
    await killAll();
    process.exit(_SIGINT_EXIT_CODE);
};
async function launch(opts = {}) {
    opts.handleSIGINT = (0, utils_1.defaults)(opts.handleSIGINT, true);
    const instance = new Launcher(opts);
    // Kill spawned Edge process in case of ctrl-C.
    if (opts.handleSIGINT && instances.size === 0) {
        process.on(_SIGINT, sigintListener);
    }
    instances.add(instance);
    await instance.launch();
    const kill = async () => {
        instances.delete(instance);
        if (instances.size === 0) {
            process.removeListener(_SIGINT, sigintListener);
        }
        return instance.kill();
    };
    return {
        pid: instance.pid,
        port: instance.port,
        kill,
        process: instance.edge,
    };
}
exports.launch = launch;
async function killAll() {
    const errors = [];
    for (const instance of instances) {
        try {
            await instance.kill();
            // only delete if kill did not error
            // this means erroring instances remain in the Set
            instances.delete(instance);
        }
        catch (err) {
            errors.push(err);
        }
    }
    return errors;
}
exports.killAll = killAll;
class Launcher {
    constructor(opts = {}, moduleOverrides = {}) {
        this.opts = opts;
        this.tmpDirandPidFileReady = false;
        this.fs = moduleOverrides.fs || fs;
        this.rimraf = moduleOverrides.rimraf || rimraf.default;
        this.spawn = moduleOverrides.spawn || spawn;
        log.setLevel((0, utils_1.defaults)(this.opts.logLevel, "silent"));
        // choose the first one (default)
        this.startingUrl = (0, utils_1.defaults)(this.opts.startingUrl, "about:blank");
        this.edgeFlags = (0, utils_1.defaults)(this.opts.edgeFlags, []);
        this.requestedPort = (0, utils_1.defaults)(this.opts.port, 0);
        this.edgePath = this.opts.edgePath;
        this.ignoreDefaultFlags = (0, utils_1.defaults)(this.opts.ignoreDefaultFlags, false);
        this.connectionPollInterval = (0, utils_1.defaults)(this.opts.connectionPollInterval, 500);
        this.maxConnectionRetries = (0, utils_1.defaults)(this.opts.maxConnectionRetries, 50);
        this.envVars = (0, utils_1.defaults)(opts.envVars, Object.assign({}, process.env));
        if (typeof this.opts.userDataDir === "boolean") {
            if (!this.opts.userDataDir) {
                this.useDefaultProfile = true;
                this.userDataDir = undefined;
            }
            else {
                throw new utils_1.InvalidUserDataDirectoryError();
            }
        }
        else {
            this.useDefaultProfile = false;
            this.userDataDir = this.opts.userDataDir;
        }
    }
    get flags() {
        const flags = this.ignoreDefaultFlags ? [] : flags_1.DEFAULT_FLAGS.slice();
        flags.push(`--remote-debugging-port=${this.port}`);
        if (!this.ignoreDefaultFlags && (0, utils_1.getPlatform)() === "linux") {
            flags.push("--disable-setuid-sandbox");
        }
        if (!this.useDefaultProfile) {
            // Place Edge profile in a custom location we'll rm -rf later
            // If in WSL, we need to use the Windows format
            flags.push(`--user-data-dir=${isWsl ? (0, utils_1.toWinDirFormat)(this.userDataDir) : this.userDataDir}`);
        }
        flags.push(...this.edgeFlags);
        flags.push(this.startingUrl);
        return flags;
    }
    static defaultFlags() {
        return flags_1.DEFAULT_FLAGS.slice();
    }
    /** Returns the highest priority edge installation. */
    static getFirstInstallation() {
        if ((0, utils_1.getPlatform)() === "darwin")
            return edgeFinder.darwinFast();
        return edgeFinder[(0, utils_1.getPlatform)()]()[0];
    }
    // Wrapper function to enable easy testing.
    makeTmpDir() {
        return (0, utils_1.makeTmpDir)();
    }
    prepare() {
        const platform = (0, utils_1.getPlatform)();
        if (!_SUPPORTED_PLATFORMS.has(platform)) {
            throw new utils_1.UnsupportedPlatformError();
        }
        this.userDataDir = this.userDataDir || this.makeTmpDir();
        this.outFile = this.fs.openSync(`${this.userDataDir}/edge-out.log`, "a");
        this.errFile = this.fs.openSync(`${this.userDataDir}/edge-err.log`, "a");
        // fix for Node4
        // you can't pass a fd to fs.writeFileSync
        this.pidFile = `${this.userDataDir}/edge.pid`;
        log.verbose("EdgeLauncher", `created ${this.userDataDir}`);
        this.tmpDirandPidFileReady = true;
    }
    async launch() {
        if (this.requestedPort !== 0) {
            this.port = this.requestedPort;
            // If an explict port is passed first look for an open connection...
            try {
                return await this.isDebuggerReady();
            }
            catch (err) {
                log.log("EdgeLauncher", `No debugging port found on port ${this.port}, launching a new Edge.`);
            }
        }
        if (this.edgePath === undefined) {
            const installation = Launcher.getFirstInstallation();
            if (!installation) {
                throw new utils_1.EdgeNotInstalledError();
            }
            this.edgePath = installation;
        }
        if (!this.tmpDirandPidFileReady) {
            this.prepare();
        }
        this.pid = await this.spawnProcess(this.edgePath);
        return Promise.resolve();
    }
    async spawnProcess(execPath) {
        const spawnPromise = (async () => {
            if (this.edge) {
                log.log("EdgeLauncher", `Edge already running with pid ${this.edge.pid}.`);
                return this.edge.pid;
            }
            // If a zero value port is set, it means the launcher
            // is responsible for generating the port number.
            // We do this here so that we can know the port before
            // we pass it into edge.
            if (this.requestedPort === 0) {
                this.port = await (0, random_port_1.getRandomPort)();
            }
            log.verbose("EdgeLauncher", `Launching with command:\n"${execPath}" ${this.flags.join(" ")}`);
            console.trace("EdgeLauncher", `Launching with command:\n"${execPath}" ${this.flags.join(" ")}`);
            const edge = this.spawn(execPath, this.flags, {
                detached: true,
                stdio: ["ignore", this.outFile, this.errFile],
                env: this.envVars,
            });
            this.edge = edge;
            this.fs.writeFileSync(this.pidFile, edge.pid.toString());
            log.verbose("EdgeLauncher", `Edge running with pid ${edge.pid} on port ${this.port}.`);
            return edge.pid;
        })();
        const pid = await spawnPromise;
        await this.waitUntilReady();
        return pid;
    }
    cleanup(client) {
        if (client) {
            client.removeAllListeners();
            client.end();
            client.destroy();
            client.unref();
        }
    }
    // resolves if ready, rejects otherwise
    isDebuggerReady() {
        return new Promise((resolve, reject) => {
            const client = net.createConnection(this.port);
            client.once("error", (err) => {
                this.cleanup(client);
                reject(err);
            });
            client.once("connect", () => {
                this.cleanup(client);
                resolve();
            });
        });
    }
    // resolves when debugger is ready, rejects after 10 polls
    waitUntilReady() {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const launcher = this;
        return new Promise((resolve, reject) => {
            let retries = 0;
            let waitStatus = "Waiting for browser.";
            const poll = () => {
                if (retries === 0) {
                    log.log("EdgeLauncher", waitStatus);
                }
                retries++;
                waitStatus += "..";
                log.log("EdgeLauncher", waitStatus);
                launcher
                    .isDebuggerReady()
                    .then(() => {
                    log.log("EdgeLauncher", waitStatus + `${log.greenify(log.tick)}`);
                    resolve();
                })
                    .catch((err) => {
                    if (retries > launcher.maxConnectionRetries) {
                        log.error("EdgeLauncher", err.message);
                        const stderr = this.fs.readFileSync(`${this.userDataDir}/edge-err.log`, { encoding: "utf-8" });
                        log.error("EdgeLauncher", `Logging contents of ${this.userDataDir}/edge-err.log`);
                        log.error("EdgeLauncher", stderr);
                        return reject(err);
                    }
                    (0, utils_1.delay)(launcher.connectionPollInterval).then(poll);
                });
            };
            poll();
        });
    }
    kill() {
        return new Promise((resolve, reject) => {
            if (this.edge) {
                this.edge.on("close", () => {
                    delete this.edge;
                    this.destroyTmp().then(resolve);
                });
                log.log("EdgeLauncher", `Killing Edge instance ${this.edge.pid}`);
                try {
                    if (isWindows) {
                        // While pipe is the default, stderr also gets printed to process.stderr
                        // if you don't explicitly set `stdio`
                        execSync(`taskkill /pid ${this.edge.pid} /T /F`, { stdio: "pipe" });
                    }
                    else {
                        process.kill(-this.edge.pid);
                    }
                }
                catch (err) {
                    const message = `Edge could not be killed ${err !== null && err !== void 0 ? err : err.message}`;
                    log.warn("EdgeLauncher", message);
                    reject(new Error(message));
                }
            }
            else {
                // fail silently as we did not start edge
                resolve();
            }
        });
    }
    destroyTmp() {
        return new Promise((resolve) => {
            // Only clean up the tmp dir if we created it.
            if (this.userDataDir === undefined ||
                this.opts.userDataDir !== undefined) {
                return resolve();
            }
            if (this.outFile) {
                this.fs.closeSync(this.outFile);
                delete this.outFile;
            }
            if (this.errFile) {
                this.fs.closeSync(this.errFile);
                delete this.errFile;
            }
            this.rimraf(this.userDataDir, () => resolve());
        });
    }
}
exports.Launcher = Launcher;
// eslint-disable-next-line no-restricted-exports
exports.default = Launcher;
//# sourceMappingURL=edge-launcher.js.map