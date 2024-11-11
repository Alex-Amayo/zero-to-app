import { nativeEnum, object, optional, boolean, string, union, literal, number, array, record, any, omit, merge, minValue, maxValue, tuple } from 'valibot';
import 'fflate';

var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
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

// src/lottie-image.ts
var LottieImage = class extends LottieImageCommon {
  constructor(options) {
    super(options);
  }
};

export { LottieImage };
//# sourceMappingURL=lottie-image.js.map