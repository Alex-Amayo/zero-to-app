"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formattedDeviceName = formattedDeviceName;
exports.matchingDevice = matchingDevice;
exports.printFoundDevices = printFoundDevices;
function _cliTools() {
  const data = require("@react-native-community/cli-tools");
  _cliTools = function () {
    return data;
  };
  return data;
}
function _chalk() {
  const data = _interopRequireDefault(require("chalk"));
  _chalk = function () {
    return data;
  };
  return data;
}
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function matchingDevice(devices, deviceName) {
  if (deviceName === true) {
    const firstIOSDevice = devices.find(d => d.type === 'device');
    if (firstIOSDevice) {
      _cliTools().logger.info(`Using first available device named "${_chalk().default.bold(firstIOSDevice.name)}" due to lack of name supplied.`);
      return firstIOSDevice;
    } else {
      _cliTools().logger.error('No iOS devices connected.');
      return undefined;
    }
  }
  const deviceByName = devices.find(device => device.name === deviceName || formattedDeviceName(device) === deviceName);
  if (!deviceByName) {
    _cliTools().logger.error(`Could not find a device named: "${_chalk().default.bold(String(deviceName))}". ${printFoundDevices(devices)}`);
  }
  return deviceByName;
}
function formattedDeviceName(simulator) {
  return simulator.version ? `${simulator.name} (${simulator.version})` : simulator.name;
}
function printFoundDevices(devices) {
  return ['Available devices:', ...devices.map(device => `  - ${device.name} (${device.udid})`)].join('\n');
}

//# sourceMappingURL=matchingDevice.ts.map