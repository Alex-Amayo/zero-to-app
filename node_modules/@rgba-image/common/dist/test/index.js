"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
const __1 = require("../");
describe('common', () => {
    it('gets index', () => {
        const index = __1.getIndex(3, 5, 7);
        assert.strictEqual(index, 152);
    });
    it('isImageData', () => {
        const width = 5;
        const height = 7;
        const data = new Uint8ClampedArray(width * height * 4);
        const empty = new Uint8ClampedArray();
        const pass = { width, height, data };
        assert(__1.isImageData(pass));
        assert(!__1.isImageData(null));
        assert(!__1.isImageData({ width: '0', height, data }));
        assert(!__1.isImageData({ width, height: '0', data }));
        assert(!__1.isImageData({ width: 0, height, data }));
        assert(!__1.isImageData({ width, height: 0, data }));
        assert(!__1.isImageData({ width: 1.1, height, data }));
        assert(!__1.isImageData({ width, height: 1.1, data }));
        assert(!__1.isImageData({ width, height, data: null }));
        assert(!__1.isImageData({ width, height, data: empty }));
    });
    it('isGrayData', () => {
        const width = 5;
        const height = 7;
        const data = new Uint8ClampedArray(width * height);
        const empty = new Uint8ClampedArray();
        const pass = { width, height, data };
        assert(__1.isGrayData(pass));
        assert(!__1.isGrayData(null));
        assert(!__1.isGrayData({ width: '0', height, data }));
        assert(!__1.isGrayData({ width, height: '0', data }));
        assert(!__1.isGrayData({ width: 0, height, data }));
        assert(!__1.isGrayData({ width, height: 0, data }));
        assert(!__1.isGrayData({ width: 1.1, height, data }));
        assert(!__1.isGrayData({ width, height: 1.1, data }));
        assert(!__1.isGrayData({ width, height, data: null }));
        assert(!__1.isGrayData({ width, height, data: empty }));
    });
    it('isRgbaStop', () => {
        const pass = [255, 255, 255, 255, 0];
        assert(__1.isRgbaStop(pass));
        assert(!__1.isRgbaStop(null));
        assert(!__1.isRgbaStop([]));
        assert(!__1.isRgbaStop([255, 255, 255, 255]));
        assert(!__1.isRgbaStop([255, 255, 255, 255, null]));
    });
    it('isRgbaUint32Stop', () => {
        const pass = [1111111111, 0];
        assert(__1.isRgbaUint32Stop(pass));
        assert(!__1.isRgbaUint32Stop(null));
        assert(!__1.isRgbaUint32Stop([]));
        assert(!__1.isRgbaUint32Stop([1111111111]));
        assert(!__1.isRgbaUint32Stop([1111111111, null]));
    });
    it('isChannelStop', () => {
        const pass = [255, 0];
        assert(__1.isChannelStop(pass));
        assert(!__1.isChannelStop(null));
        assert(!__1.isChannelStop([]));
        assert(!__1.isChannelStop([255]));
        assert(!__1.isChannelStop([255, null]));
    });
    it('rgbaToUint32', () => {
        const r = 51;
        const g = 153;
        const b = 255;
        const a = 127;
        const rgba = new Uint8ClampedArray([r, g, b, a]);
        const view = new DataView(rgba.buffer);
        const little = view.getUint32(0, true);
        const big = view.getUint32(0);
        assert.strictEqual(__1.rgbaToUint32(r, g, b, a, true), little);
        assert.strictEqual(__1.rgbaToUint32(r, g, b, a), big);
    });
    it('rgbaToUint32', () => {
        const r = 51;
        const g = 153;
        const b = 255;
        const a = 127;
        const rgba = [r, g, b, a];
        const uint32Little = __1.rgbaToUint32(r, g, b, a, true);
        const uint32Big = __1.rgbaToUint32(r, g, b, a, false);
        const little = __1.uint32ToRgba(uint32Little, true);
        const big = __1.uint32ToRgba(uint32Big);
        assert.deepEqual(little, rgba);
        assert.deepEqual(big, rgba);
    });
    it('clampByte', () => {
        const under = -1;
        const fraction = 123.654;
        const over = 256;
        assert.strictEqual(__1.clampByte(under), 0);
        assert.strictEqual(__1.clampByte(fraction), 123);
        assert.strictEqual(__1.clampByte(over), 255);
    });
    it('clampUint32', () => {
        const under = -1;
        const fraction = 1111111111.654;
        const over = 4294967296;
        assert.strictEqual(__1.clampUint32(under), 0);
        assert.strictEqual(__1.clampUint32(fraction), 1111111111);
        assert.strictEqual(__1.clampUint32(over), 4294967295);
    });
});
//# sourceMappingURL=index.js.map