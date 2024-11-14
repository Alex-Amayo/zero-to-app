"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const StyledText_1 = require("./StyledText");
/**
 * A pressable text component that can navigate to a URL or trigger an action.
 */
const TextLink = ({ text, onPress, href, align = 'center' }) => {
    const handlePress = () => {
        if (href) {
            react_native_1.Linking.openURL(href);
        }
        else if (onPress) {
            onPress();
        }
    };
    return (<react_native_1.Pressable onPress={handlePress}>
      {/** Pass the align prop directly to StyledText */}
      <StyledText_1.StyledText align={align} color="#1877f2">
        {text}
      </StyledText_1.StyledText>
    </react_native_1.Pressable>);
};
exports.default = TextLink;
