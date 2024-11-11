import { nativeEnum, object, optional, boolean, string, union, literal, number, array, record, any, omit, merge, minValue, maxValue, tuple, safeParse, flatten } from 'valibot';
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

// src/node/lottie-state-machine.ts
var LottieStateMachine = class extends DotLottieStateMachineCommon {
  constructor(options) {
    super(options);
  }
};

export { LottieStateMachine };
//# sourceMappingURL=lottie-state-machine.js.map