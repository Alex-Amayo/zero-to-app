import * as React from 'react';
export type ServerContextType = {
    location?: {
        pathname: string;
        search: string;
    };
};
declare const ServerContext: React.Context<ServerContextType | undefined>;
export default ServerContext;
//# sourceMappingURL=ServerContext.d.ts.map