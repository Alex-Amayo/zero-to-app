"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ESLintProjectPrerequisite", {
    enumerable: true,
    get: ()=>ESLintProjectPrerequisite
});
function _jsonFile() {
    const data = /*#__PURE__*/ _interopRequireDefault(require("@expo/json-file"));
    _jsonFile = function() {
        return data;
    };
    return data;
}
function _promises() {
    const data = /*#__PURE__*/ _interopRequireDefault(require("fs/promises"));
    _promises = function() {
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
const _log = require("../log");
const _prerequisite = require("../start/doctor/Prerequisite");
const _ensureDependenciesAsync = require("../start/doctor/dependencies/ensureDependenciesAsync");
const _findUp = require("../utils/findUp");
const _interactive = require("../utils/interactive");
const _prompts = require("../utils/prompts");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const debug = require("debug")("expo:lint");
class ESLintProjectPrerequisite extends _prerequisite.ProjectPrerequisite {
    async assertImplementation() {
        const hasEslintConfig = await eslintIsConfigured(this.projectRoot);
        const hasLintScript = await lintScriptIsConfigured(this.projectRoot);
        return hasEslintConfig && hasLintScript;
    }
    async bootstrapAsync() {
        debug("Setting up ESLint");
        const hasEslintConfig = await eslintIsConfigured(this.projectRoot);
        if (!hasEslintConfig) {
            if (!(0, _interactive.isInteractive)()) {
                _log.Log.warn(`No ESLint config found. Configuring automatically.`);
            } else {
                const shouldSetupLint = await (0, _prompts.confirmAsync)({
                    message: "No ESLint config found. Install and configure ESLint in this project?"
                });
                if (!shouldSetupLint) {
                    throw new _prerequisite.PrerequisiteCommandError("ESLint is not configured for this project.");
                }
            }
            // TODO(cedric): if we want to add prettier, also configure proper prettier rules
            // const shouldIncludePrettier = await confirmAsync({
            //   message: 'Include Prettier?',
            // });
            // if (shouldIncludePrettier) {
            //   packages.push({ file: 'prettier/package.json', pkg: 'prettier', dev: true });
            //   packages.push({
            //     file: 'eslint-config-prettier/package.json',
            //     pkg: 'eslint-config-prettier',
            //     dev: true,
            //   });
            //   packages.push({
            //     file: 'eslint-plugin-prettier/package.json',
            //     pkg: 'eslint-plugin-prettier',
            //     dev: true,
            //   });
            // }
            await this._ensureDependenciesInstalledAsync({
                skipPrompt: true,
                isProjectMutable: true
            });
            // TODO(cedric): if we want to add prettier, also configure proper prettier rules
            // if (shouldIncludePrettier) {
            //   await fs.writeFile(path.join(this.projectRoot, '.prettierrc'), '{}', 'utf8');
            // }
            await _promises().default.writeFile(_path().default.join(this.projectRoot, ".eslintrc.js"), await _promises().default.readFile(require.resolve(`@expo/cli/static/template/.eslintrc.js`), "utf8"), "utf8");
        }
        const hasLintScript = await lintScriptIsConfigured(this.projectRoot);
        if (!hasLintScript) {
            const scripts = _jsonFile().default.read(_path().default.join(this.projectRoot, "package.json")).scripts;
            await _jsonFile().default.setAsync(_path().default.join(this.projectRoot, "package.json"), "scripts", typeof scripts === "object" ? {
                ...scripts,
                lint: "eslint ."
            } : {
                lint: "eslint ."
            }, {
                json5: false
            });
        }
        _log.Log.log();
        _log.Log.log("ESlint has been configured \uD83C\uDF89");
        _log.Log.log();
        return true;
    }
    async _ensureDependenciesInstalledAsync({ skipPrompt , isProjectMutable  }) {
        try {
            return await (0, _ensureDependenciesAsync.ensureDependenciesAsync)(this.projectRoot, {
                skipPrompt,
                isProjectMutable,
                installMessage: "ESLint is required to lint your project.",
                warningMessage: "ESLint not installed, unable to set up linting for your project.",
                requiredPackages: [
                    {
                        version: "^8.57.0",
                        pkg: "eslint",
                        file: "eslint/package.json",
                        dev: true
                    },
                    {
                        pkg: "eslint-config-expo",
                        file: "eslint-config-expo/package.json",
                        dev: true
                    }, 
                ]
            });
        } catch (error) {
            this.resetAssertion();
            throw error;
        }
    }
}
async function eslintIsConfigured(projectRoot) {
    debug("Ensuring ESlint is configured in", projectRoot);
    // TODO(cedric): drop `package.json` check once we swap to flat config
    const packageFile = await _jsonFile().default.readAsync(_path().default.join(projectRoot, "package.json"));
    if (typeof packageFile.eslintConfig === "object" && Object.keys(packageFile.eslintConfig).length > 0) {
        debug("Found ESlint config in package.json");
        return true;
    }
    const eslintConfigFiles = [
        // TODO(cedric): drop these files once we swap to flat config
        // See: https://eslint.org/docs/latest/use/configure/configuration-files-deprecated
        ".eslintrc.js",
        ".eslintrc.cjs",
        ".eslintrc.yaml",
        ".eslintrc.yml",
        ".eslintrc.json", 
    ];
    for (const configFile of eslintConfigFiles){
        const configPath = (0, _findUp.findFileInParents)(projectRoot, configFile);
        const configIsEmpty = configPath ? await eslintConfigIsEmpty(configPath) : null;
        if (configPath && !configIsEmpty) {
            debug("Found ESlint config file:", configPath);
            return true;
        } else if (configPath && configIsEmpty) {
            debug("Skipping empty ESlint config file:", configPath);
        }
    }
    return false;
}
/** Determine if the eslint config file is empty. */ async function eslintConfigIsEmpty(filePath) {
    const content = await _promises().default.readFile(filePath, "utf8").then((text)=>text.trim().replaceAll(/\s|\r\n|\n|\r/g, ""), ()=>null);
    return !content || content === "{}" || content === "---" || content.startsWith("module.exports={}") || content.startsWith("exportdefault{}") || content.startsWith("exportdefault[]") // .eslint.config.mjs
    ;
}
async function lintScriptIsConfigured(projectRoot) {
    var ref;
    const packageFile = await _jsonFile().default.readAsync(_path().default.join(projectRoot, "package.json"));
    return typeof ((ref = packageFile.scripts) == null ? void 0 : ref.lint) === "string";
}

//# sourceMappingURL=ESlintPrerequisite.js.map