"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configure = configure;
exports.configureInternal = configureInternal;
exports.getConfig = getConfig;
exports.resetToDefaults = resetToDefaults;
/**
 * Global configuration options for React Native Testing Library.
 */

const defaultConfig = {
  asyncUtilTimeout: 1000,
  defaultIncludeHiddenElements: false,
  concurrentRoot: false
};
let config = {
  ...defaultConfig
};

/**
 * Configure global options for React Native Testing Library.
 */
function configure(options) {
  const {
    defaultHidden,
    ...restOptions
  } = options;
  const defaultIncludeHiddenElements = restOptions.defaultIncludeHiddenElements ?? defaultHidden ?? config.defaultIncludeHiddenElements;
  config = {
    ...config,
    ...restOptions,
    defaultIncludeHiddenElements
  };
}
function configureInternal(option) {
  config = {
    ...config,
    ...option
  };
}
function resetToDefaults() {
  config = {
    ...defaultConfig
  };
}
function getConfig() {
  return config;
}
//# sourceMappingURL=config.js.map