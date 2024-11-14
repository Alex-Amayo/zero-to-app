"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Button = void 0;
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const brandConfig_1 = __importDefault(require("../../brand/brandConfig"));
const StyledText_1 = require(".././StyledText");
/**
 * A reusable button component that can be customized with different styles,
 * loading states, and behavior based on props.
 */
const Button = ({ title, secondary, loading, onPress }) => {
    return loading ? (<react_native_1.View>
      <react_native_1.ActivityIndicator size="small" color={secondary ? brandConfig_1.default.colors.secondary : brandConfig_1.default.colors.primary}/>
    </react_native_1.View>) : (<react_native_1.Pressable onPress={onPress} style={secondary ? styles.secondary : styles.primary}>
      <react_native_1.View>
        <StyledText_1.StyledText fontSize={'md'} color="white">
          {title}
        </StyledText_1.StyledText>
      </react_native_1.View>
    </react_native_1.Pressable>);
};
exports.Button = Button;
const styles = react_native_1.StyleSheet.create({
    primary: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
        borderRadius: brandConfig_1.default.borderRadius,
        backgroundColor: brandConfig_1.default.colors.primary
    },
    secondary: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
        borderRadius: brandConfig_1.default.borderRadius,
        backgroundColor: brandConfig_1.default.colors.secondary
    },
    text: {
        fontSize: brandConfig_1.default.fontSizes.medium,
        textAlign: 'center',
        fontWeight: '500',
        color: '#FFFFFF'
    }
});
