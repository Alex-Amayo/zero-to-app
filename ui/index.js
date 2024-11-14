"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StyledText = exports.Button = exports.ThemeContext = exports.ThemeProvider = void 0;
// Export theme
var theme_1 = require("./theme/theme");
Object.defineProperty(exports, "ThemeProvider", { enumerable: true, get: function () { return theme_1.ThemeProvider; } });
Object.defineProperty(exports, "ThemeContext", { enumerable: true, get: function () { return theme_1.ThemeContext; } });
// Export components
var Button_1 = require("./components/Button/Button");
Object.defineProperty(exports, "Button", { enumerable: true, get: function () { return Button_1.Button; } });
var StyledText_1 = require("./components/StyledText");
Object.defineProperty(exports, "StyledText", { enumerable: true, get: function () { return StyledText_1.StyledText; } });
