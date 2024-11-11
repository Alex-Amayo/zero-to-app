"use strict";
// internal misc utilities
Object.defineProperty(exports, "__esModule", { value: true });
function values(object) {
    return Object.keys(object).map(name => object[name]);
}
exports.values = values;
function flat(arr) {
    return arr.reduce((a, b) => a.concat(b));
}
exports.flat = flat;
// export function trimNoNewLines(s: string): string {
//   return s.replace(/^ +/, '').replace(/ +$/, '')
// }
//# sourceMappingURL=misc.js.map