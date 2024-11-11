import { lanczos } from '@rgba-image/lanczos';
var LanczosResizer = /** @class */ (function () {
    function LanczosResizer() {
    }
    LanczosResizer.prototype.resize = function (source, nativeWidth, nativeHeight, expectedWidth, expectedHeight) {
        var sourceImageData = (new ImageDataSouce(nativeWidth, nativeHeight, source));
        var destImageData = (new ImageDataSouce(expectedWidth, expectedHeight, new Uint8ClampedArray(expectedWidth * expectedHeight * 4)));
        lanczos(sourceImageData, destImageData);
        return destImageData.data;
    };
    return LanczosResizer;
}());
export default LanczosResizer;
var ImageDataSouce = /** @class */ (function () {
    function ImageDataSouce(width, height, source) {
        this.width = width;
        this.height = height;
        this.data = source;
    }
    return ImageDataSouce;
}());
