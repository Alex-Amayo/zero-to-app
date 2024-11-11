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
    guessEditor: ()=>guessEditor,
    openInEditorAsync: ()=>openInEditorAsync
});
function _spawnAsync() {
    const data = /*#__PURE__*/ _interopRequireDefault(require("@expo/spawn-async"));
    _spawnAsync = function() {
        return data;
    };
    return data;
}
function _envEditor() {
    const data = /*#__PURE__*/ _interopRequireDefault(require("env-editor"));
    _envEditor = function() {
        return data;
    };
    return data;
}
const _env = require("./env");
const _log = /*#__PURE__*/ _interopRequireWildcard(require("../log"));
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
const debug = require("debug")("expo:utils:editor");
function guessEditor() {
    try {
        const editor = _env.env.EXPO_EDITOR;
        if (editor) {
            debug("Using $EXPO_EDITOR:", editor);
            return _envEditor().default.getEditor(editor);
        }
        debug("Falling back on $EDITOR:", editor);
        return _envEditor().default.defaultEditor();
    } catch  {
        debug("Falling back on vscode");
        return _envEditor().default.getEditor("vscode");
    }
}
async function openInEditorAsync(path) {
    const editor = guessEditor();
    debug(`Opening ${path} in ${editor == null ? void 0 : editor.name} (bin: ${editor == null ? void 0 : editor.binary}, id: ${editor == null ? void 0 : editor.id})`);
    if (editor) {
        try {
            await (0, _spawnAsync().default)(editor.binary, [
                path
            ]);
            return true;
        } catch (error) {
            debug(`Failed to auto open path in editor (path: ${path}, binary: ${editor.binary}):`, error);
        }
    }
    _log.error('Could not open editor, you can set it by defining the $EDITOR environment variable with the binary of your editor. (e.g. "vscode" or "atom")');
    return false;
}

//# sourceMappingURL=editor.js.map