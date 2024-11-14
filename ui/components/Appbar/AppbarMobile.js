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
const expo_router_1 = require("expo-router");
const brandConfig_1 = __importDefault(require("../../brand/brandConfig"));
const theme_1 = require("../../theme/theme");
const IconButtonDrawer_1 = __importDefault(require("./IconButtonDrawer"));
/**
 * Non-responsive appbar  that displays on the top  of the screen for mobile devices.
 */
const Appbar = ({ title, tabs }) => {
    // Initialize the theme
    const theme = (0, react_1.useContext)(theme_1.ThemeContext);
    return (<react_native_1.View style={Object.assign(Object.assign({}, styles.appbar), { backgroundColor: theme.values.appbarColor })}>
      <expo_router_1.Link href="/core/home">
        <react_native_1.Text style={Object.assign(Object.assign({}, styles.title), { color: theme.values.highlightColor })}>{title}</react_native_1.Text>
      </expo_router_1.Link>
      {tabs ? tabs : null}
      <IconButtonDrawer_1.default />
    </react_native_1.View>);
};
exports.default = Appbar;
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
    title: {
        fontSize: brandConfig_1.default.fontSizes.large,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
