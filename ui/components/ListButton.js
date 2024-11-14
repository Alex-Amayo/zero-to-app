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
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const vector_icons_1 = require("@expo/vector-icons");
const theme_1 = require("../theme/theme");
const StyledText_1 = require("./StyledText");
/**
 * List Button component that displays a list button with an icon and text
 */
const ListButton = ({ onPress, text, icon }) => {
    // Initialize theme
    const theme = (0, react_1.useContext)(theme_1.ThemeContext);
    return (<react_native_1.TouchableOpacity style={styles.listButton} onPress={onPress}>
      <StyledText_1.StyledText bold>{text}</StyledText_1.StyledText>
      <vector_icons_1.Feather name={icon} size={25} color={theme.values.color}/>
    </react_native_1.TouchableOpacity>);
};
exports.default = ListButton;
const styles = react_native_1.StyleSheet.create({
    listButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
    },
});
