import { strToU8, zip, unzip, strFromU8 } from 'fflate';
import { nativeEnum, object, optional, boolean, string, union, literal, number, array, record, any, omit, merge, minValue, maxValue, tuple, safeParse, flatten } from 'valibot';
import phash from 'sharp-phash';

var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};

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
var DuplicateImageDetector = class extends DuplicateImageDetectorCommon {
  distanceTo(imageHash, targetImageHash) {
    let count = 0;
    for (let i = 0; i < targetImageHash.length; i += 1) {
      if (targetImageHash[i] !== imageHash[i]) {
        count += 1;
      }
    }
    return count;
  }
  async generatePhash(image) {
    if (!image.data) ;
    const nBuf = await image.toArrayBuffer();
    const decoder = new TextDecoder();
    let phashValue = null;
    phashValue = await phash(Buffer.from(decoder.decode(nBuf), "base64"));
    return phashValue;
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

// src/node/dotlottie.ts
var DotLottie = class extends DotLottieCommon {
  constructor(options) {
    const generator = options?.generator ?? `${package_default.name}/node@${package_default.version}`;
    super({
      ...options,
      generator
    });
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
  create() {
    return new DotLottie();
  }
  async toBase64(options) {
    const data = await this.toArrayBuffer(options);
    return Buffer.from(data).toString("base64");
  }
  async download(_fileName, _options = void 0) {
    throw createError("Cannot download dotlottie in a non-browser environment");
  }
  addAnimation(animationOptions) {
    const animation = new LottieAnimation(animationOptions);
    if (this._animationsMap.get(animationOptions.id)) {
      throw createError("Duplicate animation id detected, aborting.");
    }
    this._animationsMap.set(animation.id, animation);
    return this;
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
            const decompressedFile = contentObj[key];
            const decodedStr = strFromU8(contentObj[key], false);
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
              const base64 = Buffer.from(decompressedFile).toString("base64");
              const ext = getExtensionTypeFromBase64(base64);
              const imgDataURL = `data:image/${ext};base64,${base64}`;
              tmpImages.push(new LottieImage2({
                id: imageId,
                data: imgDataURL,
                fileName: key.split("/")[1] || ""
              }));
            } else if (key.startsWith("audio/")) {
              const audioId = /audio\/(.+)\./u.exec(key)?.[1];
              if (!audioId) {
                throw new DotLottieError("Invalid audio id");
              }
              const base64 = Buffer.from(decompressedFile).toString("base64");
              const ext = getExtensionTypeFromBase64(base64);
              const audioDataURL = `data:audio/${ext};base64,${base64}`;
              tmpAudio.push(new LottieAudio({
                id: audioId,
                data: audioDataURL,
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
          throw new DotLottieError(`Invalid manifest inside buffer! ${err.message}`);
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

export { DotLottie };
//# sourceMappingURL=dotlottie.js.map