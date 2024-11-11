"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "NetworkResponseHandler", {
    enumerable: true,
    get: ()=>NetworkResponseHandler
});
const _messageHandler = require("../MessageHandler");
class NetworkResponseHandler extends _messageHandler.MessageHandler {
    /** All known responses, mapped by request id */ storage = new Map();
    isEnabled() {
        return this.page.capabilities.nativeNetworkInspection !== true;
    }
    handleDeviceMessage(message) {
        if (message.method === "Expo(Network.receivedResponseBody)") {
            const { requestId , ...requestInfo } = message.params;
            this.storage.set(requestId, requestInfo);
            return true;
        }
        return false;
    }
    handleDebuggerMessage(message) {
        if (message.method === "Network.getResponseBody" && this.storage.has(message.params.requestId)) {
            return this.sendToDebugger({
                id: message.id,
                result: this.storage.get(message.params.requestId)
            });
        }
        return false;
    }
}

//# sourceMappingURL=NetworkResponse.js.map