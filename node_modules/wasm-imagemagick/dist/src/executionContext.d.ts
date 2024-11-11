import { ExecuteCommand, ExecuteConfig, ExecuteResult, MagickFile, MagickInputFile } from '.';
/**
 * Allow multiple execute() calls remembering previous execute() generated output files and previous given input files that
 * can be used as input files in next calls.
 */
export interface ExecutionContext {
    /**
     * This behaves almost the same as [execute](https://github.com/KnicKnic/WASM-ImageMagick/tree/master/apidocs#execute).
     */
    execute(configOrCommands: ExecuteConfig | ExecuteCommand | string): Promise<ExecuteResult>;
    /**
     * Programmatically add new files so they are available if following `execute()` calls.
     */
    addFiles(files: MagickFile[]): void;
    /**
     * Get all the files currently available in this context.
     */
    getAllFiles(): Promise<MagickInputFile[]>;
    /**
     * Add ImageMagick built-in images like `rose:`, `logo:`, etc to this execution context so they are present in `getAllFiles()`.
     */
    addBuiltInImages(): Promise<void>;
    /**
     * Get a file by name or undefined if none.
     */
    getFile(name: string): Promise<MagickInputFile | undefined>;
    /**
     * Remove files by name.
     * @returns the files actually removed.
     */
    removeFiles(names: string[]): MagickInputFile[];
}
export declare function newExecutionContext(inheritFrom?: ExecutionContext): ExecutionContext;
