import { MagickInputFile, MagickOutputFile } from '.';
import { CallResult } from './magickApi';
export declare type Command = (string | number)[];
export interface ExecuteConfig {
    inputFiles?: MagickInputFile[];
    /**
     */
    commands: ExecuteCommand;
}
/**
 *
 * Commands could have the following syntaxes:
 *  * array form like `[['convert', 'foo.png', 'bar.gif'], ['identify', 'bar.gif']]`
 *  * just one array: `['convert', 'foo.png', 'bar.gif']`
 *  * command line strings: `['convert foo.png bar.gif', 'idenfity bar.gif']`
 *  * just one string: `'convert foo.png bar.gif'`
 *
 * Also, for command line strings, multiple commands can be specified in the same string separating with new lines:
 *
 * ```js
 * const result = await execute(`
 *   convert rose: -sharpen 0x1 reconstruct.jpg
 *   compare rose: reconstruct.jpg difference.png
 *   compare -compose src rose: reconstruct.jpg difference.png
 * `)
 * ```
 *
 * Also, command line strings support breaking the same command in multiple lines by using `\` like in:
 *
 * ```js
 * const result = await execute(`
 *   convert -size 250x100 xc: +noise Random -channel R -threshold .4% \\
 *     -negate -channel RG -separate +channel \\
 *     \( +clone \) -compose multiply -flatten \\
 *     -virtual-pixel Tile -background Black \\
 *     -blur 0x.6 -motion-blur 0x15-90 -normalize \\
 *     +distort Polar 0 +repage 'star inward.gif'
 * `)
 * ```
 *
 * If you need to escape arguments like file names with spaces, use single quotes `'`, like the output file in the previous example `'star inward.gif'`
 */
export declare type ExecuteCommand = Command[] | Command | string;
export interface ExecuteResultOne extends CallResult {
    errors: any[];
    exitCode: number;
}
/**
 * Execute first command in given config.
 */
export declare function executeOne(configOrCommand: ExecuteConfig | ExecuteCommand): Promise<ExecuteResultOne>;
export declare function isExecuteCommand(arg: any): arg is ExecuteConfig;
/**
 * Transform  `configOrCommand: ExecuteConfig | ExecuteCommand` to a valid ExecuteConfig object
 */
export declare function asExecuteConfig(arg: ExecuteConfig | ExecuteCommand): ExecuteConfig;
/**
 * `execute()` shortcut that useful for commands that return only one output file or when only one particular output file is relevant.
 * @param outputFileName optionally user can give the desired output file name
 * @returns If `outputFileName` is given the file with that name, the first output file otherwise or undefined
 * if no file match, or no output files where generated (like in an error).
 */
export declare function executeAndReturnOutputFile(configOrCommand: ExecuteConfig | ExecuteCommand, outputFileName?: string): Promise<MagickOutputFile | undefined>;
export interface ExecuteEvent {
    command: Command;
    took: number;
    id: number;
}
export interface ExecuteListener {
    afterExecute?(event: ExecuteEvent): void;
    beforeExecute?(event: ExecuteEvent): void;
}
export declare function addExecuteListener(l: ExecuteListener): void;
export interface ExecuteResult extends ExecuteResultOne {
    results: ExecuteResultOne[];
}
/**
 * Execute all commands in given config serially in order. Output files from a command become available as
 * input files in next commands. In the following example we execute two commands. Notice how the second one uses `image2.png` which was the output file of the first one:
 *
 * ```ts
 * const { outputFiles, exitCode, stderr} = await execute({
 *   inputFiles: [await buildInputFile('fn.png', 'image1.png')],
 *   commands: `
 *     convert image1.png -bordercolor #ffee44 -background #eeff55 +polaroid image2.png
 *     convert image2.png -fill #997711 -tint 55 image3.jpg
 * `
 * })
 * if (exitCode) {
 *   alert(`There was an error with the command: ${stderr.join('\n')}`)
 * }
 * else {
 *   await loadImageElement(outputFiles.find(f => f.name==='image3.jpg'), document.getElementById('outputImage'))
 * }
 * ```
 *
 * See {@link ExecuteCommand} for different command syntax supported.
 *
 * See {@link ExecuteResult} for details on the object returned
 */
export declare function execute(configOrCommand: ExecuteConfig | ExecuteCommand): Promise<ExecuteResult>;
