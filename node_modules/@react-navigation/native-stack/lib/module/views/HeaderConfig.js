import { getHeaderTitle, HeaderTitle } from '@react-navigation/elements';
import { useTheme } from '@react-navigation/native';
import * as React from 'react';
import { I18nManager, Platform, StyleSheet, View } from 'react-native';
import {
// @ts-expect-error: Available since react-native-screens v3.21
isNewBackTitleImplementation, isSearchBarAvailableForCurrentPlatform, ScreenStackHeaderBackButtonImage, ScreenStackHeaderCenterView, ScreenStackHeaderConfig, ScreenStackHeaderLeftView, ScreenStackHeaderRightView, ScreenStackHeaderSearchBarView, SearchBar } from 'react-native-screens';
import { processFonts } from './FontProcessor';
export default function HeaderConfig(_ref) {
  let {
    headerBackImageSource,
    headerBackButtonMenuEnabled,
    headerBackTitle,
    headerBackTitleStyle,
    headerBackTitleVisible = true,
    headerBackVisible,
    headerShadowVisible,
    headerLargeStyle,
    headerLargeTitle,
    headerLargeTitleShadowVisible,
    headerLargeTitleStyle,
    headerBackground,
    headerLeft,
    headerRight,
    headerShown,
    headerStyle,
    headerBlurEffect,
    headerTintColor,
    headerTitle,
    headerTitleAlign,
    headerTitleStyle,
    headerTransparent,
    headerSearchBarOptions,
    headerTopInsetEnabled,
    route,
    title,
    canGoBack
  } = _ref;
  const {
    colors
  } = useTheme();
  const tintColor = headerTintColor ?? (Platform.OS === 'ios' ? colors.primary : colors.text);
  const headerBackTitleStyleFlattened = StyleSheet.flatten(headerBackTitleStyle) || {};
  const headerLargeTitleStyleFlattened = StyleSheet.flatten(headerLargeTitleStyle) || {};
  const headerTitleStyleFlattened = StyleSheet.flatten(headerTitleStyle) || {};
  const headerStyleFlattened = StyleSheet.flatten(headerStyle) || {};
  const headerLargeStyleFlattened = StyleSheet.flatten(headerLargeStyle) || {};
  const [backTitleFontFamily, largeTitleFontFamily, titleFontFamily] = processFonts([headerBackTitleStyleFlattened.fontFamily, headerLargeTitleStyleFlattened.fontFamily, headerTitleStyleFlattened.fontFamily]);
  const titleText = getHeaderTitle({
    title,
    headerTitle
  }, route.name);
  const titleColor = headerTitleStyleFlattened.color ?? headerTintColor ?? colors.text;
  const titleFontSize = headerTitleStyleFlattened.fontSize;
  const titleFontWeight = headerTitleStyleFlattened.fontWeight;
  const headerTitleStyleSupported = {
    color: titleColor
  };
  if (headerTitleStyleFlattened.fontFamily != null) {
    headerTitleStyleSupported.fontFamily = headerTitleStyleFlattened.fontFamily;
  }
  if (titleFontSize != null) {
    headerTitleStyleSupported.fontSize = titleFontSize;
  }
  if (titleFontWeight != null) {
    headerTitleStyleSupported.fontWeight = titleFontWeight;
  }
  const headerLeftElement = headerLeft === null || headerLeft === void 0 ? void 0 : headerLeft({
    tintColor,
    canGoBack,
    label: headerBackTitle
  });
  const headerRightElement = headerRight === null || headerRight === void 0 ? void 0 : headerRight({
    tintColor,
    canGoBack
  });
  const headerTitleElement = typeof headerTitle === 'function' ? headerTitle({
    tintColor,
    children: titleText
  }) : null;
  const supportsHeaderSearchBar = typeof isSearchBarAvailableForCurrentPlatform === 'boolean' ? isSearchBarAvailableForCurrentPlatform :
  // Fallback for older versions of react-native-screens
  Platform.OS === 'ios' && SearchBar != null;
  const hasHeaderSearchBar = supportsHeaderSearchBar && headerSearchBarOptions != null;
  if (headerSearchBarOptions != null && !supportsHeaderSearchBar) {
    throw new Error(`The current version of 'react-native-screens' doesn't support SearchBar in the header. Please update to the latest version to use this option.`);
  }

  /**
   * We need to set this in if:
   * - Back button should stay visible when `headerLeft` is specified
   * - If `headerTitle` for Android is specified, so we only need to remove the title and keep the back button
   */
  const backButtonInCustomView = headerBackVisible ? headerLeftElement != null : Platform.OS === 'android' && headerTitleElement != null;
  const translucent = headerBackground != null || headerTransparent ||
  // When using a SearchBar or large title, the header needs to be translucent for it to work on iOS
  (hasHeaderSearchBar || headerLargeTitle) && Platform.OS === 'ios' && headerTransparent !== false;
  return /*#__PURE__*/React.createElement(ScreenStackHeaderConfig, {
    backButtonInCustomView: backButtonInCustomView,
    backgroundColor: headerStyleFlattened.backgroundColor ?? (headerBackground != null || headerTransparent ? 'transparent' : colors.card),
    backTitle: isNewBackTitleImplementation || headerBackTitleVisible ? headerBackTitle : ' '
    // @ts-expect-error: Available since react-native-screens v3.21
    ,
    backTitleVisible: headerBackTitleVisible,
    backTitleFontFamily: backTitleFontFamily,
    backTitleFontSize: headerBackTitleStyleFlattened.fontSize,
    blurEffect: headerBlurEffect,
    color: tintColor,
    direction: I18nManager.getConstants().isRTL ? 'rtl' : 'ltr',
    disableBackButtonMenu: headerBackButtonMenuEnabled === false,
    hidden: headerShown === false,
    hideBackButton: headerBackVisible === false,
    hideShadow: headerShadowVisible === false || headerBackground != null || headerTransparent && headerShadowVisible !== true,
    largeTitle: headerLargeTitle,
    largeTitleBackgroundColor: headerLargeStyleFlattened.backgroundColor,
    largeTitleColor: headerLargeTitleStyleFlattened.color,
    largeTitleFontFamily: largeTitleFontFamily,
    largeTitleFontSize: headerLargeTitleStyleFlattened.fontSize,
    largeTitleFontWeight: headerLargeTitleStyleFlattened.fontWeight,
    largeTitleHideShadow: headerLargeTitleShadowVisible === false,
    title: titleText,
    titleColor: titleColor,
    titleFontFamily: titleFontFamily,
    titleFontSize: titleFontSize,
    titleFontWeight: titleFontWeight,
    topInsetEnabled: headerTopInsetEnabled,
    translucent:
    // This defaults to `true`, so we can't pass `undefined`
    translucent === true
  }, Platform.OS === 'ios' ? /*#__PURE__*/React.createElement(React.Fragment, null, headerLeftElement != null ? /*#__PURE__*/React.createElement(ScreenStackHeaderLeftView, null, headerLeftElement) : null, headerTitleElement != null ? /*#__PURE__*/React.createElement(ScreenStackHeaderCenterView, null, headerTitleElement) : null) : /*#__PURE__*/React.createElement(React.Fragment, null, headerLeftElement != null || typeof headerTitle === 'function' ? /*#__PURE__*/React.createElement(ScreenStackHeaderLeftView, null, /*#__PURE__*/React.createElement(View, {
    style: styles.row
  }, headerLeftElement, headerTitleAlign !== 'center' ? typeof headerTitle === 'function' ? headerTitleElement : /*#__PURE__*/React.createElement(HeaderTitle, {
    tintColor: tintColor,
    style: headerTitleStyleSupported
  }, titleText) : null)) : null, headerTitleAlign === 'center' ? /*#__PURE__*/React.createElement(ScreenStackHeaderCenterView, null, typeof headerTitle === 'function' ? headerTitleElement : /*#__PURE__*/React.createElement(HeaderTitle, {
    tintColor: tintColor,
    style: headerTitleStyleSupported
  }, titleText)) : null), headerBackImageSource !== undefined ? /*#__PURE__*/React.createElement(ScreenStackHeaderBackButtonImage, {
    source: headerBackImageSource
  }) : null, headerRightElement != null ? /*#__PURE__*/React.createElement(ScreenStackHeaderRightView, null, headerRightElement) : null, hasHeaderSearchBar ? /*#__PURE__*/React.createElement(ScreenStackHeaderSearchBarView, null, /*#__PURE__*/React.createElement(SearchBar, headerSearchBarOptions)) : null);
}
const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  }
});
//# sourceMappingURL=HeaderConfig.js.map