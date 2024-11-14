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
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme/theme");
/**
 * Form separator component that displays a full width horizontal line separating two components
 */
const FormSeparator = ({ text }) => {
    // Initialize theme
    const theme = (0, react_1.useContext)(theme_1.ThemeContext);
    return (<react_native_1.View style={styles.separator}>
      <react_native_1.View style={styles.line}/>
      {
        //if text is present display text in theme color
        text ? <react_native_1.Text style={Object.assign(Object.assign({}, styles.text), { color: theme.values.color })}>{text}</react_native_1.Text> : null}
      <react_native_1.View style={styles.line}/>
    </react_native_1.View>);
};
const styles = react_native_1.StyleSheet.create({
    separator: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'center',
    },
    line: {
        height: 1,
        backgroundColor: '#d7dade',
        flex: 1,
    },
    text: {
        textAlign: 'center',
        marginHorizontal: 10,
    },
});
exports.default = FormSeparator;
