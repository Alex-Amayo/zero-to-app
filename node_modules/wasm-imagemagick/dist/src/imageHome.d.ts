import { MagickInputFile, MagickFile } from '.';
/**
 * Manager for `MagickFiles`.
 */
export interface ImageHome {
    /**
     * Get a file by name.
     */
    get(name: string): Promise<MagickInputFile>;
    /**
     * Programmatically add new files.
     */
    register(file: MagickFile, name?: string): void;
    isRegistered(name: string): boolean;
    /**
     * Get all the files currently available in this context.
     */
    getAll(): Promise<MagickInputFile[]>;
    /**
     * Add ImageMagick built-in images like `rose:`, `logo:`, etc to this execution context so they are present in `getAll()`.
     */
    addBuiltInImages(): Promise<void>;
    /**
     * Remove files by name.
     * @returns the files actually removed.
     */
    remove(names: string[]): MagickInputFile[];
}
declare type MagickInputFilePromise = Promise<MagickInputFile> & {
    resolved: true;
};
declare class ImageHomeImpl implements ImageHome {
    private images;
    private builtInImagesAdded;
    get(name: string): Promise<MagickInputFile>;
    remove(names: string[]): MagickInputFile[];
    getAll(): Promise<MagickInputFile[]>;
    register(file: MagickFile, name?: string): MagickInputFilePromise;
    isRegistered(name: string, andReady?: boolean): boolean;
    addBuiltInImages(): Promise<void>;
}
export declare function createImageHome(): ImageHomeImpl;
export {};
