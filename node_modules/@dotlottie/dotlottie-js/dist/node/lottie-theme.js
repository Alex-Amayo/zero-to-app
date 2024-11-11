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
var createError = (message) => {
  const error = new Error(`[dotlottie-js]: ${message}`);
  return error;
};
var isValidURL = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
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

// src/node/lottie-theme.ts
var LottieTheme = class extends LottieThemeCommon {
  constructor(options) {
    super(options);
  }
};

export { LottieTheme };
//# sourceMappingURL=lottie-theme.js.map