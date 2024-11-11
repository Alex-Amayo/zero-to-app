"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "UserQuery", {
    enumerable: true,
    get: ()=>UserQuery
});
function _graphqlTag() {
    const data = /*#__PURE__*/ _interopRequireDefault(require("graphql-tag"));
    _graphqlTag = function() {
        return data;
    };
    return data;
}
const _client = require("../client");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const UserQuery = {
    async currentUserAsync () {
        const data = await (0, _client.withErrorHandlingAsync)(_client.graphqlClient.query((0, _graphqlTag().default)`
            query CurrentUser {
              meActor {
                __typename
                id
                ... on UserActor {
                  primaryAccount {
                    id
                  }
                  username
                }
                ... on Robot {
                  firstName
                }
                accounts {
                  id
                  users {
                    actor {
                      id
                    }
                    permissions
                  }
                }
              }
            }
          `, /* variables */ undefined, {
            additionalTypenames: [
                "User",
                "SSOUser"
            ]
        }).toPromise());
        return data.meActor;
    }
};

//# sourceMappingURL=UserQuery.js.map