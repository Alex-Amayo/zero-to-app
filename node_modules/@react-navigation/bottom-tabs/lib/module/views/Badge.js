function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import { useTheme } from '@react-navigation/native';
import color from 'color';
import * as React from 'react';
import { Animated, StyleSheet } from 'react-native';
export default function Badge(_ref) {
  let {
    children,
    style,
    visible = true,
    size = 18,
    ...rest
  } = _ref;
  const [opacity] = React.useState(() => new Animated.Value(visible ? 1 : 0));
  const [rendered, setRendered] = React.useState(visible);
  const theme = useTheme();
  React.useEffect(() => {
    if (!rendered) {
      return;
    }
    Animated.timing(opacity, {
      toValue: visible ? 1 : 0,
      duration: 150,
      useNativeDriver: true
    }).start(_ref2 => {
      let {
        finished
      } = _ref2;
      if (finished && !visible) {
        setRendered(false);
      }
    });
    return () => opacity.stopAnimation();
  }, [opacity, rendered, visible]);
  if (!rendered) {
    if (visible) {
      setRendered(true);
    } else {
      return null;
    }
  }

  // @ts-expect-error: backgroundColor definitely exists
  const {
    backgroundColor = theme.colors.notification,
    ...restStyle
  } = StyleSheet.flatten(style) || {};
  const textColor = color(backgroundColor).isLight() ? 'black' : 'white';
  const borderRadius = size / 2;
  const fontSize = Math.floor(size * 3 / 4);
  return /*#__PURE__*/React.createElement(Animated.Text, _extends({
    numberOfLines: 1,
    style: [{
      transform: [{
        scale: opacity.interpolate({
          inputRange: [0, 1],
          outputRange: [0.5, 1]
        })
      }],
      color: textColor,
      lineHeight: size - 1,
      height: size,
      minWidth: size,
      opacity,
      backgroundColor,
      fontSize,
      borderRadius
    }, styles.container, restStyle]
  }, rest), children);
}
const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-end',
    textAlign: 'center',
    paddingHorizontal: 4,
    overflow: 'hidden'
  }
});
//# sourceMappingURL=Badge.js.map