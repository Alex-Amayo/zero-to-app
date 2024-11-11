"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setup = setup;
var _timers = require("../../helpers/timers");
var _wrapAsync = require("../../helpers/wrap-async");
var _clear = require("../clear");
var _paste = require("../paste");
var _press = require("../press");
var _scroll = require("../scroll");
var _type = require("../type");
var _utils = require("../utils");
/**
 * This functions allow wait to work correctly under both real and fake Jest timers.
 */
function universalJestAdvanceTimersBy(ms) {
  if ((0, _timers.jestFakeTimersAreEnabled)()) {
    return jest.advanceTimersByTime(ms);
  } else {
    return Promise.resolve();
  }
}
const defaultOptions = {
  delay: 0,
  advanceTimers: universalJestAdvanceTimersBy
};

/**
 * Creates a new instance of user event instance with the given options.
 *
 * @param options
 * @returns UserEvent instance
 */
function setup(options) {
  const config = createConfig(options);
  const instance = createInstance(config);
  return instance;
}

/**
 * Options affecting all user event interactions.
 *
 * @param delay between some subsequent inputs like typing a series of characters
 * @param advanceTimers function to be called to advance fake timers
 */

function createConfig(options) {
  return {
    ...defaultOptions,
    ...options
  };
}

/**
 * UserEvent instance used to invoke user interaction functions.
 */

function createInstance(config) {
  const instance = {
    config
  };

  // Bind interactions to given User Event instance.
  const api = {
    press: wrapAndBindImpl(instance, _press.press),
    longPress: wrapAndBindImpl(instance, _press.longPress),
    type: wrapAndBindImpl(instance, _type.type),
    clear: wrapAndBindImpl(instance, _clear.clear),
    paste: wrapAndBindImpl(instance, _paste.paste),
    scrollTo: wrapAndBindImpl(instance, _scroll.scrollTo)
  };
  Object.assign(instance, api);
  return instance;
}

/**
 * Wraps user interaction with `wrapAsync` (temporarily disable `act` environment while
 * calling & resolving the async callback, then flush the microtask queue)
 *
 * This implementation is sourced from `testing-library/user-event`
 * @see https://github.com/testing-library/user-event/blob/7a305dee9ab833d6f338d567fc2e862b4838b76a/src/setup/setup.ts#L121
 */
function wrapAndBindImpl(instance, impl) {
  function method(...args) {
    return (0, _wrapAsync.wrapAsync)(() =>
    // eslint-disable-next-line promise/prefer-await-to-then
    impl.apply(instance, args).then(async result => {
      await (0, _utils.wait)(instance.config);
      return result;
    }));
  }

  // Copy implementation name to the returned function
  Object.defineProperty(method, 'name', {
    get: () => impl.name
  });
  return method;
}
//# sourceMappingURL=setup.js.map