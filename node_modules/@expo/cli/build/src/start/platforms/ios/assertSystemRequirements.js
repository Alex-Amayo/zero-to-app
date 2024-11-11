"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "assertSystemRequirementsAsync", {
    enumerable: true,
    get: ()=>assertSystemRequirementsAsync
});
const _profile = require("../../../utils/profile");
const _simulatorAppPrerequisite = require("../../doctor/apple/SimulatorAppPrerequisite");
const _xcodePrerequisite = require("../../doctor/apple/XcodePrerequisite");
const _xcrunPrerequisite = require("../../doctor/apple/XcrunPrerequisite");
async function assertSystemRequirementsAsync() {
    // Order is important
    await (0, _profile.profile)(_xcodePrerequisite.XcodePrerequisite.instance.assertAsync.bind(_xcodePrerequisite.XcodePrerequisite.instance), "XcodePrerequisite")();
    await (0, _profile.profile)(_xcrunPrerequisite.XcrunPrerequisite.instance.assertAsync.bind(_xcrunPrerequisite.XcrunPrerequisite.instance), "XcrunPrerequisite")();
    await (0, _profile.profile)(_simulatorAppPrerequisite.SimulatorAppPrerequisite.instance.assertAsync.bind(_simulatorAppPrerequisite.SimulatorAppPrerequisite.instance), "SimulatorAppPrerequisite")();
}

//# sourceMappingURL=assertSystemRequirements.js.map