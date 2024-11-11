"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
/**
 * Execute `convert $IMG info.json` to extract image metadata. Returns the parsed info.json file contents
 * @param img could be a string in case you want to extract information about built in images like `rose:`
 */
async function extractInfo(img) {
    // TODO: support several input images - we are already returning an array
    let name;
    let imgs;
    if (typeof img !== 'string') {
        imgs = [await __1.asInputFile(img)];
        name = imgs[0].name;
    }
    else {
        name = img;
        imgs = [];
    }
    const processedFiles = await __1.Call(imgs, ['convert', name, 'info.json']);
    try {
        return JSON.parse(await __1.blobToString(processedFiles[0].blob));
    }
    catch (ex) {
        return [{ error: ex }];
    }
}
exports.extractInfo = extractInfo;
//# sourceMappingURL=imageExtractInfo.js.map