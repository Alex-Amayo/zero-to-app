"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "pageIsSupported", {
    enumerable: true,
    get: ()=>pageIsSupported
});
function pageIsSupported(page) {
    var ref;
    var _capabilities, ref1;
    // @ts-expect-error No good way to filter this properly in TypeScript
    const capabilities = (ref1 = (_capabilities = page.capabilities) != null ? _capabilities : (ref = page.reactNative) == null ? void 0 : ref.capabilities) != null ? ref1 : {};
    return page.title === "React Native Experimental (Improved Chrome Reloads)" || capabilities.nativePageReloads === true;
}

//# sourceMappingURL=pageIsSupported.js.map