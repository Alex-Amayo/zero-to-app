"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.COMPOSITE_NONE = -1;
exports.COMPOSITE_NORMAL = 0;
exports.COMPOSITE_MULTIPLY = 1;
exports.COMPOSITE_SCREEN = 2;
exports.COMPOSITE_OVERLAY = 3;
exports.COMPOSITE_DARKEN = 4;
exports.COMPOSITE_LIGHTEN = 5;
exports.COMPOSITE_HARD_LIGHT = 6;
exports.COMPOSITE_DIFFERENCE = 7;
exports.COMPOSITE_EXCLUSION = 8;
exports.compositeModeNames = [
    'normal', 'multiply', 'screen', 'overlay', 'darken', 'lighten', 'hard light',
    'difference', 'exclusion'
];
exports.compositeModeNameToMode = {
    normal: exports.COMPOSITE_NORMAL,
    multiply: exports.COMPOSITE_MULTIPLY,
    screen: exports.COMPOSITE_SCREEN,
    overlay: exports.COMPOSITE_OVERLAY,
    darken: exports.COMPOSITE_DARKEN,
    lighten: exports.COMPOSITE_LIGHTEN,
    'hard light': exports.COMPOSITE_HARD_LIGHT,
    difference: exports.COMPOSITE_DIFFERENCE,
    exclusion: exports.COMPOSITE_EXCLUSION
};
//# sourceMappingURL=consts.js.map