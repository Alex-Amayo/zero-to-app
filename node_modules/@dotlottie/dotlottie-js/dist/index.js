import { unzip, strFromU8, strToU8, zip } from 'fflate';
import { nativeEnum, object, optional, boolean, string, union, literal, number, array, record, any, omit, merge, minValue, maxValue, tuple, safeParse, flatten } from 'valibot';

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

// package.json
var package_default = {
  name: "@dotlottie/dotlottie-js",
  version: "0.7.2",
  type: "module",
  description: "This library helps in creating and modifying .lottie files.",
  repository: {
    type: "git",
    url: "git+https://github.com/dotlottie/dotlottie-js.git",
    directory: "packages/dotlottie-js"
  },
  homepage: "https://github.com/dotlottie/dotlottie-js#readme",
  bugs: "https://github.com/dotlottie/dotlottie-js/issues",
  author: "dotLottie",
  contributors: [
    "Karam Ali <karam@lottiefiles.com>",
    "Sam Osborne <sam@lottiefiles.com>",
    "Jawish Hameed <jawish@lottiefiles.com>",
    "Abdelrahman Ashraf <a.theashraf@gmail.com>"
  ],
  license: "MIT",
  engines: {
    node: ">=18.0.0"
  },
  main: "./dist/index.js",
  exports: {
    ".": "./dist/index.js",
    "./node": "./dist/node/index.js"
  },
  types: "./dist/index.d.ts",
  typesVersions: {
    "*": {
      node: [
        "./dist/node"
      ]
    }
  },
  files: [
    "dist"
  ],
  scripts: {
    build: "tsup",
    dev: "tsup --watch",
    docs: "typedoc src",
    lint: "eslint --fix .",
    "stats:eslint": "cross-env TIMING=1 eslint .",
    "stats:ts": "tsc -p tsconfig.build.json --extendedDiagnostics",
    test: "pnpm test:browser && pnpm test:node",
    "test:browser": "pnpm test:build:browser && jasmine-browser-runner runSpecs --config=./jasmine/jasmine-browser.json --port=4444",
    "test:browser:watch": "nodemon -e ts --watch src/tests --exec 'pnpm test:browser'",
    "test:build:browser": "tsup --platform='browser' --config ./jasmine/tsup.config.js",
    "test:build:node": "tsup --platform='node' --config ./jasmine/tsup.config.js",
    "test:build:watch": "pnpm test:build --watch",
    "test:node": "pnpm test:build:node && jasmine --config=./jasmine/jasmine.json --parallel=auto",
    "test:node:watch": "nodemon -e ts --watch src/tests --exec 'pnpm test:node'",
    "type-check": "tsc --noEmit"
  },
  dependencies: {
    "browser-image-hash": "^0.0.5",
    fflate: "^0.8.1",
    sharp: "^0.33.2",
    "sharp-phash": "^2.1.0",
    valibot: "^0.13.1"
  },
  devDependencies: {
    "@lottiefiles/lottie-types": "^1.2.1",
    "@types/jasmine": "4.3.5",
    "@types/node": "18.0.6",
    "@types/sharp": "0.31.1",
    "cross-env": "7.0.3",
    esbuild: "0.14.49",
    jasmine: "5.1.0",
    "jasmine-browser-runner": "2.2.0",
    "jasmine-core": "5.1.1",
    "js-base64": "3.7.5",
    nodemon: "2.0.20",
    tsup: "6.1.3",
    typescript: "4.7.4"
  },
  publishConfig: {
    access: "public"
  },
  packageManager: "pnpm@7.1.6"
};
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
var ManifestSchema = object({
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
var DotLottieStateMachineSchema = object({
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
var MIME_TO_EXTENSION = {
  "image/jpeg": "jpeg",
  "image/png": "png",
  "image/gif": "gif",
  "image/bmp": "bmp",
  "image/svg+xml": "svg",
  "image/webp": "webp",
  "audio/mpeg": "mpeg",
  "audio/mp3": "mp3"
};
var ErrorCodes = /* @__PURE__ */ ((ErrorCodes2) => {
  ErrorCodes2["ASSET_NOT_FOUND"] = "ASSET_NOT_FOUND";
  ErrorCodes2["INVALID_DOTLOTTIE"] = "INVALID_DOTLOTTIE";
  ErrorCodes2["INVALID_STATEMACHINE"] = "INVALID_STATEMACHINE";
  ErrorCodes2["INVALID_URL"] = "INVALID_URL";
  return ErrorCodes2;
})(ErrorCodes || {});
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
var base64ToUint8Array = (base64String) => {
  const withoutMeta = base64String.substring(base64String.indexOf(",") + 1);
  const binaryString = typeof window === "undefined" ? Buffer.from(withoutMeta, "base64").toString("binary") : atob(withoutMeta);
  const uint8Array = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i += 1) {
    uint8Array[i] = binaryString.charCodeAt(i);
  }
  return uint8Array;
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
var getExtensionTypeFromBase64 = (base64) => {
  const mimeType = getMimeTypeFromBase64(base64);
  if (!mimeType) {
    const ext = base64.split(";")[0]?.split("/")[1];
    if (ext) {
      return MIME_TO_EXTENSION[ext] || null;
    }
    return null;
  }
  return MIME_TO_EXTENSION[mimeType] || null;
};
var isValidURL = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
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
function isImageAsset(asset) {
  return "w" in asset && "h" in asset && !("xt" in asset) && "p" in asset;
}
function isAudioAsset(asset) {
  return !("h" in asset) && !("w" in asset) && "p" in asset && "e" in asset && "u" in asset && "id" in asset;
}
async function unzipDotLottie(dotLottie, filter = () => true) {
  if (!(dotLottie instanceof Uint8Array)) {
    throw new DotLottieError("DotLottie not found", "INVALID_DOTLOTTIE" /* INVALID_DOTLOTTIE */);
  }
  const unzipped = await new Promise((resolve, reject) => {
    unzip(dotLottie, { filter }, (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
  return unzipped;
}
async function unzipDotLottieFile(dotLottie, path, filter) {
  if (!(dotLottie instanceof Uint8Array)) {
    throw new DotLottieError("DotLottie not found", "INVALID_DOTLOTTIE" /* INVALID_DOTLOTTIE */);
  }
  const unzipped = await unzipDotLottie(dotLottie, (file) => file.name === path && (!filter || filter(file)));
  return unzipped[path];
}
async function getManifest(dotLottie) {
  const manifestFileName = "manifest.json";
  const unzipped = await unzipDotLottie(dotLottie, (file) => file.name === manifestFileName);
  const unzippedManifest = unzipped[manifestFileName];
  if (typeof unzippedManifest === "undefined") {
    return void 0;
  }
  return JSON.parse(strFromU8(unzippedManifest, false));
}
async function validateDotLottie(dotLottie) {
  if (!(dotLottie instanceof Uint8Array)) {
    return { success: false, error: "DotLottie not found" };
  }
  const manifest = await getManifest(dotLottie);
  if (typeof manifest === "undefined") {
    return { success: false, error: "Invalid .lottie file, manifest.json is missing" };
  }
  const manifestValidationResult = safeParse(ManifestSchema, manifest);
  if (!manifestValidationResult.success) {
    const error = `Invalid .lottie file, manifest.json structure is invalid, ${JSON.stringify(flatten(manifestValidationResult.error).nested, null, 2)}`;
    return { success: false, error };
  }
  return { success: true };
}
async function loadFromArrayBuffer(arrayBuffer) {
  const dotLottie = new Uint8Array(arrayBuffer);
  const validationResult = await validateDotLottie(dotLottie);
  if (validationResult.error) {
    throw new DotLottieError(validationResult.error, "INVALID_DOTLOTTIE" /* INVALID_DOTLOTTIE */);
  }
  return dotLottie;
}
async function loadFromURL(src) {
  if (!isValidURL(src)) {
    throw new DotLottieError("Invalid url provided for .lottie file", "INVALID_URL" /* INVALID_URL */);
  }
  const response = await fetch(src);
  const arrayBuffer = await response.arrayBuffer();
  const contentType = response.headers.get("content-type");
  if (!["application/zip", "application/octet-stream"].includes(contentType || "")) {
    throw new DotLottieError(`Invalid content type for .lottie file, expected application/zip or application/octet-stream, received ${contentType}`, "INVALID_DOTLOTTIE" /* INVALID_DOTLOTTIE */);
  }
  const dotLottie = await loadFromArrayBuffer(arrayBuffer);
  return dotLottie;
}
async function getAudio(dotLottie, filename, filter) {
  const audioFilename = `audio/${filename}`;
  const unzipped = await unzipDotLottieFile(dotLottie, audioFilename, filter);
  if (typeof unzipped === "undefined") {
    return void 0;
  }
  return dataUrlFromU8(unzipped);
}
async function getAllAudio(dotLottie, filter) {
  const unzippedAudio = await unzipDotLottie(dotLottie, (file) => {
    const name = file.name.replace("audio/", "");
    return file.name.startsWith("audio/") && (!filter || filter({ ...file, name }));
  });
  const audio = {};
  for (const audioPath in unzippedAudio) {
    const unzippedSingleAudio = unzippedAudio[audioPath];
    if (unzippedSingleAudio instanceof Uint8Array) {
      const audioId = audioPath.replace("audio/", "");
      audio[audioId] = dataUrlFromU8(unzippedSingleAudio);
    }
  }
  return audio;
}
async function inlineAudioAssets(dotLottie, animations) {
  const audioMap = /* @__PURE__ */ new Map();
  for (const [animationId, animationData] of Object.entries(animations)) {
    for (const asset of animationData.assets || []) {
      if (isAudioAsset(asset)) {
        const audioId = asset.p;
        if (!audioMap.has(audioId)) {
          audioMap.set(audioId, /* @__PURE__ */ new Set());
        }
        audioMap.get(audioId)?.add(animationId);
      }
    }
  }
  const unzippedAudio = await getAllAudio(dotLottie, (file) => audioMap.has(file.name));
  for (const [audioId, animationIdsSet] of audioMap) {
    const audioDataURL = unzippedAudio[audioId];
    if (audioDataURL) {
      for (const animationId of animationIdsSet) {
        const animationData = animations[animationId];
        for (const asset of animationData?.assets || []) {
          if (isAudioAsset(asset) && asset.p === audioId) {
            asset.p = audioDataURL;
            asset.u = "";
            asset.e = 1;
          }
        }
      }
    }
  }
}
async function getImage(dotLottie, filename, filter) {
  const imageFilename = `images/${filename}`;
  const unzipped = await unzipDotLottieFile(dotLottie, imageFilename, filter);
  if (typeof unzipped === "undefined") {
    return void 0;
  }
  return dataUrlFromU8(unzipped);
}
async function getImages(dotLottie, filter) {
  const unzippedImages = await unzipDotLottie(dotLottie, (file) => {
    const name = file.name.replace("images/", "");
    return file.name.startsWith("images/") && (!filter || filter({ ...file, name }));
  });
  const images = {};
  for (const imagePath in unzippedImages) {
    const unzippedImage = unzippedImages[imagePath];
    if (unzippedImage instanceof Uint8Array) {
      const imageId = imagePath.replace("images/", "");
      images[imageId] = dataUrlFromU8(unzippedImage);
    }
  }
  return images;
}
async function inlineImageAssets(dotLottie, animations) {
  const imagesMap = /* @__PURE__ */ new Map();
  for (const [animationId, animationData] of Object.entries(animations)) {
    for (const asset of animationData.assets || []) {
      if (isImageAsset(asset)) {
        const imageId = asset.p;
        if (!imagesMap.has(imageId)) {
          imagesMap.set(imageId, /* @__PURE__ */ new Set());
        }
        imagesMap.get(imageId)?.add(animationId);
      }
    }
  }
  const unzippedImages = await getImages(dotLottie, (file) => imagesMap.has(file.name));
  for (const [imageId, animationIdsSet] of imagesMap) {
    const imageDataURL = unzippedImages[imageId];
    if (imageDataURL) {
      for (const animationId of animationIdsSet) {
        const animationData = animations[animationId];
        for (const asset of animationData?.assets || []) {
          if (isImageAsset(asset) && asset.p === imageId) {
            asset.p = imageDataURL;
            asset.u = "";
            asset.e = 1;
          }
        }
      }
    }
  }
}
async function getAnimation(dotLottie, animationId, { inlineAssets } = {}, filter) {
  const animationFilename = `animations/${animationId}.json`;
  const unzippedAnimation = await unzipDotLottieFile(dotLottie, animationFilename, filter);
  if (typeof unzippedAnimation === "undefined") {
    return void 0;
  }
  const animationData = JSON.parse(strFromU8(unzippedAnimation, false));
  if (!inlineAssets) {
    return animationData;
  }
  const animationsMap = {
    [animationId]: animationData
  };
  await inlineImageAssets(dotLottie, animationsMap);
  await inlineAudioAssets(dotLottie, animationsMap);
  return animationData;
}
async function getAnimations(dotLottie, { inlineAssets } = {}, filter) {
  const animationsMap = {};
  const unzippedAnimations = await unzipDotLottie(dotLottie, (file) => {
    const filename = file.name.replace("animations/", "").replace(".json", "");
    return file.name.startsWith("animations/") && (!filter || filter({ ...file, name: filename }));
  });
  for (const animationPath in unzippedAnimations) {
    const data = unzippedAnimations[animationPath];
    if (data instanceof Uint8Array) {
      const animationId = animationPath.replace("animations/", "").replace(".json", "");
      const animationData = JSON.parse(strFromU8(data, false));
      animationsMap[animationId] = animationData;
    }
  }
  if (!inlineAssets) {
    return animationsMap;
  }
  await inlineImageAssets(dotLottie, animationsMap);
  return animationsMap;
}
async function getThemes(dotLottie, filter) {
  const themesMap = {};
  const unzippedThemes = await unzipDotLottie(dotLottie, (file) => {
    const name = file.name.replace("themes/", "").replace(".json", "");
    return file.name.startsWith("themes/") && (!filter || filter({ ...file, name }));
  });
  for (const themePath in unzippedThemes) {
    const data = unzippedThemes[themePath];
    if (data instanceof Uint8Array) {
      const themeId = themePath.replace("themes/", "").replace(".json", "");
      themesMap[themeId] = JSON.parse(strFromU8(data, false));
    }
  }
  return themesMap;
}
async function getTheme(dotLottie, themeId, filter) {
  const themeFilename = `themes/${themeId}.json`;
  const unzippedTheme = await unzipDotLottieFile(dotLottie, themeFilename, filter);
  if (typeof unzippedTheme === "undefined") {
    return void 0;
  }
  return JSON.parse(strFromU8(unzippedTheme, false));
}
async function getStateMachines(dotLottie, filter) {
  const statesMap = {};
  const unzippedStates = await unzipDotLottie(dotLottie, (file) => {
    const name = file.name.replace("states/", "").replace(".json", "");
    return file.name.startsWith("states/") && (!filter || filter({ ...file, name }));
  });
  for (const statePath in unzippedStates) {
    const data = unzippedStates[statePath];
    if (data instanceof Uint8Array) {
      const themeId = statePath.replace("states/", "").replace(".json", "");
      statesMap[themeId] = strFromU8(data, false);
    }
  }
  return statesMap;
}
async function getStateMachine(dotLottie, stateMachineId, filter) {
  const stateMachineFilename = `states/${stateMachineId}.json`;
  const unzippedStateMachine = await unzipDotLottieFile(dotLottie, stateMachineFilename, filter);
  if (typeof unzippedStateMachine === "undefined") {
    return void 0;
  }
  const stateMachine = JSON.parse(strFromU8(unzippedStateMachine, false));
  return stateMachine;
}

// src/common/dotlottie-state-machine-common.ts
var DotLottieStateMachineCommon = class {
  constructor(options) {
    __publicField(this, "_descriptor");
    __publicField(this, "_zipOptions");
    __publicField(this, "_states");
    this._requireValidId(options.descriptor.id);
    this._requireValidStates(options.states);
    this._requireValidDescriptor(options.descriptor);
    this._descriptor = options.descriptor;
    this._zipOptions = options.zipOptions ?? {};
    this._states = options.states;
  }
  get zipOptions() {
    return this._zipOptions;
  }
  set zipOptions(zipOptions) {
    this._zipOptions = zipOptions;
  }
  get id() {
    return this._descriptor.id;
  }
  set id(id) {
    this._requireValidId(id);
    this._descriptor.id = id;
  }
  get states() {
    return this._states;
  }
  set states(states) {
    this._states = states;
  }
  get initial() {
    return this._descriptor.initial;
  }
  set initial(initial) {
    this._descriptor.initial = initial;
  }
  get descriptor() {
    return this._descriptor;
  }
  set descriptor(descriptor) {
    this._descriptor = descriptor;
  }
  toString() {
    return JSON.stringify({
      descriptor: this._descriptor,
      states: this._states
    });
  }
  _requireValidId(id) {
    if (!id) {
      throw createError("Invalid id.");
    }
  }
  _requireValidDescriptor(descriptor) {
    const result = safeParse(DotLottieStateMachineDescriptorSchema, descriptor);
    if (!result.success) {
      const error = `Invalid state machine declaration, ${JSON.stringify(flatten(result.error).nested, null, 2)}`;
      throw new DotLottieError(`Invalid descriptor: ${error}`, "INVALID_STATEMACHINE" /* INVALID_STATEMACHINE */);
    }
  }
  _requireValidStates(states) {
    const result = safeParse(DotLottieStatesSchema, states);
    if (!result.success) {
      const error = `Invalid state machine declaration, ${JSON.stringify(flatten(result.error).nested, null, 2)}`;
      throw new DotLottieError(`Invalid states: ${error}`, "INVALID_STATEMACHINE" /* INVALID_STATEMACHINE */);
    }
  }
};

// src/common/dotlottie-theme-common.ts
var LottieThemeCommon = class {
  constructor(options) {
    __publicField(this, "_data");
    __publicField(this, "_id", "");
    __publicField(this, "_url");
    __publicField(this, "_animationsMap", /* @__PURE__ */ new Map());
    __publicField(this, "_zipOptions");
    this._requireValidId(options.id);
    this._id = options.id;
    if (options.data) {
      this._requireValidData(options.data);
      this._data = options.data;
    }
    if (options.url) {
      this._requireValidUrl(options.url);
      this._url = options.url;
    }
    this._zipOptions = options.zipOptions ?? {};
  }
  get zipOptions() {
    return this._zipOptions;
  }
  set zipOptions(zipOptions) {
    this._zipOptions = zipOptions;
  }
  get id() {
    return this._id;
  }
  set id(id) {
    this._requireValidId(id);
    this._id = id;
  }
  get url() {
    return this._url;
  }
  set url(url) {
    this._requireValidUrl(url);
    this._url = url;
  }
  get data() {
    return this._data;
  }
  set data(data) {
    this._requireValidData(data);
    this._data = data;
  }
  get animations() {
    return Array.from(this._animationsMap.values());
  }
  async toString() {
    if (!this._data && this._url) {
      await this._loadDataFromUrl(this._url);
    }
    this._requireValidData(this._data);
    return JSON.stringify(this._data);
  }
  addAnimation(animation) {
    this._animationsMap.set(animation.id, animation);
  }
  removeAnimation(animationId) {
    this._animationsMap.delete(animationId);
  }
  _requireValidId(id) {
    if (typeof id !== "string" || !id)
      throw createError("Invalid theme id");
  }
  _requireValidUrl(url) {
    if (!url || !isValidURL(url))
      throw createError("Invalid theme url");
  }
  _requireValidData(data) {
    if (typeof data !== "object")
      throw createError("Invalid theme data");
  }
  async _loadDataFromUrl(url) {
    try {
      const response = await fetch(url);
      const data = await response.json();
      this._data = data;
    } catch (error) {
      throw createError(`Failed to fetch theme from url, Error: ${JSON.stringify(error)}`);
    }
  }
};

// src/common/dotlottie-common.ts
var DotLottieCommon = class {
  constructor(options) {
    __publicField(this, "_animationsMap", /* @__PURE__ */ new Map());
    __publicField(this, "_plugins", []);
    __publicField(this, "_themesMap", /* @__PURE__ */ new Map());
    __publicField(this, "_stateMachinesMap", /* @__PURE__ */ new Map());
    __publicField(this, "_author");
    __publicField(this, "_description");
    __publicField(this, "_generator");
    __publicField(this, "_keywords");
    __publicField(this, "_version");
    __publicField(this, "_revision");
    __publicField(this, "_customData");
    __publicField(this, "enableDuplicateImageOptimization");
    this._author = options?.author ?? "LottieFiles";
    this._description = options?.description ?? "";
    this._generator = options?.generator ?? `${package_default.name}@${package_default.version}`;
    this._keywords = options?.keywords ?? "dotLottie";
    this._version = options?.version ?? "1.0";
    this._customData = options?.customData ?? {};
    this._revision = options?.revision ?? 1;
    this.enableDuplicateImageOptimization = options?.enableDuplicateImageOptimization ?? false;
  }
  async toBase64(_options = void 0) {
    throw createError("toBase64() method not implemented in concrete class!");
  }
  create(_options) {
    throw createError("create() method not implemented in concrete class!");
  }
  async download(_fileName, _options = void 0) {
    throw createError("download(fileName:string) method not implemented in concrete class!");
  }
  addPlugins(..._plugins) {
    throw createError("addPlugins(...plugins: DotLottiePlugin[]) not implemented in concrete class!");
  }
  addAnimation(_animationOptions) {
    throw createError("addAnimation(animationOptions: AnimationOptions) not implemented in concrete class!");
  }
  async fromArrayBuffer(_arrayBuffer) {
    throw createError("fromArrayBuffer(arrayBuffer: ArrayBuffer): Promise<DotLottieCommon> not implemented in concrete class!");
  }
  async toArrayBuffer(_options = void 0) {
    throw createError("toArrayBuffer(): Promise<ArrayBuffer> is not implemented in concrete class!");
  }
  get plugins() {
    return this._plugins;
  }
  get version() {
    return this._version;
  }
  get revision() {
    return this._revision;
  }
  get author() {
    return this._author;
  }
  get description() {
    return this._description;
  }
  get keywords() {
    return this._keywords;
  }
  get generator() {
    return this._generator;
  }
  get animations() {
    return Array.from(this._animationsMap.values());
  }
  get manifest() {
    return this._buildManifest();
  }
  get custom() {
    return this._customData;
  }
  get themes() {
    return Array.from(this._themesMap.values());
  }
  get stateMachines() {
    return Array.from(this._stateMachinesMap.values());
  }
  setCustomData(customData) {
    this._customData = customData ?? {};
    return this;
  }
  setAuthor(author) {
    this._author = typeof author === "string" ? author : "LottieFiles";
    return this;
  }
  setDescription(description) {
    this._description = typeof description === "string" ? description : "";
    return this;
  }
  setGenerator(generator) {
    this._generator = typeof generator === "string" ? generator : `${package_default.name}@${package_default.version}`;
    return this;
  }
  setKeywords(keywords) {
    this._keywords = typeof keywords === "string" ? keywords : "dotLottie";
    return this;
  }
  setVersion(version) {
    this._version = typeof version === "string" ? version : "1.0";
    return this;
  }
  setRevision(revision) {
    this._revision = revision;
    return this;
  }
  removePlugins(...plugins) {
    plugins.forEach((plugin) => {
      plugin.uninstall();
      const pluginIndex = this._plugins.indexOf(plugin);
      if (pluginIndex !== -1) {
        this._plugins.splice(pluginIndex, 1);
      }
    });
    return this;
  }
  _renameImage(animation, newName, imageId) {
    animation.imageAssets.forEach((imageAsset) => {
      if (imageAsset.id === imageId) {
        imageAsset.renameImage(newName);
        if (!animation.data)
          throw createError("No animation data available.");
        const animationAssets = animation.data.assets;
        if (!animationAssets)
          throw createError("No image assets to rename.");
        for (const asset of animationAssets) {
          if ("w" in asset && "h" in asset) {
            if (asset.id === imageId) {
              asset.p = imageAsset.fileName;
            }
          }
        }
      }
    });
  }
  _renameImageAssets() {
    const images = /* @__PURE__ */ new Map();
    this.animations.forEach((animation) => {
      images.set(animation.id, animation.imageAssets);
    });
    let size = 0;
    images.forEach((value) => {
      size += value.length;
    });
    for (let i = this.animations.length - 1; i >= 0; i -= 1) {
      const animation = this.animations.at(i);
      if (animation) {
        for (let j = animation.imageAssets.length - 1; j >= 0; j -= 1) {
          const image = animation.imageAssets.at(j);
          if (image) {
            this._renameImage(animation, `image_${size}`, image.id);
            size -= 1;
          }
        }
      }
    }
  }
  _renameAudio(animation, newName, audioId) {
    animation.audioAssets.forEach((audioAsset) => {
      if (audioAsset.id === audioId) {
        audioAsset.renameAudio(newName);
        if (!animation.data)
          throw new DotLottieError("No animation data available.");
        const animationAssets = animation.data.assets;
        if (!animationAssets)
          throw new DotLottieError("No audio assets to rename.");
        for (const asset of animationAssets) {
          if (isAudioAsset(asset)) {
            if (asset.id === audioId) {
              asset.p = audioAsset.fileName;
            }
          }
        }
      }
    });
  }
  _renameAudioAssets() {
    const audio = /* @__PURE__ */ new Map();
    this.animations.forEach((animation) => {
      audio.set(animation.id, animation.audioAssets);
    });
    let size = 0;
    audio.forEach((value) => {
      size += value.length;
    });
    for (let i = this.animations.length - 1; i >= 0; i -= 1) {
      const animation = this.animations.at(i);
      if (animation) {
        for (let j = animation.audioAssets.length - 1; j >= 0; j -= 1) {
          const audioAsset = animation.audioAssets.at(j);
          if (audioAsset) {
            this._renameAudio(animation, `audio_${size}`, audioAsset.id);
            size -= 1;
          }
        }
      }
    }
  }
  _addLottieAnimation(animation) {
    if (this._animationsMap.get(animation.id)) {
      throw createError("Duplicate animation id detected, aborting.");
    }
    this._animationsMap.set(animation.id, animation);
    return this;
  }
  async _findAssetsAndInline(animation) {
    const animationAssets = animation.data?.assets;
    if (!animationAssets)
      throw new DotLottieError("Failed to inline assets, the animation's assets are undefined.");
    const images = this.getImages();
    const audios = this.getAudio();
    for (const asset of animationAssets) {
      if (isImageAsset(asset)) {
        for (const image of images) {
          if (image.fileName === asset.p) {
            asset.e = 1;
            asset.u = "";
            asset.p = await image.toDataURL();
          }
        }
      } else if (isAudioAsset(asset)) {
        for (const audio of audios) {
          if (audio.fileName === asset.p) {
            asset.e = 1;
            asset.u = "";
            asset.p = await audio.toDataURL();
          }
        }
      }
    }
    return animation;
  }
  async getAnimation(animationId, options = {}) {
    if (!options.inlineAssets)
      return this._animationsMap.get(animationId);
    let dataWithInlinedImages = this._animationsMap.get(animationId);
    if (!dataWithInlinedImages)
      throw new DotLottieError("Failed to find animation.");
    dataWithInlinedImages = await this._findAssetsAndInline(dataWithInlinedImages);
    return dataWithInlinedImages;
  }
  getAnimations() {
    return Array.from(this._animationsMap);
  }
  removeAnimation(animationId) {
    const targetAnimation = this._animationsMap.get(animationId);
    if (targetAnimation) {
      const assignedThemes = targetAnimation.themes;
      for (const assignedTheme of assignedThemes) {
        this.unassignTheme({
          animationId: targetAnimation.id,
          themeId: assignedTheme.id
        });
      }
      this._animationsMap.delete(targetAnimation.id);
    }
    return this;
  }
  getImages() {
    const images = [];
    this.animations.map((animation) => {
      return images.push(...animation.imageAssets);
    });
    return images;
  }
  getAudio() {
    const audio = [];
    this.animations.map((animation) => {
      return audio.push(...animation.audioAssets);
    });
    return audio;
  }
  getTheme(themeId) {
    return this._themesMap.get(themeId);
  }
  _buildManifest() {
    const animationsList = Array.from(this._animationsMap.values());
    const themesList = Array.from(this._themesMap.values());
    const stateMachinesList = Array.from(this._stateMachinesMap.keys());
    const activeAnimationId = animationsList.find((value) => value.defaultActiveAnimation)?.id ?? "";
    const manifest = {
      version: this.version,
      revision: this.revision,
      keywords: this.keywords,
      author: this.author,
      generator: this.generator,
      animations: animationsList.map((animation) => ({
        id: animation.id,
        direction: animation.direction,
        speed: animation.speed,
        playMode: animation.playMode,
        loop: animation.loop,
        autoplay: animation.autoplay,
        hover: animation.hover,
        intermission: animation.intermission,
        ...animation.defaultTheme ? { defaultTheme: animation.defaultTheme } : {}
      })),
      ...this.description && this.description.trim() !== "" ? { description: this.description } : {},
      ...activeAnimationId && activeAnimationId.trim() !== "" ? { activeAnimationId } : {},
      ...this._customData && Object.keys(this._customData).length !== 0 ? { custom: this._customData } : {}
    };
    if (themesList.length > 0) {
      manifest.themes = themesList.map((theme) => ({
        id: theme.id,
        animations: theme.animations.map((animation) => animation.id)
      }));
    }
    if (stateMachinesList.length > 0) {
      manifest.states = stateMachinesList;
    }
    return manifest;
  }
  async build() {
    this._buildManifest();
    for (const animation of this.animations) {
      await animation.toJSON();
    }
    for (const theme of this.themes) {
      await theme.toString();
    }
    if (this.animations.length > 1) {
      this._renameImageAssets();
      this._renameAudioAssets();
    }
    const parallelPlugins = [];
    const sequentialPlugins = [];
    for (const plugin of this.plugins) {
      if (plugin.parallel) {
        parallelPlugins.push(plugin);
      } else {
        sequentialPlugins.push(plugin);
      }
    }
    await Promise.all(parallelPlugins.map(async (plugin) => plugin.onBuild()));
    for (const plugin of sequentialPlugins) {
      await plugin.onBuild();
    }
    return this;
  }
  async toBlob(options = void 0) {
    const arrayBuffer = await this.toArrayBuffer(options);
    return new Blob([arrayBuffer], { type: "application/zip" });
  }
  async fromURL(url) {
    if (!isValidURL(url))
      throw createError("Invalid URL");
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw createError(response.statusText);
      }
      const arrayBuffer = await response.arrayBuffer();
      return this.fromArrayBuffer(arrayBuffer);
    } catch (err) {
      if (err instanceof Error) {
        throw createError(err.message);
      }
    }
    throw createError("Unknown error");
  }
  merge(...dotlotties) {
    const mergedDotlottie = this.create();
    for (const dotlottie of dotlotties) {
      dotlottie.animations.forEach((animation) => {
        if (animation.data) {
          mergedDotlottie.addAnimation({
            id: animation.id,
            data: animation.data
          });
        } else if (animation.url) {
          mergedDotlottie.addAnimation({
            id: animation.id,
            url: animation.url
          });
        }
      });
      dotlottie.themes.forEach((theme) => {
        if (theme.data) {
          mergedDotlottie.addTheme({
            id: theme.id,
            data: theme.data
          });
        } else if (theme.url) {
          mergedDotlottie.addTheme({
            id: theme.id,
            url: theme.url
          });
        }
        theme.animations.forEach((animation) => {
          mergedDotlottie.assignTheme({
            animationId: animation.id,
            themeId: theme.id
          });
        });
      });
      dotlottie.stateMachines.forEach((stateMachine) => {
        const stateOption = {
          states: stateMachine.states,
          descriptor: { id: stateMachine.id, initial: stateMachine.initial },
          zipOptions: stateMachine.zipOptions
        };
        mergedDotlottie.addStateMachine(stateOption);
      });
    }
    return mergedDotlottie;
  }
  addTheme(themeOptions) {
    const theme = new LottieThemeCommon(themeOptions);
    this._themesMap.set(theme.id, theme);
    return this;
  }
  removeTheme(id) {
    const targetTheme = this._themesMap.get(id);
    if (targetTheme) {
      const scopedAnimations = targetTheme.animations;
      for (const scopedAnimation of scopedAnimations) {
        this.unassignTheme({
          animationId: scopedAnimation.id,
          themeId: id
        });
      }
      this._themesMap.delete(targetTheme.id);
    }
    return this;
  }
  assignTheme({ animationId, themeId }) {
    const theme = this._themesMap.get(themeId);
    if (!theme)
      throw createError(`Failed to find theme with id ${themeId}`);
    const animation = this._animationsMap.get(animationId);
    if (!animation)
      throw createError(`Failed to find animation with id ${animationId}`);
    theme.addAnimation(animation);
    animation.addTheme(theme);
    return this;
  }
  unassignTheme({ animationId, themeId }) {
    const theme = this._themesMap.get(themeId);
    if (!theme)
      throw createError(`Failed to find theme with id ${themeId}`);
    const animation = this._animationsMap.get(animationId);
    if (!animation)
      throw createError(`Failed to find animation with id ${animationId}`);
    theme.removeAnimation(animation.id);
    animation.removeTheme(theme.id);
    return this;
  }
  addStateMachine(stateMachineOptions) {
    const newState = new DotLottieStateMachineCommon(stateMachineOptions);
    this._stateMachinesMap.set(stateMachineOptions.descriptor.id, newState);
    return this;
  }
  getStateMachine(stateId) {
    return this._stateMachinesMap.get(stateId);
  }
  removeStateMachine(stateMachineId) {
    this._stateMachinesMap.delete(stateMachineId);
    return this;
  }
  _requireValidAuthor(author) {
    if (typeof author !== "string")
      throw createError("Invalid author");
  }
  _requireValidDescription(description) {
    if (typeof description !== "string")
      throw createError("Invalid description");
  }
  _requireValidGenerator(generator) {
    if (typeof generator !== "string")
      throw createError("Invalid generator");
  }
  _requireValidKeywords(keywords) {
    if (typeof keywords !== "string")
      throw createError("Invalid keywords");
  }
  _requireValidVersion(version) {
    if (typeof version !== "string")
      throw createError("Invalid version");
  }
  _requireValidCustomData(customData) {
    if (!customData)
      throw createError("Invalid customData");
  }
};

// src/common/lottie-animation-common.ts
var LottieAnimationCommon = class {
  constructor(options) {
    __publicField(this, "_data");
    __publicField(this, "_id", "");
    __publicField(this, "_url");
    __publicField(this, "_direction");
    __publicField(this, "_speed");
    __publicField(this, "_playMode");
    __publicField(this, "_loop");
    __publicField(this, "_autoplay");
    __publicField(this, "_hover");
    __publicField(this, "_intermission");
    __publicField(this, "_zipOptions");
    __publicField(this, "_defaultActiveAnimation");
    __publicField(this, "_imageAssets", []);
    __publicField(this, "_audioAssets", []);
    __publicField(this, "_themesMap", /* @__PURE__ */ new Map());
    __publicField(this, "_defaultTheme");
    this._requireValidOptions(options);
    this._id = options.id;
    this._zipOptions = options.zipOptions ?? {};
    if (options.data)
      this._data = options.data;
    if (options.url)
      this._url = options.url;
    this._direction = options.direction ?? 1;
    this._speed = options.speed ?? 1;
    this._playMode = options.playMode ?? "normal" /* Normal */;
    this._loop = options.loop ?? false;
    this._autoplay = options.autoplay ?? false;
    this._defaultActiveAnimation = options.defaultActiveAnimation ?? false;
    this._hover = options.hover ?? false;
    this._intermission = options.intermission ?? 0;
  }
  async toBase64() {
    throw createError("lottie animation controls tobase64 not implemented!");
  }
  get zipOptions() {
    return this._zipOptions;
  }
  set zipOptions(zipOptions) {
    this._zipOptions = zipOptions;
  }
  get id() {
    return this._id;
  }
  set id(id) {
    this._requireValidId(id);
    this._id = id;
  }
  get defaultTheme() {
    return this._defaultTheme;
  }
  set defaultTheme(defaultTheme) {
    if (defaultTheme) {
      this._defaultTheme = defaultTheme;
    }
  }
  get themes() {
    return Array.from(this._themesMap.values());
  }
  set themes(themes) {
    this._themesMap = /* @__PURE__ */ new Map();
    themes.forEach((theme) => {
      this._themesMap.set(theme.id, theme);
    });
  }
  get imageAssets() {
    return this._imageAssets;
  }
  set imageAssets(imageAssets) {
    this._imageAssets = imageAssets;
  }
  get audioAssets() {
    return this._audioAssets;
  }
  set audioAssets(audioAssets) {
    this._audioAssets = audioAssets;
  }
  get data() {
    return this._data;
  }
  set data(data) {
    this._requireValidLottieData(data);
    this._data = data;
  }
  get url() {
    return this._url;
  }
  set url(url) {
    this._requireValidUrl(url);
    this._url = url;
  }
  get direction() {
    return this._direction;
  }
  set direction(direction) {
    this._direction = direction;
  }
  get speed() {
    return this._speed;
  }
  set speed(speed) {
    this._speed = speed;
  }
  get playMode() {
    return this._playMode;
  }
  set playMode(playMode) {
    this._playMode = playMode;
  }
  get loop() {
    return this._loop;
  }
  set loop(loop) {
    this._requireValidLoop(loop);
    this._loop = loop;
  }
  get autoplay() {
    return this._autoplay;
  }
  set autoplay(autoplay) {
    this._autoplay = autoplay;
  }
  get defaultActiveAnimation() {
    return this._defaultActiveAnimation;
  }
  set defaultActiveAnimation(defaultActiveAnimation) {
    this._defaultActiveAnimation = defaultActiveAnimation;
  }
  get hover() {
    return this._hover;
  }
  set hover(hover) {
    this._hover = hover;
  }
  get intermission() {
    return this._intermission;
  }
  set intermission(intermission) {
    this._requireValidIntermission(intermission);
    this._intermission = intermission;
  }
  addTheme(theme) {
    this._themesMap.set(theme.id, theme);
  }
  removeTheme(themeId) {
    this._themesMap.delete(themeId);
  }
  async toArrayBuffer(options = {}) {
    const dataJson = await this.toJSON(options);
    return new TextEncoder().encode(JSON.stringify(dataJson)).buffer;
  }
  async _extractImageAssets() {
    throw new DotLottieError("_extractImageAssets(): Promise<boolean> method not implemented in concrete class");
  }
  async _extractAudioAssets() {
    throw new DotLottieError("_extractAudioAssets(): Promise<boolean> method not implemented in concrete class");
  }
  async toBlob(options = {}) {
    const dataJson = await this.toJSON(options);
    return new Blob([JSON.stringify(dataJson)], { type: "application/json" });
  }
  async toJSON(options = {}) {
    if (this._url && !this._data) {
      this._data = await this._fromUrl(this._url);
    }
    this._requireValidLottieData(this._data);
    if (this._data.assets?.length) {
      await this._extractImageAssets();
      await this._extractAudioAssets();
      if (options.inlineAssets) {
        const animationAssets = this.data?.assets;
        if (!animationAssets)
          throw new DotLottieError("Failed to inline assets, the animation's assets are undefined.");
        const images = this.imageAssets;
        const audios = this.audioAssets;
        for (const asset of animationAssets) {
          if ("w" in asset && "h" in asset && !("xt" in asset) && "p" in asset) {
            for (const image of images) {
              if (image.fileName === asset.p) {
                asset.e = 1;
                asset.u = "";
                asset.p = await image.toDataURL();
              }
            }
          } else if (isAudioAsset(asset)) {
            for (const audio of audios) {
              if (audio.fileName === asset.p) {
                asset.e = 1;
                asset.u = "";
                asset.p = await audio.toDataURL();
              }
            }
          }
        }
      }
    }
    return this._data;
  }
  async _fromUrl(url) {
    const response = await fetch(url);
    const text = await response.text();
    let json;
    try {
      json = JSON.parse(text);
    } catch (error) {
      if (error instanceof Error) {
        throw createError(`${error.message}: Invalid json returned from url`);
      }
    }
    this._requireValidLottieData(json);
    return json;
  }
  _requireValidUrl(url) {
    try {
      new URL(url || "");
    } catch (_err) {
      throw createError("Invalid animation url");
    }
  }
  _requireValidLottieData(data) {
    const mandatoryLottieProperties = ["v", "ip", "op", "layers", "fr", "w", "h"];
    const hasAllMandatoryProperties = mandatoryLottieProperties.every((field) => Object.prototype.hasOwnProperty.call(data, field));
    if (!hasAllMandatoryProperties) {
      throw createError("Received invalid Lottie data.");
    }
  }
  _requireValidId(id) {
    if (!id)
      throw createError("Invalid animation id");
  }
  _requireValidDirection(direction) {
    if (direction !== -1 && direction !== 1) {
      throw createError("Direction can only be -1 (backwards) or 1 (forwards)");
    }
  }
  _requireValidIntermission(intermission) {
    if (intermission < 0 || !Number.isInteger(intermission)) {
      throw createError("intermission must be a positive number");
    }
  }
  _requireValidLoop(loop) {
    if (typeof loop === "number" && (!Number.isInteger(loop) || loop < 0)) {
      throw createError("loop must be a positive number or boolean");
    }
  }
  _requireValidOptions(options) {
    this._requireValidId(options.id);
    if (!options.data && !options.url) {
      throw createError("No data or url provided.");
    }
    if (options.data) {
      this._requireValidLottieData(options.data);
    }
    if (options.url) {
      this._requireValidUrl(options.url);
    }
    if (options.direction) {
      this._requireValidDirection(options.direction);
    }
    if (options.intermission) {
      this._requireValidIntermission(options.intermission);
    }
    if (options.loop) {
      this._requireValidLoop(options.loop);
    }
  }
};

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

// src/common/lottie-audio-common.ts
var LottieAudioCommon = class {
  constructor(options) {
    __publicField(this, "_data");
    __publicField(this, "_id", "");
    __publicField(this, "_url");
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
    if (options.url) {
      this._url = options.url;
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
  get fileName() {
    return this._fileName;
  }
  set fileName(fileName) {
    if (!fileName)
      throw new DotLottieError("Invalid audio file name", "ASSET_NOT_FOUND" /* ASSET_NOT_FOUND */);
    this._fileName = fileName;
  }
  get id() {
    return this._id;
  }
  set id(id) {
    if (!id)
      throw new DotLottieError("Invalid audio id", "ASSET_NOT_FOUND" /* ASSET_NOT_FOUND */);
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
  renameAudio(newName) {
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
    if (!this._data && this._url) {
      this._data = await this._fromUrlToBlob(this._url);
    }
    if (!this._data) {
      throw new Error("Invalid data");
    }
    if (this._isDataURL(this._data)) {
      const data = this._data;
      const [header, base64] = data.split(",");
      if ((!header || !base64) && data.length) {
        return new Blob([data]);
      }
      if (!header || !base64) {
        throw new Error("Invalid data");
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
    throw new Error("Invalid data");
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
  _requireValidId(id) {
    if (!id)
      throw new DotLottieError("Invalid audio id");
  }
  _requireValidFileName(fileName) {
    if (!fileName)
      throw new DotLottieError("Invalid audio fileName");
  }
};

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
  function VanilaConverter2(document2, glayScaleCalculator, resizer) {
    this.document = document2;
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
  function HashGenerator2(document2) {
    this.document = document2;
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
  function DifferenceHashBuilder2(dHashConverter, document2) {
    if (dHashConverter === void 0) {
      dHashConverter = null;
    }
    if (document2 === void 0) {
      document2 = window.document;
    }
    if (dHashConverter === null) {
      dHashConverter = new VanilaConverter_default(document2, ITU_R601_2Method, new LanczosResizer_default());
    }
    this.dHashConverter = dHashConverter;
    this.generator = new HashGenerator_default(document2);
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

// src/node/lottie-audio.ts
var LottieAudio = class extends LottieAudioCommon {
  constructor(options) {
    super(options);
  }
};

// src/lottie-animation.ts
var LottieAnimation = class extends LottieAnimationCommon {
  constructor(options) {
    super(options);
  }
  async toBase64() {
    const data = await this.toArrayBuffer();
    if (typeof window === "undefined")
      return Buffer.from(data).toString("base64");
    const uint8Array = new Uint8Array(data);
    const binaryString = uint8Array.reduce((acc, val) => acc + String.fromCharCode(val), "");
    return window.btoa(binaryString);
  }
  async _extractImageAssets() {
    if (!this._data)
      throw createError("Asset extraction failed.");
    const animationAssets = this._data.assets;
    if (!animationAssets)
      throw createError("Asset extraction failed.");
    for (const asset of animationAssets) {
      if ("w" in asset && "h" in asset && !("xt" in asset) && "p" in asset) {
        const imageData = asset.p.split(",");
        if (!imageData.length || !imageData[0] || !imageData[1]) {
          break;
        }
        let extType = null;
        const fileType = getExtensionTypeFromBase64(asset.p);
        extType = fileType;
        const fileName = `${asset.id}.${extType}`;
        this._imageAssets.push(new LottieImage({
          data: asset.p,
          id: asset.id,
          fileName,
          parentAnimations: [this]
        }));
        asset.p = fileName;
        asset.u = "/images/";
        asset.e = 0;
      }
    }
    return false;
  }
  async _extractAudioAssets() {
    if (!this._data)
      throw new DotLottieError("Asset extraction failed.");
    const animationAssets = this._data.assets;
    if (!animationAssets)
      throw new DotLottieError("Asset extraction failed.");
    for (const asset of animationAssets) {
      if (isAudioAsset(asset)) {
        const audioData = asset.p.split(",");
        if (!audioData.length || !audioData[0] || !audioData[1]) {
          break;
        }
        let extType = null;
        const fileType = getExtensionTypeFromBase64(asset.p);
        extType = fileType;
        const fileName = `${asset.id}.${extType}`;
        this._audioAssets.push(new LottieAudio({
          data: asset.p,
          id: asset.id,
          fileName,
          parentAnimations: [this]
        }));
        asset.p = fileName;
        asset.u = "/audio/";
        asset.e = 0;
      }
    }
    return false;
  }
};

// src/dotlottie.ts
var DotLottie = class extends DotLottieCommon {
  constructor(options) {
    super(options);
    if (this.enableDuplicateImageOptimization)
      this.addPlugins(new DuplicateImageDetector());
  }
  addPlugins(...plugins) {
    plugins.forEach((plugin) => {
      plugin.install(this);
      this._plugins.push(plugin);
    });
    return this;
  }
  addAnimation(animationOptions) {
    const animation = new LottieAnimation(animationOptions);
    if (this._animationsMap.get(animationOptions.id)) {
      throw createError("Duplicate animation id detected, aborting.");
    }
    this._animationsMap.set(animation.id, animation);
    return this;
  }
  async toBase64(options) {
    const data = await this.toArrayBuffer(options);
    const uint8Array = new Uint8Array(data);
    const binaryString = uint8Array.reduce((acc, val) => acc + String.fromCharCode(val), "");
    return window.btoa(binaryString);
  }
  async download(fileName, options = void 0) {
    const blob = await this.toBlob(options);
    const dataURL = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = fileName;
    link.style.display = "none";
    document.body.append(link);
    link.click();
    setTimeout(() => {
      URL.revokeObjectURL(dataURL);
      link.remove();
    }, 1e3);
  }
  create(options) {
    return new DotLottie(options);
  }
  async toArrayBuffer(options) {
    const manifest = this._buildManifest();
    const dotlottie = {
      "manifest.json": [
        strToU8(JSON.stringify(manifest)),
        {
          level: 0
        }
      ]
    };
    for (const animation of this.animations) {
      const json = await animation.toJSON();
      dotlottie[`animations/${animation.id}.json`] = [strToU8(JSON.stringify(json)), animation.zipOptions];
      const imageAssets = animation.imageAssets;
      const audioAssets = animation.audioAssets;
      for (const asset of imageAssets) {
        const dataAsString = await asset.toDataURL();
        dotlottie[`images/${asset.fileName}`] = [base64ToUint8Array(dataAsString), asset.zipOptions];
      }
      for (const asset of audioAssets) {
        const dataAsString = await asset.toDataURL();
        dotlottie[`audio/${asset.fileName}`] = [base64ToUint8Array(dataAsString), asset.zipOptions];
      }
    }
    for (const theme of this.themes) {
      const themeData = await theme.toString();
      dotlottie[`themes/${theme.id}.json`] = [strToU8(themeData), theme.zipOptions];
    }
    for (const state of this.stateMachines) {
      const stateData = state.toString();
      dotlottie[`states/${state.id}.json`] = [strToU8(stateData), state.zipOptions];
    }
    const dotlottieArrayBuffer = await new Promise((resolve, reject) => {
      zip(dotlottie, options?.zipOptions || {}, (err, data) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(data.buffer);
      });
    });
    return dotlottieArrayBuffer;
  }
  async fromArrayBuffer(arrayBuffer) {
    const dotlottie = new DotLottie();
    try {
      const contentObj = await new Promise((resolve, reject) => {
        unzip(new Uint8Array(arrayBuffer), (err, data) => {
          if (err) {
            reject(err);
          }
          resolve(data);
        });
      });
      const tmpImages = [];
      const tmpAudio = [];
      if (contentObj["manifest.json"] instanceof Uint8Array) {
        try {
          const manifest = JSON.parse(strFromU8(contentObj["manifest.json"], false));
          const { author, custom, description, generator, keywords, version } = manifest;
          if (author) {
            this._requireValidAuthor(author);
            dotlottie.setAuthor(author);
          }
          if (custom) {
            this._requireValidCustomData(custom);
            dotlottie.setCustomData(custom);
          }
          if (description) {
            this._requireValidDescription(description);
            dotlottie.setDescription(description);
          }
          if (generator) {
            this._requireValidGenerator(generator);
            dotlottie.setGenerator(generator);
          }
          if (keywords) {
            this._requireValidKeywords(keywords);
            dotlottie.setKeywords(keywords);
          }
          if (version) {
            this._requireValidVersion(version);
            dotlottie.setVersion(version);
          }
          for (const key of Object.keys(contentObj)) {
            const decodedStr = strFromU8(contentObj[key], true);
            if (key.startsWith("animations/") && key.endsWith(".json")) {
              const animationId = /animations\/(.+)\.json/u.exec(key)?.[1];
              if (!animationId) {
                throw createError("Invalid animation id");
              }
              const animation = JSON.parse(decodedStr);
              const animationSettings = manifest["animations"].find((anim) => anim.id === animationId);
              if (animationSettings === void 0) {
                throw createError("Animation not found inside manifest");
              }
              dotlottie.addAnimation({
                data: animation,
                ...animationSettings
              });
            } else if (key.startsWith("images/")) {
              const imageId = /images\/(.+)\./u.exec(key)?.[1];
              if (!imageId) {
                throw createError("Invalid image id");
              }
              let decodedImg = btoa(decodedStr);
              const ext = getExtensionTypeFromBase64(decodedImg);
              decodedImg = `data:image/${ext};base64,${decodedImg}`;
              tmpImages.push(new LottieImage({
                id: imageId,
                data: decodedImg,
                fileName: key.split("/")[1] || ""
              }));
            } else if (key.startsWith("audio/")) {
              const audioId = /audio\/(.+)\./u.exec(key)?.[1];
              if (!audioId) {
                throw new DotLottieError("Invalid image id");
              }
              let decodedAudio = btoa(decodedStr);
              const ext = getExtensionTypeFromBase64(decodedAudio);
              decodedAudio = `data:audio/${ext};base64,${decodedAudio}`;
              tmpAudio.push(new LottieAudio({
                id: audioId,
                data: decodedAudio,
                fileName: key.split("/")[1] || ""
              }));
            } else if (key.startsWith("themes/") && key.endsWith(".json")) {
              const themeId = /themes\/(.+)\.json/u.exec(key)?.[1];
              if (!themeId) {
                throw createError("Invalid theme id");
              }
              manifest.themes?.forEach((theme) => {
                if (theme.id === themeId) {
                  dotlottie.addTheme({
                    id: theme.id,
                    data: JSON.parse(decodedStr)
                  });
                  theme.animations.forEach((animationId) => {
                    dotlottie.assignTheme({
                      animationId,
                      themeId
                    });
                  });
                }
              });
            } else if (key.startsWith("states/") && key.endsWith(".json")) {
              const stateId = /states\/(.+)\.json/u.exec(key)?.[1];
              if (!stateId) {
                throw createError("Invalid theme id");
              }
              manifest.states?.forEach((state) => {
                if (state === stateId) {
                  const decodedStateMachine = JSON.parse(decodedStr);
                  dotlottie.addStateMachine(decodedStateMachine);
                }
              });
            }
          }
          for (const image of tmpImages) {
            for (const parentAnimation of dotlottie.animations) {
              if (parentAnimation.data) {
                const animationAssets = parentAnimation.data.assets;
                if (animationAssets) {
                  for (const asset of animationAssets) {
                    if ("w" in asset && "h" in asset) {
                      if (asset.p.includes(image.id)) {
                        image.parentAnimations.push(parentAnimation);
                        parentAnimation.imageAssets.push(image);
                      }
                    }
                  }
                }
              }
            }
          }
          for (const audio of tmpAudio) {
            for (const parentAnimation of dotlottie.animations) {
              if (parentAnimation.data) {
                const animationAssets = parentAnimation.data.assets;
                if (animationAssets) {
                  for (const asset of animationAssets) {
                    if (isAudioAsset(asset)) {
                      if (asset.p.includes(audio.id)) {
                        audio.parentAnimations.push(parentAnimation);
                        parentAnimation.audioAssets.push(audio);
                      }
                    }
                  }
                }
              }
            }
          }
        } catch (err) {
          if (err instanceof Error) {
            throw new DotLottieError(`Invalid manifest inside buffer! ${err.message}`);
          }
        }
      } else {
        throw new DotLottieError("Invalid buffer");
      }
    } catch (err) {
      if (err instanceof Error) {
        throw new DotLottieError(err.message);
      }
    }
    return dotlottie;
  }
};

// src/lottie-theme.ts
var LottieTheme = class extends LottieThemeCommon {
  constructor(options) {
    super(options);
  }
};

// src/lottie-state-machine.ts
var LottieStateMachine = class extends DotLottieStateMachineCommon {
  constructor(options) {
    super(options);
  }
};

// src/lottie-audio.ts
var LottieAudio2 = class extends LottieAudioCommon {
  constructor(options) {
    super(options);
  }
};

export { DotLottie, DotLottieCommon, DotLottieError, DotLottiePlugin, DotLottieStateMachineCommon, DotLottieStateMachineDescriptorSchema, DotLottieStateMachineSchema, DotLottieStatePlaybackSettingsSchema, DotLottieStateSchema, DotLottieStateTransitionEventsSchema, DotLottieStatesSchema, DuplicateImageDetectorCommon, ErrorCodes, LottieAnimation, LottieAnimationCommon, LottieAudio2 as LottieAudio, LottieAudioCommon, LottieImage, LottieImageCommon, LottieStateMachine, LottieTheme, LottieThemeCommon, MIME_CODES, MIME_TO_EXTENSION, MIME_TYPES, ManifestAnimationSchema, ManifestSchema, ManifestThemeSchema, PlayMode, PlayModeSchema, PlaybackOptionsSchema, StateTransitionOnAfterSchema, StateTransitionOnClickSchema, StateTransitionOnCompleteSchema, StateTransitionOnEnterSchema, StateTransitionOnMouseEnterSchema, StateTransitionOnMouseLeaveSchema, StateTransitionOnShowSchema, TransitionableSchema, base64ToUint8Array, createError, dataUrlFromU8, getAllAudio, getAnimation, getAnimations, getAudio, getExtensionTypeFromBase64, getImage, getImages, getManifest, getMimeTypeFromBase64, getStateMachine, getStateMachines, getTheme, getThemes, inlineAudioAssets, inlineImageAssets, isAudioAsset, isImageAsset, isValidURL, loadFromArrayBuffer, loadFromURL, unzipDotLottie, unzipDotLottieFile, validateDotLottie };
//# sourceMappingURL=index.js.map