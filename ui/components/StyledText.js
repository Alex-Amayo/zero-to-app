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
exports.StyledText = void 0;
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const brandConfig_1 = __importDefault(require("../brand/brandConfig"));
const theme_1 = require("../theme/theme");
/**
 * A component to display customizable text with adjustable size, alignment, color, and boldness.
 */
const StyledText = ({ children, fontSize = 'md', // Default font size
align = 'left', // Default alignment
color, bold = false, }) => {
    // Get theme context for default color
    const theme = (0, react_1.useContext)(theme_1.ThemeContext);
    // Determine text style based on props
    const textStyle = {
        fontSize: typeof fontSize === 'number' ? fontSize : styles[fontSize].fontSize, // Custom size or predefined
        textAlign: align, // Alignment from prop
        color: color || theme.values.color, // Custom color or default from theme
        fontWeight: bold ? 500 : 'normal', // Bold if true
    };
    return <react_native_1.Text style={textStyle}>{children}</react_native_1.Text>;
};
exports.StyledText = StyledText;
// Predefined font size styles
const styles = react_native_1.StyleSheet.create({
    sm: { fontSize: brandConfig_1.default.fontSizes.small },
    md: { fontSize: brandConfig_1.default.fontSizes.medium },
    lg: { fontSize: brandConfig_1.default.fontSizes.large },
    xl: { fontSize: brandConfig_1.default.fontSizes.xlarge },
});
