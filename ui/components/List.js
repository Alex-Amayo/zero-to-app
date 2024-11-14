"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
/**
 * A list component that wraps th each child in a container with consistent padding and gap values.
 */
const List = ({ children }) => {
    return <react_native_1.View style={styles.list}>{children}</react_native_1.View>;
};
exports.default = List;
const styles = react_native_1.StyleSheet.create({
    list: {
        alignSelf: 'center',
        width: '100%',
        padding: 15,
        gap: 15,
    },
});
