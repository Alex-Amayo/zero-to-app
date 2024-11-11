"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "RudderClient", {
    enumerable: true,
    get: ()=>RudderClient
});
function _rudderSdkNode() {
    const data = /*#__PURE__*/ _interopRequireDefault(require("@expo/rudder-sdk-node"));
    _rudderSdkNode = function() {
        return data;
    };
    return data;
}
const _getContext = require("./getContext");
const _userSettings = /*#__PURE__*/ _interopRequireDefault(require("../../api/user/UserSettings"));
const _user = require("../../api/user/user");
const _env = require("../env");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const debug = require("debug")("expo:telemetry:rudderClient");
class RudderClient {
    constructor(sdk, mode = "attached"){
        this.mode = mode;
        if (!sdk) {
            sdk = new (_rudderSdkNode()).default(_env.env.EXPO_STAGING || _env.env.EXPO_LOCAL ? "24TKICqYKilXM480mA7ktgVDdea" : "24TKR7CQAaGgIrLTgu3Fp4OdOkI", "https://cdp.expo.dev/v1/batch", {
                flushInterval: 300
            });
        }
        this.rudderstack = sdk;
    }
    /**
   * Wait until the initial identification is complete.
   * This may be called multiple times, from `.record()`, but only calls `getUserAsync` once.
   * Note, this method won't retry after the initial identification returns `undefined`.
   */ async waitUntilInitialIdentification() {
        if (!this.identity && !this.initialIdentify) {
            // This method has a side-effect that calls `.identify()` internally
            this.initialIdentify = (0, _user.getUserAsync)();
        }
        if (!this.identity && this.initialIdentify) {
            await this.initialIdentify;
        }
    }
    get isIdentified() {
        return !!this.identity;
    }
    async identify(actor) {
        var ref, ref1;
        if (!actor) return;
        debug("Actor received");
        const userId = actor.id;
        const anonymousId = await _userSettings.default.getAnonymousIdentifierAsync();
        if (((ref = this.identity) == null ? void 0 : ref.userId) === userId && ((ref1 = this.identity) == null ? void 0 : ref1.anonymousId) === anonymousId) {
            return;
        }
        this.identity = {
            userId,
            anonymousId
        };
        this.rudderstack.identify({
            userId,
            anonymousId,
            traits: {
                username: (0, _user.getActorDisplayName)(actor),
                user_id: actor.id,
                user_type: actor.__typename
            }
        });
    }
    async record(record) {
        if (!this.identity) {
            await this.waitUntilInitialIdentification();
        }
        if (this.identity) {
            debug("Event received: %s", record.event);
            const originalTimestamp = "originalTimestamp" in record ? record.originalTimestamp : undefined;
            await this.rudderstack.track({
                event: record.event,
                originalTimestamp,
                properties: record.properties,
                ...this.identity,
                context: {
                    ...(0, _getContext.getContext)(),
                    client: {
                        mode: this.mode
                    }
                }
            });
        }
    }
    async flush() {
        await this.rudderstack.flush();
    }
}

//# sourceMappingURL=RudderClient.js.map