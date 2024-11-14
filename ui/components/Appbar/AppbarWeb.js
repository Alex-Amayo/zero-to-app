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
const expo_router_1 = require("expo-router");
const useWindowWidth_1 = require("../../hooks/useWindowWidth");
const brandConfig_1 = __importDefault(require("../../brand/brandConfig"));
const theme_1 = require("../../theme/theme");
const IconButtonDrawer_1 = __importDefault(require("./IconButtonDrawer"));
/**
 * A responsive appbar that displays at the top of the page.
 * Dynamically adapts its styling when the viewprt is less than medium
 */
const AppbarWeb = ({ title, tabs }) => {
    //Initialize theme
    const theme = (0, react_1.useContext)(theme_1.ThemeContext);
    //Initialize window width
    const windowWidth = (0, useWindowWidth_1.useWindowWidth)();
    //If window width is greater than medium breakpoint, apply card styles to appbar
    if (windowWidth >= useWindowWidth_1.breakpoints.medium) {
        styles.webContainer = Object.assign({
            //Appbar card styling
            //Shadow color from theme
            shadowColor: brandConfig_1.default.shadows ? theme.values.shadowColor : undefined,
            //Verticle shadow offset for Appbar
            shadowOffset: brandConfig_1.default.shadows ? { width: -2, height: 2 } : undefined,
            shadowOpacity: brandConfig_1.default.shadows ? 0.4 : undefined,
            shadowRadius: brandConfig_1.default.shadows ? 3 : undefined,
            elevation: brandConfig_1.default.shadows ? 20 : undefined,
        });
    }
    return (<react_native_1.View style={{
            //padding for displaying shadow on larger screens
            paddingBottom: windowWidth >= useWindowWidth_1.breakpoints.medium ? 10 : 0,
            //Configure background with theme background (**Different from appbar background, color of the space for shadows)
            backgroundColor: theme.values.backgroundColor,
        }}>
      <react_native_1.View style={Object.assign(Object.assign({}, styles.webContainer), { 
            //Configure appbar with theme appbar color
            backgroundColor: theme.values.appbarColor })}>
        <react_native_1.View style={Object.assign({}, styles.appbar)}>
          <expo_router_1.Link href="/core/home">
            <react_native_1.Text style={Object.assign(Object.assign({}, styles.title), { 
            //Configure title color with theme
            color: theme.values.highlightColor })}>
              {title}
            </react_native_1.Text>
          </expo_router_1.Link>
          {windowWidth >= useWindowWidth_1.breakpoints.medium ? tabs : null}
          <IconButtonDrawer_1.default />
        </react_native_1.View>
        {windowWidth < useWindowWidth_1.breakpoints.medium ? (<react_native_1.View style={Object.assign(Object.assign({}, styles.appbarWebSmall), { borderBottomColor: theme.values.dividerColor })}>
            {tabs}
          </react_native_1.View>) : null}
      </react_native_1.View>
    </react_native_1.View>);
};
exports.default = AppbarWeb;
const styles = react_native_1.StyleSheet.create({
    appbar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 60,
        paddingHorizontal: 15,
    },
    appbarWebSmall: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 60,
        width: '100%',
        paddingHorizontal: 15,
    },
    iconContainer: {
        flexDirection: 'row',
        gap: 10,
    },
    logo: {
        width: 40,
        height: 40,
    },
    title: {
        fontSize: brandConfig_1.default.fontSizes.large,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    webContainer: {}, // WebContainer property to inject shadow styles for web
});
