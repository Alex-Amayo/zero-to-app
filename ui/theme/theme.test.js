"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_native_1 = require("@testing-library/react-native");
const theme_1 = require("./theme");
const react_native_2 = require("react-native");
const brandConfig_1 = __importDefault(require("../brand/brandConfig"));
//This is a test file for the theme provider. It tests the theme provider by toggling the theme from light to dark.
//The test checks if the highlightColor changes to the brand secondary color after the theme is toggled.
// Mock component to test ThemeProvider
const TestComponent = () => {
    return (<theme_1.ThemeContext.Consumer>
      {({ values, toggleTheme }) => (<>
          <react_native_2.Text testID="highlightColor">{values.highlightColor}</react_native_2.Text>
          <react_native_2.Text testID="color">{values.color}</react_native_2.Text>
          <react_native_2.Text onPress={toggleTheme} testID="toggleTheme">
            Toggle Theme
          </react_native_2.Text>
        </>)}
    </theme_1.ThemeContext.Consumer>);
};
// Test ThemeProvider by toggling theme from light to dark
describe('ThemeProvider', () => {
    it('toggles theme from light to dark', () => {
        const { getByTestId } = (0, react_native_1.render)(<theme_1.ThemeProvider>
        <TestComponent />
      </theme_1.ThemeProvider>);
        // Check initial highlightColor is the same as the brand primary color
        expect(getByTestId('highlightColor').props.children).toBe(brandConfig_1.default.colors.primary);
        // Toggle the theme
        react_native_1.fireEvent.press(getByTestId('toggleTheme'));
        // Check if the highlightColor changed to the brand secondary color
        expect(getByTestId('highlightColor').props.children).toBe(brandConfig_1.default.colors.secondary);
    });
});
