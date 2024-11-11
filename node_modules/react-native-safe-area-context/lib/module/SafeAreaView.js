function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import * as React from 'react';
import NativeSafeAreaView from './specs/NativeSafeAreaView';
import { useMemo } from 'react';
const defaultEdges = {
  top: 'additive',
  left: 'additive',
  bottom: 'additive',
  right: 'additive'
};
export const SafeAreaView = /*#__PURE__*/React.forwardRef(({
  edges,
  ...props
}, ref) => {
  const nativeEdges = useMemo(() => {
    if (edges == null) {
      return defaultEdges;
    }
    const edgesObj = Array.isArray(edges) ? edges.reduce((acc, edge) => {
      acc[edge] = 'additive';
      return acc;
    }, {}) :
    // ts has trouble with refining readonly arrays.
    edges;

    // make sure that we always pass all edges, required for fabric
    const requiredEdges = {
      top: edgesObj.top ?? 'off',
      right: edgesObj.right ?? 'off',
      bottom: edgesObj.bottom ?? 'off',
      left: edgesObj.left ?? 'off'
    };
    return requiredEdges;
  }, [edges]);
  return /*#__PURE__*/React.createElement(NativeSafeAreaView, _extends({}, props, {
    edges: nativeEdges,
    ref: ref
  }));
});
//# sourceMappingURL=SafeAreaView.js.map