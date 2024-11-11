"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "PageReloadHandler", {
    enumerable: true,
    get: ()=>PageReloadHandler
});
const _messageHandler = require("../MessageHandler");
class PageReloadHandler extends _messageHandler.MessageHandler {
    constructor(connection, metroBundler){
        super(connection);
        this.metroBundler = metroBundler;
    }
    handleDebuggerMessage(message) {
        if (message.method === "Page.reload") {
            this.metroBundler.broadcastMessage("reload");
            return this.sendToDebugger({
                id: message.id
            });
        }
        return false;
    }
}

//# sourceMappingURL=PageReload.js.map