"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TabView = TabView;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _Pager = require("./Pager");
var _SceneView = require("./SceneView");
var _TabBar = require("./TabBar");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function TabView(_ref) {
  let {
    onIndexChange,
    navigationState,
    renderScene,
    initialLayout,
    keyboardDismissMode = 'auto',
    lazy = false,
    lazyPreloadDistance = 0,
    onSwipeStart,
    onSwipeEnd,
    renderLazyPlaceholder = () => null,
    renderTabBar = props => /*#__PURE__*/React.createElement(_TabBar.TabBar, props),
    sceneContainerStyle,
    pagerStyle,
    style,
    swipeEnabled = true,
    tabBarPosition = 'top',
    animationEnabled = true,
    overScrollMode
  } = _ref;
  const [layout, setLayout] = React.useState({
    width: 0,
    height: 0,
    ...initialLayout
  });
  const jumpToIndex = index => {
    if (index !== navigationState.index) {
      onIndexChange(index);
    }
  };
  const handleLayout = e => {
    const {
      height,
      width
    } = e.nativeEvent.layout;
    setLayout(prevLayout => {
      if (prevLayout.width === width && prevLayout.height === height) {
        return prevLayout;
      }
      return {
        height,
        width
      };
    });
  };
  return /*#__PURE__*/React.createElement(_reactNative.View, {
    onLayout: handleLayout,
    style: [styles.pager, style]
  }, /*#__PURE__*/React.createElement(_Pager.Pager, {
    layout: layout,
    navigationState: navigationState,
    keyboardDismissMode: keyboardDismissMode,
    swipeEnabled: swipeEnabled,
    onSwipeStart: onSwipeStart,
    onSwipeEnd: onSwipeEnd,
    onIndexChange: jumpToIndex,
    animationEnabled: animationEnabled,
    overScrollMode: overScrollMode,
    style: pagerStyle
  }, _ref2 => {
    let {
      position,
      render,
      addEnterListener,
      jumpTo
    } = _ref2;
    // All of the props here must not change between re-renders
    // This is crucial to optimizing the routes with PureComponent
    const sceneRendererProps = {
      position,
      layout,
      jumpTo
    };
    return /*#__PURE__*/React.createElement(React.Fragment, null, tabBarPosition === 'top' && renderTabBar({
      ...sceneRendererProps,
      navigationState
    }), render(navigationState.routes.map((route, i) => {
      return /*#__PURE__*/React.createElement(_SceneView.SceneView, _extends({}, sceneRendererProps, {
        addEnterListener: addEnterListener,
        key: route.key,
        index: i,
        lazy: typeof lazy === 'function' ? lazy({
          route
        }) : lazy,
        lazyPreloadDistance: lazyPreloadDistance,
        navigationState: navigationState,
        style: sceneContainerStyle
      }), _ref3 => {
        let {
          loading
        } = _ref3;
        return loading ? renderLazyPlaceholder({
          route
        }) : renderScene({
          ...sceneRendererProps,
          route
        });
      });
    })), tabBarPosition === 'bottom' && renderTabBar({
      ...sceneRendererProps,
      navigationState
    }));
  }));
}
const styles = _reactNative.StyleSheet.create({
  pager: {
    flex: 1,
    overflow: 'hidden'
  }
});
//# sourceMappingURL=TabView.js.map