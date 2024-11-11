"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "canResolveDevClient", {
    enumerable: true,
    get: ()=>canResolveDevClient
});
function _resolveFrom() {
    const data = /*#__PURE__*/ _interopRequireDefault(require("resolve-from"));
    _resolveFrom = function() {
        return data;
    };
    return data;
}
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function canResolveDevClient(projectRoot) {
    try {
        // we check if `expo-dev-launcher` is installed instead of `expo-dev-client`
        // because someone could install only launcher.
        (0, _resolveFrom().default)(projectRoot, "expo-dev-launcher");
        return true;
    } catch  {
        return false;
    }
}

//# sourceMappingURL=detectDevClient.js.map