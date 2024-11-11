import { MagickFile } from '..';
/**
 * Compare the two images and return true if they are equal visually. Optionally, a margin of error can be provided using `fuzz`
 */
export declare function compare(img1: MagickFile | string, img2: MagickFile | string, fuzz?: number): Promise<boolean>;
export declare function compareNumber(img1: MagickFile | string, img2: MagickFile | string): Promise<number>;
