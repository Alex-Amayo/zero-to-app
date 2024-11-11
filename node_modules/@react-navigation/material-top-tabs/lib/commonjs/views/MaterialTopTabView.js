"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = MaterialTopTabView;
var _native = require("@react-navigation/native");
var React = _interopRequireWildcard(require("react"));
var _reactNativeTabView = require("react-native-tab-view");
var _MaterialTopTabBar = _interopRequireDefault(require("./MaterialTopTabBar"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function MaterialTopTabView(_ref) {
  let {
    tabBar = props => /*#__PURE__*/React.createElement(_MaterialTopTabBar.default, props),
    state,
    navigation,
    descriptors,
    sceneContainerStyle,
    ...rest
  } = _ref;
  const {
    colors
  } = (0, _native.useTheme)();
  const renderTabBar = props => {
    return tabBar({
      ...props,
      state: state,
      navigation: navigation,
      descriptors: descriptors
    });
  };
  const focusedOptions = descriptors[state.routes[state.index].key].options;
  return /*#__PURE__*/React.createElement(_reactNativeTabView.TabView, _extends({}, rest, {
    onIndexChange: index => navigation.dispatch({
      ..._native.CommonActions.navigate({
        name: state.routes[index].name,
        merge: true
      }),
      target: state.key
    }),
    renderScene: _ref2 => {
      let {
        route
      } = _ref2;
      return descriptors[route.key].render();
    },
    navigationState: state,
    renderTabBar: renderTabBar,
    renderLazyPlaceholder: _ref3 => {
      var _descriptors$route$ke, _descriptors$route$ke2;
      let {
        route
      } = _ref3;
      return ((_descriptors$route$ke = (_descriptors$route$ke2 = descriptors[route.key].options).lazyPlaceholder) === null || _descriptors$route$ke === void 0 ? void 0 : _descriptors$route$ke.call(_descriptors$route$ke2)) ?? null;
    },
    lazy: _ref4 => {
      let {
        route
      } = _ref4;
      return descriptors[route.key].options.lazy === true;
    },
    lazyPreloadDistance: focusedOptions.lazyPreloadDistance,
    swipeEnabled: focusedOptions.swipeEnabled,
    animationEnabled: focusedOptions.animationEnabled,
    onSwipeStart: () => navigation.emit({
      type: 'swipeStart'
    }),
    onSwipeEnd: () => navigation.emit({
      type: 'swipeEnd'
    }),
    sceneContainerStyle: [{
      backgroundColor: colors.background
    }, sceneContainerStyle]
  }));
}
//# sourceMappingURL=MaterialTopTabView.js.map