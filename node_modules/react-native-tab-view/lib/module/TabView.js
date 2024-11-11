function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Pager } from './Pager';
import { SceneView } from './SceneView';
import { TabBar } from './TabBar';
export function TabView(_ref) {
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
    renderTabBar = props => /*#__PURE__*/React.createElement(TabBar, props),
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
  return /*#__PURE__*/React.createElement(View, {
    onLayout: handleLayout,
    style: [styles.pager, style]
  }, /*#__PURE__*/React.createElement(Pager, {
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
      return /*#__PURE__*/React.createElement(SceneView, _extends({}, sceneRendererProps, {
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
const styles = StyleSheet.create({
  pager: {
    flex: 1,
    overflow: 'hidden'
  }
});
//# sourceMappingURL=TabView.js.map