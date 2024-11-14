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
exports.default = FormErrors;
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const brandConfig_1 = __importDefault(require("../brand/brandConfig"));
/**
 * FormErrors component to display error messages in forms.
 * The error message will be visible for 1 second before being hidden.
 * Returns the form error element if the error prop is not null and visible is true.
 */
function FormErrors({ error, clearError }) {
    const [visible, setVisible] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        if (error) {
            setVisible(true);
            const timer = setTimeout(() => {
                setVisible(false);
                if (clearError) {
                    clearError();
                }
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [error, clearError]);
    return error && visible ? <react_native_1.Text style={styles.error}>{error}</react_native_1.Text> : <></>;
}
const styles = react_native_1.StyleSheet.create({
    error: {
        textAlign: 'center',
        color: 'red',
        fontSize: brandConfig_1.default.fontSizes.medium,
    },
});
