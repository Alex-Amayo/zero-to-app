"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lanczos2 = exports.lanczos = void 0;
const copy_1 = require("@rgba-image/copy");
const create_image_1 = require("@rgba-image/create-image");
const filters_1 = require("./filters");
const convolve_1 = require("./convolve");
const resize = (source, dest, use2 = false) => {
    const xRatio = dest.width / source.width;
    const yRatio = dest.height / source.height;
    const filtersX = filters_1.filters(source.width, dest.width, xRatio, 0, use2);
    const filtersY = filters_1.filters(source.height, dest.height, yRatio, 0, use2);
    const tmp = new Uint8ClampedArray(dest.width * source.height * 4);
    convolve_1.convolve(source.data, tmp, source.width, source.height, dest.width, filtersX);
    convolve_1.convolve(tmp, dest.data, source.height, dest.width, dest.height, filtersY);
};
const lanczos = (source, dest, sx = 0, sy = 0, sw = source.width - sx, sh = source.height - sy, dx = 0, dy = 0, dw = dest.width - dx, dh = dest.height - dy) => {
    sx = sx | 0;
    sy = sy | 0;
    sw = sw | 0;
    sh = sh | 0;
    dx = dx | 0;
    dy = dy | 0;
    dw = dw | 0;
    dh = dh | 0;
    if (sw <= 0 || sh <= 0 || dw <= 0 || dh <= 0)
        return;
    if (sx === 0 && sy === 0 && sw === source.width && sh === source.height && dx === 0 && dy === 0 && dw === dest.width && dh === dest.height) {
        resize(source, dest);
        return;
    }
    /*
      this is more expensive than the way we do in other rgba-lib functions, but
      I don't understand the pica code that I based this on well enough to work
      out how to use regions without doing crops first
  
      however copy is pretty fast compared to lanczos, so the difference is slight
    */
    const croppedSource = create_image_1.createImage(sw, sh);
    const croppedDest = create_image_1.createImage(dw, dh);
    copy_1.copy(source, croppedSource, sx, sy);
    resize(croppedSource, croppedDest);
    copy_1.copy(croppedDest, dest, 0, 0, croppedDest.width, croppedDest.height, dx, dy);
};
exports.lanczos = lanczos;
const lanczos2 = (source, dest, sx = 0, sy = 0, sw = source.width - sx, sh = source.height - sy, dx = 0, dy = 0, dw = dest.width - dx, dh = dest.height - dy) => {
    sx = sx | 0;
    sy = sy | 0;
    sw = sw | 0;
    sh = sh | 0;
    dx = dx | 0;
    dy = dy | 0;
    dw = dw | 0;
    dh = dh | 0;
    if (sw <= 0 || sh <= 0 || dw <= 0 || dh <= 0)
        return;
    if (sx === 0 && sy === 0 && sw === source.width && sh === source.height && dx === 0 && dy === 0 && dw === dest.width && dh === dest.height) {
        resize(source, dest, true);
        return;
    }
    /*
      this is more expensive than the way we do in other rgba-lib functions, but
      I don't understand the pica code that I based this on well enough to work
      out how to use regions without doing crops first
  
      however copy is pretty fast compared to lanczos, so the difference is slight
    */
    const croppedSource = create_image_1.createImage(sw, sh);
    const croppedDest = create_image_1.createImage(dw, dh);
    copy_1.copy(source, croppedSource, sx, sy);
    resize(croppedSource, croppedDest, true);
    copy_1.copy(croppedDest, dest, 0, 0, croppedDest.width, croppedDest.height, dx, dy);
};
exports.lanczos2 = lanczos2;
//# sourceMappingURL=index.js.map