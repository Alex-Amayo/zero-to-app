"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SafeAreaView = void 0;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _SafeAreaContext = require("./SafeAreaContext");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
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
const SafeAreaView = exports.SafeAreaView = /*#__PURE__*/React.forwardRef(({
  style = {},
  mode,
  edges,
  ...rest
}, ref) => {
  const insets = (0, _SafeAreaContext.useSafeAreaInsets)();
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
    const flatStyle = _reactNative.StyleSheet.flatten(style);
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
  return /*#__PURE__*/React.createElement(_reactNative.View, _extends({
    style: appliedStyle
  }, rest, {
    ref: ref
  }));
});
//# sourceMappingURL=SafeAreaView.web.js.map