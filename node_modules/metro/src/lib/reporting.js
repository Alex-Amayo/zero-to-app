"use strict";

const chalk = require("chalk");
const stripAnsi = require("strip-ansi");
const util = require("util");
function logWarning(terminal, format, ...args) {
  const str = util.format(format, ...args);
  terminal.log("%s: %s", chalk.yellow("warning"), str);
}
function logError(terminal, format, ...args) {
  terminal.log(
    "%s: %s",
    chalk.red("error"),
    util.format(chalk.supportsColor ? format : stripAnsi(format), ...args)
  );
}
const nullReporter = {
  update() {},
};
module.exports = {
  logWarning,
  logError,
  nullReporter,
};
