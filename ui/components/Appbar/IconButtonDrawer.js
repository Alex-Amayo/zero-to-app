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
const IconButton_1 = __importDefault(require("../IconButton"));
const ToggleIconButton_1 = __importDefault(require("../ToggleIconButton"));
const expo_router_1 = require("expo-router");
const theme_1 = require("../../theme/theme");
const authStore_1 = __importDefault(require("../../stores/authStore/authStore"));
/**
 * Icons to be rendered inside appbar on both web and mobile
 * @returns Rendered IconButtonDrawer
 */
const IconButtonDrawer = () => {
    //Initialize theme toggle
    const { toggleTheme } = (0, react_1.useContext)(theme_1.ThemeContext);
    // Retrieve logOut from auth store
    const { logOut, isAuthenticated } = (0, authStore_1.default)();
    const handleLogOut = () => {
        logOut();
        expo_router_1.router.push('/auth/login');
    };
    return (<react_native_1.View style={styles.appbar}>
      <react_native_1.View style={styles.iconContainer}>
        <IconButton_1.default iconName="search" onPress={() => { }}/>
        <ToggleIconButton_1.default iconName="sun" alternateIconName="moon" onPress={toggleTheme}/>
        {!isAuthenticated() ? (<IconButton_1.default iconName="user" onPress={() => {
                expo_router_1.router.push('auth/login');
            }}/>) : (<IconButton_1.default iconName="log-out" onPress={handleLogOut}/>)}
      </react_native_1.View>
    </react_native_1.View>);
};
exports.default = IconButtonDrawer;
const styles = react_native_1.StyleSheet.create({
    appbar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 60,
        paddingHorizontal: 15,
    },
    iconContainer: {
        flexDirection: 'row',
        gap: 10,
    },
});
