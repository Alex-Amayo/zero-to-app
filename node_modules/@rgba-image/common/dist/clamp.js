"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clampByte = (value) => value < 0 ? 0 : value > 255 ? 255 : value | 0;
exports.clampUint32 = (value) => value < 0 ? 0 : value > 4294967295 ? 4294967295 : value >>> 0;
//# sourceMappingURL=clamp.js.map