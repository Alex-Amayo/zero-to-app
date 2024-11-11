"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const p_map_1 = __importDefault(require("p-map"));
const __1 = require("..");
let builtInImages;
exports.builtInImageNames = ['rose:', 'logo:', 'wizard:', 'granite:', 'netscape:'];
/**
 * Gets ImageMagick built-in images like `rose:`, `logo:`, etc in the form of {@link MagickInputFile}s
 */
async function getBuiltInImages() {
    if (!builtInImages) {
        builtInImages = await p_map_1.default(exports.builtInImageNames, async (name) => {
            const info = await __1.extractInfo(name);
            const { outputFiles } = await __1.execute({ commands: `convert ${name} ${`output1.${info[0].image.format.toLowerCase()}`}` });
            outputFiles[0].name = name;
            return await __1.asInputFile(outputFiles[0]);
        });
    }
    return builtInImages;
}
exports.getBuiltInImages = getBuiltInImages;
/**
 * shortcut of {@link getBuiltInImages} to get a single image by name
 */
async function getBuiltInImage(name) {
    const images = await getBuiltInImages();
    return images.find(f => f.name === name);
}
exports.getBuiltInImage = getBuiltInImage;
//# sourceMappingURL=imageBuiltIn.js.map