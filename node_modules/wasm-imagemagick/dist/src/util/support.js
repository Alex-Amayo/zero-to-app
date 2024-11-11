"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../");
async function getConfigureFolders() {
    const result = await __1.execute(`convert -debug configure rose: info:`);
    const contains = `Searching for configure file:`;
    const folders = result.stderr
        .filter(line => line.includes(contains))
        .map(line => line.substring(line.indexOf(contains) + contains.length, line.length))
        .map(s => s.replace(/\/\//g, '/'))
        .map(s => s.substring(0, s.lastIndexOf('/')))
        .map(s => s.replace(/"/g, '').trim());
    return folders;
}
exports.getConfigureFolders = getConfigureFolders;
// has some heuristic information regarding features (not) supported by wasm-imagemagick, for example, image formats
// heads up - all images spec/assets/to_rotate.* where converted using gimp unless explicitly saying otherwise
/**
 * list of image formats that are known to be supported by wasm-imagemagick. See `spec/formatSpec.ts`
 */
exports.knownSupportedReadWriteImageFormats = [
    'jpg', 'png',
    'psd',
    'tiff', 'xcf', 'gif', 'bmp', 'tga', 'miff', 'ico', 'dcm', 'xpm', 'pcx',
    //  'pix', // gives error
    'fits',
    // 'djvu', // read only support
    'ppm',
    'pgm',
    'pfm',
    'mng',
    'hdr',
    'dds',
    'otb',
    'txt',
];
//# sourceMappingURL=support.js.map