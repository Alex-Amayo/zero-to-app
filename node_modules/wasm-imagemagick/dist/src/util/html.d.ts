import { MagickFile, MagickInputFile } from '..';
/**
 * Will load given html img element src with the inline image content.
 * @param image the image to be loaded
 * @param el the html image element in which to load the image
 * @param forceBrowserSupport if true and the image extension is not supported by browsers, it will convert the image to png
 * and return that src so it can be shown in browsers
 */
export declare function loadImageElement(image: MagickFile, el: HTMLImageElement, forceBrowserSupport?: boolean): Promise<void>;
/**
 * Return a string with the inline image content, suitable to be used to assign to an html img src attribute. See {@link loadImageElement}.
 * @param forceBrowserSupport if true and the image extension is not supported by browsers, it will convert the image to png
 * and return that src so it can be shown in browsers
 */
export declare function buildImageSrc(image: MagickFile, forceBrowserSupport?: boolean): Promise<string>;
/**
 * Build `MagickInputFile[]` from given HTMLInputElement of type=file that user may used to select several files
 */
export declare function getInputFilesFromHtmlInputElement(el: HTMLInputElement): Promise<MagickInputFile[]>;
