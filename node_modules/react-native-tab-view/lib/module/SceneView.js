import * as React from 'react';
import { StyleSheet, View } from 'react-native';
export function SceneView(_ref) {
  let {
    children,
    navigationState,
    lazy,
    layout,
    index,
    lazyPreloadDistance,
    addEnterListener,
    style
  } = _ref;
  const [isLoading, setIsLoading] = React.useState(Math.abs(navigationState.index - index) > lazyPreloadDistance);
  if (isLoading && Math.abs(navigationState.index - index) <= lazyPreloadDistance) {
    // Always render the route when it becomes focused
    setIsLoading(false);
  }
  React.useEffect(() => {
    const handleEnter = value => {
      // If we're entering the current route, we need to load it
      if (value === index) {
        setIsLoading(prevState => {
          if (prevState) {
            return false;
          }
          return prevState;
        });
      }
    };
    let unsubscribe;
    let timer;
    if (lazy && isLoading) {
      // If lazy mode is enabled, listen to when we enter screens
      unsubscribe = addEnterListener(handleEnter);
    } else if (isLoading) {
      // If lazy mode is not enabled, render the scene with a delay if not loaded already
      // This improves the initial startup time as the scene is no longer blocking
      timer = setTimeout(() => setIsLoading(false), 0);
    }
    return () => {
      var _unsubscribe;
      (_unsubscribe = unsubscribe) === null || _unsubscribe === void 0 ? void 0 : _unsubscribe();
      clearTimeout(timer);
    };
  }, [addEnterListener, index, isLoading, lazy]);
  const focused = navigationState.index === index;
  return /*#__PURE__*/React.createElement(View, {
    accessibilityElementsHidden: !focused,
    importantForAccessibility: focused ? 'auto' : 'no-hide-descendants',
    style: [styles.route,
    // If we don't have the layout yet, make the focused screen fill the container
    // This avoids delay before we are able to render pages side by side
    layout.width ? {
      width: layout.width
    } : focused ? StyleSheet.absoluteFill : null, style]
  },
  // Only render the route only if it's either focused or layout is available
  // When layout is not available, we must not render unfocused routes
  // so that the focused route can fill the screen
  focused || layout.width ? children({
    loading: isLoading
  }) : null);
}
const styles = StyleSheet.create({
  route: {
    flex: 1,
    overflow: 'hidden'
  }
});
//# sourceMappingURL=SceneView.js.map