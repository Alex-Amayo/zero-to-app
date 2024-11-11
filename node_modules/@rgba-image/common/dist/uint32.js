"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rgbaToUint32 = (r, g, b, a, isLittleEndian = false) => isLittleEndian ?
    (a << 24) | (b << 16) | (g << 8) | r :
    (r << 24) | (g << 16) | (b << 8) | a;
exports.uint32ToRgba = (v, isLittleEndian = false) => isLittleEndian ?
    [v & 255, (v >> 8) & 255, (v >> 16) & 255, (v >> 24) & 255] :
    [(v >> 24) & 255, (v >> 16) & 255, (v >> 8) & 255, v & 255];
//# sourceMappingURL=uint32.js.map