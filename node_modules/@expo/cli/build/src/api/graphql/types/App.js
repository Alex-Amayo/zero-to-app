"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AppFragmentNode", {
    enumerable: true,
    get: ()=>AppFragmentNode
});
function _graphqlTag() {
    const data = /*#__PURE__*/ _interopRequireDefault(require("graphql-tag"));
    _graphqlTag = function() {
        return data;
    };
    return data;
}
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const AppFragmentNode = (0, _graphqlTag().default)`
  fragment AppFragment on App {
    id
    scopeKey
    ownerAccount {
      id
    }
  }
`;

//# sourceMappingURL=App.js.map