"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convolve = void 0;
const fixedFracBits = 14;
const convolve = (source, dest, sw, sh, dw, filters) => {
    let srcOffset = 0;
    let destOffset = 0;
    // For each row
    for (let sourceY = 0; sourceY < sh; sourceY++) {
        let filterPtr = 0;
        // Apply precomputed filters to each destination row point
        for (let destX = 0; destX < dw; destX++) {
            // Get the filter that determines the current output pixel.
            const filterShift = filters[filterPtr++];
            let srcPtr = (srcOffset + (filterShift * 4)) | 0;
            let r = 0;
            let g = 0;
            let b = 0;
            let a = 0;
            // Apply the filter to the row to get the destination pixel r, g, b, a
            for (let filterSize = filters[filterPtr++]; filterSize > 0; filterSize--) {
                const filterValue = filters[filterPtr++];
                r = (r + filterValue * source[srcPtr]) | 0;
                g = (g + filterValue * source[srcPtr + 1]) | 0;
                b = (b + filterValue * source[srcPtr + 2]) | 0;
                a = (a + filterValue * source[srcPtr + 3]) | 0;
                srcPtr = (srcPtr + 4) | 0;
            }
            // Bring this value back in range. All of the filter scaling factors
            // are in fixed point with fixedFracBits bits of fractional part.
            //
            // (!) Add 1/2 of value before clamping to get proper rounding. In other
            // case brightness loss will be noticeable if you resize image with white
            // border and place it on white background.
            //
            dest[destOffset] = (r + (1 << 13)) >> fixedFracBits;
            dest[destOffset + 1] = (g + (1 << 13)) >> fixedFracBits;
            dest[destOffset + 2] = (b + (1 << 13)) >> fixedFracBits;
            dest[destOffset + 3] = (a + (1 << 13)) >> fixedFracBits;
            destOffset = (destOffset + sh * 4) | 0;
        }
        destOffset = ((sourceY + 1) * 4) | 0;
        srcOffset = ((sourceY + 1) * sw * 4) | 0;
    }
};
exports.convolve = convolve;
/*
  Adapted to typescript from pica: https://github.com/nodeca/pica

  (The MIT License)

  Copyright (C) 2014-2017 by Vitaly Puzrin

  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in
  all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
  THE SOFTWARE.
*/
//# sourceMappingURL=convolve.js.map