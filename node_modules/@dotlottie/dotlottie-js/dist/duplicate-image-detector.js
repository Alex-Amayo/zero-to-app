import { nativeEnum, object, optional, boolean, string, union, literal, number, array, record, any, omit, merge, minValue, maxValue, tuple } from 'valibot';
import 'fflate';

var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};

// ../../node_modules/.pnpm/@rgba-image+copy@0.1.3/node_modules/@rgba-image/copy/dist/index.js
var require_dist = __commonJS({
  "../../node_modules/.pnpm/@rgba-image+copy@0.1.3/node_modules/@rgba-image/copy/dist/index.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.copy = void 0;
    var copy = (source, dest, sx = 0, sy = 0, sw = source.width - sx, sh = source.height - sy, dx = 0, dy = 0) => {
      sx = sx | 0;
      sy = sy | 0;
      sw = sw | 0;
      sh = sh | 0;
      dx = dx | 0;
      dy = dy | 0;
      if (sw <= 0 || sh <= 0)
        return;
      const sourceData = new Uint32Array(source.data.buffer);
      const destData = new Uint32Array(dest.data.buffer);
      for (let y = 0; y < sh; y++) {
        const sourceY = sy + y;
        if (sourceY < 0 || sourceY >= source.height)
          continue;
        const destY = dy + y;
        if (destY < 0 || destY >= dest.height)
          continue;
        for (let x = 0; x < sw; x++) {
          const sourceX = sx + x;
          if (sourceX < 0 || sourceX >= source.width)
            continue;
          const destX = dx + x;
          if (destX < 0 || destX >= dest.width)
            continue;
          const sourceIndex = sourceY * source.width + sourceX;
          const destIndex = destY * dest.width + destX;
          destData[destIndex] = sourceData[sourceIndex];
        }
      }
    };
    exports.copy = copy;
  }
});

// ../../node_modules/.pnpm/@rgba-image+create-image@0.1.1/node_modules/@rgba-image/create-image/dist/index.js
var require_dist2 = __commonJS({
  "../../node_modules/.pnpm/@rgba-image+create-image@0.1.1/node_modules/@rgba-image/create-image/dist/index.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CreateImageFactory = (fill = [0, 0, 0, 0], channels = 4) => {
      channels = Math.floor(channels);
      if (isNaN(channels) || channels < 1) {
        throw TypeError("channels should be a positive non-zero number");
      }
      if (!("length" in fill) || fill.length < channels) {
        throw TypeError(`fill should be iterable with at least ${channels} members`);
      }
      fill = new Uint8ClampedArray(fill).slice(0, channels);
      const allZero = fill.every((v) => v === 0);
      const createImage = (width, height, data) => {
        if (width === void 0 || height === void 0) {
          throw TypeError("Not enough arguments");
        }
        width = Math.floor(width);
        height = Math.floor(height);
        if (isNaN(width) || width < 1 || isNaN(height) || height < 1) {
          throw TypeError("Index or size is negative or greater than the allowed amount");
        }
        const length = width * height * channels;
        if (data === void 0) {
          data = new Uint8ClampedArray(length);
        }
        if (data instanceof Uint8ClampedArray) {
          if (data.length !== length) {
            throw TypeError("Index or size is negative or greater than the allowed amount");
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
            get width() {
              return width;
            },
            get height() {
              return height;
            },
            get data() {
              return data;
            }
          };
        }
        throw TypeError("Expected data to be Uint8ClampedArray or undefined");
      };
      return createImage;
    };
    exports.createImage = exports.CreateImageFactory();
  }
});

// ../../node_modules/.pnpm/@rgba-image+lanczos@0.1.1/node_modules/@rgba-image/lanczos/dist/filters.js
var require_filters = __commonJS({
  "../../node_modules/.pnpm/@rgba-image+lanczos@0.1.1/node_modules/@rgba-image/lanczos/dist/filters.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.filters = void 0;
    var fixedFracBits = 14;
    var filterValue = (x, a) => {
      if (x <= -a || x >= a)
        return 0;
      if (x == 0)
        return 0;
      const xPi = x * Math.PI;
      return Math.sin(xPi) / xPi * Math.sin(xPi / a) / (xPi / a);
    };
    var toFixedPoint = (value) => Math.round(value * ((1 << fixedFracBits) - 1));
    var filters = (srcSize, destSize, scale, offset, use2) => {
      const a = use2 ? 2 : 3;
      const scaleInverted = 1 / scale;
      const scaleClamped = Math.min(1, scale);
      const srcWindow = a / scaleClamped;
      const maxFilterElementSize = Math.floor((srcWindow + 1) * 2);
      const packedFilter = new Int16Array((maxFilterElementSize + 2) * destSize);
      let packedFilterPtr = 0;
      for (let destPixel = 0; destPixel < destSize; destPixel++) {
        const sourcePixel = (destPixel + 0.5) * scaleInverted + offset;
        const sourceFirst = Math.max(0, Math.floor(sourcePixel - srcWindow));
        const sourceLast = Math.min(srcSize - 1, Math.ceil(sourcePixel + srcWindow));
        const filterElementSize = sourceLast - sourceFirst + 1;
        const floatFilter = new Float32Array(filterElementSize);
        const fxpFilter = new Int16Array(filterElementSize);
        let total = 0;
        let index = 0;
        for (let pixel = sourceFirst; pixel <= sourceLast; pixel++) {
          const floatValue = filterValue((pixel + 0.5 - sourcePixel) * scaleClamped, a);
          total += floatValue;
          floatFilter[index] = floatValue;
          index++;
        }
        let filterTotal = 0;
        for (let index2 = 0; index2 < floatFilter.length; index2++) {
          const filterValue2 = floatFilter[index2] / total;
          filterTotal += filterValue2;
          fxpFilter[index2] = toFixedPoint(filterValue2);
        }
        fxpFilter[destSize >> 1] += toFixedPoint(1 - filterTotal);
        let leftNotEmpty = 0;
        while (leftNotEmpty < fxpFilter.length && fxpFilter[leftNotEmpty] === 0) {
          leftNotEmpty++;
        }
        let rightNotEmpty = fxpFilter.length - 1;
        while (rightNotEmpty > 0 && fxpFilter[rightNotEmpty] === 0) {
          rightNotEmpty--;
        }
        const filterShift = sourceFirst + leftNotEmpty;
        const filterSize = rightNotEmpty - leftNotEmpty + 1;
        packedFilter[packedFilterPtr++] = filterShift;
        packedFilter[packedFilterPtr++] = filterSize;
        packedFilter.set(fxpFilter.subarray(leftNotEmpty, rightNotEmpty + 1), packedFilterPtr);
        packedFilterPtr += filterSize;
      }
      return packedFilter;
    };
    exports.filters = filters;
  }
});

// ../../node_modules/.pnpm/@rgba-image+lanczos@0.1.1/node_modules/@rgba-image/lanczos/dist/convolve.js
var require_convolve = __commonJS({
  "../../node_modules/.pnpm/@rgba-image+lanczos@0.1.1/node_modules/@rgba-image/lanczos/dist/convolve.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.convolve = void 0;
    var fixedFracBits = 14;
    var convolve = (source, dest, sw, sh, dw, filters) => {
      let srcOffset = 0;
      let destOffset = 0;
      for (let sourceY = 0; sourceY < sh; sourceY++) {
        let filterPtr = 0;
        for (let destX = 0; destX < dw; destX++) {
          const filterShift = filters[filterPtr++];
          let srcPtr = srcOffset + filterShift * 4 | 0;
          let r = 0;
          let g = 0;
          let b = 0;
          let a = 0;
          for (let filterSize = filters[filterPtr++]; filterSize > 0; filterSize--) {
            const filterValue = filters[filterPtr++];
            r = r + filterValue * source[srcPtr] | 0;
            g = g + filterValue * source[srcPtr + 1] | 0;
            b = b + filterValue * source[srcPtr + 2] | 0;
            a = a + filterValue * source[srcPtr + 3] | 0;
            srcPtr = srcPtr + 4 | 0;
          }
          dest[destOffset] = r + (1 << 13) >> fixedFracBits;
          dest[destOffset + 1] = g + (1 << 13) >> fixedFracBits;
          dest[destOffset + 2] = b + (1 << 13) >> fixedFracBits;
          dest[destOffset + 3] = a + (1 << 13) >> fixedFracBits;
          destOffset = destOffset + sh * 4 | 0;
        }
        destOffset = (sourceY + 1) * 4 | 0;
        srcOffset = (sourceY + 1) * sw * 4 | 0;
      }
    };
    exports.convolve = convolve;
  }
});

// ../../node_modules/.pnpm/@rgba-image+lanczos@0.1.1/node_modules/@rgba-image/lanczos/dist/index.js
var require_dist3 = __commonJS({
  "../../node_modules/.pnpm/@rgba-image+lanczos@0.1.1/node_modules/@rgba-image/lanczos/dist/index.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.lanczos2 = exports.lanczos = void 0;
    var copy_1 = require_dist();
    var create_image_1 = require_dist2();
    var filters_1 = require_filters();
    var convolve_1 = require_convolve();
    var resize = (source, dest, use2 = false) => {
      const xRatio = dest.width / source.width;
      const yRatio = dest.height / source.height;
      const filtersX = filters_1.filters(source.width, dest.width, xRatio, 0, use2);
      const filtersY = filters_1.filters(source.height, dest.height, yRatio, 0, use2);
      const tmp = new Uint8ClampedArray(dest.width * source.height * 4);
      convolve_1.convolve(source.data, tmp, source.width, source.height, dest.width, filtersX);
      convolve_1.convolve(tmp, dest.data, source.height, dest.width, dest.height, filtersY);
    };
    var lanczos2 = (source, dest, sx = 0, sy = 0, sw = source.width - sx, sh = source.height - sy, dx = 0, dy = 0, dw = dest.width - dx, dh = dest.height - dy) => {
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
      const croppedSource = create_image_1.createImage(sw, sh);
      const croppedDest = create_image_1.createImage(dw, dh);
      copy_1.copy(source, croppedSource, sx, sy);
      resize(croppedSource, croppedDest);
      copy_1.copy(croppedDest, dest, 0, 0, croppedDest.width, croppedDest.height, dx, dy);
    };
    exports.lanczos = lanczos2;
    var lanczos22 = (source, dest, sx = 0, sy = 0, sw = source.width - sx, sh = source.height - sy, dx = 0, dy = 0, dw = dest.width - dx, dh = dest.height - dy) => {
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
      const croppedSource = create_image_1.createImage(sw, sh);
      const croppedDest = create_image_1.createImage(dw, dh);
      copy_1.copy(source, croppedSource, sx, sy);
      resize(croppedSource, croppedDest, true);
      copy_1.copy(croppedDest, dest, 0, 0, croppedDest.width, croppedDest.height, dx, dy);
    };
    exports.lanczos2 = lanczos22;
  }
});

// ../../node_modules/.pnpm/browser-image-hash@0.0.5/node_modules/browser-image-hash/dist/HashableImageSourceConverter/DifferenceHash/VanilaConverter.js
var __read = function(o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m)
    return o;
  var i = m.call(o), r, ar = [], e;
  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
      ar.push(r.value);
  } catch (error) {
    e = { error };
  } finally {
    try {
      if (r && !r.done && (m = i["return"]))
        m.call(i);
    } finally {
      if (e)
        throw e.error;
    }
  }
  return ar;
};
var __spreadArray = function(to, from) {
  for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
    to[j] = from[i];
  return to;
};
var VanilaConverter = function() {
  function VanilaConverter2(document, glayScaleCalculator, resizer) {
    this.document = document;
    this.glayScaleCalculator = glayScaleCalculator;
    this.resizer = resizer;
  }
  VanilaConverter2.prototype.createCanvasRenderingContext2D = function(width, height) {
    var canvas = this.document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    canvas.setAttribute("style", "image-rendering: -webkit-optimize-contrast; image-rendering: crisp-edges;");
    var ctx = canvas.getContext("2d");
    if (ctx === null) {
      throw new ReferenceError("undefined CanvasRenderingContext2D");
    }
    ctx.mozImageSmoothingEnabled = true;
    ctx.webkitImageSmoothingEnabled = true;
    ctx.msImageSmoothingEnabled = true;
    ctx.imageSmoothingEnabled = true;
    return ctx;
  };
  VanilaConverter2.prototype.convert = function(source) {
    var _this = this;
    var img = new Image();
    var result = new Promise(function(resolve) {
      img.onload = function() {
        var ctx = _this.createCanvasRenderingContext2D(img.width, img.height);
        ctx.drawImage(img, 0, 0, img.width, img.height);
        var colorMap = ctx.getImageData(0, 0, img.width, img.height).data;
        resolve(colorMap);
      };
    }).then(function(colorMap) {
      return _this.resizer.resize(colorMap, img.width, img.height, source.width, source.height);
    }).then(function(resizedColorMap) {
      var glayArraySouce = __spreadArray([], __read(Array(resizedColorMap.length / 4).keys())).map(function(i) {
        var index = i * 4;
        var _a = __read([
          resizedColorMap[index],
          resizedColorMap[index + 1],
          resizedColorMap[index + 2]
        ], 3), r = _a[0], g = _a[1], b = _a[2];
        return _this.glayScaleCalculator(r, g, b);
      });
      return new Uint8ClampedArray(glayArraySouce);
    });
    img.src = source.url.toString();
    return result;
  };
  return VanilaConverter2;
}();
var VanilaConverter_default = VanilaConverter;

// ../../node_modules/.pnpm/browser-image-hash@0.0.5/node_modules/browser-image-hash/dist/HashSource.js
var HashSource = function() {
  function HashSource2(url, hashSize) {
    if (hashSize === void 0) {
      hashSize = 8;
    }
    this.url = url;
    this.hashSize = hashSize;
    this.width = hashSize + 1;
    this.height = hashSize;
  }
  HashSource2.prototype.calculateArea = function() {
    return this.width * this.height;
  };
  return HashSource2;
}();
var HashSource_default = HashSource;

// ../../node_modules/.pnpm/browser-image-hash@0.0.5/node_modules/browser-image-hash/dist/HashableImageSourceConverter/Resizer/LanczosResizer.js
var import_lanczos = __toESM(require_dist3());
var LanczosResizer = function() {
  function LanczosResizer2() {
  }
  LanczosResizer2.prototype.resize = function(source, nativeWidth, nativeHeight, expectedWidth, expectedHeight) {
    var sourceImageData = new ImageDataSouce(nativeWidth, nativeHeight, source);
    var destImageData = new ImageDataSouce(expectedWidth, expectedHeight, new Uint8ClampedArray(expectedWidth * expectedHeight * 4));
    (0, import_lanczos.lanczos)(sourceImageData, destImageData);
    return destImageData.data;
  };
  return LanczosResizer2;
}();
var LanczosResizer_default = LanczosResizer;
var ImageDataSouce = function() {
  function ImageDataSouce2(width, height, source) {
    this.width = width;
    this.height = height;
    this.data = source;
  }
  return ImageDataSouce2;
}();

// ../../node_modules/.pnpm/browser-image-hash@0.0.5/node_modules/browser-image-hash/dist/Hash.js
var __read2 = function(o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m)
    return o;
  var i = m.call(o), r, ar = [], e;
  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
      ar.push(r.value);
  } catch (error) {
    e = { error };
  } finally {
    try {
      if (r && !r.done && (m = i["return"]))
        m.call(i);
    } finally {
      if (e)
        throw e.error;
    }
  }
  return ar;
};
var __spreadArray2 = function(to, from) {
  for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
    to[j] = from[i];
  return to;
};
var Hash = function() {
  function Hash2(rawHash) {
    if (rawHash.split("").find(function(row) {
      return row !== "1" && row !== "0";
    })) {
      throw new TypeError("Not bits.");
    }
    this.rawHash = rawHash;
  }
  Hash2.prototype.getHammingDistance = function(hash) {
    if (this.rawHash.length !== hash.rawHash.length) {
      throw new TypeError("Not equal to hash length.");
    }
    var target = hash.rawHash.split("");
    var diff = this.rawHash.split("").filter(function(row, index) {
      return row !== (target[index] || "0");
    });
    return diff.length;
  };
  Hash2.prototype.toString = function() {
    return this.calcuateHexadecimal(this.rawHash.split("").map(function(row) {
      return row === "1" ? 1 : 0;
    }));
  };
  Hash2.prototype.arrayChunk = function(array3, chunk) {
    return __spreadArray2([], __read2(Array(Math.ceil(array3.length / chunk)).keys())).map(function(index) {
      return array3.slice(index * chunk, index * chunk + chunk);
    });
  };
  Hash2.prototype.calcuateHexadecimal = function(binalyNumbers) {
    return this.arrayChunk(binalyNumbers, 4).map(function(row) {
      return parseInt(row.join(""), 2).toString(16);
    }).join("");
  };
  return Hash2;
}();
var Hash_default = Hash;

// ../../node_modules/.pnpm/browser-image-hash@0.0.5/node_modules/browser-image-hash/dist/HashGenerator.js
var __read3 = function(o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m)
    return o;
  var i = m.call(o), r, ar = [], e;
  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
      ar.push(r.value);
  } catch (error) {
    e = { error };
  } finally {
    try {
      if (r && !r.done && (m = i["return"]))
        m.call(i);
    } finally {
      if (e)
        throw e.error;
    }
  }
  return ar;
};
var __spreadArray3 = function(to, from) {
  for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
    to[j] = from[i];
  return to;
};
var HashGenerator = function() {
  function HashGenerator2(document) {
    this.document = document;
  }
  HashGenerator2.prototype.generateByImage = function(source, glayImage) {
    glayImage.width = source.width;
    glayImage.height = source.height;
    var canvas = this.document.createElement("canvas");
    var context = canvas.getContext("2d");
    if (context === null) {
      throw new ReferenceError("undefined CanvasRenderingContext2D");
    }
    context.drawImage(glayImage, 0, 0, source.width, source.height);
    return this.generate(source, context);
  };
  HashGenerator2.prototype.generateByCanvasRenderingContext2D = function(source, glayImageDrawingCanvasContext) {
    var imageData = glayImageDrawingCanvasContext.getImageData(0, 0, source.width, source.height).data;
    var glayArray = new Uint8ClampedArray(__spreadArray3([], __read3(Array(imageData.length / 4).keys())).map(function(i) {
      var index = i * 4;
      return imageData[index];
    }));
    return this.generate(source, glayArray);
  };
  HashGenerator2.prototype.generateByUint8ClampedArray = function(source, glayArray) {
    if (glayArray.length !== source.calculateArea()) {
      throw new Error("Not convertable grayArray, convertable grayArray length is " + source.calculateArea());
    }
    var binaryNumbers = Array.from(glayArray).map(function(row, index, colors) {
      return row <= colors[index + 1] ? 1 : 0;
    }).filter(function(_, index) {
      return (index + 1) % source.width !== 0;
    }).join("");
    return new Hash_default(binaryNumbers);
  };
  HashGenerator2.prototype.generate = function(source, glayImageSource) {
    if (glayImageSource instanceof HTMLImageElement) {
      return this.generateByImage(source, glayImageSource);
    } else if (glayImageSource instanceof CanvasRenderingContext2D) {
      return this.generateByCanvasRenderingContext2D(source, glayImageSource);
    } else if (glayImageSource instanceof Uint8ClampedArray) {
      return this.generateByUint8ClampedArray(source, glayImageSource);
    }
    throw new TypeError("Not generatable glay image source.");
  };
  return HashGenerator2;
}();
var HashGenerator_default = HashGenerator;

// ../../node_modules/.pnpm/browser-image-hash@0.0.5/node_modules/browser-image-hash/dist/HashableImageSourceConverter/GlayScaleCalculator/ITU_R601_2Method.js
function ITU_R601_2Method(r, g, b) {
  return Math.round(r * 299 / 1e3 + g * 587 / 1e3 + b * 114 / 1e3);
}

// ../../node_modules/.pnpm/browser-image-hash@0.0.5/node_modules/browser-image-hash/dist/DifferenceHashBuilder.js
var __awaiter = function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var __generator = function(thisArg, body) {
  var _ = { label: 0, sent: function() {
    if (t[0] & 1)
      throw t[1];
    return t[1];
  }, trys: [], ops: [] }, f, y, t, g;
  return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
    return this;
  }), g;
  function verb(n) {
    return function(v) {
      return step([n, v]);
    };
  }
  function step(op) {
    if (f)
      throw new TypeError("Generator is already executing.");
    while (_)
      try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
          return t;
        if (y = 0, t)
          op = [op[0] & 2, t.value];
        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;
          case 4:
            _.label++;
            return { value: op[1], done: false };
          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;
          case 7:
            op = _.ops.pop();
            _.trys.pop();
            continue;
          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }
            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }
            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }
            if (t && _.label < t[2]) {
              _.label = t[2];
              _.ops.push(op);
              break;
            }
            if (t[2])
              _.ops.pop();
            _.trys.pop();
            continue;
        }
        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
    if (op[0] & 5)
      throw op[1];
    return { value: op[0] ? op[1] : void 0, done: true };
  }
};
var DifferenceHashBuilder = function() {
  function DifferenceHashBuilder2(dHashConverter, document) {
    if (dHashConverter === void 0) {
      dHashConverter = null;
    }
    if (document === void 0) {
      document = window.document;
    }
    if (dHashConverter === null) {
      dHashConverter = new VanilaConverter_default(document, ITU_R601_2Method, new LanczosResizer_default());
    }
    this.dHashConverter = dHashConverter;
    this.generator = new HashGenerator_default(document);
  }
  DifferenceHashBuilder2.prototype.build = function(url, hashSize) {
    if (hashSize === void 0) {
      hashSize = 8;
    }
    return __awaiter(this, void 0, void 0, function() {
      var source, hashableImageSouce;
      return __generator(this, function(_a) {
        switch (_a.label) {
          case 0:
            source = new HashSource_default(url, hashSize);
            return [4, this.dHashConverter.convert(source)];
          case 1:
            hashableImageSouce = _a.sent();
            return [2, this.generator.generate(source, hashableImageSouce)];
        }
      });
    });
  };
  return DifferenceHashBuilder2;
}();
var DifferenceHashBuilder_default = DifferenceHashBuilder;
var PlayMode = /* @__PURE__ */ ((PlayMode2) => {
  PlayMode2["Bounce"] = "bounce";
  PlayMode2["Normal"] = "normal";
  return PlayMode2;
})(PlayMode || {});
var PlayModeSchema = nativeEnum(PlayMode);
var ManifestAnimationSchema = object({
  autoplay: optional(boolean()),
  defaultTheme: optional(string()),
  direction: optional(union([literal(1), literal(-1)])),
  hover: optional(boolean()),
  id: string(),
  intermission: optional(number()),
  loop: optional(union([boolean(), number()])),
  playMode: optional(PlayModeSchema),
  speed: optional(number()),
  themeColor: optional(string())
});
var ManifestThemeSchema = object({
  animations: array(string()),
  id: string()
});
object({
  activeAnimationId: optional(string()),
  animations: array(ManifestAnimationSchema),
  author: optional(string()),
  custom: optional(record(string(), any())),
  description: optional(string()),
  generator: optional(string()),
  keywords: optional(string()),
  revision: optional(number()),
  themes: optional(array(ManifestThemeSchema)),
  states: optional(array(string())),
  version: optional(string())
});

// src/common/dotlottie-state.ts
var PlaybackOptionsSchema = omit(ManifestAnimationSchema, ["id"]);
var TransitionableSchema = object({
  state: string()
});
var StateTransitionOnClickSchema = TransitionableSchema;
var StateTransitionOnAfterSchema = merge([TransitionableSchema, object({ ms: number() })]);
var StateTransitionOnEnterSchema = merge([TransitionableSchema, object({ count: number() })]);
var StateTransitionOnMouseEnterSchema = TransitionableSchema;
var StateTransitionOnMouseLeaveSchema = TransitionableSchema;
var StateTransitionOnCompleteSchema = TransitionableSchema;
var StateTransitionOnShowSchema = merge([
  TransitionableSchema,
  object({ threshold: optional(array(number([minValue(0), maxValue(1)]))) })
]);
var DotLottieStateTransitionEventsSchema = object({
  onAfter: optional(StateTransitionOnAfterSchema),
  onClick: optional(StateTransitionOnClickSchema),
  onComplete: optional(StateTransitionOnCompleteSchema),
  onEnter: optional(StateTransitionOnEnterSchema),
  onMouseEnter: optional(StateTransitionOnMouseEnterSchema),
  onMouseLeave: optional(StateTransitionOnMouseLeaveSchema),
  onShow: optional(StateTransitionOnShowSchema)
});
var DotLottieStatePlaybackSettingsSchema = merge([
  PlaybackOptionsSchema,
  object({
    playOnScroll: optional(tuple([number([minValue(0), maxValue(1)]), number([minValue(0), maxValue(1)])])),
    segments: optional(union([tuple([number(), number()]), string()]))
  })
]);
var DotLottieStateSchema = merge([
  DotLottieStateTransitionEventsSchema,
  object({
    animationId: optional(string()),
    playbackSettings: DotLottieStatePlaybackSettingsSchema
  })
]);
var DotLottieStatesSchema = record(string(), DotLottieStateSchema);
var DotLottieStateMachineDescriptorSchema = object({
  id: string(),
  initial: string()
});
object({
  descriptor: DotLottieStateMachineDescriptorSchema,
  states: DotLottieStatesSchema
});
var MIME_TYPES = {
  jpeg: "image/jpeg",
  png: "image/png",
  gif: "image/gif",
  bmp: "image/bmp",
  svg: "image/svg+xml",
  svgxml: "image/svg+xml",
  webp: "image/webp",
  mp3: "audio/mp3"
};
var MIME_CODES = {
  jpeg: [255, 216, 255],
  png: [137, 80, 78, 71, 13, 10, 26, 10],
  gif: [71, 73, 70],
  bmp: [66, 77],
  webp: [82, 73, 70, 70, 63, 63, 63, 63, 87, 69, 66, 80],
  svg: [60, 115, 118, 103],
  svgxml: [60, 63, 120, 109, 108],
  mp3: [73, 68, 51]
};
var DotLottieError = class extends Error {
  constructor(message, code) {
    super(message);
    __publicField(this, "code");
    this.name = "[dotlottie-js]";
    this.code = code;
  }
};
var createError = (message) => {
  const error = new Error(`[dotlottie-js]: ${message}`);
  return error;
};
var getMimeTypeFromBase64 = (base64) => {
  let data = null;
  let bytes = [];
  if (!base64) {
    throw new DotLottieError("Failed to determine the MIME type from the base64 asset string. Please check the input data. Supported asset types for dotlottie-js  are: jpeg, png, gif, bmp, svg, webp, mp3", "INVALID_DOTLOTTIE" /* INVALID_DOTLOTTIE */);
  }
  const withoutMeta = base64.substring(base64.indexOf(",") + 1);
  if (typeof window === "undefined") {
    data = Buffer.from(withoutMeta, "base64").toString("binary");
  } else {
    data = atob(withoutMeta);
  }
  const bufData = new Uint8Array(data.length);
  for (let i = 0; i < data.length; i += 1) {
    bufData[i] = data.charCodeAt(i);
  }
  for (const mimeType in MIME_CODES) {
    const dataArr = MIME_CODES[mimeType];
    if (mimeType === "webp" && dataArr && bufData.length > dataArr.length) {
      const riffHeader = Array.from(bufData.subarray(0, 4));
      const webpFormatMarker = Array.from(bufData.subarray(8, 12));
      if (riffHeader.every((byte, index) => byte === dataArr[index]) && webpFormatMarker.every((byte, index) => byte === dataArr[index + 8])) {
        return MIME_TYPES[mimeType];
      }
    } else {
      bytes = Array.from(bufData.subarray(0, dataArr?.length));
      if (dataArr && bytes.every((byte, index) => byte === dataArr[index])) {
        return MIME_TYPES[mimeType];
      }
    }
  }
  throw new DotLottieError("Failed to determine the MIME type from the base64 asset string. Please check the input data. Supported asset types for dotlottie-js  are: jpeg, png, gif, bmp, svg, webp, mp3", "INVALID_DOTLOTTIE" /* INVALID_DOTLOTTIE */);
};
function dataUrlFromU8(uint8Data) {
  let base64;
  if (typeof window === "undefined") {
    base64 = Buffer.from(uint8Data).toString("base64");
  } else {
    const binaryString = Array.prototype.map.call(uint8Data, (byte) => String.fromCharCode(byte)).join("");
    base64 = window.btoa(binaryString);
  }
  const mimeType = getMimeTypeFromBase64(base64);
  return `data:${mimeType};base64,${base64}`;
}

// src/common/lottie-image-common.ts
var LottieImageCommon = class {
  constructor(options) {
    __publicField(this, "_data");
    __publicField(this, "_id", "");
    __publicField(this, "_fileName", "");
    __publicField(this, "_parentAnimations");
    __publicField(this, "_zipOptions");
    this._requireValidId(options.id);
    this._requireValidFileName(options.fileName);
    this._zipOptions = options.zipOptions ?? {};
    if (options.data) {
      this._data = options.data;
    }
    if (options.id) {
      this._id = options.id;
    }
    if (options.fileName) {
      this._fileName = options.fileName;
    }
    this._parentAnimations = options.parentAnimations || [];
  }
  get zipOptions() {
    return this._zipOptions;
  }
  set zipOptions(zipOptions) {
    this._zipOptions = zipOptions;
  }
  _requireValidId(id) {
    if (!id)
      throw new DotLottieError("Invalid image id");
  }
  _requireValidFileName(fileName) {
    if (!fileName)
      throw new DotLottieError("Invalid image fileName");
  }
  get fileName() {
    return this._fileName;
  }
  set fileName(fileName) {
    this._requireValidFileName(fileName);
    this._fileName = fileName;
  }
  get id() {
    return this._id;
  }
  set id(id) {
    this._requireValidId(id);
    this._id = id;
  }
  get data() {
    return this._data;
  }
  set data(data) {
    if (!data) {
      throw new DotLottieError("Invalid data");
    }
    this._data = data;
  }
  get parentAnimations() {
    return this._parentAnimations;
  }
  set parentAnimations(parentAnimations) {
    this._parentAnimations = parentAnimations;
  }
  async toDataURL() {
    if (this._data && this._isDataURL(this._data))
      return this.data;
    const arrayBuffer = await this.toArrayBuffer();
    return dataUrlFromU8(new Uint8Array(arrayBuffer));
  }
  renameImage(newName) {
    this.id = newName;
    if (this.fileName) {
      let fileExt = this.fileName.split(".").pop();
      if (!fileExt) {
        fileExt = ".png";
      }
      this.fileName = `${newName}.${fileExt}`;
    }
  }
  async toArrayBuffer() {
    const blob = await (await this.toBlob()).arrayBuffer();
    return blob;
  }
  async toBlob() {
    if (!this._data) {
      throw new DotLottieError("Invalid image data.");
    }
    if (this._isDataURL(this._data)) {
      const data = this._data;
      const [header, base64] = data.split(",");
      if ((!header || !base64) && data.length) {
        return new Blob([data]);
      }
      if (!header || !base64) {
        throw new DotLottieError("Invalid image data.");
      }
      const type = header.replace("data:", "").replace(/;base64$/, "");
      return new Blob([base64], { type });
    }
    if (this._isArrayBuffer(this._data)) {
      return new Blob([this._data]);
    }
    if (this._isBlob(this._data)) {
      return this._data;
    }
    throw new DotLottieError("Invalid image data.");
  }
  async _fromUrlToBlob(url) {
    const response = await fetch(url);
    return response.blob();
  }
  _isArrayBuffer(data) {
    return data instanceof ArrayBuffer;
  }
  _isDataURL(data) {
    return typeof data === "string" && data.startsWith("data:");
  }
  _isBlob(data) {
    return data instanceof Blob;
  }
};

// src/common/dotlottie-plugin.ts
var DotLottiePlugin = class {
  constructor(options) {
    __publicField(this, "dotlottie");
    __publicField(this, "_parallel", false);
    this.dotlottie = void 0;
    if (options?.parallel) {
      this._parallel = options.parallel;
    }
  }
  install(dotlottie) {
    this.dotlottie = dotlottie;
  }
  uninstall() {
    this.dotlottie = void 0;
  }
  get parallel() {
    return this._parallel;
  }
  set parallel(value) {
    this._parallel = value;
  }
  async onBuild() {
    throw createError("dotlottie-plugin build Not implemented!");
  }
  _requireDotLottie(dotLottie) {
    if (!dotLottie)
      throw createError("dotLottie context is null inside of duplicate image detector plugin.");
  }
};

// src/lottie-image.ts
var LottieImage = class extends LottieImageCommon {
  constructor(options) {
    super(options);
  }
};

// src/common/duplicate-image-detector-common.ts
var DuplicateImageDetectorCommon = class extends DotLottiePlugin {
  async generatePhash(_image) {
    return "";
  }
  distanceTo(_imageHash, _targetImageHash) {
    return 0;
  }
  async _createRecordOfDuplicates() {
    this._requireDotLottie(this.dotlottie);
    const images = [];
    const recordOfDuplicates = {};
    for (const animation of this.dotlottie.animations) {
      for (const image of animation.imageAssets) {
        images.push({
          excludeFromExport: false,
          image,
          hash: await this.generatePhash(image)
        });
      }
    }
    for (const image of images) {
      for (const compareImage of images) {
        if (image.image.id !== compareImage.image.id && !image.excludeFromExport && !compareImage.excludeFromExport && image.hash && compareImage.hash && this.distanceTo(image.hash, compareImage.hash) < 5) {
          if (!recordOfDuplicates[image.image.fileName] && !recordOfDuplicates[compareImage.image.fileName]) {
            compareImage.excludeFromExport = true;
            recordOfDuplicates[image.image.fileName] = [compareImage.image];
          } else if (recordOfDuplicates[compareImage.image.fileName]) {
            if (!recordOfDuplicates[compareImage.image.fileName]?.find((item) => item.id === image.image.id)) {
              image.excludeFromExport = true;
              recordOfDuplicates[compareImage.image.fileName]?.push(image.image);
            }
          }
        }
      }
    }
    return recordOfDuplicates;
  }
  adjustDuplicateImageAssetPath(animation, recordOfDuplicates) {
    for (const key in recordOfDuplicates) {
      if (key) {
        recordOfDuplicates[key]?.forEach((item) => {
          if (animation.data) {
            const animationAssets = animation.data.assets;
            if (animationAssets) {
              animationAssets.forEach((asset) => {
                if ("w" in asset && "h" in asset) {
                  if (asset.p === item.fileName) {
                    const fileName = key;
                    asset.p = fileName;
                  }
                }
              });
            }
          }
        });
      }
    }
  }
  async onBuild() {
    this._requireDotLottie(this.dotlottie);
    const recordOfDuplicates = await this._createRecordOfDuplicates();
    this.dotlottie.animations.forEach((animation) => {
      this.adjustDuplicateImageAssetPath(animation, recordOfDuplicates);
    });
    const clonedImages = {};
    const images = this.dotlottie.getImages();
    for (const key in recordOfDuplicates) {
      if (key) {
        for (const image of images) {
          if (image.fileName === key && image.data !== void 0) {
            clonedImages[key] = new LottieImage({
              data: image.data,
              id: image.id,
              fileName: image.fileName
            });
          }
        }
      }
    }
    if (Object.keys(clonedImages).length !== Object.keys(recordOfDuplicates).length)
      ;
    for (const key in recordOfDuplicates) {
      if (key) {
        recordOfDuplicates[key]?.forEach((image) => {
          if (image.parentAnimations.length) {
            for (const parentAnimation of image.parentAnimations) {
              parentAnimation.imageAssets.splice(parentAnimation.imageAssets.indexOf(image), 1);
              const clonedImage = clonedImages[key];
              if (clonedImage !== void 0) {
                parentAnimation.imageAssets.push(clonedImage);
                clonedImage.parentAnimations.push(parentAnimation);
              }
            }
          }
        });
      }
    }
  }
};

// src/duplicate-image-detector.ts
var DuplicateImageDetector = class extends DuplicateImageDetectorCommon {
  async generatePhash(image) {
    const builder = new DifferenceHashBuilder_default();
    const targetURL = new URL(await image.toDataURL());
    const destHash = await builder.build(targetURL);
    return destHash.rawHash;
  }
  distanceTo(imageHash, targetImageHash) {
    const srcHash = new Hash_default(imageHash);
    const targetHash = new Hash_default(targetImageHash);
    return srcHash.getHammingDistance(targetHash);
  }
};

export { DuplicateImageDetector };
//# sourceMappingURL=duplicate-image-detector.js.map