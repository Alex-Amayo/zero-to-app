"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
const p_map_1 = __importDefault(require("p-map"));
const misc_1 = require("./util/misc");
const util_1 = require("./util");
/**
 * Execute first command in given config.
 */
async function executeOne(configOrCommand) {
    const config = asExecuteConfig(configOrCommand);
    let result = {
        stderr: [],
        stdout: [],
        outputFiles: [],
        exitCode: 1,
    };
    try {
        config.inputFiles = config.inputFiles || [];
        const command = _1.asCommand(config.commands)[0];
        const t0 = performance.now();
        executeListeners.forEach(listener => listener.beforeExecute({ command, took: performance.now() - t0, id: t0 }));
        result = await _1.call(config.inputFiles, command.map(c => c + ''));
        executeListeners.forEach(listener => listener.afterExecute({ command, took: performance.now() - t0, id: t0 }));
        if (result.exitCode) {
            return Object.assign({}, result, { errors: ['exit code: ' + result.exitCode + ' stderr: ' + result.stderr.join('\n')] });
        }
        return Object.assign({}, result, { errors: [undefined] });
    }
    catch (error) {
        return Object.assign({}, result, { errors: [error + ', exit code: ' + result.exitCode + ', stderr: ' + result.stderr.join('\n')] });
    }
}
exports.executeOne = executeOne;
function isExecuteCommand(arg) {
    return !!arg.commands;
}
exports.isExecuteCommand = isExecuteCommand;
/**
 * Transform  `configOrCommand: ExecuteConfig | ExecuteCommand` to a valid ExecuteConfig object
 */
function asExecuteConfig(arg) {
    if (isExecuteCommand(arg)) {
        return arg;
    }
    return {
        inputFiles: [],
        commands: arg,
    };
}
exports.asExecuteConfig = asExecuteConfig;
/**
 * `execute()` shortcut that useful for commands that return only one output file or when only one particular output file is relevant.
 * @param outputFileName optionally user can give the desired output file name
 * @returns If `outputFileName` is given the file with that name, the first output file otherwise or undefined
 * if no file match, or no output files where generated (like in an error).
 */
async function executeAndReturnOutputFile(configOrCommand, outputFileName) {
    const config = asExecuteConfig(configOrCommand);
    const result = await execute(config);
    return outputFileName ? result.outputFiles.find(f => f.name === outputFileName) : (result.outputFiles.length && result.outputFiles[0] || undefined);
}
exports.executeAndReturnOutputFile = executeAndReturnOutputFile;
const executeListeners = [];
function addExecuteListener(l) {
    executeListeners.push(l);
}
exports.addExecuteListener = addExecuteListener;
/**
 * Execute all commands in given config serially in order. Output files from a command become available as
 * input files in next commands. In the following example we execute two commands. Notice how the second one uses `image2.png` which was the output file of the first one:
 *
 * ```ts
 * const { outputFiles, exitCode, stderr} = await execute({
 *   inputFiles: [await buildInputFile('fn.png', 'image1.png')],
 *   commands: `
 *     convert image1.png -bordercolor #ffee44 -background #eeff55 +polaroid image2.png
 *     convert image2.png -fill #997711 -tint 55 image3.jpg
 * `
 * })
 * if (exitCode) {
 *   alert(`There was an error with the command: ${stderr.join('\n')}`)
 * }
 * else {
 *   await loadImageElement(outputFiles.find(f => f.name==='image3.jpg'), document.getElementById('outputImage'))
 * }
 * ```
 *
 * See {@link ExecuteCommand} for different command syntax supported.
 *
 * See {@link ExecuteResult} for details on the object returned
 */
async function execute(configOrCommand) {
    const config = asExecuteConfig(configOrCommand);
    config.inputFiles = config.inputFiles || [];
    const allOutputFiles = {};
    const allInputFiles = {};
    config.inputFiles.forEach(f => {
        allInputFiles[f.name] = f;
    });
    let allErrors = [];
    const results = [];
    let allStdout = [];
    let allStderr = [];
    async function mapper(c) {
        const thisConfig = {
            inputFiles: misc_1.values(allInputFiles),
            commands: [c],
        };
        const result = await executeOne(thisConfig);
        results.push(result);
        allErrors = allErrors.concat(result.errors || []);
        allStdout = allStdout.concat(result.stdout || []);
        allStderr = allStderr.concat(result.stderr || []);
        await p_map_1.default(result.outputFiles, async (f) => {
            allOutputFiles[f.name] = f;
            const inputFile = await util_1.asInputFile(f);
            allInputFiles[inputFile.name] = inputFile;
        });
    }
    const commands = _1.asCommand(config.commands);
    await p_map_1.default(commands, mapper, { concurrency: 1 });
    const resultWithError = results.find(r => r.exitCode !== 0);
    return {
        outputFiles: misc_1.values(allOutputFiles),
        errors: allErrors,
        results,
        stdout: allStdout,
        stderr: allStderr,
        exitCode: resultWithError ? resultWithError.exitCode : 0,
    };
}
exports.execute = execute;
//# sourceMappingURL=execute.js.map