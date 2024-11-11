"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    graphqlClient: ()=>graphqlClient,
    withErrorHandlingAsync: ()=>withErrorHandlingAsync,
    GraphqlError: ()=>_core().CombinedError
});
function _core() {
    const data = require("@urql/core");
    _core = function() {
        return data;
    };
    return data;
}
function _exchangeRetry() {
    const data = require("@urql/exchange-retry");
    _exchangeRetry = function() {
        return data;
    };
    return data;
}
function _nodeFetch() {
    const data = /*#__PURE__*/ _interopRequireDefault(require("node-fetch"));
    _nodeFetch = function() {
        return data;
    };
    return data;
}
const _log = /*#__PURE__*/ _interopRequireWildcard(require("../../log"));
const _endpoint = require("../endpoint");
const _wrapFetchWithOffline = require("../rest/wrapFetchWithOffline");
const _wrapFetchWithProxy = require("../rest/wrapFetchWithProxy");
const _userSettings = /*#__PURE__*/ _interopRequireDefault(require("../user/UserSettings"));
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function") return null;
    var cacheBabelInterop = new WeakMap();
    var cacheNodeInterop = new WeakMap();
    return (_getRequireWildcardCache = function(nodeInterop) {
        return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
}
function _interopRequireWildcard(obj, nodeInterop) {
    if (!nodeInterop && obj && obj.__esModule) {
        return obj;
    }
    if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
        return {
            default: obj
        };
    }
    var cache = _getRequireWildcardCache(nodeInterop);
    if (cache && cache.has(obj)) {
        return cache.get(obj);
    }
    var newObj = {};
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for(var key in obj){
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
            var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
            if (desc && (desc.get || desc.set)) {
                Object.defineProperty(newObj, key, desc);
            } else {
                newObj[key] = obj[key];
            }
        }
    }
    newObj.default = obj;
    if (cache) {
        cache.set(obj, newObj);
    }
    return newObj;
}
const graphqlClient = (0, _core().createClient)({
    url: (0, _endpoint.getExpoApiBaseUrl)() + "/graphql",
    exchanges: [
        _core().dedupExchange,
        _core().cacheExchange,
        (0, _exchangeRetry().retryExchange)({
            maxDelayMs: 4000,
            retryIf: (err)=>{
                return !!(err && (err.networkError || err.graphQLErrors.some((e)=>{
                    var ref;
                    return e == null ? void 0 : (ref = e.extensions) == null ? void 0 : ref.isTransient;
                })));
            }
        }),
        _core().fetchExchange, 
    ],
    // @ts-ignore Type 'typeof fetch' is not assignable to type '(input: RequestInfo, init?: RequestInit | undefined) => Promise<Response>'.
    fetch: (0, _wrapFetchWithOffline.wrapFetchWithOffline)((0, _wrapFetchWithProxy.wrapFetchWithProxy)(_nodeFetch().default)),
    fetchOptions: ()=>{
        var ref;
        const token = _userSettings.default.getAccessToken();
        if (token) {
            return {
                headers: {
                    authorization: `Bearer ${token}`
                }
            };
        }
        const sessionSecret = (ref = _userSettings.default.getSession()) == null ? void 0 : ref.sessionSecret;
        if (sessionSecret) {
            return {
                headers: {
                    "expo-session": sessionSecret
                }
            };
        }
        return {};
    }
});
async function withErrorHandlingAsync(promise) {
    const { data , error  } = await promise;
    if (error) {
        if (error.graphQLErrors.some((e)=>{
            var ref;
            return e == null ? void 0 : (ref = e.extensions) == null ? void 0 : ref.isTransient;
        })) {
            _log.error(`We've encountered a transient error, please try again shortly.`);
        }
        throw error;
    }
    // Check for a malformed response. This only checks the root query's existence. It doesn't affect
    // returning responses with an empty result set.
    if (!data) {
        throw new Error("Returned query result data is null!");
    }
    return data;
}

//# sourceMappingURL=client.js.map