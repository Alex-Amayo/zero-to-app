import { MagickInputFile } from '..';
export declare const builtInImageNames: string[];
/**
 * Gets ImageMagick built-in images like `rose:`, `logo:`, etc in the form of {@link MagickInputFile}s
 */
export declare function getBuiltInImages(): Promise<MagickInputFile[]>;
/**
 * shortcut of {@link getBuiltInImages} to get a single image by name
 */
export declare function getBuiltInImage(name: string): Promise<MagickInputFile>;
