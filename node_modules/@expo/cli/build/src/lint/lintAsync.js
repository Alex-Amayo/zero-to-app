"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "lintAsync", {
    enumerable: true,
    get: ()=>lintAsync
});
function _packageManager() {
    const data = require("@expo/package-manager");
    _packageManager = function() {
        return data;
    };
    return data;
}
const _eslintPrerequisite = require("./ESlintPrerequisite");
const lintAsync = async (projectRoot)=>{
    const prerequisite = new _eslintPrerequisite.ESLintProjectPrerequisite(projectRoot);
    if (!await prerequisite.assertAsync()) {
        await prerequisite.bootstrapAsync();
    }
    const manager = (0, _packageManager().createForProject)(projectRoot);
    try {
        await manager.runBinAsync([
            "eslint",
            "."
        ]);
    } catch (error) {
        process.exit(error.status);
    }
};

//# sourceMappingURL=lintAsync.js.map