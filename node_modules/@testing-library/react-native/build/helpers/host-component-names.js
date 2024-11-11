"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configureHostComponentNamesIfNeeded = configureHostComponentNamesIfNeeded;
exports.getHostComponentNames = getHostComponentNames;
exports.isHostImage = isHostImage;
exports.isHostModal = isHostModal;
exports.isHostScrollView = isHostScrollView;
exports.isHostSwitch = isHostSwitch;
exports.isHostText = isHostText;
exports.isHostTextInput = isHostTextInput;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _config = require("../config");
var _renderAct = require("../render-act");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const userConfigErrorMessage = `There seems to be an issue with your configuration that prevents React Native Testing Library from working correctly.
Please check if you are using compatible versions of React Native and React Native Testing Library.`;
function getHostComponentNames() {
  let hostComponentNames = (0, _config.getConfig)().hostComponentNames;
  if (!hostComponentNames) {
    hostComponentNames = detectHostComponentNames();
    (0, _config.configureInternal)({
      hostComponentNames
    });
  }
  return hostComponentNames;
}
function configureHostComponentNamesIfNeeded() {
  const configHostComponentNames = (0, _config.getConfig)().hostComponentNames;
  if (configHostComponentNames) {
    return;
  }
  const hostComponentNames = detectHostComponentNames();
  (0, _config.configureInternal)({
    hostComponentNames
  });
}
function detectHostComponentNames() {
  try {
    const renderer = (0, _renderAct.renderWithAct)(/*#__PURE__*/React.createElement(_reactNative.View, null, /*#__PURE__*/React.createElement(_reactNative.Text, {
      testID: "text"
    }, "Hello"), /*#__PURE__*/React.createElement(_reactNative.TextInput, {
      testID: "textInput"
    }), /*#__PURE__*/React.createElement(_reactNative.Image, {
      testID: "image"
    }), /*#__PURE__*/React.createElement(_reactNative.Switch, {
      testID: "switch"
    }), /*#__PURE__*/React.createElement(_reactNative.ScrollView, {
      testID: "scrollView"
    }), /*#__PURE__*/React.createElement(_reactNative.Modal, {
      testID: "modal"
    })));
    return {
      text: getByTestId(renderer.root, 'text').type,
      textInput: getByTestId(renderer.root, 'textInput').type,
      image: getByTestId(renderer.root, 'image').type,
      switch: getByTestId(renderer.root, 'switch').type,
      scrollView: getByTestId(renderer.root, 'scrollView').type,
      modal: getByTestId(renderer.root, 'modal').type
    };
  } catch (error) {
    const errorMessage = error && typeof error === 'object' && 'message' in error ? error.message : null;
    throw new Error(`Trying to detect host component names triggered the following error:\n\n${errorMessage}\n\n${userConfigErrorMessage}`);
  }
}
function getByTestId(instance, testID) {
  const nodes = instance.findAll(node => typeof node.type === 'string' && node.props.testID === testID);
  if (nodes.length === 0) {
    throw new Error(`Unable to find an element with testID: ${testID}`);
  }
  return nodes[0];
}

/**
 * Checks if the given element is a host Text element.
 * @param element The element to check.
 */
function isHostText(element) {
  return element?.type === getHostComponentNames().text;
}

/**
 * Checks if the given element is a host TextInput element.
 * @param element The element to check.
 */
function isHostTextInput(element) {
  return element?.type === getHostComponentNames().textInput;
}

/**
 * Checks if the given element is a host Image element.
 * @param element The element to check.
 */
function isHostImage(element) {
  return element?.type === getHostComponentNames().image;
}

/**
 * Checks if the given element is a host Switch element.
 * @param element The element to check.
 */
function isHostSwitch(element) {
  return element?.type === getHostComponentNames().switch;
}

/**
 * Checks if the given element is a host ScrollView element.
 * @param element The element to check.
 */
function isHostScrollView(element) {
  return element?.type === getHostComponentNames().scrollView;
}

/**
 * Checks if the given element is a host Modal element.
 * @param element The element to check.
 */
function isHostModal(element) {
  return element?.type === getHostComponentNames().modal;
}
//# sourceMappingURL=host-component-names.js.map