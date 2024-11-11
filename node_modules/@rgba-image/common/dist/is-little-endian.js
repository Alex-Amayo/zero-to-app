"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getLittleEndian = () => {
    const array = new Uint8Array(4);
    const view = new Uint32Array(array.buffer);
    return !!((view[0] = 1) & array[0]);
};
exports.isLittleEndian = getLittleEndian();
//# sourceMappingURL=is-little-endian.js.map