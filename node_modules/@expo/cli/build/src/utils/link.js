"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    link: ()=>link,
    learnMore: ()=>learnMore
});
function _chalk() {
    const data = /*#__PURE__*/ _interopRequireDefault(require("chalk"));
    _chalk = function() {
        return data;
    };
    return data;
}
function _terminalLink() {
    const data = /*#__PURE__*/ _interopRequireDefault(require("terminal-link"));
    _terminalLink = function() {
        return data;
    };
    return data;
}
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function link(url, { text =url , dim =true  } = {}) {
    let output;
    // Links can be disabled via env variables https://github.com/jamestalmage/supports-hyperlinks/blob/master/index.js
    if (_terminalLink().default.isSupported) {
        output = (0, _terminalLink().default)(text, url);
    } else {
        output = `${text === url ? "" : text + ": "}${_chalk().default.underline(url)}`;
    }
    return dim ? _chalk().default.dim(output) : output;
}
function learnMore(url, { learnMoreMessage: maybeLearnMoreMessage , dim =true  } = {}) {
    return link(url, {
        text: maybeLearnMoreMessage != null ? maybeLearnMoreMessage : "Learn more",
        dim
    });
}

//# sourceMappingURL=link.js.map