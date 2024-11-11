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
function isAudioAsset(asset) {
  return !("h" in asset) && !("w" in asset) && "p" in asset && "e" in asset && "u" in asset && "id" in asset;
}

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

// src/node/lottie-audio.ts
var LottieAudio = class extends LottieAudioCommon {
  constructor(options) {
    super(options);
  }
};

// src/node/lottie-image.ts
var LottieImage2 = class extends LottieImageCommon {
  constructor(options) {
    super(options);
  }
};

// src/node/lottie-animation.ts
var LottieAnimation = class extends LottieAnimationCommon {
  constructor(options) {
    super(options);
  }
  async toBase64() {
    const data = await this.toArrayBuffer();
    return Buffer.from(data).toString("base64");
  }
  async _extractImageAssets() {
    if (!this._data)
      throw new DotLottieError("Failed to extract image assets: Animation data does not exist");
    const animationAssets = this._data.assets;
    if (!animationAssets)
      throw new DotLottieError("Failed to extract image assets: No assets found inside animation");
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
        this._imageAssets.push(new LottieImage2({
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
      throw new DotLottieError("Failed to extract audio assets: Animation data does not exist");
    const animationAssets = this._data.assets;
    if (!animationAssets)
      throw new DotLottieError("Failed to extract image assets: No assets found inside animation");
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

export { LottieAnimation };
//# sourceMappingURL=lottie-animation.js.map