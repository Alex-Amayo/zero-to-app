"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "VscodeRuntimeCallFunctionOnHandler", {
    enumerable: true,
    get: ()=>VscodeRuntimeCallFunctionOnHandler
});
const _messageHandler = require("../MessageHandler");
const _getDebuggerType = require("../getDebuggerType");
class VscodeRuntimeCallFunctionOnHandler extends _messageHandler.MessageHandler {
    isEnabled() {
        return (0, _getDebuggerType.getDebuggerType)(this.debugger.userAgent) === "vscode";
    }
    handleDebuggerMessage(message) {
        if (message.method === "Runtime.callFunctionOn") {
            return this.sendToDebugger({
                id: message.id,
                result: {
                    // We don't know the `type` and vscode allows `type: undefined`
                    result: {
                        objectId: message.params.objectId
                    }
                }
            });
        }
        return false;
    }
}

//# sourceMappingURL=VscodeRuntimeCallFunctionOn.js.map