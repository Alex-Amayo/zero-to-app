"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.default = void 0;
var _fs = require("fs");
var _path = _interopRequireDefault(require("path"));
var _tempDir = _interopRequireDefault(require("temp-dir"));
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}
/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *
 * @format
 * @oncall react_native
 */

const { Launcher: EdgeLauncher } = require("@rnx-kit/chromium-edge-launcher");
const ChromeLauncher = require("chrome-launcher");

/**
 * Default `BrowserLauncher` implementation which opens URLs on the host
 * machine.
 */
const DefaultBrowserLauncher = {
  /**
   * Attempt to open the debugger frontend in a Google Chrome or Microsoft Edge
   * app window.
   */
  launchDebuggerAppWindow: async (url) => {
    let browserType = "chrome";
    let chromePath;
    try {
      // Locate Chrome installation path, will throw if not found
      chromePath = ChromeLauncher.getChromePath();
    } catch (e) {
      browserType = "edge";
      chromePath = EdgeLauncher.getFirstInstallation();
      if (chromePath == null) {
        throw new Error(
          "Unable to find a browser on the host to open the debugger. " +
            "Supported browsers: Google Chrome, Microsoft Edge.\n" +
            url
        );
      }
    }
    const userDataDir = await createTempDir(
      `react-native-debugger-frontend-${browserType}`
    );
    const launchedChrome = await ChromeLauncher.launch({
      chromeFlags: [
        ...ChromeLauncher.Launcher.defaultFlags().filter(
          /**
           * This flag controls whether Chrome treats a visually covered (occluded) tab
           * as "backgrounded". We launch CDT as a single tab/window via `--app`, so we
           * do want Chrome to treat our tab as "backgrounded" when the UI is covered.
           * Omitting this flag allows "visibilitychange" events to fire properly.
           */
          (flag) => flag !== "--disable-backgrounding-occluded-windows"
        ),
        `--app=${url}`,
        `--user-data-dir=${userDataDir}`,
        "--window-size=1200,600",
        "--guest",
      ],
      chromePath,
      ignoreDefaultFlags: true,
    });
    return {
      kill: async () => launchedChrome.kill(),
    };
  },
};
async function createTempDir(dirName) {
  const tempDir = _path.default.join(_tempDir.default, dirName);
  await _fs.promises.mkdir(tempDir, {
    recursive: true,
  });
  return tempDir;
}
var _default = DefaultBrowserLauncher;
exports.default = _default;
