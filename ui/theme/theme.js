"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThemeProvider = exports.ThemeContext = void 0;
const react_1 = __importStar(require("react"));
const themeConfig_1 = require("./themeConfig");
//Initialize ThemeContext with a toggle function placeholder
const ThemeContext = (0, react_1.createContext)({
    values: themeConfig_1.lightTheme,
    toggleTheme: () => { },
});
exports.ThemeContext = ThemeContext;
//Initialize ThemeProvider with a toggle function
const ThemeProvider = ({ children }) => {
    const [values, setTheme] = (0, react_1.useState)(themeConfig_1.lightTheme);
    const toggleTheme = () => {
        setTheme(values === themeConfig_1.lightTheme ? themeConfig_1.darkTheme : themeConfig_1.lightTheme);
    };
    return <ThemeContext.Provider value={{ values, toggleTheme }}>{children}</ThemeContext.Provider>;
};
exports.ThemeProvider = ThemeProvider;
