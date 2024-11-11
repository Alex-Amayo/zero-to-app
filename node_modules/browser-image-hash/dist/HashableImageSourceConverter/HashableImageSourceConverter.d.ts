import HashSource from '../HashSource';
export default interface HashableImageSouceConverter {
    convert(source: HashSource): Promise<HTMLImageElement | CanvasRenderingContext2D | Uint8ClampedArray>;
}
