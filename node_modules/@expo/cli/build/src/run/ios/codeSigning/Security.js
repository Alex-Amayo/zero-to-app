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
    getSecurityPemAsync: ()=>getSecurityPemAsync,
    getCertificateForSigningIdAsync: ()=>getCertificateForSigningIdAsync,
    findIdentitiesAsync: ()=>findIdentitiesAsync,
    extractCodeSigningInfo: ()=>extractCodeSigningInfo,
    resolveIdentitiesAsync: ()=>resolveIdentitiesAsync,
    resolveCertificateSigningInfoAsync: ()=>resolveCertificateSigningInfoAsync,
    extractSigningId: ()=>extractSigningId
});
function _spawnAsync() {
    const data = /*#__PURE__*/ _interopRequireDefault(require("@expo/spawn-async"));
    _spawnAsync = function() {
        return data;
    };
    return data;
}
function _nodeForge() {
    const data = /*#__PURE__*/ _interopRequireDefault(require("node-forge"));
    _nodeForge = function() {
        return data;
    };
    return data;
}
const _securityBinPrerequisite = require("../../../start/doctor/SecurityBinPrerequisite");
const _errors = require("../../../utils/errors");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
async function getSecurityPemAsync(id) {
    var ref;
    const pem = (ref = (await (0, _spawnAsync().default)("security", [
        "find-certificate",
        "-c",
        id,
        "-p"
    ])).stdout) == null ? void 0 : ref.trim == null ? void 0 : ref.trim();
    if (!pem) {
        throw new _errors.CommandError(`Failed to get PEM certificate for ID "${id}" using the 'security' bin`);
    }
    return pem;
}
async function getCertificateForSigningIdAsync(id) {
    const pem = await getSecurityPemAsync(id);
    return _nodeForge().default.pki.certificateFromPem(pem);
}
async function findIdentitiesAsync() {
    var _stdout, ref;
    await _securityBinPrerequisite.SecurityBinPrerequisite.instance.assertAsync();
    const results = (ref = (_stdout = (await (0, _spawnAsync().default)("security", [
        "find-identity",
        "-p",
        "codesigning",
        "-v"
    ])).stdout).trim) == null ? void 0 : ref.call(_stdout);
    // Returns a string like:
    // 1) 12222234253761286351826735HGKDHAJGF45283 "Apple Development: Evan Bacon (AA00AABB0A)" (CSSMERR_TP_CERT_REVOKED)
    // 2) 12312234253761286351826735HGKDHAJGF45283 "Apple Development: bacon@expo.io (BB00AABB0A)"
    // 3) 12442234253761286351826735HGKDHAJGF45283 "iPhone Distribution: Evan Bacon (CC00AABB0B)" (CSSMERR_TP_CERT_REVOKED)
    // 4) 15672234253761286351826735HGKDHAJGF45283 "Apple Development: Evan Bacon (AA00AABB0A)"
    //  4 valid identities found
    const parsed = results.split("\n").map((line)=>extractCodeSigningInfo(line)).filter(Boolean);
    // Remove duplicates
    return [
        ...new Set(parsed)
    ];
}
function extractCodeSigningInfo(value) {
    var ref;
    var ref1;
    return (ref1 = (ref = value.match(/^\s*\d+\).+"(.+Develop(ment|er).+)"$/)) == null ? void 0 : ref[1]) != null ? ref1 : null;
}
async function resolveIdentitiesAsync(identities) {
    const values = identities.map(extractSigningId).filter(Boolean);
    return Promise.all(values.map(resolveCertificateSigningInfoAsync));
}
async function resolveCertificateSigningInfoAsync(signingCertificateId) {
    var ref, ref1, ref2;
    const certificate = await getCertificateForSigningIdAsync(signingCertificateId);
    return {
        signingCertificateId,
        codeSigningInfo: (ref = certificate.subject.getField("CN")) == null ? void 0 : ref.value,
        appleTeamName: (ref1 = certificate.subject.getField("O")) == null ? void 0 : ref1.value,
        appleTeamId: (ref2 = certificate.subject.getField("OU")) == null ? void 0 : ref2.value
    };
}
function extractSigningId(codeSigningInfo) {
    var ref;
    var ref1;
    return (ref1 = (ref = codeSigningInfo.match(/.*\(([a-zA-Z0-9]+)\)/)) == null ? void 0 : ref[1]) != null ? ref1 : null;
}

//# sourceMappingURL=Security.js.map