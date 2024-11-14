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
const react_hook_form_1 = require("react-hook-form");
const brandConfig_1 = __importDefault(require("../brand/brandConfig"));
const theme_1 = require("../theme/theme");
/**
 * FormInput component for rendering a controlled input field with validation
 * and theming support in a React Native application. Integrates with React Hook
 * Form for form state management and uses the current theme for styling.
 */
const FormInput = ({ placeholder, half, secure, control, name, }) => {
    // Initialize theme
    const theme = (0, react_1.useContext)(theme_1.ThemeContext);
    return (<react_hook_form_1.Controller name={name} control={control} render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (<react_native_1.View style={half ? styles.halfSizeContainer : styles.fullSizeContainer}>
          <react_native_1.TextInput placeholder={placeholder} secureTextEntry={secure} placeholderTextColor={theme.values.color} onBlur={onBlur} onChangeText={onChange} value={value} style={[
                {
                    color: theme.values.color,
                    borderColor: error ? 'red' : theme.values.dividerColor,
                },
                styles.textInput,
            ]}/>
          {error && <react_native_1.Text style={styles.errorText}>{error.message}</react_native_1.Text>}
        </react_native_1.View>)}/>);
};
exports.default = FormInput;
const styles = react_native_1.StyleSheet.create({
    fullSizeContainer: {
        width: '100%',
    },
    halfSizeContainer: {
        width: '48%',
    },
    textInput: {
        padding: 15,
        borderWidth: 1,
        borderRadius: brandConfig_1.default.borderRadius,
        fontSize: brandConfig_1.default.fontSizes.medium,
    },
    errorText: {
        color: 'red',
        marginTop: 5,
    },
});
