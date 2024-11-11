"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
/**
 * Compare the two images and return true if they are equal visually. Optionally, a margin of error can be provided using `fuzz`
 */
async function compare(img1, img2, fuzz = 0.015) {
    const identical = await compareNumber(img1, img2);
    return identical <= fuzz;
}
exports.compare = compare;
async function compareNumber(img1, img2) {
    const imgs = [];
    let name1;
    let name2;
    if (typeof img1 !== 'string') {
        const inputFile = await __1.asInputFile(img1);
        imgs.push(inputFile);
        name1 = inputFile.name;
    }
    else {
        name1 = img1;
    }
    if (typeof img2 !== 'string') {
        const inputFile = await __1.asInputFile(img2);
        imgs.push(inputFile);
        name2 = inputFile.name;
    }
    else {
        name2 = img2;
    }
    const result = await __1.Call(imgs, ['convert', name1, name2, '-resize', '256x256^!', '-metric', 'RMSE', '-format', '%[distortion]', '-compare', 'info:info.txt']);
    const n = await __1.blobToString(result[0].blob);
    return parseFloat(n);
}
exports.compareNumber = compareNumber;
//# sourceMappingURL=imageCompare.js.map