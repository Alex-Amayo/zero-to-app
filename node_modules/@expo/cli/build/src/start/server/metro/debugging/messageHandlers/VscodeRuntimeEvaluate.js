"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "VscodeRuntimeEvaluateHandler", {
    enumerable: true,
    get: ()=>VscodeRuntimeEvaluateHandler
});
const _messageHandler = require("../MessageHandler");
const _getDebuggerType = require("../getDebuggerType");
class VscodeRuntimeEvaluateHandler extends _messageHandler.MessageHandler {
    isEnabled() {
        return (0, _getDebuggerType.getDebuggerType)(this.debugger.userAgent) === "vscode";
    }
    handleDebuggerMessage(message) {
        if (message.method === "Runtime.evaluate" && isVscodeNodeAttachEnvironmentInjection(message)) {
            return this.sendToDebugger({
                id: message.id,
                result: {
                    result: {
                        type: "string",
                        value: `Hermes doesn't support environment variables through process.env`
                    }
                }
            });
        }
        if (message.method === "Runtime.evaluate" && isVscodeNodeTelemetry(message)) {
            return this.sendToDebugger({
                id: message.id,
                result: {
                    result: {
                        type: "object",
                        value: {
                            processId: this.page.id,
                            nodeVersion: process.version,
                            architecture: process.arch
                        }
                    }
                }
            });
        }
        return false;
    }
}
/** @see https://github.com/microsoft/vscode-js-debug/blob/1d104b5184736677ab5cc280c70bbd227403850c/src/targets/node/nodeAttacherBase.ts#L22-L54 */ function isVscodeNodeAttachEnvironmentInjection(message) {
    var ref, ref1, ref2;
    return ((ref = message.params) == null ? void 0 : ref.expression.includes(`typeof process==='undefined'`)) && ((ref1 = message.params) == null ? void 0 : ref1.expression.includes(`'process not defined'`)) && ((ref2 = message.params) == null ? void 0 : ref2.expression.includes(`process.env["NODE_OPTIONS"]`));
}
/** @see https://github.com/microsoft/vscode-js-debug/blob/1d104b5184736677ab5cc280c70bbd227403850c/src/targets/node/nodeLauncherBase.ts#L523-L531 */ function isVscodeNodeTelemetry(message) {
    var ref, ref1, ref2, ref3, ref4;
    return ((ref = message.params) == null ? void 0 : ref.expression.includes(`typeof process === 'undefined'`)) && ((ref1 = message.params) == null ? void 0 : ref1.expression.includes(`'process not defined'`)) && ((ref2 = message.params) == null ? void 0 : ref2.expression.includes(`process.pid`)) && ((ref3 = message.params) == null ? void 0 : ref3.expression.includes(`process.version`)) && ((ref4 = message.params) == null ? void 0 : ref4.expression.includes(`process.arch`));
}

//# sourceMappingURL=VscodeRuntimeEvaluate.js.map