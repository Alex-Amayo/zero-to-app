"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const stacktrace_js_1 = __importDefault(require("stacktrace-js"));
/**
 * {@link call} shortcut that only returns the output files.
 */
async function Call(inputFiles, command) {
    const result = await call(inputFiles, command);
    for (let outputFile of result.outputFiles) {
        outputFile.blob = new Blob([outputFile.buffer]);
    }
    return result.outputFiles;
}
exports.Call = Call;
/**
 * Low level execution function. All the other functions like [execute](https://github.com/KnicKnic/WASM-ImageMagick/tree/master/apidocs#execute)
 * ends up calling this one. It accept only one command and only in the form of array of strings.
 */
function call(inputFiles, command) {
    const request = {
        files: inputFiles,
        args: command,
        requestNumber: magickWorkerPromisesKey,
    };
    // let transfer = [];
    // for (let file of request.files) {
    //   if(file.content instanceof ArrayBuffer)
    //   {
    //     transfer.push(file.content)
    //   }
    //   else{
    //     transfer.push(file.content.buffer)
    //   }
    // }
    const promise = CreatePromiseEvent();
    magickWorkerPromises[magickWorkerPromisesKey] = promise;
    magickWorker.postMessage(request); //,transfer)
    magickWorkerPromisesKey++;
    return promise;
}
exports.call = call;
function CreatePromiseEvent() {
    let resolver;
    let rejecter;
    const emptyPromise = new Promise((resolve, reject) => {
        resolver = resolve;
        rejecter = reject;
    });
    emptyPromise.resolve = resolver;
    emptyPromise.reject = rejecter;
    return emptyPromise;
}
exports.CreatePromiseEvent = CreatePromiseEvent;
function ChangeUrl(url, fileName) {
    let splitUrl = url.split('/');
    splitUrl[splitUrl.length - 1] = fileName;
    return splitUrl.join('/');
}
function GetCurrentUrlDifferentFilename(currentUrl, fileName) {
    return ChangeUrl(currentUrl, fileName);
}
let currentJavascriptURL = './magickApi.js';
// // instead of doing the sane code of being able to just use import.meta.url 
// // (Edge doesn't work) (safari mobile, chrome, opera, firefox all do)
// // 
// // I will use stacktrace-js library to get the current file name
// //
// try {
//   // @ts-ignore
//   let packageUrl = import.meta.url;
//   currentJavascriptURL = packageUrl;
// } catch (error) {
//   // eat
// }
function GenerateStackAndGetPathAtDepth(depth) {
    try {
        let stacktrace$$1 = stacktrace_js_1.default.getSync();
        let filePath = stacktrace$$1[depth].fileName;
        // if the stack trace code doesn't return a path separator
        if (filePath !== undefined && filePath.indexOf('/') === -1 && filePath.indexOf('\\') === -1) {
            return undefined;
        }
        return filePath;
    }
    catch (error) {
        return undefined;
    }
}
function GetCurrentFileURLHelper3() {
    // 3rd call site didn't work, so I made this complicated maze of helpers.. 
    // Pulling the filename from the 3rd call site of the stacktrace to get the full path
    // to the module. The first index is inconsistent across browsers and does not return 
    // the full path in Safari and results in the worker failing to resolve. 
    // I am preferring to do depth 0 first, as that will ensure people that do minification still works
    let filePath = GenerateStackAndGetPathAtDepth(0);
    if (filePath === undefined) {
        filePath = GenerateStackAndGetPathAtDepth(2);
    }
    // if the stack trace code messes up 
    if (filePath === undefined) {
        filePath = './magickApi.js';
    }
    return filePath;
}
function GetCurrentFileURLHelper2() {
    return GetCurrentFileURLHelper3();
}
function GetCurrentFileURLHelper1() {
    return GetCurrentFileURLHelper2();
}
function GetCurrentFileURL() {
    return GetCurrentFileURLHelper1();
}
currentJavascriptURL = GetCurrentFileURL();
const magickWorkerUrl = GetCurrentUrlDifferentFilename(currentJavascriptURL, 'magick.js');
function GenerateMagickWorkerText(magickUrl) {
    // generates code for the following
    // var magickJsCurrentPath = 'magickUrl';
    // importScripts(magickJsCurrentPath);
    return "var magickJsCurrentPath = '" + magickUrl + "';\n" +
        'importScripts(magickJsCurrentPath);';
}
let magickWorker;
if (currentJavascriptURL.startsWith('http')) {
    // if worker is in a different domain fetch it, and run it
    magickWorker = new Worker(window.URL.createObjectURL(new Blob([GenerateMagickWorkerText(magickWorkerUrl)])));
}
else {
    magickWorker = new Worker(magickWorkerUrl);
}
const magickWorkerPromises = {};
let magickWorkerPromisesKey = 1;
// handle responses as they stream in after being outputFiles by image magick
magickWorker.onmessage = e => {
    const response = e.data;
    const promise = magickWorkerPromises[response.requestNumber];
    delete magickWorkerPromises[response.requestNumber];
    const result = {
        outputFiles: response.outputFiles,
        stdout: response.stdout,
        stderr: response.stderr,
        exitCode: response.exitCode || 0,
    };
    promise.resolve(result);
};
//# sourceMappingURL=magickApi.js.map