import { MagickFile } from '..';
import { ExtractInfoResult } from './imageExtractInfoTypes';
/**
 * Execute `convert $IMG info.json` to extract image metadata. Returns the parsed info.json file contents
 * @param img could be a string in case you want to extract information about built in images like `rose:`
 */
export declare function extractInfo(img: MagickFile | string): Promise<ExtractInfoResult[]>;
