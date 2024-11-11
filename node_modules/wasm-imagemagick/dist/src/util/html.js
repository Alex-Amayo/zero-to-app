"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
// utilities related to HTML (img) elements
/**
 * Will load given html img element src with the inline image content.
 * @param image the image to be loaded
 * @param el the html image element in which to load the image
 * @param forceBrowserSupport if true and the image extension is not supported by browsers, it will convert the image to png
 * and return that src so it can be shown in browsers
 */
async function loadImageElement(image, el, forceBrowserSupport = false) {
    el.src = await buildImageSrc(image, forceBrowserSupport);
}
exports.loadImageElement = loadImageElement;
/**
 * Return a string with the inline image content, suitable to be used to assign to an html img src attribute. See {@link loadImageElement}.
 * @param forceBrowserSupport if true and the image extension is not supported by browsers, it will convert the image to png
 * and return that src so it can be shown in browsers
 */
async function buildImageSrc(image, forceBrowserSupport = false) {
    let img = image;
    const extension = __1.getFileNameExtension(image.name);
    if (!extension || forceBrowserSupport && browserSupportedImageExtensions.indexOf(extension) === -1) {
        const { outputFiles } = await __1.execute({ inputFiles: [await __1.asInputFile(image)], commands: `convert ${image.name} output.png` });
        outputFiles[0].name = image.name;
        img = outputFiles[0];
    }
    const outputFile = await __1.asOutputFile(img);
    return URL.createObjectURL(outputFile.blob);
}
exports.buildImageSrc = buildImageSrc;
/**
 * Build `MagickInputFile[]` from given HTMLInputElement of type=file that user may used to select several files
 */
async function getInputFilesFromHtmlInputElement(el) {
    const files = await inputFileToUint8Array(el);
    return files.map(f => ({ name: f.file.name, content: f.content }));
}
exports.getInputFilesFromHtmlInputElement = getInputFilesFromHtmlInputElement;
const browserSupportedImageExtensions = ['gif', 'png', 'jpg', 'webp'];
function inputFileFiles(el) {
    const files = [];
    for (let i = 0; i < el.files.length; i++) {
        const file = el.files.item(i);
        files.push(file);
    }
    return files;
}
async function inputFileToUint8Array(el) {
    return Promise.all(inputFileFiles(el).map(async (file) => {
        const content = await new Promise(resolve => {
            const reader = new FileReader();
            reader.addEventListener('loadend', e => {
                resolve(new Uint8Array(reader.result));
            });
            reader.readAsArrayBuffer(file);
        });
        return { file, content };
    }));
}
//# sourceMappingURL=html.js.map