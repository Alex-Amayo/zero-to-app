"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
const fs = require("fs");
const png_1 = require("@rgba-image/png");
const create_image_1 = require("@rgba-image/create-image");
const __1 = require("..");
const patternPng = fs.readFileSync('./src/test/fixtures/pattern.png');
const patternCopyPng = fs.readFileSync('./src/test/fixtures/pattern-copy.png');
const pattern = png_1.fromPng(patternPng);
const patternCopy = png_1.fromPng(patternCopyPng);
const getNoise = () => {
    const width = 1024;
    const height = 1024;
    const noise = create_image_1.createImage(width, height);
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const index = (y * width + x) * 4;
            noise.data[index] = (Math.random() * 256) | 0;
            noise.data[index + 1] = (Math.random() * 256) | 0;
            noise.data[index + 2] = (Math.random() * 256) | 0;
            noise.data[index + 3] = (Math.random() * 256) | 0;
        }
    }
    return noise;
};
const allEmpty = (array) => {
    for (let i = 0; i < array.length; i++) {
        if (array[i] !== 0)
            return false;
    }
    return true;
};
const noise = getNoise();
describe('copy', () => {
    it('copies whole image', () => {
        const dest = create_image_1.createImage(8, 8);
        __1.copy(pattern, dest);
        assert.deepEqual(dest, pattern);
    });
    it('copies regions', () => {
        const sourceTopLeft = [
            0, 0, 4, 4
        ];
        const sourceTopRight = [
            4, 0, 4, 4
        ];
        const sourceBottomLeft = [
            0, 4, 4, 4
        ];
        const sourceBottomRight = [
            4, 4, 4, 4
        ];
        const destTopLeft = [
            1, 1
        ];
        const destTopRight = [
            5, 1
        ];
        const destBottomLeft = [
            1, 5
        ];
        const destBottomRight = [
            5, 5
        ];
        const dest = create_image_1.createImage(10, 10);
        __1.copy(pattern, dest, ...sourceTopLeft, ...destBottomRight);
        __1.copy(pattern, dest, ...sourceTopRight, ...destBottomLeft);
        __1.copy(pattern, dest, ...sourceBottomLeft, ...destTopRight);
        __1.copy(pattern, dest, ...sourceBottomRight, ...destTopLeft);
        assert.deepEqual(dest, patternCopy);
    });
    it('does not try to copy outside of source bounds', () => {
        const dest = create_image_1.createImage(8, 8);
        __1.copy(pattern, dest, 0, 0, 10, 10);
        assert.deepEqual(dest, pattern);
    });
    it('does not try to copy outside of dest bounds', () => {
        const dest = create_image_1.createImage(8, 8);
        __1.copy(pattern, dest);
        __1.copy(pattern, dest, 0, 0, 8, 8, 10, 10);
        assert.deepEqual(dest, pattern);
    });
    it('does an early return when sw or sh are 0', () => {
        const swDest = create_image_1.createImage(8, 8);
        const shDest = create_image_1.createImage(8, 8);
        __1.copy(pattern, swDest, 0, 0, 0, 8);
        __1.copy(pattern, shDest, 0, 0, 8, 0);
        assert(allEmpty(swDest.data));
        assert(allEmpty(shDest.data));
    });
    // no test, just lazy benchmarking
    it('big copy', () => {
        const dest = create_image_1.createImage(768, 768);
        __1.copy(noise, dest, 0, 0, 1280, 1280, 0, 0);
    });
});
//# sourceMappingURL=index.js.map