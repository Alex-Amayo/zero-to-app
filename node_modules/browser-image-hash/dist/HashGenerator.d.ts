import HashSource from "./HashSource";
import Hash from "./Hash";
export default class HashGenerator {
    private document;
    constructor(document: Document);
    private generateByImage;
    private generateByCanvasRenderingContext2D;
    private generateByUint8ClampedArray;
    generate(source: HashSource, glayImageSource: HTMLImageElement | CanvasRenderingContext2D | Uint8ClampedArray): Hash;
}
