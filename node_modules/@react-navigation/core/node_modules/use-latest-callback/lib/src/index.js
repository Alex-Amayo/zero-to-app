"use strict";
var React = require("react");
var useIsomorphicLayoutEffect_1 = require("./useIsomorphicLayoutEffect");
/**
 * React hook which returns the latest callback without changing the reference.
 */
// eslint-disable-next-line @typescript-eslint/ban-types
function useLatestCallback(callback) {
    var ref = React.useRef(callback);
    var latestCallback = React.useRef(function latestCallback() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return ref.current.apply(this, args);
    }).current;
    (0, useIsomorphicLayoutEffect_1.default)(function () {
        ref.current = callback;
    });
    return latestCallback;
}
module.exports = useLatestCallback;
