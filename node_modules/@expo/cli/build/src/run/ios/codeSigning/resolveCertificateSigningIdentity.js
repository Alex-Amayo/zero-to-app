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
    sortDefaultIdToBeginningAsync: ()=>sortDefaultIdToBeginningAsync,
    resolveCertificateSigningIdentityAsync: ()=>resolveCertificateSigningIdentityAsync,
    selectDevelopmentTeamAsync: ()=>selectDevelopmentTeamAsync
});
function _chalk() {
    const data = /*#__PURE__*/ _interopRequireDefault(require("chalk"));
    _chalk = function() {
        return data;
    };
    return data;
}
const _security = /*#__PURE__*/ _interopRequireWildcard(require("./Security"));
const _settings = require("./settings");
const _log = /*#__PURE__*/ _interopRequireWildcard(require("../../../log"));
const _errors = require("../../../utils/errors");
const _interactive = require("../../../utils/interactive");
const _link = require("../../../utils/link");
const _prompts = require("../../../utils/prompts");
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
async function sortDefaultIdToBeginningAsync(identities) {
    const lastSelected = await (0, _settings.getLastDeveloperCodeSigningIdAsync)();
    if (lastSelected) {
        let iterations = 0;
        while(identities[0].signingCertificateId !== lastSelected && iterations < identities.length){
            identities.push(identities.shift());
            iterations++;
        }
    }
    return [
        identities,
        lastSelected
    ];
}
/**
 * Assert that the computer needs code signing setup.
 * This links to an FYI page that was user tested internally.
 */ function assertCodeSigningSetup() {
    // TODO: We can probably do this too automatically.
    _log.log(`\u203A Your computer requires some additional setup before you can build onto physical iOS devices.\n  ${_chalk().default.bold((0, _link.learnMore)("https://expo.fyi/setup-xcode-signing"))}`);
    throw new _errors.CommandError("No code signing certificates are available to use.");
}
async function resolveCertificateSigningIdentityAsync(ids) {
    // The user has no valid code signing identities.
    if (!ids.length) {
        assertCodeSigningSetup();
    }
    //  One ID available 🤝 Program is not interactive
    //
    //     using the the first available option
    if (ids.length === 1 || !(0, _interactive.isInteractive)()) {
        // This method is cheaper than `resolveIdentitiesAsync` and checking the
        // cached user preference so we should use this as early as possible.
        return _security.resolveCertificateSigningInfoAsync(ids[0]);
    }
    // Get identities and sort by the one that the user is most likely to choose.
    const [identities, preferred] = await sortDefaultIdToBeginningAsync(await _security.resolveIdentitiesAsync(ids));
    const selected = await selectDevelopmentTeamAsync(identities, preferred);
    // Store the last used value and suggest it as the first value
    // next time the user has to select a code signing identity.
    await (0, _settings.setLastDeveloperCodeSigningIdAsync)(selected.signingCertificateId);
    return selected;
}
async function selectDevelopmentTeamAsync(identities, preferredId) {
    const index = await (0, _prompts.selectAsync)("Development team for signing the app", identities.map((value, i)=>{
        const format = value.signingCertificateId === preferredId ? _chalk().default.bold : (message)=>message;
        return {
            // Formatted like: `650 Industries, Inc. (A1BCDEF234) - Apple Development: Evan Bacon (AA00AABB0A)`
            title: format([
                value.appleTeamName,
                `(${value.appleTeamId}) -`,
                value.codeSigningInfo
            ].join(" ")),
            value: i
        };
    }));
    return identities[index];
}

//# sourceMappingURL=resolveCertificateSigningIdentity.js.map