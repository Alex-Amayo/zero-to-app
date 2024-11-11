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
    defaultRenameConfig: ()=>defaultRenameConfig,
    getTemplateFilesToRenameAsync: ()=>getTemplateFilesToRenameAsync,
    renameTemplateAppNameAsync: ()=>renameTemplateAppNameAsync
});
function _configPlugins() {
    const data = require("@expo/config-plugins");
    _configPlugins = function() {
        return data;
    };
    return data;
}
function _fastGlob() {
    const data = require("fast-glob");
    _fastGlob = function() {
        return data;
    };
    return data;
}
function _fs() {
    const data = /*#__PURE__*/ _interopRequireDefault(require("fs"));
    _fs = function() {
        return data;
    };
    return data;
}
function _path() {
    const data = /*#__PURE__*/ _interopRequireDefault(require("path"));
    _path = function() {
        return data;
    };
    return data;
}
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const debug = require("debug")("expo:prebuild:copyTemplateFiles");
function escapeXMLCharacters(original) {
    const noAmps = original.replace("&", "&amp;");
    const noLt = noAmps.replace("<", "&lt;");
    const noGt = noLt.replace(">", "&gt;");
    const noApos = noGt.replace('"', '\\"');
    return noApos.replace("'", "\\'");
}
const defaultRenameConfig = [
    // Common
    "!**/node_modules",
    "app.json",
    // Android
    "android/**/*.gradle",
    "android/app/BUCK",
    "android/app/src/**/*.java",
    "android/app/src/**/*.kt",
    "android/app/src/**/*.xml",
    // iOS
    "ios/Podfile",
    "ios/**/*.xcodeproj/project.pbxproj",
    "ios/**/*.xcodeproj/xcshareddata/xcschemes/*.xcscheme", 
];
async function getTemplateFilesToRenameAsync({ cwd , /**
   * An array of patterns following the rename config format. If omitted, then
   * we fall back to defaultRenameConfig.
   * @see defaultRenameConfig
   */ renameConfig: userConfig  }) {
    let config = userConfig != null ? userConfig : defaultRenameConfig;
    // Strip comments, trim whitespace, and remove empty lines.
    config = config.map((line)=>line.split(/(?<!\\)#/, 2)[0].trim()).filter((line)=>line !== "");
    return await (0, _fastGlob().glob)(config, {
        cwd,
        // `true` is consistent with .gitignore. Allows `*.xml` to match .xml files
        // in all subdirs.
        baseNameMatch: true,
        dot: true,
        // Prevent climbing out of the template directory in case a template
        // includes a symlink to an external directory.
        followSymbolicLinks: false
    });
}
async function renameTemplateAppNameAsync({ cwd , name , files  }) {
    debug(`Got files to transform: ${JSON.stringify(files)}`);
    await Promise.all(files.map(async (file)=>{
        const absoluteFilePath = _path().default.resolve(cwd, file);
        let contents;
        try {
            contents = await _fs().default.promises.readFile(absoluteFilePath, {
                encoding: "utf-8"
            });
        } catch (error) {
            throw new Error(`Failed to read template file: "${absoluteFilePath}". Was it removed mid-operation?`, {
                cause: error
            });
        }
        debug(`Renaming app name in file: ${absoluteFilePath}`);
        const safeName = [
            ".xml",
            ".plist"
        ].includes(_path().default.extname(file)) ? escapeXMLCharacters(name) : name;
        try {
            const replacement = contents.replace(/Hello App Display Name/g, safeName).replace(/HelloWorld/g, _configPlugins().IOSConfig.XcodeUtils.sanitizedName(safeName)).replace(/helloworld/g, _configPlugins().IOSConfig.XcodeUtils.sanitizedName(safeName.toLowerCase()));
            if (replacement === contents) {
                return;
            }
            await _fs().default.promises.writeFile(absoluteFilePath, replacement);
        } catch (error1) {
            throw new Error(`Failed to overwrite template file: "${absoluteFilePath}". Was it removed mid-operation?`, {
                cause: error1
            });
        }
    }));
}

//# sourceMappingURL=renameTemplateAppName.js.map