"use strict";
/**
 * Returns the width of the window
 * @param {number} windowWidth - The width of the window.
 * @returns {number} The width of the window.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.breakpoints = exports.useWindowWidth = void 0;
const react_native_1 = require("react-native");
const useWindowWidth = () => {
    const windowWidth = (0, react_native_1.useWindowDimensions)().width;
    return windowWidth;
};
exports.useWindowWidth = useWindowWidth;
/**
 * Breakpoints for responsive design
 * @returns {object} The breakpoints for responsive design
 */
exports.breakpoints = {
    small: 640,
    medium: 768,
    large: 1024,
    xlarge: 1280,
};
