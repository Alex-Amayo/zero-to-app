"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateImageFactory = (fill = [0, 0, 0, 0], channels = 4) => {
    channels = Math.floor(channels);
    if (isNaN(channels) || channels < 1) {
        throw TypeError('channels should be a positive non-zero number');
    }
    if (!('length' in fill) || fill.length < channels) {
        throw TypeError(`fill should be iterable with at least ${channels} members`);
    }
    fill = (new Uint8ClampedArray(fill)).slice(0, channels);
    const allZero = fill.every(v => v === 0);
    const createImage = (width, height, data) => {
        if (width === undefined || height === undefined) {
            throw TypeError('Not enough arguments');
        }
        width = Math.floor(width);
        height = Math.floor(height);
        if (isNaN(width) || width < 1 || isNaN(height) || height < 1) {
            throw TypeError('Index or size is negative or greater than the allowed amount');
        }
        const length = width * height * channels;
        if (data === undefined) {
            data = new Uint8ClampedArray(length);
        }
        if (data instanceof Uint8ClampedArray) {
            if (data.length !== length) {
                throw TypeError('Index or size is negative or greater than the allowed amount');
            }
            if (!allZero) {
                for (let y = 0; y < height; y++) {
                    for (let x = 0; x < width; x++) {
                        const index = (y * width + x) * channels;
                        for (let c = 0; c < channels; c++) {
                            data[index + c] = fill[c];
                        }
                    }
                }
            }
            return {
                get width() { return width; },
                get height() { return height; },
                get data() { return data; }
            };
        }
        throw TypeError('Expected data to be Uint8ClampedArray or undefined');
    };
    return createImage;
};
exports.createImage = exports.CreateImageFactory();
//# sourceMappingURL=index.js.map