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
const Feather_1 = __importDefault(require("@expo/vector-icons/Feather"));
const theme_1 = require("../theme/theme");
const brandConfig_1 = __importDefault(require("../brand/brandConfig"));
/**
 * Renders a rounded icon button with an icon from Expo Vector Icons.
 * Alternates between the primary icon and an alternate icon when clicked.
 * The button also toggles its background color based on the theme context.
 */
const ToggleIconButton = ({ iconName, alternateIconName, onPress, raised }) => {
    const [isToggled, setIsToggled] = (0, react_1.useState)(false);
    const theme = (0, react_1.useContext)(theme_1.ThemeContext);
    const handlePress = () => {
        if (onPress) {
            onPress();
        }
        setIsToggled(!isToggled);
    };
    return (<react_native_1.TouchableOpacity onPress={handlePress} style={Object.assign(Object.assign({}, styles.container), { backgroundColor: theme.values.iconButtonBackgroundColor, shadowOffset: raised && brandConfig_1.default.shadows ? { width: -2, height: 2 } : undefined, shadowOpacity: raised && brandConfig_1.default.shadows ? 0.2 : undefined, shadowRadius: raised && brandConfig_1.default.shadows ? 5 : undefined, elevation: raised && brandConfig_1.default.shadows ? 20 : undefined })}>
      <Feather_1.default name={isToggled ? alternateIconName : iconName} size={20} color={theme.values.iconButtonIconColor}/>
    </react_native_1.TouchableOpacity>);
};
exports.default = ToggleIconButton;
const styles = react_native_1.StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 40,
        height: 40,
        borderRadius: 25,
    },
});
