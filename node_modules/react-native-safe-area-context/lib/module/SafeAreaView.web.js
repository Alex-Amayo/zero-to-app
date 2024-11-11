function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from './SafeAreaContext';
const defaultEdges = {
  top: 'additive',
  left: 'additive',
  bottom: 'additive',
  right: 'additive'
};
function getEdgeValue(inset, current, mode) {
  switch (mode) {
    case 'off':
      return current;
    case 'maximum':
      return Math.max(current, inset);
    case 'additive':
    default:
      return current + inset;
  }
}
export const SafeAreaView = /*#__PURE__*/React.forwardRef(({
  style = {},
  mode,
  edges,
  ...rest
}, ref) => {
  const insets = useSafeAreaInsets();
  const edgesRecord = React.useMemo(() => {
    if (edges == null) {
      return defaultEdges;
    }
    return Array.isArray(edges) ? edges.reduce((acc, edge) => {
      acc[edge] = 'additive';
      return acc;
    }, {}) :
    // ts has trouble with refining readonly arrays.
    edges;
  }, [edges]);
  const appliedStyle = React.useMemo(() => {
    const flatStyle = StyleSheet.flatten(style);
    if (mode === 'margin') {
      const {
        margin = 0,
        marginVertical = margin,
        marginHorizontal = margin,
        marginTop = marginVertical,
        marginRight = marginHorizontal,
        marginBottom = marginVertical,
        marginLeft = marginHorizontal
      } = flatStyle;
      const marginStyle = {
        marginTop: getEdgeValue(insets.top, marginTop, edgesRecord.top),
        marginRight: getEdgeValue(insets.right, marginRight, edgesRecord.right),
        marginBottom: getEdgeValue(insets.bottom, marginBottom, edgesRecord.bottom),
        marginLeft: getEdgeValue(insets.left, marginLeft, edgesRecord.left)
      };
      return [style, marginStyle];
    } else {
      const {
        padding = 0,
        paddingVertical = padding,
        paddingHorizontal = padding,
        paddingTop = paddingVertical,
        paddingRight = paddingHorizontal,
        paddingBottom = paddingVertical,
        paddingLeft = paddingHorizontal
      } = flatStyle;
      const paddingStyle = {
        paddingTop: getEdgeValue(insets.top, paddingTop, edgesRecord.top),
        paddingRight: getEdgeValue(insets.right, paddingRight, edgesRecord.right),
        paddingBottom: getEdgeValue(insets.bottom, paddingBottom, edgesRecord.bottom),
        paddingLeft: getEdgeValue(insets.left, paddingLeft, edgesRecord.left)
      };
      return [style, paddingStyle];
    }
  }, [edgesRecord.bottom, edgesRecord.left, edgesRecord.right, edgesRecord.top, insets.bottom, insets.left, insets.right, insets.top, mode, style]);
  return /*#__PURE__*/React.createElement(View, _extends({
    style: appliedStyle
  }, rest, {
    ref: ref
  }));
});
//# sourceMappingURL=SafeAreaView.web.js.map