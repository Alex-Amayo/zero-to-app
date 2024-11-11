"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AppQuery", {
    enumerable: true,
    get: ()=>AppQuery
});
function _graphql() {
    const data = require("graphql");
    _graphql = function() {
        return data;
    };
    return data;
}
function _graphqlTag() {
    const data = /*#__PURE__*/ _interopRequireDefault(require("graphql-tag"));
    _graphqlTag = function() {
        return data;
    };
    return data;
}
const _client = require("../client");
const _app = require("../types/App");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const AppQuery = {
    async byIdAsync (projectId) {
        const data = await (0, _client.withErrorHandlingAsync)(_client.graphqlClient.query((0, _graphqlTag().default)`
            query AppByIdQuery($appId: String!) {
              app {
                byId(appId: $appId) {
                  id
                  ...AppFragment
                }
              }
            }
            ${(0, _graphql().print)(_app.AppFragmentNode)}
          `, {
            appId: projectId
        }, {
            additionalTypenames: [
                "App"
            ]
        }).toPromise());
        return data.app.byId;
    }
};

//# sourceMappingURL=AppQuery.js.map