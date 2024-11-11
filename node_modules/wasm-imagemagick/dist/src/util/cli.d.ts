import { Command } from '..';
import { ExecuteCommand } from '../execute';
/**
 * Generates a valid command line string from given `string[]` that is compatible with  {@link call}. Works with multiple
 * commands by separating  them with new lines and support comand splitting in new lines using `\`.
 * See {@link ExecuteCommand} for more information.
 */
export declare function arrayToCli(command: Command | Command[]): string;
/**
 * Generates a command in the form of `string[][]` that is compatible with {@link call} from given command line string.
 * This works for strings containing multiple commands in different lines. and also respect `\` character for continue the same
 * command in a new line. See {@link ExecuteCommand} for more information.
 */
export declare function cliToArray(cliCommand: string): Command[];
/**
 * Makes sure that given {@link ExecuteCommand}, in whatever syntax, is transformed to the form `string[][]` that is compatible with {@link call}
 */
export declare function asCommand(c: ExecuteCommand): Command[];
