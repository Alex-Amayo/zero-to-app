"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "wrapFetchWithProxy", {
    enumerable: true,
    get: ()=>wrapFetchWithProxy
});
function _httpsProxyAgent() {
    const data = /*#__PURE__*/ _interopRequireDefault(require("https-proxy-agent"));
    _httpsProxyAgent = function() {
        return data;
    };
    return data;
}
const _env = require("../../utils/env");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const debug = require("debug")("expo:api:fetch:proxy");
function wrapFetchWithProxy(fetchFunction) {
    // NOTE(EvanBacon): DO NOT RETURN AN ASYNC WRAPPER. THIS BREAKS LOADING INDICATORS.
    return function fetchWithProxy(url, options = {}) {
        const proxy = _env.env.HTTP_PROXY;
        if (!options.agent && proxy) {
            debug("Using proxy:", proxy);
            options.agent = (0, _httpsProxyAgent().default)(proxy);
        }
        return fetchFunction(url, options);
    };
}

//# sourceMappingURL=wrapFetchWithProxy.js.map