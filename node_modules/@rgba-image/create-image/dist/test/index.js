"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
const __1 = require("..");
describe('create-image', () => {
    describe('createImage', () => {
        it('accepts valid width and height', () => {
            assert.doesNotThrow(() => __1.createImage(5, 5));
        });
        it('transparent rectangle if no data', () => {
            const { width, height, data } = __1.createImage(5, 5);
            for (let y = 0; y < height; y++) {
                for (let x = 0; x < width; x++) {
                    const i = y * width + x;
                    const j = i * 4;
                    const r = data[j];
                    const g = data[j + 1];
                    const b = data[j + 2];
                    const a = data[j + 3];
                    assert.strictEqual(r, 0);
                    assert.strictEqual(g, 0);
                    assert.strictEqual(b, 0);
                    assert.strictEqual(a, 0);
                }
            }
        });
        it('accepts valid width, height and data', () => {
            const data = new Uint8ClampedArray(5 * 5 * 4);
            assert.doesNotThrow(() => __1.createImage(5, 5, data));
        });
        it('not enough arguments', () => {
            assert.throws(() => __1.createImage());
            assert.throws(() => __1.createImage(5));
        });
        it('bad arguments', () => {
            assert.throws(() => __1.createImage('foo', 'bar'));
            assert.throws(() => __1.createImage(5, 0));
            assert.throws(() => __1.createImage(5, -1));
            assert.throws(() => __1.createImage(0, 5));
            assert.throws(() => __1.createImage(-1, 5));
            assert.throws(() => __1.createImage(2, 2, []));
            assert.throws(() => __1.createImage(5, 5, new Uint8ClampedArray(25)));
            assert.throws(() => __1.createImage(5, 5, new Uint8ClampedArray(101)));
        });
    });
    describe('CreateImageFactory', () => {
        const fillR = 51;
        const fillG = 153;
        const fillB = 255;
        const fillA = 127;
        const fill = [fillR, fillG, fillB, fillA];
        it('uses fill', () => {
            const createImageWithFill = __1.CreateImageFactory(fill);
            const { width, height, data } = createImageWithFill(5, 5);
            for (let y = 0; y < height; y++) {
                for (let x = 0; x < width; x++) {
                    const i = (y * width + x) * 4;
                    const r = data[i];
                    const g = data[i + 1];
                    const b = data[i + 2];
                    const a = data[i + 3];
                    assert.strictEqual(r, fillR);
                    assert.strictEqual(g, fillG);
                    assert.strictEqual(b, fillB);
                    assert.strictEqual(a, fillA);
                }
            }
        });
        it('fill is iterable', () => {
            const ints = new Int8Array([fillR, fillG, fillB, fillA]);
            assert.doesNotThrow(() => __1.CreateImageFactory(ints));
        });
        it('channels must be a positive non-zero number', () => {
            assert.throws(() => __1.CreateImageFactory(fill, ''));
            assert.throws(() => __1.CreateImageFactory(fill, 0));
        });
        it('fill must be iterable with n channels', () => {
            assert.throws(() => __1.CreateImageFactory([]));
            assert.throws(() => __1.CreateImageFactory(null));
            assert.throws(() => __1.CreateImageFactory('1234'));
        });
    });
});
//# sourceMappingURL=index.js.map