function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import { CommonActions, useTheme } from '@react-navigation/native';
import * as React from 'react';
import { TabView } from 'react-native-tab-view';
import MaterialTopTabBar from './MaterialTopTabBar';
export default function MaterialTopTabView(_ref) {
  let {
    tabBar = props => /*#__PURE__*/React.createElement(MaterialTopTabBar, props),
    state,
    navigation,
    descriptors,
    sceneContainerStyle,
    ...rest
  } = _ref;
  const {
    colors
  } = useTheme();
  const renderTabBar = props => {
    return tabBar({
      ...props,
      state: state,
      navigation: navigation,
      descriptors: descriptors
    });
  };
  const focusedOptions = descriptors[state.routes[state.index].key].options;
  return /*#__PURE__*/React.createElement(TabView, _extends({}, rest, {
    onIndexChange: index => navigation.dispatch({
      ...CommonActions.navigate({
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