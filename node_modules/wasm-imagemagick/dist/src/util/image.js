"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../");
const file_1 = require("./file");
async function getPixelColor(img, x, y) {
    const file = await __1.executeAndReturnOutputFile({ inputFiles: [await __1.asInputFile(img)], commands: `convert ${img.name} -format '%[pixel:p{${x},${y}}]' info:info.txt` });
    return await file_1.readFileAsText(file);
}
exports.getPixelColor = getPixelColor;
//# sourceMappingURL=image.js.map