// Set the environment to production or development
// lots of tools use this to determine if they should run in a dev mode.
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "setNodeEnv", {
    enumerable: true,
    get: ()=>setNodeEnv
});
function setNodeEnv(mode) {
    process.env.NODE_ENV = process.env.NODE_ENV || mode;
    process.env.BABEL_ENV = process.env.BABEL_ENV || process.env.NODE_ENV;
    // @ts-expect-error: Add support for external React libraries being loaded in the same process.
    globalThis.__DEV__ = process.env.NODE_ENV !== "production";
}

//# sourceMappingURL=nodeEnv.js.map