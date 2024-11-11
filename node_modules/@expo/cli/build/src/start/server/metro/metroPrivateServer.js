"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "assertMetroPrivateServer", {
    enumerable: true,
    get: ()=>assertMetroPrivateServer
});
function _nodeAssert() {
    const data = /*#__PURE__*/ _interopRequireDefault(require("node:assert"));
    _nodeAssert = function() {
        return data;
    };
    return data;
}
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function assertMetroPrivateServer(metro) {
    (0, _nodeAssert().default)(metro, "Metro server undefined.");
    (0, _nodeAssert().default)("_config" in metro && "_bundler" in metro, "Metro server is missing expected properties (_config, _bundler). This could be due to a version mismatch or change in the Metro API.");
}

//# sourceMappingURL=metroPrivateServer.js.map