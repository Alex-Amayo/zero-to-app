"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const execute_1 = require("../execute");
function blobToUint8Array(blob) {
    return new Promise(resolve => {
        const fileReader = new FileReader();
        fileReader.onload = event => {
            const result = event.target.result;
            resolve(new Uint8Array(result));
        };
        fileReader.readAsArrayBuffer(blob);
    });
}
function blobToString(blb) {
    return new Promise(resolve => {
        const reader = new FileReader();
        reader.addEventListener('loadend', e => {
            const text = e.srcElement.result;
            resolve(text);
        });
        reader.readAsText(blb);
    });
}
exports.blobToString = blobToString;
function isInputFile(file) {
    return !!file.content;
}
exports.isInputFile = isInputFile;
function isOutputFile(file) {
    return !!file.blob;
}
exports.isOutputFile = isOutputFile;
function uint8ArrayToString(arr, charset = 'utf-8') {
    return new TextDecoder(charset).decode(arr);
}
/**
 * Read files as string. Useful when files contains plain text like in the output file info.txt of `convert logo: -format '%[pixel:p{0,0}]' info:info.txt`
 */
async function readFileAsText(file) {
    if (isInputFile(file)) {
        return uint8ArrayToString(file.content);
    }
    if (isOutputFile(file)) {
        return await blobToString(file.blob);
    }
}
exports.readFileAsText = readFileAsText;
async function isImage(file) {
    const { exitCode } = await execute_1.execute({ inputFiles: [await asInputFile(file)], commands: `identify ${file.name}` });
    return exitCode === 0;
}
exports.isImage = isImage;
/**
 * Builds a new {@link MagickInputFile} by fetching the content of given url and optionally naming the file using given name
 * or extracting the file name from the url otherwise.
 */
async function buildInputFile(url, name = getFileName(url)) {
    const fetchedSourceImage = await fetch(url);
    const arrayBuffer = await fetchedSourceImage.arrayBuffer();
    const content = new Uint8Array(arrayBuffer);
    return { name, content };
}
exports.buildInputFile = buildInputFile;
function uint8ArrayToBlob(arr) {
    return new Blob([arr]);
}
async function outputFileToInputFile(file, name = file.name) {
    return {
        name,
        content: await blobToUint8Array(file.blob),
    };
}
function inputFileToOutputFile(file, name = file.name) {
    return {
        name,
        blob: uint8ArrayToBlob(file.content),
    };
}
async function asInputFile(f, name = f.name) {
    let inputFile;
    if (isOutputFile(f)) {
        inputFile = await outputFileToInputFile(f);
    }
    else {
        inputFile = f;
    }
    inputFile.name = name;
    return inputFile;
}
exports.asInputFile = asInputFile;
async function asOutputFile(f, name = f.name) {
    let outputFile;
    if (isInputFile(f)) {
        outputFile = inputFileToOutputFile(f);
    }
    else {
        outputFile = f;
    }
    outputFile.name = name;
    return outputFile;
}
exports.asOutputFile = asOutputFile;
function getFileName(url) {
    try {
        return decodeURIComponent(new URL(url).pathname.split('/').pop());
    }
    catch (error) {
        const s = `http://foo.com/${url}`;
        try {
            return decodeURIComponent(new URL(s).pathname.split('/').pop());
        }
        catch (error) {
            return url;
        }
    }
}
exports.getFileName = getFileName;
function getFileNameExtension(filePathOrUrl) {
    const s = getFileName(filePathOrUrl);
    return s.substring(s.lastIndexOf('.') + 1, s.length);
}
exports.getFileNameExtension = getFileNameExtension;
//# sourceMappingURL=file.js.map