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
    ApiV2Error: ()=>ApiV2Error,
    UnexpectedServerError: ()=>UnexpectedServerError,
    wrapFetchWithCredentials: ()=>wrapFetchWithCredentials,
    createCachedFetch: ()=>createCachedFetch,
    fetchAsync: ()=>fetchAsync
});
function _getUserState() {
    const data = require("@expo/config/build/getUserState");
    _getUserState = function() {
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
function _path() {
    const data = /*#__PURE__*/ _interopRequireDefault(require("path"));
    _path = function() {
        return data;
    };
    return data;
}
const _wrapFetchWithCache = require("./cache/wrapFetchWithCache");
const _wrapFetchWithBaseUrl = require("./wrapFetchWithBaseUrl");
const _wrapFetchWithOffline = require("./wrapFetchWithOffline");
const _wrapFetchWithProgress = require("./wrapFetchWithProgress");
const _wrapFetchWithProxy = require("./wrapFetchWithProxy");
const _env = require("../../utils/env");
const _errors = require("../../utils/errors");
const _endpoint = require("../endpoint");
const _settings = require("../settings");
const _userSettings = /*#__PURE__*/ _interopRequireDefault(require("../user/UserSettings"));
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
class ApiV2Error extends Error {
    name = "ApiV2Error";
    constructor(response){
        super(response.message);
        this.code = response.code;
        this.expoApiV2ErrorCode = response.code;
        this.expoApiV2ErrorDetails = response.details;
        this.expoApiV2ErrorServerStack = response.stack;
        this.expoApiV2ErrorMetadata = response.metadata;
    }
}
class UnexpectedServerError extends Error {
    name = "UnexpectedServerError";
}
function wrapFetchWithCredentials(fetchFunction) {
    return async function fetchWithCredentials(url, options = {}) {
        if (Array.isArray(options.headers)) {
            throw new Error("request headers must be in object form");
        }
        var _headers;
        const resolvedHeaders = (_headers = options.headers) != null ? _headers : {};
        const token = _userSettings.default.getAccessToken();
        if (token) {
            resolvedHeaders.authorization = `Bearer ${token}`;
        } else {
            var ref;
            const sessionSecret = (ref = _userSettings.default.getSession()) == null ? void 0 : ref.sessionSecret;
            if (sessionSecret) {
                resolvedHeaders["expo-session"] = sessionSecret;
            }
        }
        try {
            const results = await fetchFunction(url, {
                ...options,
                headers: resolvedHeaders
            });
            if (results.status >= 400 && results.status < 500) {
                const body = await results.text();
                try {
                    var ref1;
                    const data = JSON.parse(body);
                    if (data == null ? void 0 : (ref1 = data.errors) == null ? void 0 : ref1.length) {
                        throw new ApiV2Error(data.errors[0]);
                    }
                } catch (error) {
                    // Server returned non-json response.
                    if (error.message.includes("in JSON at position")) {
                        throw new UnexpectedServerError(body);
                    }
                    throw error;
                }
            }
            return results;
        } catch (error1) {
            // Specifically, when running `npx expo start` and the wifi is connected but not really (public wifi, airplanes, etc).
            if ("code" in error1 && error1.code === "ENOTFOUND") {
                (0, _settings.disableNetwork)();
                throw new _errors.CommandError("OFFLINE", "Network connection is unreliable. Try again with the environment variable `EXPO_OFFLINE=1` to skip network requests.");
            }
            throw error1;
        }
    };
}
const fetchWithOffline = (0, _wrapFetchWithOffline.wrapFetchWithOffline)(_nodeFetch().default);
const fetchWithBaseUrl = (0, _wrapFetchWithBaseUrl.wrapFetchWithBaseUrl)(fetchWithOffline, (0, _endpoint.getExpoApiBaseUrl)() + "/v2/");
const fetchWithProxy = (0, _wrapFetchWithProxy.wrapFetchWithProxy)(fetchWithBaseUrl);
const fetchWithCredentials = (0, _wrapFetchWithProgress.wrapFetchWithProgress)(wrapFetchWithCredentials(fetchWithProxy));
function createCachedFetch({ fetch =fetchWithCredentials , cacheDirectory , ttl , skipCache  }) {
    // Disable all caching in EXPO_BETA.
    if (skipCache || _env.env.EXPO_BETA || _env.env.EXPO_NO_CACHE) {
        return fetch;
    }
    const { FileSystemCache  } = require("./cache/FileSystemCache");
    return (0, _wrapFetchWithCache.wrapFetchWithCache)(fetch, new FileSystemCache({
        cacheDirectory: _path().default.join((0, _getUserState().getExpoHomeDirectory)(), cacheDirectory),
        ttl
    }));
}
const fetchAsync = (0, _wrapFetchWithProgress.wrapFetchWithProgress)(wrapFetchWithCredentials(fetchWithProxy));

//# sourceMappingURL=client.js.map