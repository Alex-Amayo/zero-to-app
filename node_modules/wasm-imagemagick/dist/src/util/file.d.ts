import { MagickInputFile, MagickOutputFile, MagickFile } from '..';
export declare function blobToString(blb: Blob): Promise<string>;
export declare function isInputFile(file: MagickFile): file is MagickInputFile;
export declare function isOutputFile(file: MagickFile): file is MagickOutputFile;
/**
 * Read files as string. Useful when files contains plain text like in the output file info.txt of `convert logo: -format '%[pixel:p{0,0}]' info:info.txt`
 */
export declare function readFileAsText(file: MagickFile): Promise<string>;
export declare function isImage(file: MagickFile): Promise<boolean>;
/**
 * Builds a new {@link MagickInputFile} by fetching the content of given url and optionally naming the file using given name
 * or extracting the file name from the url otherwise.
 */
export declare function buildInputFile(url: string, name?: string): Promise<MagickInputFile>;
export declare function asInputFile(f: MagickFile, name?: string): Promise<MagickInputFile>;
export declare function asOutputFile(f: MagickFile, name?: string): Promise<MagickOutputFile>;
export declare function getFileName(url: string): string;
export declare function getFileNameExtension(filePathOrUrl: string): string;
