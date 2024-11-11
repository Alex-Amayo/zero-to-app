import * as React from 'react';
import { Dimensions, Platform, StyleSheet, View } from 'react-native';
import { initialWindowMetrics, SafeAreaFrameContext, SafeAreaInsetsContext, SafeAreaProvider } from 'react-native-safe-area-context';
const {
  width = 0,
  height = 0
} = Dimensions.get('window');

// To support SSR on web, we need to have empty insets for initial values
// Otherwise there can be mismatch between SSR and client output
// We also need to specify empty values to support tests environments
const initialMetrics = Platform.OS === 'web' || initialWindowMetrics == null ? {
  frame: {
    x: 0,
    y: 0,
    width,
    height
  },
  insets: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  }
} : initialWindowMetrics;
export default function SafeAreaProviderCompat(_ref) {
  let {
    children,
    style
  } = _ref;
  const insets = React.useContext(SafeAreaInsetsContext);
  if (insets) {
    // If we already have insets, don't wrap the stack in another safe area provider
    // This avoids an issue with updates at the cost of potentially incorrect values
    // https://github.com/react-navigation/react-navigation/issues/174
    return /*#__PURE__*/React.createElement(View, {
      style: [styles.container, style]
    }, children);
  }
  if (Platform.OS === 'web') {
    children = /*#__PURE__*/React.createElement(SafeAreaFrameProvider, {
      initialMetrics: initialMetrics
    }, children);
  }
  return /*#__PURE__*/React.createElement(SafeAreaProvider, {
    initialMetrics: initialMetrics,
    style: style
  }, children);
}

// FIXME: On the Web, the safe area frame value doesn't update on resize
// So we workaround this by measuring the frame on resize
const SafeAreaFrameProvider = _ref2 => {
  let {
    initialMetrics,
    children
  } = _ref2;
  const element = React.useRef(null);
  const [frame, setFrame] = React.useState(initialMetrics.frame);
  React.useEffect(() => {
    if (element.current == null) {
      return;
    }
    const rect = element.current.getBoundingClientRect();
    setFrame({
      x: rect.x,
      y: rect.y,
      width: rect.width,
      height: rect.height
    });
    let timeout;
    const observer = new ResizeObserver(entries => {
      const entry = entries[0];
      if (entry) {
        const {
          x,
          y,
          width,
          height
        } = entry.contentRect;

        // Debounce the frame updates to avoid too many updates in a short time
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          setFrame({
            x,
            y,
            width,
            height
          });
        }, 100);
      }
    });
    observer.observe(element.current);
    return () => {
      observer.disconnect();
      clearTimeout(timeout);
    };
  }, []);
  return /*#__PURE__*/React.createElement(SafeAreaFrameContext.Provider, {
    value: frame
  }, /*#__PURE__*/React.createElement("div", {
    ref: element,
    style: {
      ...StyleSheet.absoluteFillObject,
      pointerEvents: 'none',
      visibility: 'hidden'
    }
  }), children);
};
SafeAreaProviderCompat.initialMetrics = initialMetrics;
const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
//# sourceMappingURL=SafeAreaProviderCompat.js.map