"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIndex = (x, y, width, channels = 4) => {
    x = x | 0;
    y = y | 0;
    width = width | 0;
    channels = channels | 0;
    return (y * width + x) * channels;
};
//# sourceMappingURL=get-index.js.map