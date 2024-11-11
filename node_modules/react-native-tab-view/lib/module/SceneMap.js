import * as React from 'react';
const SceneComponent = /*#__PURE__*/React.memo(_ref => {
  let {
    component,
    ...rest
  } = _ref;
  return /*#__PURE__*/React.createElement(component, rest);
});
export function SceneMap(scenes) {
  return _ref2 => {
    let {
      route,
      jumpTo,
      position
    } = _ref2;
    return /*#__PURE__*/React.createElement(SceneComponent, {
      key: route.key,
      component: scenes[route.key],
      route: route,
      jumpTo: jumpTo,
      position: position
    });
  };
}
//# sourceMappingURL=SceneMap.js.map