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
    TEMPLATES: ()=>TEMPLATES,
    selectTemplatesAsync: ()=>selectTemplatesAsync
});
function _chalk() {
    const data = /*#__PURE__*/ _interopRequireDefault(require("chalk"));
    _chalk = function() {
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
function _resolveFrom() {
    const data = /*#__PURE__*/ _interopRequireDefault(require("resolve-from"));
    _resolveFrom = function() {
        return data;
    };
    return data;
}
const _prompts = /*#__PURE__*/ _interopRequireDefault(require("../utils/prompts"));
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const debug = require("debug")("expo:customize:templates");
function importFromExpoWebpackConfig(projectRoot, folder, moduleId) {
    try {
        const filePath = (0, _resolveFrom().default)(projectRoot, `@expo/webpack-config/${folder}/${moduleId}`);
        debug(`Using @expo/webpack-config template for "${moduleId}": ${filePath}`);
        return filePath;
    } catch  {
        debug(`@expo/webpack-config template for "${moduleId}" not found, falling back on @expo/cli`);
    }
    return importFromVendor(projectRoot, moduleId);
}
function importFromVendor(projectRoot, moduleId) {
    try {
        const filePath = (0, _resolveFrom().default)(projectRoot, "@expo/cli/static/template/" + moduleId);
        debug(`Using @expo/cli template for "${moduleId}": ${filePath}`);
        return filePath;
    } catch  {
        // For dev mode, testing and other cases where @expo/cli is not installed
        const filePath1 = require.resolve(`@expo/cli/static/template/${moduleId}`);
        debug(`Local @expo/cli template for "${moduleId}" not found, falling back on template relative to @expo/cli: ${filePath1}`);
        return filePath1;
    }
}
const TEMPLATES = [
    {
        id: "babel.config.js",
        file: (projectRoot)=>importFromVendor(projectRoot, "babel.config.js"),
        destination: ()=>"babel.config.js",
        dependencies: [
            // Even though this is installed in `expo`, we should add it for now.
            "babel-preset-expo", 
        ]
    },
    {
        id: "metro.config.js",
        dependencies: [
            "@expo/metro-config"
        ],
        destination: ()=>"metro.config.js",
        file: (projectRoot)=>importFromVendor(projectRoot, "metro.config.js")
    },
    {
        // `tsconfig.json` is special-cased and doesn't follow the template.
        id: "tsconfig.json",
        dependencies: [],
        destination: ()=>"tsconfig.json",
        file: ()=>"",
        configureAsync: async (projectRoot)=>{
            const { typescript  } = require("./typescript");
            await typescript(projectRoot);
            return true;
        }
    },
    {
        id: ".eslintrc.js",
        dependencies: [],
        destination: ()=>".eslintrc.js",
        file: (projectRoot)=>importFromVendor(projectRoot, ".eslintrc.js"),
        configureAsync: async (projectRoot)=>{
            const { ESLintProjectPrerequisite  } = require("../lint/ESlintPrerequisite");
            const prerequisite = new ESLintProjectPrerequisite(projectRoot);
            if (!await prerequisite.assertAsync()) {
                await prerequisite.bootstrapAsync();
            }
            return false;
        }
    },
    {
        id: "serve.json",
        file: (projectRoot)=>importFromExpoWebpackConfig(projectRoot, "web-default", "serve.json"),
        // web/serve.json
        destination: ({ webStaticPath  })=>webStaticPath + "/serve.json",
        dependencies: []
    },
    {
        id: "index.html",
        file: (projectRoot)=>importFromExpoWebpackConfig(projectRoot, "web-default", "index.html"),
        // web/index.html
        destination: ({ webStaticPath  })=>webStaticPath + "/index.html",
        dependencies: []
    },
    {
        id: "webpack.config.js",
        file: (projectRoot)=>importFromExpoWebpackConfig(projectRoot, "template", "webpack.config.js"),
        destination: ()=>"webpack.config.js",
        dependencies: [
            "@expo/webpack-config"
        ]
    }, 
];
/** Generate the prompt choices. */ function createChoices(projectRoot, props) {
    return TEMPLATES.map((template, index)=>{
        const destination = template.destination(props);
        const localProjectFile = _path().default.resolve(projectRoot, destination);
        const exists = _fs().default.existsSync(localProjectFile);
        return {
            title: destination,
            value: index,
            description: exists ? _chalk().default.red("This will overwrite the existing file") : undefined
        };
    });
}
async function selectTemplatesAsync(projectRoot, props) {
    const options = createChoices(projectRoot, props);
    const { answer  } = await (0, _prompts.default)({
        type: "multiselect",
        name: "answer",
        message: "Which files would you like to generate?",
        hint: "- Space to select. Return to submit",
        warn: "File already exists.",
        limit: options.length,
        instructions: "",
        choices: options
    });
    return answer;
}

//# sourceMappingURL=templates.js.map