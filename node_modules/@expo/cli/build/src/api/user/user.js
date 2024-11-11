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
    ANONYMOUS_USERNAME: ()=>ANONYMOUS_USERNAME,
    getActorDisplayName: ()=>getActorDisplayName,
    getUserAsync: ()=>getUserAsync,
    loginAsync: ()=>loginAsync,
    ssoLoginAsync: ()=>ssoLoginAsync,
    logoutAsync: ()=>logoutAsync
});
function _fs() {
    const data = require("fs");
    _fs = function() {
        return data;
    };
    return data;
}
function _graphqlTag() {
    const data = /*#__PURE__*/ _interopRequireDefault(require("graphql-tag"));
    _graphqlTag = function() {
        return data;
    };
    return data;
}
const _userSettings = /*#__PURE__*/ _interopRequireDefault(require("./UserSettings"));
const _expoSsoLauncher = require("./expoSsoLauncher");
const _log = /*#__PURE__*/ _interopRequireWildcard(require("../../log"));
const _codesigning = require("../../utils/codesigning");
const _env = require("../../utils/env");
const _telemetry = require("../../utils/telemetry");
const _endpoint = require("../endpoint");
const _client = require("../graphql/client");
const _userQuery = require("../graphql/queries/UserQuery");
const _client1 = require("../rest/client");
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
let currentUser;
const ANONYMOUS_USERNAME = "anonymous";
function getActorDisplayName(user) {
    switch(user == null ? void 0 : user.__typename){
        case "User":
            return user.username;
        case "SSOUser":
            return user.username;
        case "Robot":
            return user.firstName ? `${user.firstName} (robot)` : "robot";
        default:
            return ANONYMOUS_USERNAME;
    }
}
async function getUserAsync() {
    var ref;
    const hasCredentials = _userSettings.default.getAccessToken() || ((ref = _userSettings.default.getSession()) == null ? void 0 : ref.sessionSecret);
    if (!_env.env.EXPO_OFFLINE && !currentUser && hasCredentials) {
        var ref1;
        const user = await _userQuery.UserQuery.currentUserAsync();
        currentUser = user != null ? user : undefined;
        (ref1 = (0, _telemetry.getTelemetry)()) == null ? void 0 : ref1.identify(currentUser);
    }
    return currentUser;
}
async function loginAsync(json) {
    const res = await (0, _client1.fetchAsync)("auth/loginAsync", {
        method: "POST",
        body: JSON.stringify(json)
    });
    const { data: { sessionSecret  } ,  } = await res.json();
    const userData = await fetchUserAsync({
        sessionSecret
    });
    await _userSettings.default.setSessionAsync({
        sessionSecret,
        userId: userData.id,
        username: userData.username,
        currentConnection: "Username-Password-Authentication"
    });
}
async function ssoLoginAsync() {
    const sessionSecret = await (0, _expoSsoLauncher.getSessionUsingBrowserAuthFlowAsync)({
        expoWebsiteUrl: (0, _endpoint.getExpoWebsiteBaseUrl)()
    });
    const userData = await fetchUserAsync({
        sessionSecret
    });
    await _userSettings.default.setSessionAsync({
        sessionSecret,
        userId: userData.id,
        username: userData.username,
        currentConnection: "Browser-Flow-Authentication"
    });
}
async function logoutAsync() {
    currentUser = undefined;
    await Promise.all([
        _fs().promises.rm((0, _codesigning.getDevelopmentCodeSigningDirectory)(), {
            recursive: true,
            force: true
        }),
        _userSettings.default.setSessionAsync(undefined), 
    ]);
    _log.log("Logged out");
}
async function fetchUserAsync({ sessionSecret  }) {
    const result = await _client.graphqlClient.query((0, _graphqlTag().default)`
        query UserQuery {
          meUserActor {
            id
            username
          }
        }
      `, {}, {
        fetchOptions: {
            headers: {
                "expo-session": sessionSecret
            }
        },
        additionalTypenames: []
    }).toPromise();
    const { data  } = result;
    return {
        id: data.meUserActor.id,
        username: data.meUserActor.username
    };
}

//# sourceMappingURL=user.js.map