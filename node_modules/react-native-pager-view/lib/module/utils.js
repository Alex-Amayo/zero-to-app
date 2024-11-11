import React, { Children } from 'react';
import { StyleSheet, View } from 'react-native';
export const childrenWithOverriddenStyle = children => {
  return Children.map(children, child => {
    const element = child;
    return (
      /*#__PURE__*/
      // Add a wrapper to ensure layout is calculated correctly
      React.createElement(View, {
        style: StyleSheet.absoluteFill,
        collapsable: false
      }, /*#__PURE__*/React.cloneElement(element, {
        ...element.props,
        // Override styles so that each page will fill the parent.
        style: [element.props.style, StyleSheet.absoluteFill]
      }))
    );
  });
};
//# sourceMappingURL=utils.js.map