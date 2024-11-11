var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
import { Decimal } from 'decimal.js';
var VanilaLanczosResizer = /** @class */ (function () {
    function VanilaLanczosResizer() {
        this.lobes = 3;
    }
    VanilaLanczosResizer.prototype.setLobes = function (lobes) {
        this.lobes = lobes;
    };
    VanilaLanczosResizer.prototype.resize = function (source, nativeWidth, nativeHeight, expectedWidth, expectedHeight) {
        var result = new Uint8ClampedArray(expectedWidth * expectedHeight * 4);
        var colorMap = this.generateResizedColorMap(source, { x: nativeWidth, y: nativeHeight }, { x: expectedWidth, y: expectedHeight });
        colorMap.forEach(function (row) {
            var _a = __read(row, 5), index = _a[0], red = _a[1], green = _a[2], blue = _a[3], alpha = _a[4];
            result[index] = red;
            result[index + 1] = green;
            result[index + 2] = blue;
            result[index + 3] = alpha;
        });
        return result;
    };
    VanilaLanczosResizer.prototype.generateResizedColorMap = function (source, native, expected) {
        var lanczos = new Lanczos(native, expected, this.lobes);
        var result = [];
        for (var width = 0; width < expected.x; width++) {
            for (var height = 0; height < expected.y; height++) {
                var _a = __read(lanczos.calculateRGBA(source, width, height), 4), red = _a[0], green = _a[1], blue = _a[2], alpha = _a[3];
                var index = (height * expected.x + width) * 4;
                result.push([index, red, green, blue, alpha]);
            }
        }
        return result;
    };
    return VanilaLanczosResizer;
}());
export default VanilaLanczosResizer;
var Lanczos = /** @class */ (function () {
    function Lanczos(native, expected, lobes) {
        this.cacheLanc = {};
        this.native = native;
        this.lobes = lobes;
        this.ratio = {
            x: (new Decimal(native.x)).div(expected.x),
            y: (new Decimal(native.y)).div(expected.y),
        };
        this.rcpRatio = {
            x: (new Decimal(2)).div(this.ratio.x),
            y: (new Decimal(2)).div(this.ratio.y),
        };
        this.range2 = {
            x: Number(this.ratio.x.mul(this.lobes).div(2).ceil().valueOf()),
            y: Number(this.ratio.y.mul(this.lobes).div(2).ceil().valueOf())
        };
    }
    Lanczos.prototype.lanczos = function (x) {
        if (x.gt(this.lobes)) {
            return new Decimal(0);
        }
        var pix = x.mul(Math.PI);
        if (pix.abs().lt(1e-16)) {
            return new Decimal(1);
        }
        var xx = pix.div(this.lobes);
        return pix.sin().mul(xx.sin()).div(pix).div(xx);
    };
    Lanczos.prototype.calculateRGBA = function (srcData, width, height) {
        var _this = this;
        var centerPixel = {
            x: (new Decimal(width)).plus(0.5).mul(this.ratio.x),
            y: (new Decimal(height)).plus(0.5).mul(this.ratio.y)
        };
        var colorCreater = new RGBACreater(srcData);
        this.getIndexes(centerPixel).forEach(function (row) {
            var fX = centerPixel.x.minus(row[0]).abs().mul(1000);
            var fY = centerPixel.y.minus(row[1]).abs().mul(1000);
            var key = [fX.toString(), fY.toString()].join('/');
            if (!_this.cacheLanc[key]) {
                _this.cacheLanc[key] = _this.lanczos(fX.mul(_this.rcpRatio.x).pow(2).plus(fY.mul(_this.rcpRatio.y).pow(2)).sqrt().div(1000));
            }
            var index = (row[1] * _this.native.x + row[0]) * 4;
            colorCreater.add(index, _this.cacheLanc[key]);
        });
        return colorCreater.create();
    };
    Lanczos.prototype.getIndexes = function (centerPixel) {
        var iCenterPixel = {
            x: Number(centerPixel.x.floor().valueOf()),
            y: Number(centerPixel.y.floor().valueOf()),
        };
        var result = [];
        for (var i = iCenterPixel.x - this.range2.x; i <= iCenterPixel.x + this.range2.x; i++) {
            if (i < 0 || i >= this.native.x) {
                continue;
            }
            for (var j = iCenterPixel.y - this.range2.y; j <= iCenterPixel.y + this.range2.y; j++) {
                if (j < 0 || j >= this.native.y) {
                    continue;
                }
                result.push([i, j]);
            }
        }
        return result;
    };
    return Lanczos;
}());
var RGBACreater = /** @class */ (function () {
    function RGBACreater(srcData) {
        this.srcData = srcData;
        this.a = new Decimal(0);
        this.red = new Decimal(0);
        this.green = new Decimal(0);
        this.blue = new Decimal(0);
        this.alpha = new Decimal(0);
    }
    RGBACreater.prototype.add = function (idx, weight) {
        if (weight.lte(0)) {
            return;
        }
        this.a = this.a.plus(weight);
        this.red = this.red.plus(weight.mul(this.srcData[idx]));
        this.green = this.green.plus(weight.mul(this.srcData[idx + 1]));
        this.blue = this.blue.plus(weight.mul(this.srcData[idx + 2]));
        this.alpha = this.alpha.plus(weight.mul(this.srcData[idx + 3]));
    };
    RGBACreater.prototype.create = function () {
        return [
            this.red.div(this.a).round().toNumber(),
            this.green.div(this.a).round().toNumber(),
            this.blue.div(this.a).round().toNumber(),
            this.alpha.div(this.a).round().toNumber()
        ];
    };
    return RGBACreater;
}());
