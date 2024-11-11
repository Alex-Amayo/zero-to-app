"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "openBrowserAsync", {
    enumerable: true,
    get: ()=>openBrowserAsync
});
function _betterOpn() {
    const data = /*#__PURE__*/ _interopRequireDefault(require("better-opn"));
    _betterOpn = function() {
        return data;
    };
    return data;
}
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
async function openBrowserAsync(target, options) {
    if (process.platform !== "win32") {
        return await (0, _betterOpn().default)(target, options);
    }
    const oldSystemRoot = process.env.SYSTEMROOT;
    try {
        var _SYSTEMROOT;
        process.env.SYSTEMROOT = (_SYSTEMROOT = process.env.SYSTEMROOT) != null ? _SYSTEMROOT : process.env.SystemRoot;
        return await (0, _betterOpn().default)(target, options);
    } finally{
        process.env.SYSTEMROOT = oldSystemRoot;
    }
}

//# sourceMappingURL=open.js.map