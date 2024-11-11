"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "SecurityBinPrerequisite", {
    enumerable: true,
    get: ()=>SecurityBinPrerequisite
});
function _spawnAsync() {
    const data = /*#__PURE__*/ _interopRequireDefault(require("@expo/spawn-async"));
    _spawnAsync = function() {
        return data;
    };
    return data;
}
const _prerequisite = require("./Prerequisite");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
class SecurityBinPrerequisite extends _prerequisite.Prerequisite {
    static instance = new SecurityBinPrerequisite();
    async assertImplementation() {
        try {
            // make sure we can run security
            await (0, _spawnAsync().default)("which", [
                "security"
            ]);
        } catch  {
            throw new _prerequisite.PrerequisiteCommandError("SECURITY_BIN", "Cannot code sign project because the CLI `security` is not available on your computer.\nPlease ensure it's installed and try again.");
        }
    }
}

//# sourceMappingURL=SecurityBinPrerequisite.js.map