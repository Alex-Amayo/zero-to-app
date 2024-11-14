"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.darkTheme = exports.lightTheme = void 0;
const brandConfig_1 = __importDefault(require("../brand/brandConfig"));
//Defining light theme
exports.lightTheme = {
    color: '#050505', // Text color
    backgroundColor: brandConfig_1.default.colors.backgroundColor, // Background color of the entire app
    cardBackgroundColor: '#ffffff', // Background color of cards
    highlightColor: brandConfig_1.default.colors.primary, //Primary color of the brand derived from brandConfig
    appbarColor: brandConfig_1.default.colors.appbarColor, // App bar color
    borderColor: '#ced0d4', // Border color
    shadowColor: '#000000', // Shadow colors
    inactiveIconColor: '#606770', // Affects icons displayed in navigation bar
    dividerColor: '#dddfe2', // Divider color
    iconButtonBackgroundColor: '#e4e6eb', // Background color of icon buttons
    iconButtonIconColor: '#050505', // Icon color for icon buttons
    isDark: false,
};
//Defining dark theme
exports.darkTheme = {
    color: '#e4e6eb', // Text color
    backgroundColor: '#18191a', // Background color of the entire app
    cardBackgroundColor: '#242526', // Background color of cards
    highlightColor: brandConfig_1.default.colors.secondary, //Primary color of the brand derived from brandConfig
    appbarColor: '#242526', // App bar color
    borderColor: '#3e4042', // Border color
    shadowColor: '#000000', // Shadow color
    inactiveIconColor: '#b0b3b8', // Affects icons displayed in navigation bar
    dividerColor: '#3e4042', // Divider color
    iconButtonBackgroundColor: '#3a3b3c', // Background color of icon buttons
    iconButtonIconColor: '#e4e6eb', // Icon color for icon buttons
    isDark: true,
};
