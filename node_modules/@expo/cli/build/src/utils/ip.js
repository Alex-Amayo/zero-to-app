"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getIpAddress", {
    enumerable: true,
    get: ()=>getIpAddress
});
function _internalIp() {
    const data = /*#__PURE__*/ _interopRequireDefault(require("internal-ip"));
    _internalIp = function() {
        return data;
    };
    return data;
}
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function getIpAddress() {
    return _internalIp().default.v4.sync() || "127.0.0.1";
}

//# sourceMappingURL=ip.js.map