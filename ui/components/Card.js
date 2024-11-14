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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const brandConfig_1 = __importDefault(require("../brand/brandConfig"));
const theme_1 = require("../theme/theme");
/**
 * Card component for displaying content within a styled container.
 * It utilizes theming for dynamic styling based on the current theme context.
 */
const Card = ({ children }) => {
    // Initialize theme
    const theme = (0, react_1.useContext)(theme_1.ThemeContext);
    return (<react_native_1.View style={Object.assign({ 
            // Configure background and border color with theme
            backgroundColor: theme.values.cardBackgroundColor, borderColor: theme.values.borderColor, shadowColor: brandConfig_1.default.shadows ? theme.values.shadowColor : undefined }, styles.container)}>
      {children}
    </react_native_1.View>);
};
exports.default = Card;
const styles = react_native_1.StyleSheet.create({
    container: {
        minWidth: '100%',
        borderRadius: brandConfig_1.default.borderRadius,
        borderWidth: 1,
        shadowOffset: brandConfig_1.default.shadows ? { width: -2, height: 2 } : undefined,
        shadowOpacity: brandConfig_1.default.shadows ? 0.3 : undefined,
        shadowRadius: brandConfig_1.default.shadows ? 5 : undefined,
        elevation: brandConfig_1.default.shadows ? 20 : undefined,
    },
});
