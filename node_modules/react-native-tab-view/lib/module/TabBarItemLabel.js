import React from 'react';
import { Animated, StyleSheet } from 'react-native';
export const TabBarItemLabel = /*#__PURE__*/React.memo(_ref => {
  let {
    color,
    label,
    labelStyle,
    icon
  } = _ref;
  if (!label) {
    return null;
  }
  return /*#__PURE__*/React.createElement(Animated.Text, {
    style: [styles.label, icon ? {
      marginTop: 0
    } : null, labelStyle, {
      color: color
    }]
  }, label);
});
const styles = StyleSheet.create({
  label: {
    margin: 4,
    backgroundColor: 'transparent',
    textTransform: 'uppercase'
  }
});
//# sourceMappingURL=TabBarItemLabel.js.map