"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.default = getDevToolsFrontendUrl;
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

/**
 * Get the DevTools frontend URL to debug a given React Native CDP target.
 */
function getDevToolsFrontendUrl(
  experiments,
  webSocketDebuggerUrl,
  devServerUrl
) {
  const scheme = new URL(webSocketDebuggerUrl).protocol.slice(0, -1);
  const webSocketUrlWithoutProtocol = webSocketDebuggerUrl.replace(
    /^wss?:\/\//,
    ""
  );
  const searchParams = new URLSearchParams([
    [scheme, webSocketUrlWithoutProtocol],
    ["sources.hide_add_folder", "true"],
  ]);
  if (experiments.enableNetworkInspector) {
    searchParams.append("unstable_enableNetworkPanel", "true");
  }
  return (
    `${devServerUrl}/debugger-frontend/rn_inspector.html` +
    "?" +
    searchParams.toString()
  );
}
